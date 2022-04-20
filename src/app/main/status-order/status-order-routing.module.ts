import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusOrderComponent } from './status-order/status-order.component';

const routes: Routes = [{ path: '', component: StatusOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusOrderRoutingModule {}
