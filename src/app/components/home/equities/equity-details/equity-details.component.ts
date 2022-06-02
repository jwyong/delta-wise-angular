import { CompanyDetail, CompanyRowType } from './../../../../models/equities/company-estimate';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EstimateDialogComponent } from './../../../common/estimate-dialog/estimate-dialog.component';
import { EquitiesComponent } from './../equities.component';
import { HttpConstants } from 'src/app/utils/http-constants';

// TODO: TEMP - hardcoded companyEst list
@Component({
  selector: 'app-equity-details',
  templateUrl: './equity-details.component.html',
  styleUrls: ['./equity-details.component.css']
})
export class EquityDetailsComponent extends EquitiesComponent implements OnInit {
  // company ticker for currect company
  companyTicker = ''

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

  override ngOnInit(): void {
    // subscribe to company id changes
    this.route.params.subscribe(routeParams => {
      this.companyTicker = routeParams['ticker']

      // get company dets when ticker changed
      this.getCompanyDets()
    });

    // subscribe to date range picker changes
    this.selectedDateRangeBS.subscribe((value) => {
      console.log("selectedDateRange = ", value)
      // get company dets when date range changed
      this.getCompanyDets()
    })
  }

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
      current_time: new Date().toISOString(), date_range: "", ticker: this.companyTicker
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
  highlightBgClass = 'bg-primary'
  getHeaderCellClass(colName: string) {
    // just need check for highlight
    if (colName == this.mouseOverColName) return this.highlightBgClass
    else return ''
  }

  // get class for non-header cells (not 1st row)
  getNonHeaderCellClass(rowName: string, colName: string) {
    // check highlight for first col, cursor-pointer for 2nd col onwards
    if (colName != this.nameCol) return 'cursor-pointer'
    else if (rowName == this.mouseOverRowName)
      return "bg-primary"
    else return ""
  }

  /**
   * input estimate dialog
   */
  showEstimateDialog(rowName: string, colName: string) {
    console.log(rowName, colName)

    const dialogRef = this.dialog.open(EstimateDialogComponent, {
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.getCompanyTitle(),
        subTitle: `${colName} ${rowName}`,
        sdr: this.selectedDateRangeBS
      }
    });
    var dialogSelectedDR: number
    const onDialogDateSelectedSub = dialogRef.componentInstance.selectedDateRangeEE.subscribe((value) => {
      dialogSelectedDR = value
    })

    dialogRef.afterClosed().subscribe(result => {
      // unsubscribe dialog observer
      onDialogDateSelectedSub.unsubscribe()

      // update sdr if got
      if (dialogSelectedDR != null)
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

  // get humanised names for table row and columns
}
