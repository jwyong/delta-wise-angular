import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EWConstants } from 'src/app/utils/ew-constants';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { CommoditiesComponent } from './components/home/commodities/commodities.component';
import { CryptoComponent } from './components/home/crypto/crypto.component';
import { EquitiesComponent } from './components/home/equities/equities.component';
import { EquityDetailsComponent } from './components/home/equities/equity-details/equity-details.component';
import { HomeComponent } from './components/home/home/home.component';
import { MainComponent } from './components/home/main/main.component';
import { EWStrings } from './utils/ew-strings';
import { RouterConstants } from './utils/router-constants';

const routes: Routes = [
  /**
   * auth - login, forgot pword, reset pword
   */
  {
    path: RouterConstants.ROUTER_PATH_LOGIN,
    component: LoginComponent,
  },
  {
    path: RouterConstants.ROUTER_PATH_FORGOT_PWORD,
    component: ForgotPwordComponent,
  },
  {
    path: RouterConstants.ROUTER_PATH_RESET_PWORD,
    component: ResetPwordComponent,
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

      // equities
      {
        path: RouterConstants.ROUTER_PATH_EQUITIES,
        component: EquitiesComponent,
        data: { title: EWStrings.VAL_EQUITIES },
        children: [
          {
            path: '',
            component: MainComponent,
            data: { module: EWConstants.KEY_MODULE_EQUITIES },
          },
          {
            path: `${RouterConstants.ROUTER_PATH_DETAILS}/:ticker`,
            component: EquityDetailsComponent,
            data: { subTitle: EWStrings.VAL_DETAILS },
          },
        ]
      },

      // commodities
      {
        path: RouterConstants.ROUTER_PATH_COMMODITIES,
        component: CommoditiesComponent,
        data: { title: EWStrings.VAL_COMMODITIES },
        children: [
          {
            path: '',
            component: MainComponent,
            data: { module: EWConstants.KEY_MODULE_COMMODITIES },
          },
          // {
          //   path: `${RouterConstants.ROUTER_PATH_DETAILS}/:ticker`,
          //   component: EquityDetailsComponent,
          //   data: { subTitle: EWStrings.VAL_DETAILS },
          // },
        ]
      },

      // crypto
      {
        path: RouterConstants.ROUTER_PATH_CRYPTO,
        component: CryptoComponent,
        data: { title: EWStrings.VAL_CRYPTOS },
        children: [
          {
            path: '',
            component: MainComponent,
            data: { module: EWConstants.KEY_MODULE_CRYPTO },
          },
          // {
          //   path: `${RouterConstants.ROUTER_PATH_DETAILS}/:ticker`,
          //   component: EquityDetailsComponent,
          //   data: { subTitle: EWStrings.VAL_DETAILS },
          // },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
