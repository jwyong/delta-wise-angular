import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from 'src/app/components/base/base.component';
import { DataService } from 'src/app/services/data-service';
import { HttpService } from 'src/app/services/http-service';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseAuthComponent } from './components/auth/base-auth/base-auth.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { SearchBarComponent } from './components/common/search-bar/search-bar.component';
import { CryptoComponent } from './components/home/crypto/crypto.component';
import { EquitiesComponent } from './components/home/equities/equities.component';
import { EquityDetailsComponent } from './components/home/equities/equity-details/equity-details.component';
import { HomeComponent } from './components/home/home/home.component';
import { MaterialModule } from './modules/material.module';
import { HeaderInterceptor } from './services/header-interceptor';
import { DateRangePickerComponent } from './components/common/date-range-picker/date-range-picker.component';
import { EstimateDialogComponent } from './components/common/estimate-dialog/estimate-dialog.component';



@NgModule({
  declarations: [
    AppComponent, LoginComponent, ForgotPwordComponent, BaseComponent, BaseAuthComponent, ResetPwordComponent, EquitiesComponent, HomeComponent, SearchBarComponent, CryptoComponent, EquityDetailsComponent, DateRangePickerComponent, EstimateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    LocalStorageService,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /*
  * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
  * This is good to prevent injecting the service as constructor parameter.
  */
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
