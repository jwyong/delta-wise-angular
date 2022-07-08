import { CommonServices } from './services/common-services';
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
import { DateRangePickerComponent } from './components/common/date-range-picker/date-range-picker.component';
import { EstimateDialogComponent } from './components/common/estimate-dialog/estimate-dialog.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SearchBarComponent } from './components/common/search-bar/search-bar.component';
import { NewWatchlistComponent } from './components/common/watchlist/new-watchlist/new-watchlist.component';
import { WatchlistComponent } from './components/common/watchlist/watchlist.component';
import { CryptoComponent } from './components/home/crypto/crypto.component';
import { EquitiesComponent } from './components/home/equities/equities.component';
import { EquityDetailsComponent } from './components/home/equities/equity-details/equity-details.component';
import { HomeComponent } from './components/home/home/home.component';
import { MaterialModule } from './modules/material.module';
import { HeaderInterceptor } from './services/header-interceptor';
import { BaseModuleComponent } from './components/home/base-home/base-home.component';
import { CommoditiesComponent } from './components/home/commodities/commodities.component';
import { BaseDashboardComponent } from './components/home/base-dashboard/base-dashboard.component';
import { RecentSearchComponent } from './components/common/recent-search/recent-search.component';
import { CommodityDetailsComponent } from './components/home/commodities/commodity-details/commodity-details.component';
import { EstTableSingleComponent } from './components/common/est-table-single/est-table-single.component';
import { CryptoDetailsComponent } from './components/home/crypto/crypto-details/crypto-details.component';
import { CommodityDashboardComponent } from './components/home/commodities/commodity-dashboard/commodity-dashboard.component';
import { EquityDashboardComponent } from './components/home/equities/equity-dashboard/equity-dashboard.component';
import { CryptoDashboardComponent } from './components/home/crypto/crypto-dashboard/crypto-dashboard.component';
import { DashTableComponent } from './components/common/dash-table/dash-table.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { AuthComponent } from './components/auth/auth/auth.component';
import { RequestAddDialogComponent } from './components/common/search-bar/request-add-dialog/request-add-dialog.component';
import { PhEstTableSingleComponent } from './components/common/placeholders/ets-placeholder/ph-est-table-single.component';
import { PhListComponent } from './components/common/placeholders/ph-list/ph-list.component';
import { PhEstTableEqtComponent } from './components/common/placeholders/ph-est-table-eqt/ph-est-table-eqt.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, ForgotPwordComponent, BaseComponent, BaseAuthComponent, ResetPwordComponent, EquitiesComponent,
    HomeComponent, SearchBarComponent, CryptoComponent, EquityDetailsComponent, DateRangePickerComponent, EstimateDialogComponent,
    WatchlistComponent, FooterComponent, NewWatchlistComponent, BaseModuleComponent, CommoditiesComponent, BaseDashboardComponent,
    RecentSearchComponent, CommodityDetailsComponent, EstTableSingleComponent, CryptoDetailsComponent, CommodityDashboardComponent, 
    EquityDashboardComponent, CryptoDashboardComponent, DashTableComponent, AuthComponent, RequestAddDialogComponent, PhEstTableSingleComponent, PhListComponent, PhEstTableEqtComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // flex layout for responsive home toolbar
    FlexModule,
    FlexLayoutModule
  ],
  providers: [
    DataService,
    LocalStorageService,
    HttpService,
    CommonServices,
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
