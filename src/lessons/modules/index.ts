// ---1 namespaces & references---
export namespace A {
  export const a = 5;
  export interface B {
    c: number;
  }
}
(function () {
  A.a;
})();
