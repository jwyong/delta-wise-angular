import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, timer } from 'rxjs';
import { CommonStrDyn } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { VALIDATION_STR } from 'src/app/constants/validation-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { environment } from 'src/environments/environment';
import { COMMON_STR } from '../../../constants/common-strings';
import { CompanyEstimate } from './../../../models/equities/company-estimate';
import { CommonServices } from './../../../services/common-services';
import { DateTimeUtil } from './../../../utils/date-time';

/**
 * dialog for inputting estimates
 */
@Component({
  selector: 'app-estimate-dialog',
  templateUrl: './estimate-dialog.component.html',
  styleUrls: ['./estimate-dialog.component.css'],
  providers: [CurrencyPipe]
})
export class EstimateDialogComponent implements OnInit {
  estStr = COMMON_STR.estimates
  confStr = COMMON_STR.confirmation

  // determine if debug or release version
  isDebug = !environment.production

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EstimateDialogData,
    protected formBuilder: FormBuilder,
    protected commonServices: CommonServices,
    protected currencyPipe: CurrencyPipe
  ) { }

  // company estimate obj
  companyEstimate?: CompanyEstimate

  // ee bool for refreshing details page
  didSubmitEstimateEE = new EventEmitter(false)

  ngOnInit(): void {
    // format input as user types 
    // this.subscribeCurrencyFormatter()

    // make api call to get user estimates
    this.getUserEstimate()
  }

  /**
   * observers
   */
  // TODO: halfway - reached validator part
  // subscribe est input to currency formatter
  // private subscribeCurrencyFormatter() {
  //   this.estimateFC.valueChanges.subscribe(value => {
  //     if (value == null) return

  //     // replace inputted string to number
  //     var replaced = value.replace(/[^0-9-.]/g, '').replace(/^0+/, '')

  //     // don't proceed if NaN
  //     if (isNaN(replaced)) return

  //     // limit 2 decimals max
  //     if (replaced.includes('.') && replaced.split('.')[1].length > 2)
  //       replaced = replaced.slice(0, -1)

  //     // transform to currency format with currencyPipe
  //     var trans = this.currencyPipe.transform(replaced, 'GBP', 'symbol', '1.0-2')

  //     // add "." back to transformed string if last digit is dot
  //     if (replaced.slice(-1) == ".")
  //       trans = trans + "."

  //     // update form value
  //     this.estimateFC.patchValue(trans, { emitEvent: false })
  //   })
  // }

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
  getEstimateErrorMsg = (formControl: FormControl) => {
    // required
    if (formControl.hasError(VALIDATION_STR.keys.required))
      return VALIDATION_STR.validation.required

    // not a number
    if (formControl.hasError(VALIDATION_STR.keys.pattern))
      return VALIDATION_STR.validation.number

    return ""
  }

  // get user's estimates from server
  async getUserEstimate() {
    this.setIsLoadingDialog(true)

    // set http data based on module
    var httpUrl = ''
    var idFieldName = ''
    var id: any
    var timeFrame = ''

    switch (this.data.module) {
      case EnumModules.equities:
        httpUrl = HttpConstants.API_EQUITIES_USER_ESTIMATE
        idFieldName = "ticker"
        id = this.data.id
        timeFrame = this.data.colName
        break

      case EnumModules.commodities:
        httpUrl = HttpConstants.API_COMMO_USER_ESTIMATE
        idFieldName = "commodity_id"
        id = Number(this.data.id)
        timeFrame = this.data.rowName
        break

      case EnumModules.crypto:
        httpUrl = HttpConstants.API_CRYPTO_USER_ESTIMATE
        idFieldName = "crypto_id"
        id = Number(this.data.id)
        timeFrame = this.data.rowName
        break
    }

    console.log('module = ', this.data.module)

    let result = await this.commonServices.httpService.httpPost<CompanyEstimate>(httpUrl, {
      date_range: this.selectedDateRange, [idFieldName]: id,
      time_frame: timeFrame, type: this.data.rowName
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
    if (isNaN(estimate)) return

    this.setIsLoadingDialog(true)

    var httpUrl = ''
    var idFieldName = ""
    var id: any
    var timeFrame = ''

    switch (this.data.module) {
      case EnumModules.equities:
        httpUrl = HttpConstants.API_EQUITIES_INSERT
        idFieldName = "ticker"
        id = this.data.id
        timeFrame = this.data.colName
        break

      case EnumModules.commodities:
        httpUrl = HttpConstants.API_COMMO_INSERT
        idFieldName = "commodity_id"
        id = Number(this.data.id)
        timeFrame = this.data.rowName
        break

      case EnumModules.crypto:
        httpUrl = HttpConstants.API_CRYPTO_INSERT
        idFieldName = "crypto_id"
        id = Number(this.data.id)
        timeFrame = this.data.rowName
        break
    }

    let result = await this.commonServices.httpService.httpPost(httpUrl, {
      date_range: this.selectedDateRange, estimate: estimate, [idFieldName]: id,
      time_frame: timeFrame, type: this.data.rowName
    })

    this.setIsLoadingDialog(false)

    if (result.status) {
      // set submit bool to true for refreshing details page
      this.didSubmitEstimateEE.emit(true)

      // make getEsti call once user updated estimate
      await this.getUserEstimate()

      this.commonServices.showSnackbar(CommonStrDyn.estimateUpdated(this.data.subTitle))
    }
  }

  /**
   * ui
   */
  getLastEstimateDateTime() {
    return `${this.estStr.last_est_date}: ${DateTimeUtil.getDateAsAgo(this.companyEstimate?.last_update_at)}`
  }

  // No. of contributors: 1-5, 6-10, 11-15, 16-20, >20
  getNumberOfContStr() {
    let contributorCount = this.companyEstimate?.no_of_contributors ?? 0

    var noOfCont: string
    switch (true) {
      case (contributorCount > 20):
        noOfCont = ">20"
        break

      case (contributorCount > 15):
        noOfCont = "16-20"
        break

      case (contributorCount > 10):
        noOfCont = "11-15"
        break

      case (contributorCount > 5):
        noOfCont = "6-10"
        break

      default:
        noOfCont = "1-5"
        break
    }

    return `${this.estStr.no_of_contributors}: ${noOfCont}`
  }

  /**
   * estimate %diff
   * e.g. "Your estimate is lower/higher than the median by less/more than 2.5%"
   */
  // get "lower" or "higher" str based on percDiff -ve/+ve
  getMedianPercDiffSignStr() {
    if ((this.companyEstimate?.percentage_diff ?? 0) < 0)
      return this.estStr.lower
    else
      return this.estStr.higher
  }

  // get "less" or "higher" str based on 20% cap
  getMedianPercDiffRangeStr() {
    if (Math.abs(this.companyEstimate?.percentage_diff ?? 0) <= 20)
      return this.estStr.less
    else
      return this.estStr.more
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

    return this.estStr.perc_diff.arr_value[strIndex]
  }

  getInputTrialStr() {
    return CommonStrDyn.inputTrialsRemaining((this.companyEstimate?.remaining_attempt ?? 0).toString())
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
      return (this.estimateFC.value ?? '').length == 0

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