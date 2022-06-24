import { EnumModules } from './../../../utils/ew-constants';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { CompanyEstimate } from './../../../models/equities/company-estimate';
import { CommonServices } from './../../../services/common-services';
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
    protected commonServices: CommonServices,
  ) { }

  // company estimate obj
  companyEstimate?: CompanyEstimate

  // ee bool for refreshing details page
  didSubmitEstimateEE = new EventEmitter(false)

  ngOnInit(): void {
    // make api call to get user estimates
    this.getUserEstimate()
  }

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

  // input estimate form
  estimateFC = new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]);
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

    let result = await this.commonServices.httpService.httpPost<CompanyEstimate>(HttpConstants.API_EQUITIES_USER_ESTIMATE, {
      date_range: this.selectedDateRange, ticker: this.data.id,
      time_frame: this.data.colName, type: this.data.rowName
    })

    this.setIsLoadingDialog(false)

    if (result.status) {
      this.companyEstimate = result.data

      // update estimateFC if record already exists
      if (this.companyEstimate?.record_exist)
        this.estimateFC.setValue(this.companyEstimate?.estimate)
    }
  }

  // submit form - call api to update user's estimate to server
  async formOnSubmit() {
    if (this.estimateFC.invalid) return

    // convert form string to number
    let estimate = Number(this.estimateFC.value)
    if (estimate == NaN) return

    this.setIsLoadingDialog(true)

    let result = await this.commonServices.httpService.httpPost(HttpConstants.API_EQUITIES_INSERT, {
      date_range: this.selectedDateRange, estimate: estimate, ticker: this.data.id,
      time_frame: this.data.colName, type: this.data.rowName
    })

    this.setIsLoadingDialog(false)

    if (result.status) {
      this.commonServices.showSnackbar(EWStrings.estimateUpdated(""))

      // set submit bool to true for refreshing details page
      this.didSubmitEstimateEE.emit(true)

      // make getEsti call once user updated estimate
      this.getUserEstimate()
    }
  }

  /**
   * ui
   */
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

  /**
   * estimate %diff
   * e.g. "Your estimate is lower/higher than the median by less/more than 2.5%"
   */
  // get "lower" or "higher" str based on percDiff -ve/+ve
  getMedianPercDiffSignStr() {
    if ((this.companyEstimate?.percentage_diff ?? 0) < 0)
      return EWStrings.VAL_LOWER
    else
      return EWStrings.VAL_HIGHER
  }

  // get "less" or "higher" str based on 20% cap
  getMedianPercDiffRangeStr() {
    if (Math.abs(this.companyEstimate?.percentage_diff ?? 0) <= 20)
      return EWStrings.VAL_LESS
    else
      return EWStrings.VAL_MORE
  }

  // get percentage difference str based on 2.5 intervals (20% cap)
  getMedianPercDiffStr() {
    const percentDiff = Math.abs(this.companyEstimate?.percentage_diff ?? 0)

    var strIndex: number
    switch (true) {
      case percentDiff < 2.5:
        strIndex = 0
        break

      case percentDiff < 5:
        strIndex = 1
        break

      case percentDiff < 7.5:
        strIndex = 2
        break

      case percentDiff < 10:
        strIndex = 3
        break

      case percentDiff < 12.5:
        strIndex = 4
        break

      case percentDiff < 15:
        strIndex = 5
        break

      case percentDiff < 17.5:
        strIndex = 6
        break

      case percentDiff < 20:
        strIndex = 7
        break

      default:
        strIndex = 8
        break
    }

    return EWStrings.VAL_EST_PERCENT_DIFF[strIndex]
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
    if (this.companyEstimate?.record_exist && this.companyEstimate.remaining_attempt == 0)
      // record exists and no more remaining attempts - just disable
      return true

    // check input length for first time input
    if (!this.companyEstimate?.record_exist)
      return this.estimateFC.value.length == 0

    // all others - just check input vs. server value
    return this.estimateFC.value == this.companyEstimate?.estimate
  }

  // disable form submit on enter if submit btn disabled
  formEnterFunc(event: Event) {
    if (this.isSubmitBtnDisabled())
      event.preventDefault()
  }
}

export interface EstimateDialogData {
  title: string,
  subTitle: string,
  sdr: BehaviorSubject<number>,
  id: string,

  // row/col passed from main table
  module: EnumModules,
  colName: string, // e.g. "FY_2022"
  rowName: string, // e.g. "revenue"
}