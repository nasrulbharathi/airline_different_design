import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MyMaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LoginService } from './services/login.service';
import { StaffComponent } from './staff/staff.component';
import { RegisterComponent } from './register/register.component';
import { FlightService } from './services/flight.service';
import { DialogComponent } from './admin/dialog/dialog.component';
import { CheckinComponent } from './staff/checkin/checkin.component';
import { ServicesComponent } from './staff/services/services.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StaffComponent,
    RegisterComponent,
    DialogComponent,
    CheckinComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    MyMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogComponent, CheckinComponent, ServicesComponent],
  providers: [LoginService, FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
