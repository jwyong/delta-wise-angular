import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { ResetPwordComponent } from './components/auth/reset-pword/reset-pword.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPwordComponent } from './components/auth/forgot-pword/forgot-pword.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterConstants } from './utils/router_constants';

const routes: Routes = [
  /**
   * auth - login, forgot pword, reset pword
   */
  {
    path: RouterConstants.ROUTER_PATH_LOGIN,
    component: LoginComponent,
    // data: { title: 'Login to EdgeWise' },
  },
  {
    path: RouterConstants.ROUTER_PATH_FORGOT_PWORD,
    component: ForgotPwordComponent,
    data: { title: 'Forgot password' },
  },
  {
    path: RouterConstants.ROUTER_PATH_RESET_PWORD,
    component: ResetPwordComponent,
    data: { title: 'Reset password' },
  },

  /**
   * logged in
   */
   {
    path: RouterConstants.ROUTER_PATH_DASHBOARD,
    component: DashboardComponent,
    data: { title: 'Dashboard' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
