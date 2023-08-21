// SINGELTON
(function () {
  class MyMap {
    private static instance: MyMap;
    map: Map<number, string> = new Map();

    private constructor() {}

    clean() {
      this.map = new Map();
    }

    public static get(): MyMap {
      if (!MyMap.instance) {
        MyMap.instance = new MyMap();
      }
      return MyMap.instance;
    }
  }

  class Service1 {
    addMap(key: number, value: string) {
      const myMap = MyMap.get();
      myMap.map.set(key, value);
    }
  }

  class Service2 {
    getKeys(key: number) {
      const myMap = MyMap.get();
      console.log(myMap.map.get(key));
      myMap.clean();
      console.log(myMap.map.get(key));
    }
  }

  new Service1().addMap(1, 'Works');
  new Service2().getKeys(1);
})();

// PROTOTYPE
(function () {
  interface Prototype<T> {
    clone(): T;
  }

  class UserHistory implements Prototype<UserHistory> {
    createdAt: Date;
    constructor(public email: string, public name: string) {
      this.createdAt = new Date();
    }
    clone(): UserHistory {
      let target = new UserHistory(this.email, this.name);
      target.createdAt = this.createdAt;
      return target;
    }
  }

  let user1 = new UserHistory('a@a.com', 'Andrei');
  let user2 = user1.clone();
  user2.email = 'b@b.com';
  console.log(user2);
  console.log(user1);
})();

// BUILDER
(function () {
  enum ImageFormat {
    PNG = 'png',
    JPEG = 'jpeg',
  }

  interface IResolution {
    width: number;
    height: number;
  }

  interface IImageConvertation extends IResolution {
    format: ImageFormat;
  }

  class ImageBuilder {
    private formats: ImageFormat[] = [];
    private resolutions: IResolution[] = [];
    addPng() {
      if (this.formats.includes(ImageFormat.PNG)) {
        return this;
      }
      this.formats.push(ImageFormat.PNG);
      return this;
    }

    addJpeg() {
      if (this.formats.includes(ImageFormat.JPEG)) {
        return this;
      }
      this.formats.push(ImageFormat.JPEG);
      return this;
    }

    addResolution(w: number, h: number) {
      this.resolutions.push({ width: w, height: h });
      return this;
    }

    build(): IImageConvertation[] {
      const res: IImageConvertation[] = [];
      for (const r of this.resolutions) {
        for (const f of this.formats) {
          res.push({
            format: f,
            width: r.width,
            height: r.height,
          });
        }
      }
      return res;
    }
  }

  console.log(
    new ImageBuilder()
      .addJpeg()
      .addPng()
      .addResolution(100, 500)
      .addResolution(200, 100)
      .build()
  );
})();
