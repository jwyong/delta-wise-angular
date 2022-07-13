import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { RouterConstants } from 'src/app/utils/router-constants';
import { AUTH_STR } from '../../../constants/auth-strings';
import { BaseAuthComponent } from './../base-auth/base-auth.component';

@Component({
  selector: 'app-reset-pword',
  templateUrl: './reset-pword.component.html',
  styleUrls: ['./reset-pword.component.css']
})
export class ResetPwordComponent extends BaseAuthComponent implements OnInit {
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
    if (this.newPwordFC.hasError(VALIDATION_STR.keys.required))
      return VALIDATION_STR.validation.required

    // length
    if (this.newPwordFC.value.length < 8)
      return VALIDATION_STR.validation.pword.length

    // characters - show error
    return VALIDATION_STR.validation.pword.chars
  }

  getConfirmPwordErrorMsg() {
    // required
    if (this.confirmPwordFC.hasError(VALIDATION_STR.keys.required)) {
      return VALIDATION_STR.validation.required
    }

    // doesn't match new pword
    if (this.confirmPwordFC.value != this.newPwordFC.value)
      return VALIDATION_STR.validation.pword.match
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
  // reset form submitted - go back to login page
  resetPwordOnSubmit() {
    if (this.formGrp.invalid) return

    this.setIsLoading(true)

    // TODO: TEMP - go to login page after delay
    setTimeout(() => {
      this.setIsLoading(false)

      alert(AUTH_STR.change_pword.success)
      this.navigateTo(RouterConstants.ROUTER_PATH_LOGIN)
    }, 2000);
  }
}
