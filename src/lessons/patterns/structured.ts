// BRIDGE
(function () {
  interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
  }

  class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
      console.log(message);
    }
    connect(config: string): void {
      console.log(config);
    }
    disconnect(): void {
      console.log('Disconnect Telegram');
    }
  }

  class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
      console.log(message);
    }
    connect(config: string): void {
      console.log(config);
    }
    disconnect(): void {
      console.log('Disconnect WhatsUp');
    }
  }

  class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
      this.provider.connect('connect');
      this.provider.sendMessage('message');
      this.provider.disconnect();
    }
  }

  class DelayNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
      super(provider);
    }
    sendDelayed(ms: number) {
      const that = this;
      setTimeout(function () {
        that.send();
      }, ms);
    }
  }

  /*
  const sender = new NotificationSender(new TelegramProvider());
  sender.send();

  const sender2 = new DelayNotificationSender(new WhatsUpProvider);
  sender2.sendDelayed(1000);
  */
})();

// FASADE
(function () {
  class Notify {
    send(template: string, to: string) {
      console.log(`${template} ${to}`);
    }
  }

  class Log {
    log(message: string) {
      console.log(message);
    }
  }

  class Template {
    private templates = [{ name: 'other', template: '<h1>Template</h1>' }];

    getByName(name: string) {
      return this.templates.find((t) => t.name === name);
    }
  }

  class NotificationFacade {
    private notify: Notify;
    private logger: Log;
    private template: Template;

    constructor() {
      this.notify = new Notify();
      this.logger = new Log();
      this.template = new Template();
    }

    send(to: string, templateName: string) {
      const data = this.template.getByName(templateName);
      if (!data) {
        this.logger.log('Not found');
        return;
      }
      this.notify.send(data.template, to);
      this.logger.log('Done');
    }
  }

  const service = new NotificationFacade();
  // service.send('a@a.ru', 'other');
})();

// ADAPTER
(function () {
  class KVDatabase {
    private db: Map<string, string> = new Map();

    save(k: string, v: string) {
      this.db.set(k, v);
    }
  }

  class PersistentDB {
    savePersistent(data: Object) {
      console.log(data);
    }
  }

  class PersistentDBAdapter extends KVDatabase {
    constructor(public database: PersistentDB) {
      super();
    }

    override save(k: string, v: string): void {
      this.database.savePersistent({ k: v });
    }
  }

  function run(base: KVDatabase) {
    base.save('k', 'v');
  }
  run(new PersistentDBAdapter(new PersistentDB));
})();
