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
    async send() {
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

      await fetch(url, {
        method: this.method,
        ...(this.body && { body: this.body }),
        ...(this.headers && { headers: this.headers }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  const fetch1 = new FetchBuilder();

  fetch1
    .setApi('https://dummyjson.com/users/add')
    .setMethod(FetchMethod.POST)
    .setBody({
      firstName: 'Muhammad',
      lastName: 'Ovi',
      age: 250,
    })
    .setHeadres('Content-Type', 'application/json')
    .send();
})();