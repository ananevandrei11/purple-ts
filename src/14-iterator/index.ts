(function () {
  interface IArticle {
    id: number;
    date: Date;
    text: string;
  }

  interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
  }

  class IDIterator implements IIterator<Article> {
    private position: number = 0;
    private list: ArticleList;

    constructor(list: ArticleList) {
      list.sortByID();
      this.list = list;
    }
    current(): Article | undefined {
      return this.list.getArticles()[this.position];
    }
    next(): Article | undefined {
      this.position += 1;
      return this.list.getArticles()[this.position];
    }
    prev(): Article | undefined {
      this.position -= 1;
      return this.list.getArticles()[this.position];
    }
    index(): number {
      return this.position;
    }
  }

  class ArticleList {
    public articles: IArticle[] = [];

    addArticle(a: IArticle) {
      this.articles.push(a);
    }

    removeArticle<T extends keyof IArticle, K extends IArticle[T]>(
      param: T,
      value: K,
    ) {
      this.articles.filter((a) => a[param] !== value);
    }

    getArticles() {
      return this.articles;
    }

    sortByID() {
      this.articles.sort((a, b) => {
        return a.id - b.id;
      });
    }

    getIteratorByID(): IIterator<Article> {
      return new IDIterator(this);
    }
  }

  class Article implements IArticle {
    public id: number;
    public date: Date;
    public text: string;

    constructor(id: number, text: string) {
      this.id = id;
      this.date = new Date();
      this.text = text;
    }
  }

  const art1 = new Article(0, 'Article 1');
  const art2 = new Article(1, 'Article 2');
  const art3 = new Article(2, 'Article 3');

  const articleList = new ArticleList();
  articleList.addArticle(art1);
  articleList.addArticle(art3);
  articleList.addArticle(art2);
  console.log(articleList.articles);
  const iteratorByID = articleList.getIteratorByID();
  console.log(iteratorByID.current());
  console.log(iteratorByID.next());
  console.log(iteratorByID.next());
})();
