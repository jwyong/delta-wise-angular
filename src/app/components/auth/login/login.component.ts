import { LocalStorageService } from 'src/app/services/local-storage-service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from '../../../utils/ew-strings';
import { RouterConstants } from '../../../utils/router-constants';
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
    if (this.passwordFC.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    return this.passwordFC.value.length < 8 ? $localize`:@@vld_invalid_pword:${EWStrings.VAL_INVALID_PWORD_LENGTH}` : '';
  }

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
    let result = await this.httpPost(HttpConstants.API_AUTH_LOGIN, this.loginForm.value)

    console.log("login result = ", result)

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