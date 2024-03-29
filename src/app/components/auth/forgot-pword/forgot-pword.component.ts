import { COMMON_STR } from 'src/app/constants/common-strings';
import { Component, OnInit } from '@angular/core';
import { RouterConstants } from '../../../utils/router-constants';
import { BaseAuthComponent } from './../base-auth/base-auth.component';

@Component({
  selector: 'app-forgot-pword',
  templateUrl: './forgot-pword.component.html',
  styleUrls: ['./forgot-pword.component.css']
})
export class ForgotPwordComponent extends BaseAuthComponent implements OnInit {
  // forgot pword - call api and go back to login page
  async forgotPwordFormOnSubmit() {
    if (this.emailFC.invalid) return

    // call forgotPword api
    // TODO: temp - show loading for 2 secs
    this.setIsLoading(true)

    setTimeout(() => {
      this.setIsLoading(false)

      // show alert
      alert($localize`:@@vld_forgot_pword_success:We have sent an email with a password reset link to ${this.emailFC.value}. Please check your email to reset your password.`)

      // go back to login page after alert dismissed 
      // this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)

      // TODO: TEMP - go to reset pword instead
      this.navigateTo(RouterConstants.ROUTER_PATH_RESET_PWORD)

    }, 2000);
  }

  /**
   * UI binding
   */
   backToLoginPath = `/${RouterConstants.ROUTER_PATH_LOGIN}`
}
