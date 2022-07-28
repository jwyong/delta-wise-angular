import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonStrDyn } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { COMMON_STR } from '../../../../constants/common-strings';
import { COMMODITY_STR } from '../../../../constants/modules/commodity-strings';
import { CRYPTO_STR } from '../../../../constants/modules/crypto-strings';
import { EQT_STR } from '../../../../constants/modules/equities-strings';

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
  confStr = COMMON_STR.confirmation

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
    var moduleName: string
    switch (this.data.module) {
      case EnumModules.equities:
        moduleName = EQT_STR.company.singular
        break

      case EnumModules.commodities:
        moduleName = COMMODITY_STR.commodity.singular
        break

      case EnumModules.crypto:
        moduleName = CRYPTO_STR.crypto.singular
        break

      default:
        moduleName = ""
        break
    }

    return CommonStrDyn.addNew(moduleName)
  }

  // "Company name"
  getInputLabel() {
    switch (this.data.module) {
      case EnumModules.equities: return COMMON_STR.request_add.input_label.equity

      case EnumModules.commodities: return COMMON_STR.request_add.input_label.commodity

      case EnumModules.crypto: return COMMON_STR.request_add.input_label.crypto

      default: return ''
    }
  }

  // validation
  getNameErrorMsg(formControl: FormControl) {
    // required
    if (formControl.hasError(VALIDATION_STR.keys.required))
      return VALIDATION_STR.validation.required

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