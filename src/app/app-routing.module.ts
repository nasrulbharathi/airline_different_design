import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { StaffComponent } from './staff/staff.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
