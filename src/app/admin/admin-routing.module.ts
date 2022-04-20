import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodModule } from './food/food.module';
import { MainLayoutAdminComponent } from './main-layout-admin/main-layout-admin.component';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutAdminComponent,
    children: [
      { path: 'order', loadChildren: () => OrderModule },
      { path: 'food', loadChildren: () => FoodModule },
      { path: 'store', loadChildren: () => StoreModule },
      { path: '', loadChildren: () => UserModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
