class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  discountPrice(discount) {
    return this.price - (this.price * discount);
  }
}

export default Product;
