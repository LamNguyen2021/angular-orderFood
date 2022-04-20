import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodOfStoreComponent } from './food-of-store/food-of-store.component';

const routes: Routes = [{ path: '', component: FoodOfStoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodOfStoreRoutingModule {}
