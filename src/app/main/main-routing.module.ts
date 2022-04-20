import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartModule } from './cart/cart.module';
import { FoodDetailModule } from './food-detail/food-detail.module';
import { FoodOfStoreModule } from './food-of-store/food-of-store.module';
import { HomeModule } from './home/home.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { StatusOrderModule } from './status-order/status-order.module';
import { StoreModule } from './store/store.module';
import { UpdateUserInfoModule } from './update-user-info/update-user-info.module';

const routes: Routes = [
  // Muốn Home và Detail có chung layout
  // Trong html của MainLayoutComponent phải có router-outlet
  // (mẹo nhỏ là nếu có chữ 'children' giống như bên dưới thì bên html của MainLayoutComponent phải có router-outlet)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'detail', loadChildren: () => FoodDetailModule },
      { path: 'cart', loadChildren: () => CartModule },
      { path: 'status-order', loadChildren: () => StatusOrderModule },
      {
        path: 'update-profile/:userId',
        loadChildren: () => UpdateUserInfoModule,
      },
      {
        path: 'store/:storeId/foods',
        pathMatch: 'full',
        loadChildren: () => FoodOfStoreModule,
      },
      { path: 'store', loadChildren: () => StoreModule },
      { path: '', loadChildren: () => HomeModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
