import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from 'src/app/core/model/food';
import {
  CreateOrderRequest,
  OrderItem,
  OrderResponse,
  UpdateOrderRequest,
} from 'src/app/core/model/order';
import { FoodService } from 'src/app/core/service/food.service';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();

  listFood: Food[] = [];

  constructor(
    private foodService: FoodService,
    private orderService: OrderService
  ) {}

  addToCart(food: Food) {
    this.subs.add(
      this.orderService.getLastOrder().subscribe({
        next: (result) => {
          if (!result.success) return;
          const lastOrder: OrderResponse = result.data;
          /*
           **  last order :
           **      - confirmed => tạo dơn mới
           **      - pending
           **           - food ở cửa hàng khác thì hỏi khách hàng có muốn hủy đơn cũ không ? Yes. tạo dơn mới ở store mới
           **           - food ở cùng cửa hàng thì tiến hành cập food vào đơn hàng.
           **
           */
          if (lastOrder.status === 'confirmed') {
            this.creatOrder(food);
          } else if (lastOrder.status === 'pending') {
            // nguời dùng đã order rồi
            // nếu khác store
            if (lastOrder.storeId !== food.storeId) {
              const isConfirm = confirm('Ban có muốn hủy đơn cũ ?');
              if (isConfirm) {
                this.subs.add(
                  this.orderService.deleteOrder(lastOrder.id).subscribe(() => {
                    this.creatOrder(food);
                  })
                );
              }
            }
            // nếu cùng store thì thêm món
            else {
              this.updateOrder(food, lastOrder);
            }
          }
        },
        error: (err) => {
          if (err && err.status !== 404) return;

          /* 404 not found order - nghia la khong co last order, tao moi last order */
          this.creatOrder(food);
        },
      })
    );
  }

  updateOrder(food: Food, lastOrder: OrderResponse) {
    const foodInLastOrder = lastOrder.orderItems.find(
      (o) => o.foodId === food.id
    );

    // món người dùng thêm là món trong order
    if (foodInLastOrder) {
      foodInLastOrder.quantity = foodInLastOrder.quantity + 1;
    } else {
      lastOrder.orderItems.push({
        foodId: food.id,
        price: food.price,
        quantity: 1,
      });
    }

    const updateOrder = {
      id: lastOrder.id,
      status: lastOrder.status,
      storeId: lastOrder.storeId,
      totalMoney: lastOrder.totalMoney,
      orderItems: lastOrder.orderItems,
    } as UpdateOrderRequest;
    this.subs.add(
      this.orderService.updateOrder(updateOrder).subscribe(() => {
        alert('add to cart success - update');
      })
    );
  }

  creatOrder(food: Food) {
    const order = {
      storeId: food.storeId,
      status: 'pending',
      orderItems: [
        {
          foodId: food.id,
          quantity: 1,
          price: food.price,
        },
      ],
      totalMoney: 0, // order later nen total sẽ tính sau
    } as CreateOrderRequest;
    this.orderService.createOrder(order).subscribe((response) => {
      alert('add success - create');
      console.log(response);
    });
  }

  getListFood() {
    this.foodService.getFoodList().subscribe({
      next: (result) => {
        this.listFood = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getListFood();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
