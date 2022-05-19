import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';

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
  // redirect to home if user already logged in
  override ngOnInit(): void {
    this.redirectJwtValid()
  }

  // email validator
  emailFC = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMsg() {
    if (this.emailFC.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    return this.emailFC.hasError('email') ? $localize`:@@vld_invalid_email:${EWStrings.VAL_INVALID_EMAIL}` : '';
  }
}
