import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food/food.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FoodComponent],
  imports: [CommonModule, FoodRoutingModule, ReactiveFormsModule],
})
export class FoodModule {}
