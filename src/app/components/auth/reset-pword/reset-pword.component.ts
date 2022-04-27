import { EWStrings } from './../../../utils/ew_strings';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BaseAuthComponent } from './../base-auth/base-auth.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew_constants';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterConstants } from 'src/app/utils/router_constants';

@Component({
  selector: 'app-reset-pword',
  templateUrl: './reset-pword.component.html',
  styleUrls: ['./reset-pword.component.css']
})
export class ResetPwordComponent extends BaseAuthComponent implements OnInit {
  // tooltip for pword validation
  @ViewChild('pwordTooltip') pwordTooltip!: MatTooltip;
  pwordTooltipPositionFC = new FormControl("below")

  // validation
  pwordPatternLength = Validators.minLength(8)
  pwordPatternChars = Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')

  newPwordFC = new FormControl('', [Validators.required, this.pwordPatternLength, this.pwordPatternChars]);

  // confirm pword
  pwordMatchVld: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPword');
    const confirmPassword = control.get('confirmPword');

    // required
    let confirmPword = confirmPassword?.value ?? ''
    if (confirmPword.length == 0)
      confirmPassword?.setErrors({
        required: true
      })
    else
      // match
      if (confirmPword != password?.value)
        confirmPassword?.setErrors({
          notmatched: true
        })

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };
  confirmPwordFC = new FormControl('', [Validators.required]);

  // form
  formGrp: FormGroup = new FormGroup({});
  override ngOnInit(): void {
    this.formGrp = new FormGroup({
      newPword: this.newPwordFC,
      confirmPword: this.confirmPwordFC
    }, this.pwordMatchVld);
  }

  getNewPwordErrorMsg() {
    // required
    if (this.newPwordFC.hasError(EWConstants.KEY_REQUIRED))
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`

    // length
    if (this.newPwordFC.value.length < 8)
      return $localize`:@@vld_invalid_pword_length:${EWStrings.VAL_INVALID_PWORD_LENGTH}`

    // characters - show error
    return $localize`:@@vld_invalid_pword_chars:${EWStrings.VAL_INVALID_PWORD_CHARS}`
  }

  getConfirmPwordErrorMsg() {
    // required
    if (this.confirmPwordFC.hasError(EWConstants.KEY_REQUIRED)) {
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`
    }

    // doesn't match new pword
    if (this.confirmPwordFC.value != this.newPwordFC.value)
      return $localize`:@@vld_pword_diff:${EWStrings.VAL_INVALID_PWORD_DIFF}`
    else return ''
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
    return $localize`:@@vld_pword_rule:${EWStrings.VAL_PWORD_RULE}`
  }
  // isPwordValid(pword: string): boolean {
  //   if (pword.length < 8) return false

  //   if (pword.)
  // }

  // reset form submitted - go back to login page
  resetPwordOnSubmit() {
    if (this.formGrp.invalid) return

    this.setIsLoading(true)

    // TODO: TEMP - go to login page after delay
    setTimeout(() => {
      this.setIsLoading(false)

      alert($localize`:@@vld_pword_update_success:${EWStrings.VAL_PWORD_UPDATE_SUCCESS}`)
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
    }, 2000);
  }
}
