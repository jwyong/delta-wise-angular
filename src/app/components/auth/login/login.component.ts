import { EWStrings } from './../../../utils/ew_strings';
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
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    return this.pword.value.length < 8 ? $localize`:@@vld_invalid_pword:${EWStrings.VAL_INVALID_PWORD_LENGTH}` : '';
  }

  // login - go to dashboard
  loginFormOnSubmit() {
    if (this.email.invalid || this.pword.invalid) return

    // call login api - TODO: TEMP - show loading for 2 secs, then go dashboard page
    this.setIsLoading(true)

    setTimeout(() => {
      this.setIsLoading(false)

      this.showSnackbar(`email = ${this.email.value}, pword = ${this.pword.value}`)

      this.navigateTo(RouterConstants.ROUTER_PATH_DASHBOARD)
    }, 1000);
  }
}