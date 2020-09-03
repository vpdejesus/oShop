import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { Shipping } from 'shared/models/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-input-rename
  @Input('cart') cart: ShoppingCart;
  shipping = new Shipping();
  userId: string;
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
