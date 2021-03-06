import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CartItemResponse,
  CartResponse,
  OrderResponse,
  UpdateOrderRequest,
} from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  cart: CartResponse = null;
  shipping: number = 20000;
  totalFood: number = 0; // tiền trước khi cộng ship
  totalMoney: number = 0; // tiền sau khi cộng ship
  note: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  updateTotalMoney() {
    this.totalFood = 0;
    this.totalMoney = 0;
    for (const orderItem of this.cart.cartItems) {
      this.totalFood = this.totalFood + orderItem.price * orderItem.quantity;
    }
    this.totalMoney = this.totalFood + this.shipping;
  }

  ngOnInit(): void {
    this.orderService.getCart().subscribe({
      next: (result) => {
        this.cart = result.data;
        this.updateTotalMoney();
      },
      error: (err) => {},
    });
  }

  onAddItem(cartItem: CartItemResponse) {
    this.cart.cartItems.forEach((element) => {
      if (cartItem.foodId == element.foodId) {
        cartItem.quantity = cartItem.quantity + 1;
        if (cartItem.quantity > 10) {
          /* cho số lượng tối đa là 10 */
          cartItem.quantity = 10;
        }
      }
    });
    this.updateTotalMoney();
  }

  onRemoveItem(cartItem: CartItemResponse) {
    this.cart.cartItems.forEach((element) => {
      if (cartItem.foodId == element.foodId) {
        cartItem.quantity = cartItem.quantity - 1;
        if (cartItem.quantity <= 0) {
          /* xóa luôn món ăn đó khỏi danh sách */
          this.cart.cartItems.splice(this.cart.cartItems.indexOf(cartItem), 1);
        }
      }
    });
    this.updateTotalMoney();
  }

  processOrder() {
    if (!this.cart.cartItems || this.cart.cartItems.length == 0) {
      alert('Vui lòng thêm món ăn');
      return;
    }
    const updateOrder = {
      id: this.cart.id,
      status: 'confirmed',
      storeId: this.cart.storeId,
      totalMoney: this.totalMoney,
      orderItems: this.cart.cartItems,
    } as UpdateOrderRequest;
    console.log(updateOrder);
    this.subs.add(
      this.orderService.updateOrder(updateOrder).subscribe(() => {
        alert('add to cart success - update');
        this.router.navigateByUrl('/status-order');
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
