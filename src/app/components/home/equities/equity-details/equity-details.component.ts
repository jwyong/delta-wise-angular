import { EWConstants } from 'src/app/utils/ew-constants';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Company } from 'src/app/models/equities/company';
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
  company: Company | undefined

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

  // onSelect - make api call with new dateRange
  onSelectDateRange(dateRange: number) {
    this.selectedDateRange = dateRange
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

  // fixed row on table (to be inverted from api data)
  inputColumns = [this.timeFrameCol, CompanyRowType.revenue, CompanyRowType.ebit, CompanyRowType.ebitda, CompanyRowType.net_income, CompanyRowType.eps]

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
      this.company = {
        ticker: result.data?.ticker,
        company: result.data?.company_name
      }
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
      this.displayedColumns.unshift(EWConstants.EST_TBL_NAME_COL)

      // invert displayedData
      this.displayedData = this.getInvertedFlatMap(beArray)

      console.log("dispData = ", this.displayedData)
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
        var invertedArrayRowObj: any = { [EWConstants.EST_TBL_NAME_COL]: x }
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
    if (colName == EWConstants.EST_TBL_NAME_COL) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for header cells (1st row)
  getHeaderCellClass(colName: string) {
    if (colName == EWConstants.EST_TBL_NAME_COL) return ''
    else
      if (colName == this.mouseOverColName) return EWConstants.EST_TBL_HIGHLIGHT_CLASS
      else return ''
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != EWConstants.EST_TBL_NAME_COL) {
      // data columns - use data col css
      if (colName == this.mouseOverColName && rowName == this.mouseOverRowName)
        return `${EWConstants.EST_TBL_DATA_CELL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
      else return EWConstants.EST_TBL_DATA_CELL_BC

    } else {
      // first col
      if (rowName == this.mouseOverRowName)
        return `${EWConstants.EST_TBL_FIRST_COL_BC} ${EWConstants.EST_TBL_HIGHLIGHT_CLASS}`
      else return EWConstants.EST_TBL_FIRST_COL_BC
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

      // update sdr/refresh api
      switch (true) {
        // update sdr if got changes
        case dialogSelectedDR != null && dialogSelectedDR != this.selectedDateRange:
          this.selectedDateRange = dialogSelectedDR
          break

        // refresh api if got submit
        case didSubmitEstimate:
          this.getCompanyDets()
          break

        default:
          break
      }
    });
  }

  /**
   * UI binding
   */
  // get title (e.g. Aztrazaneca (AZN))
  getCompanyTitle() {
    if (this.company == null) return ""

    else return `${this.company.company} (${this.company.ticker})`
  }

  // get humanised names for header cells
  getHumanisedHeaderCellValue(colName: string) {
    if (colName != EWConstants.EST_TBL_NAME_COL)
      return EWStrings.getHumanisedEqtColName(colName)
    else return ""
  }

  getHumanisedCellValue(colName: string, rowName: string) {
    return EWConstants.getEstTblHumanisedCellVals(colName, rowName)
  }
}
