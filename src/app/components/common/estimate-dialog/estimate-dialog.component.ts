import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit, EventEmitter } from '@angular/core';
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
  
  // date range picker related
  selectedDateRangeEE = new EventEmitter()
  onDateRangeSelected(newDr: number) {
    this.selectedDateRangeEE.emit(newDr)

    // make api call to update no. of contributors/etc
    console.log("onDateRangeSelected, newDr = ", newDr)
  }

  // ui
  // TODO: combine to object based on server resp
  lastEstimateDate: string = "server_time_stamp"
  contributorCount: number = 3
  medianPercentDiff: number = -17.23
  inputTrialsRemaining: number = 3

  ngOnInit(): void {
  }

  // input estimate form
  estimateFC = new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]);
  inputEstimateForm = this.formBuilder.group({
    estimate: this.estimateFC
  });

  // validation
  getEstimateErrorMsg() {
    // required
    if (this.estimateFC.hasError(EWConstants.KEY_REQUIRED))
      return $localize`:@@vld_required:${EWStrings.VAL_REQUIRED}`

    // not a number
    if (this.estimateFC.hasError(EWConstants.KEY_PATTERN))
      return $localize`:@@vld_nan:${EWStrings.VAL_NUMBER}`

    return ""
  }

  /**
   * ui
   */
  // No. of contributors: 1-5, 6-10, 11-15, 16-20, >20
  getNumberOfContStr() {
    switch (true) {
      case (this.contributorCount > 20):
        return ">20"

      case (this.contributorCount > 15):
        return "16-20"

      case (this.contributorCount > 10):
        return "11-15"

      case (this.contributorCount > 5):
        return "6-10"

      default:
        return "1-5"
    }
  }

  // estimate %diff: Your estimate is 5.0% lower/higher compared to the median
  getMedianPercentDiffStr() {
    var str = Math.abs(this.medianPercentDiff) + '% '

    if (this.medianPercentDiff > 0)
      str = str + $localize`:@@higher:${EWStrings.VAL_HIGHER}`
    else
      str = str + $localize`:@@lower:${EWStrings.VAL_LOWER}`

    return str
  }
}

export interface EstimateDialogData {
  title: string,
  sdr: BehaviorSubject<number>
}