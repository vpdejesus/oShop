import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    itemsMap = itemsMap || {};

    // tslint:disable-next-line: forin
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      // tslint:disable-next-line: max-line-length
      // Objects that we get from firebase, so we map to shopping-cart-item object
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));
    }
  }

  getQuantity(product: Product) {
    // This is required here to prevent null ref error when the product card component renders every item
    if (!this.itemsMap) {
      return 0;
    }

    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }

    return count;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }

    return sum;
  }
}
