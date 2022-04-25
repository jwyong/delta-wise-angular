import { EWStrings } from './../../../utils/ew_strings';
import { FormControl, Validators } from '@angular/forms';
import { BaseAuthComponent } from './../base-auth/base-auth.component';
import { Component, OnInit } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew_constants';

@Component({
  selector: 'app-reset-pword',
  templateUrl: './reset-pword.component.html',
  styleUrls: ['./reset-pword.component.css']
})
export class ResetPwordComponent extends BaseAuthComponent implements OnInit {
  // validation
  pwordPattern = Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  newPwordFC = new FormControl('', [Validators.required, this.pwordPattern]);
  confirmPwordFC = new FormControl('', [Validators.required, this.pwordPattern]);

  getNewPwordErrorMsg() {
    if (this.newPwordFC.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    // TODO: need to do proper pword validation
    return this.newPwordFC.value.length < 8 ? $localize`:@@vld_invalid_pword:${EWStrings.VAL_INVALID_PWORD}` : '';
  }

  getConfirmPwordErrorMsg() {
    if (this.confirmPwordFC.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    // TODO: need to do proper pword validation
    return this.confirmPwordFC.value.length < 8 ? $localize`:@@vld_invalid_pword:${EWStrings.VAL_INVALID_PWORD}` : '';
  }

  /**
   * pword creation validation:
   * - more than 8 chars
   * - 1 uppercase
   * - 1 lowercase
   * - 1 number
   * - 1 symbol
   */
  getPwordTooltipText() {
    return `Your new password must be at least 8 characters and contain at least:
           1 upper case
            &#8226;1 lower case
            &#8226;1 number case
            &#8226;1 symbol case`
  }
  // isPwordValid(pword: string): boolean {
  //   if (pword.length < 8) return false

  //   if (pword.)
  // }

  // reset form submitted - go back to login page
  resetPwordOnSubmit() {

  }
}
