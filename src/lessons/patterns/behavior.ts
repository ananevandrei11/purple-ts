// Chain Of Command цепочка вызовов
(function () {
  interface IMiddleWare {
    next(mid: IMiddleWare): IMiddleWare;
    handle(req: any): any;
  }

  abstract class AbstractMiddleWare implements IMiddleWare {
    private nextMiddleware: IMiddleWare | null = null;
    next(mid: IMiddleWare): IMiddleWare {
      this.nextMiddleware = mid;
      return mid;
    }
    handle(req: any) {
      if (this.nextMiddleware) {
        return this.nextMiddleware.handle(req);
      }
      return;
    }
  }

  class AuthMiddleware extends AbstractMiddleWare {
    override handle(req: any) {
      console.log('Auth');

      if (req.userId === 1) {
        return super.handle(req);
      }
      return { error: 'Error: Not Auth' };
    }
  }

  class ValidateMiddleware extends AbstractMiddleWare {
    override handle(req: any) {
      console.log('Validate');

      if (req.body) {
        return super.handle(req);
      }
      return { error: 'Error Validate Body' };
    }
  }

  class ControllerMiddleware extends AbstractMiddleWare {
    override handle(req: any) {
      console.log('Controller');
      return { succes: req };
    }
  }

  /*
  const controller = new ControllerMiddleware();
  const valid = new ValidateMiddleware();
  const auth = new AuthMiddleware();
  auth.next(valid).next(controller);
  console.log(auth.handle({ userId: 1, body: 'I am body' }));
  */
})();

// Mediator
(function () {
  interface IMediator {
    notify(sender: string, event: string): void;
  }

  abstract class Mediated {
    mediator: IMediator;
    setMediator(mediator: IMediator) {
      this.mediator = mediator;
    }
  }

  class Notifactions {
    send() {
      console.log('Notifactions');
    }
  }

  class Log {
    log(message: string) {
      console.log(message);
    }
  }

  class EventHandler extends Mediated {
    myEvent() {
      this.mediator.notify('EventHandler', 'nyEvent');
    }
  }

  class NotificationMediator implements IMediator {
    constructor(
      public notifcations: Notifactions,
      public log: Log,
      public handler: EventHandler,
    ) {}
    notify(_: string, event: string): void {
      switch (event) {
        case 'nyEvent':
          this.notifcations.send();
          this.log.log('Log: Sended');
          break;
      }
    }
  }
  /*
  const handler = new EventHandler();
  const logger = new Log();
  const notifcations = new Notifactions();

  const m = new NotificationMediator(notifcations, logger, handler);
  handler.setMediator(m);
  handler.myEvent();
  */
})();

// COMMAND
(function () {
  class User {
    constructor(public userId: number) {
      this.userId = userId;
    }
  }

  class UserService {
    saveUser(user: User) {
      console.log(`saveUser ${user.userId}`);
    }
    deleteUser(userId: number) {
      console.log(`deleteUser ${userId}`);
    }
  }

  class CommandHistory {
    public commands: Command[] = [];
    push(command: Command) {
      this.commands.push(command);
    }

    remove(command: Command) {
      this.commands = this.commands.filter(
        (c) => c.commandId !== command.commandId,
      );
    }
  }

  abstract class Command {
    public commandId: number;
    abstract execute(): void;
    constructor(public history: CommandHistory) {
      this.commandId = Math.random();
    }
  }

  class AddUserCommand extends Command {
    constructor(
      histroy: CommandHistory,
      private user: User,
      private receiver: UserService,
    ) {
      super(histroy);
    }

    execute(): void {
      this.receiver.saveUser(this.user);
      this.history.push(this);
    }

    undo(): void {
      this.receiver.deleteUser(this.user.userId);
      this.history.remove(this);
    }
  }

  class Controller {
    receiver: UserService;
    history: CommandHistory = new CommandHistory();
    addReceiver(receiver: UserService) {
      this.receiver = receiver;
    }
    run() {
      const user = new User(1);
      const command = new AddUserCommand(this.history, user, this.receiver);
      command.execute();
      console.log(command.history);
      command.undo();
      console.log(command.history);
    }
  }

  /*
  const controller = new Controller();
  controller.addReceiver(new UserService());
  controller.run();
  */
})();

// STATE
(function () {
  class DocumentItem {
    public text: string;
    public state: DocumentItemState;

    constructor() {
      this.setState(new DraftDocumentItemState());
    }
    getState() {
      return this.state;
    }

    setState(state: DocumentItemState) {
      this.state = state;
      this.state.setContext(this);
    }

    publishDoc() {
      this.state.publish();
    }

    deleteDoc() {
      this.state.delete();
    }
  }

  abstract class DocumentItemState {
    public name: string;
    public item: DocumentItem;

    public setContext(item: DocumentItem) {
      this.item = item;
    }

    public abstract publish(): void;
    public abstract delete(): void;
  }

  class DraftDocumentItemState extends DocumentItemState {
    constructor() {
      super();
      this.name = 'DraftDocument';
    }

    public publish(): void {
      console.log('Draft to Publish');
      this.item.setState(new PublishDocumentItemState());
    }
    public delete(): void {
      console.log('Draft to Delete');
    }
  }

  class PublishDocumentItemState extends DocumentItemState {
    constructor() {
      super();
      this.name = 'PublishDocument';
    }

    public publish(): void {
      console.log('it is already Published');
    }
    public delete(): void {
      console.log('Publish to Delete');
      this.item.setState(new DraftDocumentItemState());
    }
  }

  /*
  const doc = new DocumentItem();
  doc.text = 'New Post';
  console.log(doc.getState());
  doc.publishDoc();
  console.log(doc.getState());
  doc.deleteDoc();
  console.log(doc.getState());
  */
})();

// STRATEGY
(function () {
  class User {
    githubToken: string;
    jwtToken: string;
  }

  interface AuthStrategy {
    auth(user: User): boolean;
  }

  class Auth {
    constructor(private strategy: AuthStrategy) {}

    setSTrategy(strategy: AuthStrategy) {
      this.strategy = strategy;
    }

    public authUser(user: User): boolean {
      return this.strategy.auth(user);
    }
  }

  class JWTStrategy implements AuthStrategy {
    auth(user: User): boolean {
      if (user.jwtToken) {
        return true;
      }
      return false;
    }
  }

  class GitHubStrategy implements AuthStrategy {
    auth(user: User): boolean {
      if (user.githubToken) {
        return true;
      }
      return false;
    }
  }

  /*
  const user = new User();
  user.jwtToken = 'jwt';
  const auth = new Auth(new JWTStrategy());
  console.log(auth.authUser(user));
  auth.setSTrategy(new GitHubStrategy());
  console.log(auth.authUser(user));
  user.githubToken = 'github';
  console.log(auth.authUser(user));
  */
})();

// ITERATOR
(function () {
  class Task {
    constructor(public priorety: number) {}
  }

  class TaskList {
    private tasks: Task[] = [];

    public sortByPriorety() {
      this.tasks = this.tasks.sort((a, b) => {
        if (a.priorety > b.priorety) {
          return 1;
        }
        if (a.priorety < b.priorety) {
          return -1;
        }
        return 0;
      });
    }
    addTask(task: Task) {
      this.tasks.push(task);
    }

    public getTasks() {
      return this.tasks;
    }

    public count() {
      return this.tasks.length;
    }

    public getIterator(): IIterator<Task> {
      return new PrioretyIterator(this);
    }
  }

  interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
  }

  class PrioretyIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList) {
      // priorety
      taskList.sortByPriorety();
      this.taskList = taskList;
    }
    current(): Task | undefined {
      return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
      this.position += 1;
      return this.taskList.getTasks()[this.position];
    }
    prev(): Task | undefined {
      this.position -= 1;
      return this.taskList.getTasks()[this.position];
    }
    index(): number {
      return this.position;
    }
  }

  const taskList = new TaskList();

  taskList.addTask(new Task(8));
  taskList.addTask(new Task(1));
  taskList.addTask(new Task(3));

  const iterator = taskList.getIterator();
  /*
  console.log(iterator.current());
  console.log(iterator.next());
  console.log(iterator.current());
  console.log(iterator.prev());
  console.log(iterator.index());
  */
})();

// TEMPLATE
(function () {
  class Form {
    constructor(public name: string) {}
  }

  abstract class SaveForm<T> {
    public save(form: Form) {
      const res = this.fill(form);
      this.log(res);
      this.send(res);
    }
    protected abstract fill(form: Form): T;
    protected log(data: T): void {
      console.log(data);
    }
    protected abstract send(data: T): void;
  }

  class FirstAPI extends SaveForm<string> {
    protected fill(form: Form): string {
      return form.name;
    }
    protected send(data: string): void {
      console.log(`Send ${data}`);
    }
  }

  class SecondAPI extends SaveForm<{ fio: string }> {
    protected fill(form: Form): { fio: string } {
      return { fio: form.name };
    }
    protected send(data: { fio: string }): void {
      console.log(`Send FIO: ${data.fio}`);
    }
  }

  /*
  const form1 = new FirstAPI();
  form1.save(new Form('Vasya'));
  const form2 = new SecondAPI();
  form2.save(new Form('Ben'));
  */
})();

// OBSERVER
(function () {
  interface Observer {
    update(sub: Subject): void;
  }

  interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
  }

  class Lead {
    constructor(public name: string, public phone: string) {}
  }

  class NewLead implements Subject {
    private observers: Observer[] = [];
    public state: Lead;

    attach(observer: Observer): void {
      if (this.observers.includes(observer)) {
        return;
      }
      this.observers.push(observer);
    }
    detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
        return;
      }
      this.observers.splice(observerIndex, 1);
    }
    notify(): void {
      if (this.observers.length === 0) {
        console.log('observer not found');
      }
      for (const observer of this.observers) {
        observer.update(this);
      }
    }
  }

  class NotifyService implements Observer {
    update(sub: Subject): void {
      console.log('NotifyService is received message');
      console.log(sub);
    }
  }

  class LeadService implements Observer {
    update(sub: Subject): void {
      console.log('LeadService is received message');
      console.log(sub);
    }
  }

  /*
  const subject = new NewLead();
  subject.state = new Lead('Andrei', '123456789');
  const subscribe1 = new NotifyService();
  const subscribe2 = new LeadService();
  subject.attach(subscribe1);
  subject.attach(subscribe2);
  subject.notify();
  subject.detach(subscribe1);
  subject.notify();
  subject.detach(subscribe2);
  subject.notify();
  */
})();
