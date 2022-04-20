import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusOrderRoutingModule } from './status-order-routing.module';
import { StatusOrderComponent } from './status-order/status-order.component';


@NgModule({
  declarations: [StatusOrderComponent],
  imports: [
    CommonModule,
    StatusOrderRoutingModule
  ]
})
export class StatusOrderModule { }
