import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListFoodComponent } from './list-food/list-food.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [HomeComponent, ListFoodComponent, WelcomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
