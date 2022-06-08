import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { CompanyEstimate } from './../../../models/equities/company-estimate';
import { HttpService } from './../../../services/http-service';
import { DateTimeUtil } from './../../../utils/date-time';

@Component({
  selector: 'app-estimate-dialog',
  templateUrl: './estimate-dialog.component.html',
  styleUrls: ['./estimate-dialog.component.css']
})
export class EstimateDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EstimateDialogData,
    protected formBuilder: FormBuilder,
    protected httpService: HttpService
  ) { }

  companyEstimate?: CompanyEstimate

  // loading ux for this dialog
  isLoadingDialog = false
  setIsLoadingDialog(value: boolean) {
    this.isLoadingDialog = value
  }

  // date range picker related
  selectedDateRangeBS = new BehaviorSubject(this.data.sdr.value)
  get selectedDateRange() {
    return this.selectedDateRangeBS.value
  }

  set selectedDateRange(value) {
    this.selectedDateRangeBS.next(value)
  }

  onDateRangeSelected(newDr: number) {
    this.selectedDateRangeBS.next(newDr)

    // make api call to update no. of contributors/etc
    this.getUserEstimate()
  }

  ngOnInit(): void {
    // make api call to get user estimates
    this.getUserEstimate()
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

  // get user's estimates from server
  async getUserEstimate() {
    this.setIsLoadingDialog(true)

    let result = await this.httpService.httpPost<CompanyEstimate>(HttpConstants.API_EQUITIES_USER_ESTIMATE, {
      date_range: this.selectedDateRange, ticker: this.data.ticker,
      time_frame: this.data.timeFrame, type: this.data.rowType
    })

    this.setIsLoadingDialog(false)

    if (result.status) {
      this.companyEstimate = result.data
    }
  }

  // submit form - call api to update user's estimate to server
  async formOnSubmit() {
    if (this.estimateFC.invalid) return

    let estimate = Number(this.estimateFC.value)

    if (estimate == NaN) return

    this.setIsLoadingDialog(true)

    let result = await this.httpService.httpPost(HttpConstants.API_EQUITIES_INSERT, {
      date_range: this.selectedDateRange, estimate: estimate, ticker: this.data.ticker,
      time_frame: this.data.timeFrame, type: this.data.rowType
    })

    this.setIsLoadingDialog(false)

    if (result.status)
      // make getEsti call once user updated estimate
      this.getUserEstimate()
  }

  /**
   * ui
   */
  // get current estimate value
  getCurrentEstimate() {
    if (this.companyEstimate?.estimate != 0)
      return this.companyEstimate?.estimate
    else
      return ""
  }

  getLastEstimateDateTime() {
    return DateTimeUtil.getDateAsAgo(this.companyEstimate?.last_update_at)
  }

  // No. of contributors: 1-5, 6-10, 11-15, 16-20, >20
  getNumberOfContStr() {
    let contributorCount = this.companyEstimate?.no_of_contributors ?? 0

    switch (true) {
      case (contributorCount > 20):
        return ">20"

      case (contributorCount > 15):
        return "16-20"

      case (contributorCount > 10):
        return "11-15"

      case (contributorCount > 5):
        return "6-10"

      default:
        return "1-5"
    }
  }

  // estimate %diff: Your estimate is 5.0% lower/higher compared to the median
  getMedianPercentDiffStr() {
    const medianPercentDiff = this.companyEstimate?.percentage_diff ?? 0
    var str = Math.abs(medianPercentDiff) + '% '

    if (medianPercentDiff > 0)
      str = str + $localize`:@@higher:${EWStrings.VAL_HIGHER}`
    else
      str = str + $localize`:@@lower:${EWStrings.VAL_LOWER}`

    return str
  }

  getInputTrialStr() {
    return this.companyEstimate?.remaining_attempt ?? 0
  }

  /**
   * submit btn disabled when:
   * - no more remaining attempts && record exists
   * - nothing inputted/changed
   */
  isSubmitBtnDisabled() {
    if (this.companyEstimate?.record_exists && this.companyEstimate.remaining_attempt == 0)
      // record exists and no more remaining attempts - just disable
      return false

    // all others - just check input
    return this.estimateFC.value.length == 0
  }
}

export interface EstimateDialogData {
  title: string,
  sdr: BehaviorSubject<number>,
  ticker: string,

  // row/col passed from main table
  timeFrame: string, // e.g. "FY_2022"
  rowType: string, // e.g. "revenue"
}