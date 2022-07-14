import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonStrDyn, COMMON_STR } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { Company } from 'src/app/models/equities/company';
import { HttpConstants } from 'src/app/utils/http-constants';
import { EqtStrDyn } from '../../../../constants/modules/equities-strings';
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
  tableStr = COMMON_STR.estimates.est_table_disclaimer
  
  // company ticker for currect company
  companyTicker = ''
  company: Company | undefined
  isLoadingTable = false

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
    this.isLoadingTable = true

    // call api
    let result = await this.httpPost<CompanyDetail>(HttpConstants.API_EQUITIES_DETAIL, {
      date_range: this.selectedDateRange, ticker: this.companyTicker
    })

    this.setIsLoading(false)
    this.isLoadingTable = false

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
      this.displayedColumns.unshift(COMMON_STR.estimates.constants.table.name_col)

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
        var invertedArrayRowObj: any = { [COMMON_STR.estimates.constants.table.name_col]: x }
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
    if (colName == COMMON_STR.estimates.constants.table.name_col) return

    this.mouseOverRowName = rowType
    this.mouseOverColName = colName
  }

  // get class for header cells (1st row)
  getHeaderCellClass(colName: string) {
    if (colName == COMMON_STR.estimates.constants.table.name_col) return ''
    else
      if (colName == this.mouseOverColName) return COMMON_STR.estimates.constants.table.highlight_class
      else return ''
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != COMMON_STR.estimates.constants.table.name_col) {
      // data columns - use data col css
      if (colName == this.mouseOverColName && rowName == this.mouseOverRowName)
        return `${COMMON_STR.estimates.constants.table.data_cell_base_class} ${COMMON_STR.estimates.constants.table.highlight_class}`
      else return COMMON_STR.estimates.constants.table.data_cell_base_class

    } else {
      // first col
      if (rowName == this.mouseOverRowName)
        return `${COMMON_STR.estimates.constants.table.first_col_base_class} ${COMMON_STR.estimates.constants.table.highlight_class}`
      else return COMMON_STR.estimates.constants.table.first_col_base_class
    }
  }

  /**
   * input estimate dialog
   */
  showEstimateDialog(rowName: string, colName: string) {
    const hRowName = EqtStrDyn.getCompanyRowTypeName(rowName)
    const hColName = EqtStrDyn.getHumanisedEqtColName(colName)
    const estimateDialogRef = this.dialog.open(EstimateDialogComponent, {
      panelClass: 'loader-dialog',
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.getCompanyTitle(),
        subTitle: `${hRowName} (${hColName})`,
        sdr: this.selectedDateRangeBS,
        id: this.companyTicker,
        module: EnumModules.equities,
        colName: colName,
        rowName: rowName
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
    if (colName != COMMON_STR.estimates.constants.table.name_col)
      return EqtStrDyn.getHumanisedEqtColName(colName)
    else return ""
  }

  getHumanisedCellValue(colName: string, rowName: string) {
    return CommonStrDyn.getEstTblHumanisedCellVals(EnumModules.equities, colName, rowName)
  }
}
