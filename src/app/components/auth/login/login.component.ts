import { RouterConstants } from './../../../utils/router_constants';
import { BaseAuthComponent } from './../base-auth/base-auth.component';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EWConstants } from 'src/app/utils/ew_constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseAuthComponent {
  forgotPwordPath = `/${RouterConstants.ROUTER_PATH_FORGOT_PWORD}`

  // pword validator
  pword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  getPwordErrorMsg() {
    if (this.pword.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWConstants.VAL_REQUIRED}`
    }

    return this.pword.value.length < 8 ? $localize`:@@vld_invalid_pword:${EWConstants.VAL_INVALID_PWORD}` : '';
  }

  // login - go to dashboard
  loginFormOnSubmit() {
    if (this.email.invalid || this.pword.invalid) return

    // call login api - TODO: TEMP - show loading for 2 secs, then go dashboard page
    this.setIsLoading(true)

    setTimeout(() => {
      // this.navigateTo(RouterConstants.ROUTER_PATH_FORGOT_PWORD)
      this.setIsLoading(false)

      this.showSnackbar(`email = ${this.email.value}, pword = ${this.pword.value}`)
    }, 2000);
  }
}