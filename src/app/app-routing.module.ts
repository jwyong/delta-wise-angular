import { EquityDetailsComponent } from './components/home/equities/equity-details/equity-details.component';
import { CryptoComponent } from './components/home/crypto/crypto.component';
import { EquitiesComponent } from './components/home/equities/equities.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterConstants } from './utils/router-constants';
import { HomeComponent } from './components/home/home/home.component';
import { EWStrings } from './utils/ew-strings';

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
        data: { title: $localize`:@@equities:${EWStrings.VAL_EQUITIES}` },
        children: [
          // TODO: add watchlist module?
          
          {
            path: `${RouterConstants.ROUTER_PATH_DETAILS}/:id`,
            component: EquityDetailsComponent,
            data: { subTitle: $localize`:@@details:${EWStrings.VAL_DETAILS}` },
          },
        ]
      },

      // crypto
      {
        path: RouterConstants.ROUTER_PATH_CRYPTO,
        component: CryptoComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
