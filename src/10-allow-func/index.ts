(function () {
  class User {
    @AllowFunc()
    age: number = 30;
  }

  function AllowFunc() {
    return (target: Object, propertyKey: string | symbol) => {
      console.log(target);
      console.log(propertyKey);
    };
  }

  const user = new User();
})();
