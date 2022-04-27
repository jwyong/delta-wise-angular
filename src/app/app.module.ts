import { BaseComponent } from 'src/app/components/base/base.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { DataService } from 'src/app/services/data-service';
import { LoginComponent } from './components/auth/login/login.component';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseAuthComponent } from './components/auth/base-auth/base-auth.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { BaseHomeComponent } from './components/home/base-home/base-home.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, ForgotPwordComponent, BaseComponent, BaseAuthComponent, ResetPwordComponent, DashboardComponent, BaseHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
