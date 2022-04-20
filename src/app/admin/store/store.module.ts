import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StoreComponent],
  imports: [CommonModule, StoreRoutingModule, ReactiveFormsModule],
})
export class StoreModule {}
