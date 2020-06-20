import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { MyMaterialModule } from '../material.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
