import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { DateTimeUtil } from 'src/app/utils/date-time';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { CompanyDetail, CompanyRowType } from '../../../../models/equities/company-detail';
import { EstimateDialogComponent } from './../../../common/estimate-dialog/estimate-dialog.component';
import { EquitiesComponent } from './../equities.component';

// TODO: TEMP - hardcoded companyEst list
@Component({
  selector: 'app-equity-details',
  templateUrl: './equity-details.component.html',
  styleUrls: ['./equity-details.component.css']
})
export class EquityDetailsComponent extends EquitiesComponent implements OnInit {
  // company ticker for currect company
  companyTicker = ''

  override ngOnInit(): void {
    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS]).subscribe(results => {
      // get company dets when any of these changed (if no dialog showing)
      this.companyTicker = results[0]['ticker']

      this.getCompanyDets()
    });
  }

  /**
   * for date range picker
   */
  selectedDateRangeBS = new BehaviorSubject(0)
  get selectedDateRange() {
    return this.selectedDateRangeBS.value
  }

  set selectedDateRange(value) {
    this.selectedDateRangeBS.next(value)
  }

  /**
   * for table
   */
  // columns to be displayed (all columns)
  displayedColumns: any[] = []

  // full data to be displayed on table (need to invert from api data)
  displayedData: any[] = []

  // static col names
  timeFrameCol = 'timeframe'
  nameCol = 'name'

  // fixed row on table (to be inverted from api data)
  inputColumns = [this.timeFrameCol, CompanyRowType.revenue, CompanyRowType.ebit, CompanyRowType.ebitda, CompanyRowType.net_income, CompanyRowType.eps]

  /**
   * date range picker related
   */
  // onSelect - make api call with new dateRange
  onSelectDateRange(dateRange: number) {
    this.selectedDateRange = dateRange
  }

  /**
   * table related
   */
  // get table dets from api
  async getCompanyDets() {
    this.setIsLoading(true)

    // call api TEMP: hardcode to FB
    let result = await this.httpPost<CompanyDetail>(HttpConstants.API_EQUITIES_DETAIL, {
      date_range: this.selectedDateRange, ticker: this.companyTicker
    })

    this.setIsLoading(false)

    // check success status and update jwt + navigate to home
    if (result.status) {
      let colList = result.data?.data

      // prep inversed array for pushing BE rows into (BE sending timeframe as rows)
      var beArray: any[] = []

      Object.keys(colList).map((key) => {
        // create row object to be pushed to table array
        // TODO: try link to enum in comp-est.ts
        let rowObj = this.getRowObj(key, colList[key])

        // push rowObj to beArray
        beArray.push(rowObj)
      });

      // sort beArray to be quarters first then FY (e.g. Q2_2022, Q3_2022, Q4_2022, FY_2022, FY_2023 ...)
      const order = ['Q', 'F'];
      beArray = beArray.sort((a, b) =>
        order.indexOf(a.timeframe.charAt(0)) - order.indexOf(b.timeframe.charAt(0))
      );

      // invert displayedCols
      this.displayedColumns = beArray.map(x => x.timeframe.toString());
      this.displayedColumns.unshift(this.nameCol)

      // invert displayedData
      this.displayedData = this.getInvertedFlatMap(beArray)
    }
  }

  // get rowObj based on beArray
  private getRowObj(key: string, nestedBeRowTypeObj: any) {
    return {
      timeframe: key,
      revenue: nestedBeRowTypeObj[CompanyRowType.revenue],
      ebit: nestedBeRowTypeObj[CompanyRowType.ebit],
      ebitda: nestedBeRowTypeObj[CompanyRowType.ebitda],
      net_income: nestedBeRowTypeObj[CompanyRowType.net_income],
      eps: nestedBeRowTypeObj[CompanyRowType.eps],
    }
  }

  // invert beArray to become a flatMap
  private getInvertedFlatMap(beArray: any[]) {
    return this.inputColumns.flatMap(x => {
      if (x != this.timeFrameCol) {
        // prep inverted array rowObj
        var invertedArrayRowObj: any = { [this.nameCol]: x }
        beArray.forEach((item: any, index: number) => {
          invertedArrayRowObj[item.timeframe] = beArray[index][x];
        })

        return invertedArrayRowObj
      } else return []
    });
  }

  /**
   * table highlighting related
   */
  // for highglighting row/col header on mouseover
  mouseOverRowName?: string
  mouseOverColName?: string

  // update which row/col is mouse-over now
  cellOnMouseOver(rowType: string, colName: string) {
    if (colName == this.nameCol) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for header cells (1st row)
  highlightBgClass = 'est-table-hover'
  getHeaderCellClass(colName: string) {
    if (colName == this.nameCol) return ''
    else
      if (colName == this.mouseOverColName) return this.highlightBgClass
      else return ''
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != this.nameCol) {
      // data columns - use data col css
      var dataClassBaseName = 'est-table-data-col cursor-pointer'
      if (colName == this.mouseOverColName && rowName == this.mouseOverRowName)
        return `${dataClassBaseName} ${this.highlightBgClass}`
      else return dataClassBaseName

    } else {
      // first col
      var className = 'est-table-first-col'
      if (rowName == this.mouseOverRowName)
        return `${className} ${this.highlightBgClass}`
      else return className
    }
  }

  /**
   * input estimate dialog
   */
  showEstimateDialog(rowName: string, colName: string) {
    const hRowName = EWStrings.getCompanyRowTypeName(rowName)
    const hColName = EWStrings.getHumanisedEqtColName(colName)
    const estimateDialogRef = this.dialog.open(EstimateDialogComponent, {
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.getCompanyTitle(),
        subTitle: `${hRowName} (${hColName})`,
        sdr: this.selectedDateRangeBS,
        ticker: this.companyTicker,
        timeFrame: colName,
        rowType: rowName
      }
    });

    // check if user has changed dateRange
    var dialogSelectedDR: number
    const onDialogDateSelectedSub = estimateDialogRef.componentInstance.selectedDateRangeBS.subscribe((value: number) => {
      dialogSelectedDR = value
    })
    var didSubmitEstimate: boolean = false
    const didSubmitEstimateSub = estimateDialogRef.componentInstance.didSubmitEstimateEE.subscribe((value: boolean) => {
      if (value)
        didSubmitEstimate = value
    })

    estimateDialogRef.afterClosed().subscribe((_: any) => {
      // unsubscribe dialog observer
      onDialogDateSelectedSub.unsubscribe()
      didSubmitEstimateSub.unsubscribe()

      // refresh api if got submit
      if (didSubmitEstimate)
        this.getCompanyDets()
      else
        // update sdr if got
        if (dialogSelectedDR != null && dialogSelectedDR != this.selectedDateRange)
          this.selectedDateRange = dialogSelectedDR
    });
  }

  /**
   * UI binding
   */
  // get title (e.g. Aztrazaneca (AZN))
  getCompanyTitle() {
    let company = this.getCompanyFromLS()

    if (company == null) return ""
    else return `${company.company} (${company.ticker})`
  }

  // get humanised names for header cells
  getHumanisedHeaderCellValue(colName: string) {
    if (colName != this.nameCol)
      return EWStrings.getHumanisedEqtColName(colName)
    else return ""
  }

  /**
  * humanised cell values for data cols:
  * - show "?" for null cells
  * - show range of %diff in range of 2.5%, from 0 up to 20%
  * - e.g. 0 - 2.5%, 2.5 - 5.0%, 5.0 - 7.5%, ... , 17.5 - 20.0%, 20.0%
  * - add > or < sign in front based on %diff is -ve or +ve
  * e.g.:
  * % DIFF = 1.3%, result = > 0 - 2.5%
  * % DIFF = -1.3%, result = < 0 - 2.5%
  * % DIFF = 3.3%, result = > 2.5 - 5.0%
  * % DIFF = -17.2%, result = < 17.5 - 20.0%
  * % DIFF = 33.2%, result = > 20.0%
  * % DIFF = -23.2%, result = < 20.0%
  */
  getHumanisedCellValue(colName: string, rowName: string) {
    if (colName == this.nameCol)
      // name column: show localised rowType (revenue, EPS, etc)
      return EWStrings.getCompanyRowTypeName(rowName)

    else {
      // show "?" for nulls
      if (rowName == null)
        return "?"

      else {
        // get humanised range based on %diff range
        var percentDiff = Number(rowName)

        // return ori value if NaN
        if (percentDiff == NaN) return rowName

        // get sign before convert to abs
        let sign = percentDiff >= 0 ? ">" : "<"
        percentDiff = Math.abs(percentDiff)

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

        // add sign in front
        return `${sign} ${EWStrings.VAL_EST_PERCENT_DIFF_RANGE[strIndex]}`
      }
    }
  }
}
