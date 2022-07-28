import { ProfileComponent } from './components/home/settings/profile/profile.component';
import { ChangePwordComponent } from './components/home/settings/change-pword/change-pword.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { CommoditiesComponent } from './components/home/commodities/commodities.component';
import { CommodityDashboardComponent } from './components/home/commodities/commodity-dashboard/commodity-dashboard.component';
import { CommodityDetailsComponent } from './components/home/commodities/commodity-details/commodity-details.component';
import { CryptoDashboardComponent } from './components/home/crypto/crypto-dashboard/crypto-dashboard.component';
import { CryptoDetailsComponent } from './components/home/crypto/crypto-details/crypto-details.component';
import { CryptoComponent } from './components/home/crypto/crypto.component';
import { EquitiesComponent } from './components/home/equities/equities.component';
import { EquityDashboardComponent } from './components/home/equities/equity-dashboard/equity-dashboard.component';
import { EquityDetailsComponent } from './components/home/equities/equity-details/equity-details.component';
import { HomeComponent } from './components/home/home/home.component';
import { COMMON_STR } from './constants/common-strings';
import { EnumModules } from './constants/enum/enum-modules';
import { RouterConstants } from './utils/router-constants';

const routes: Routes = [
  /**
   * auth - login, forgot pword, reset pword
   */
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: RouterConstants.ROUTER_PATH_LOGIN,
        component: LoginComponent,
        data: { module: EnumModules.login },
      },
      {
        path: RouterConstants.ROUTER_PATH_FORGOT_PWORD,
        component: ForgotPwordComponent,
        data: { module: EnumModules.forgotPword },
      },
      {
        path: RouterConstants.ROUTER_PATH_RESET_PWORD,
        component: ResetPwordComponent,
        data: { module: EnumModules.resetPword },
      },
    ]
  },

  /**
   * logged in
   */
  {
    path: RouterConstants.ROUTER_PATH_HOME,
    component: HomeComponent,
    children: [
      // TODO: need to check user sub (BE) - TEMP show equities by default
      { path: '', redirectTo: RouterConstants.ROUTER_PATH_EQUITIES, pathMatch: 'full' },

      // settings
      {
        path: RouterConstants.ROUTER_PATH_SETTINGS,
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: RouterConstants.ROUTER_PATH_UESR_PROFILE, pathMatch: 'full' },
          {
            path: RouterConstants.ROUTER_PATH_UESR_PROFILE,
            component: ProfileComponent,
          },
          {
            path: RouterConstants.ROUTER_PATH_CHANGE_PWORD,
            component: ChangePwordComponent,
          },
        ]
      },

      // equities
      {
        path: RouterConstants.ROUTER_PATH_EQUITIES,
        component: EquitiesComponent,
        data: { module: EnumModules.equities },
        children: [
          {
            path: '',
            component: EquityDashboardComponent,
          },
          {
            path: `${RouterConstants.ROUTER_PATH_DETAILS}/:ticker`,
            component: EquityDetailsComponent,
            data: { subTitle: COMMON_STR.details },
          },
        ]
      },

      // commodities
      {
        path: RouterConstants.ROUTER_PATH_COMMODITIES,
        component: CommoditiesComponent,
        data: { module: EnumModules.commodities },
        children: [
          {
            path: '',
            component: CommodityDashboardComponent,
          },
          {
            path: `${RouterConstants.ROUTER_PATH_DETAILS}/:id`,
            component: CommodityDetailsComponent,
            data: { subTitle: COMMON_STR.details },
          },
        ]
      },

      // crypto
      {
        path: RouterConstants.ROUTER_PATH_CRYPTO,
        component: CryptoComponent,
        data: { module: EnumModules.crypto },
        children: [
          {
            path: '',
            component: CryptoDashboardComponent,
          },
          {
            path: `${RouterConstants.ROUTER_PATH_DETAILS}/:id`,
            component: CryptoDetailsComponent,
            data: { subTitle: COMMON_STR.details },
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
