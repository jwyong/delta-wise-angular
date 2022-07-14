import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AUTH_STR } from 'src/app/constants/auth-strings';
import { VALIDATION_STR } from '../../../constants/validation-strings';

@Component({
  selector: 'app-base-auth',
  templateUrl: './base-auth.component.html',
  styleUrls: ['./base-auth.component.css']
})

/**
 * base component for auth (pre-login)
 * - mostly for shared validation funcs
 */
export class BaseAuthComponent extends BaseComponent implements OnInit {
  // auth strings
  authStr = AUTH_STR
  
  // email validator
  emailFC = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMsg() {
    if (this.emailFC.hasError(VALIDATION_STR.keys.required)) {
      return VALIDATION_STR.validation.required
    }

    return this.emailFC.hasError(VALIDATION_STR.keys.email) ? VALIDATION_STR.validation.email : '';
  }
}
