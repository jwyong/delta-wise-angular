import { EquitiesComponent } from './components/home/equities/equities.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterConstants } from './utils/router-constants';
import { HomeComponent } from './components/home/home/home.component';

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
      // show dashboard by default
      { path: '', redirectTo: RouterConstants.ROUTER_PATH_DASHBOARD, pathMatch: 'full' },
      {
        path: RouterConstants.ROUTER_PATH_DASHBOARD,
        component: EquitiesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
