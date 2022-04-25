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

  /**
   * logged in
   */
  //  {
  //   path: RouterConstants.ROUTER_PATH_FORGOT_PWORD,
  //   component: ForgotPwordComponent,
  //   data: { title: 'Forgot password' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
