import { Component, OnInit } from '@angular/core';
import { StatusOrder } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-status-order',
  templateUrl: './status-order.component.html',
  styleUrls: ['./status-order.component.css'],
})
export class StatusOrderComponent implements OnInit {
  statusOrders: StatusOrder[] = [];

  constructor(private statusOrderService: OrderService) {}

  getStatusOrder() {
    this.statusOrderService.getStatusOrder().subscribe({
      next: (result) => {
        this.statusOrders = result.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getStatusOrder();
  }
}
