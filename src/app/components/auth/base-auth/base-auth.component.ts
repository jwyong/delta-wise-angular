import { EWConstants } from 'src/app/utils/ew_constants';
import { FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew_strings';

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
  // email validator
  email = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMsg() {
    if (this.email.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    return this.email.hasError('email') ? $localize`:@@vld_invalid_email:${EWStrings.VAL_INVALID_EMAIL}` : '';
  }
}
