import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodOfStoreRoutingModule } from './food-of-store-routing.module';
import { StoreComponent } from './store/store.component';
import { FoodComponent } from './food/food.component';
import { FoodOfStoreComponent } from './food-of-store/food-of-store.component';


@NgModule({
  declarations: [StoreComponent, FoodComponent, FoodOfStoreComponent],
  imports: [
    CommonModule,
    FoodOfStoreRoutingModule
  ]
})
export class FoodOfStoreModule { }
