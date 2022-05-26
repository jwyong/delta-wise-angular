import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-estimate-dialog',
  templateUrl: './estimate-dialog.component.html',
  styleUrls: ['./estimate-dialog.component.css']
})
export class EstimateDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EstimateDialogData,
    protected formBuilder: FormBuilder
  ) { }

  inputTrialsRemaining: number = 3
  ngOnInit(): void {
  }

  // input estimate form
  estimateFC = new FormControl('', [Validators.required, Validators.pattern('^([1-9]+[0-9]* | [1-9])$')]);
  inputEstimateForm = this.formBuilder.group({
    estimate: this.estimateFC
  });

  // validation
  getEstimateErrorMsg() {
    console.log(this.estimateFC.errors)

    // required
    if (this.estimateFC.hasError(EWConstants.KEY_REQUIRED))
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`

    // not a number
    if (this.estimateFC.hasError(EWConstants.KEY_PATTERN))
      return $localize`:@@vld_nan:${EWStrings.VAL_NUMBER}`

    return ""
  }
}

export interface EstimateDialogData {
  title: string
}
