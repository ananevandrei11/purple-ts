(function () {
  enum FetchMethod {
    POST = 'POST',
    GET = 'GET',
  }

  class FetchBuilder {
    api: string | null = null;
    getParams: string | null = null;
    body: string | null = null;
    headers: { [key: string]: string } = {};
    method: FetchMethod | null = null;

    setApi(api: string): FetchBuilder {
      this.api = api;
      return this;
    }
    setGetParams(key: string, value: string): FetchBuilder {
      this.getParams = `?${key}=${value}`;
      return this;
    }
    setBody(body: any): FetchBuilder {
      this.body = JSON.stringify(body);
      return this;
    }
    setMethod(method: FetchMethod): FetchBuilder {
      this.method = method;
      return this;
    }
    setHeadres(key: string, value: string): FetchBuilder {
      this.headers[key] = value;
      return this;
    }
    async send<T>(): Promise<T> {
      let url: string = '';
      if (this.api) {
        url = this.api;
      }
      if (this.getParams) {
        url += this.getParams;
      }

      if (!url || !this.method) {
        throw new Error('Need Url');
      }

      return await fetch(url, {
        method: this.method,
        ...(this.body && { body: this.body }),
        ...(this.headers && { headers: this.headers }),
      })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err));
    }
  }

  type Product = {
    [key: string]: any;
  };

  interface IProductAPI {
    getProduct(id: number): Promise<Product | undefined>;
  }

  class ProductAPI implements IProductAPI {
    private requst = new FetchBuilder();
    async getProduct(id: number): Promise<Product | undefined> {
      try {
        const res = await this.requst
          .setApi('https://dummyjson.com/products/' + id)
          .setMethod(FetchMethod.GET)
          .setHeadres('Content-Type', 'application/json')
          .send<Product>();
        return res;
      } catch (e) {
        return undefined;
      }
    }
  }

  class ProductAPIProxy implements IProductAPI {
    api: IProductAPI = new ProductAPI();
    constructor() {}
    async getProduct(id: number): Promise<Product | undefined> {
      if (id <= 10 && id > 0) {
        const res = await this.api.getProduct(id);
        console.log(res);
        return res;
      }
      console.log(`WARNING: id ${id} is out of range`);
      return undefined;
    }
  }

  const productApi = new ProductAPI();
  productApi.getProduct(1);

  
  const productApiProxy2 = new ProductAPIProxy();
  productApiProxy2.getProduct(2);
  productApiProxy2.getProduct(15);
})();
