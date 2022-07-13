import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { LocalStorageService } from 'src/app/services/local-storage-service';
import { RouterConstants } from '../../../utils/router-constants';
import { LoginResp } from './../../../models/auth/login-resp';
import { HttpConstants } from './../../../utils/http-constants';
import { BaseAuthComponent } from './../base-auth/base-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseAuthComponent {
  // DI
  private formBuilder: FormBuilder = AppModule.injector.get(FormBuilder);

  // router path
  forgotPwordPath = `/${RouterConstants.ROUTER_PATH_FORGOT_PWORD}`

  // pword validator
  passwordFC = new FormControl('', [Validators.required, Validators.minLength(8)]);
  getPwordErrorMsg() {
    if (this.passwordFC.hasError(VALIDATION_STR.keys.required)) {
      return VALIDATION_STR.validation.required
    }

    return this.passwordFC.value.length < 8 ? VALIDATION_STR.validation.pword.length: '';
  }
  shouldShowPword = false

  // login form
  loginForm = this.formBuilder.group({
    email: this.emailFC,
    password: this.passwordFC
  });

  // login - go to home
  async loginFormOnSubmit() {
    if (this.loginForm.invalid) return

    this.setIsLoading(true)

    // call login api
    let result = await this.httpPost<LoginResp>(HttpConstants.API_AUTH_LOGIN, this.loginForm.value)

    this.setIsLoading(false)

    // check success status and update jwt + navigate to home
    if (result.status) {
      // set jwtToken + username
      this.localStorageService.setJwtToken(result.data?.token)
      localStorage.setItem(LocalStorageService.LS_USER_NAME, result.data?.name ?? "")

      this.navigateTo(RouterConstants.ROUTER_PATH_HOME)
    }
  }
}