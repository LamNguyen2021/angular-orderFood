import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUserInfoRoutingModule } from './update-user-info-routing.module';
import { UpdateUserInfoComponent } from './update-user-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateUserInfoComponent],
  imports: [CommonModule, UpdateUserInfoRoutingModule, ReactiveFormsModule],
})
export class UpdateUserInfoModule {}
