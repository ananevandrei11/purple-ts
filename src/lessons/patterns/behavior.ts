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

  const controller = new Controller();
  controller.addReceiver(new UserService());
  controller.run();
})();
