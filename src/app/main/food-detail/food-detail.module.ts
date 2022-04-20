import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodDetailRoutingModule } from './food-detail-routing.module';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    FoodDetailRoutingModule
  ]
})
export class FoodDetailModule { }
