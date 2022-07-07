import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnumModules, EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-request-add-dialog',
  templateUrl: './request-add-dialog.component.html',
  styleUrls: ['./request-add-dialog.component.scss']
})
export class RequestAddDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RequestAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestAddDialogData,
  ) { }

  isLoadingDialog = false

  nameFC = new FormControl('', [Validators.required]);
  requestAddForm = this.formBuilder.group({
    name: this.nameFC
  });

  ngOnInit(): void {
  }

  /**
   * ui databinding
   */
  // "Request new company" based on module
  getDialogTitle() {
    switch (this.data.module) {
      case EnumModules.equities:
        return EWStrings.addNew(EWStrings.VAL_COMPANY)

      case EnumModules.commodities:
        return EWStrings.addNew(EWStrings.VAL_COMMODITY)

      case EnumModules.crypto:
        return EWStrings.addNew(EWStrings.VAL_CRYPTO)

      default: return ""
    }
  }

  // "Company name"
  getInputLabel() {
    switch (this.data.module) {
      case EnumModules.equities:
        return EWStrings.VAL_COMP_NAME

      case EnumModules.commodities:
        return EWStrings.VAL_COMMO_NAME

      case EnumModules.crypto:
        return EWStrings.VAL_CRYPTO_NAME

      default: return ''
    }
  }

  // validation
  getNameErrorMsg() {
    // required
    if (this.nameFC.hasError(EWConstants.KEY_REQUIRED))
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`

    return ""
  }

  // form submit - send to api and close dialog
  onSubmit() {
    if (this.requestAddForm.invalid) return

    this.dialogRef.close(this.requestAddForm.value);
  }

}

export interface RequestAddDialogData {
  module: EnumModules,
}