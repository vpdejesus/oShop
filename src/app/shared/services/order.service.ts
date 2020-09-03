import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list('/order').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/order').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/order', (query) => query.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
}
