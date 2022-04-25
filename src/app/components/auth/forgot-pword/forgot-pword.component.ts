import { RouterConstants } from './../../../utils/router_constants';
import { BaseAuthComponent } from './../base-auth/base-auth.component';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-forgot-pword',
  templateUrl: './forgot-pword.component.html',
  styleUrls: ['./forgot-pword.component.css']
})
export class ForgotPwordComponent extends BaseAuthComponent implements OnInit {
  backToLoginPath = `/${RouterConstants.ROUTER_PATH_LOGIN}`

  // forgot pword - call api and go back to login page
  async forgotPwordFormOnSubmit() {
    if (this.email.invalid) return

    // call forgotPword api
    // TODO: temp - show loading for 2 secs
    this.setIsLoading(true)

    setTimeout(() => {
      // show snackbar
      this.showSnackbar(`reset email = ${this.email.value}`)

      this.setIsLoading(false)

      // go to resetPword page
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
    }, 2000);
  }
}
