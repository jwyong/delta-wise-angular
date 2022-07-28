import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPwordComponent } from 'src/app/components/auth/reset-pword/reset-pword.component';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';

@Component({
  selector: 'app-change-pword',
  templateUrl: './change-pword.component.html',
  styleUrls: ['./change-pword.component.scss']
})
export class ChangePwordComponent extends ResetPwordComponent implements OnInit {
  changePwordFormGrp: FormGroup = new FormGroup({});

  // current pword - required, min length
  currentPwordFC = new FormControl('', [Validators.required, this.pwordPatternLength]);

  override ngOnInit(): void {
    this.changePwordFormGrp = new FormGroup({
      currentPword: this.currentPwordFC,
      newPword: this.newPwordFC,
      confirmPword: this.confirmPwordFC
    }, this.pwordMatchVld);
  }

  getCurrentPwordErrorMsg(formControl: FormControl) {
    // required
    if (formControl.hasError(VALIDATION_STR.keys.required))
      return VALIDATION_STR.validation.required

    // length
    if (formControl.value.length < 8)
      return VALIDATION_STR.validation.pword.length

    return ""
  }

  changePwordOnSubmit() {
    if (this.changePwordFormGrp.invalid) return

    this.showSnackbar("changePwordOnSubmit")
  }
}
