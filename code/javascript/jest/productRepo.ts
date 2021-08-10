import Product from "./productClass";

export function find(id) {
  switch (id) {
    case 1:
      return new Product('Apples', 100);
    case 2:
      return new Product('Oranges', 200);
    default:
      return null;
  }
}
