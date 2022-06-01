import { CompanyDetail } from './../../../../models/equities/company-estimate';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CompanyTableType } from '../../../../models/equities/company-estimate';
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

  // fixed row on table (to be inverted from api data)
  inputColumns = ['timeframe', 'revenue', 'ebit', 'ebitda', 'net_income', 'eps']

  override ngOnInit(): void {
    // subscribe to company id changes
    this.route.params.subscribe(routeParams => {
      this.companyTicker = routeParams['ticker']

      // get company dets when ticker changed
      this.getCompanyDets()
    });

    // subscribe to date range picker changes
    this.selectedDateRangeBS.subscribe((value) => {
      // get company dets when date range changed
      // this.getCompanyDets()
      console.log("sdrBS value = ", value)
    })
  }

  getRandomValue(): string {
    return (Math.floor(Math.random() * (100 - -99) + -100)).toString()
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
        // prep nested beObj which contains rowTypes: { Q2_2022 : {ebit: null, ebitda: -23.30 }}
        let nestedBeRowTypeObj = colList[key]

        // create row object to be pushed to table array
        // TODO: try link to enum in comp-est.ts
        let rowObj = {
          timeframe: key,
          revenue: nestedBeRowTypeObj['revenue'],
          ebit: nestedBeRowTypeObj['ebit'],
          ebitda: nestedBeRowTypeObj['ebitda'],
          net_income: nestedBeRowTypeObj['net_income'],
          eps: nestedBeRowTypeObj['eps'],
        }

        // push rowObj to beArray
        beArray.push(rowObj)
      });

      // invert beArray for FE table UI
      this.displayedColumns = beArray.map(x => x.timeframe.toString());
      this.displayedColumns.unshift("name")

      this.displayedData = this.inputColumns.flatMap(x => {
        if (x != "timeframe") {
          // prep inverted array rowObj
          var invertedArrayRowObj: any = { name: x }

          beArray.forEach((item: any, index: number) => {
            invertedArrayRowObj[item.timeframe] = beArray[index][x];
          })

          return invertedArrayRowObj
        } else return []
      });

      // this.displayedData.splice(0, 1)

      console.log("displayCols = ", this.displayedColumns)
      console.log("displayData = ", this.displayedData)
    }
  }

  // for highglighting row/col header on mouseover
  mouseOverRowType?: CompanyTableType

  // update which row/col is mouse-over now
  cellOnMouseOver(item: string, index: string) {
    console.log("item = ", item, index)

    // TODO: need to col header highlight when BE ready
    // this.mouseOverRowType = item
  }

  // get class for highlighting
  getRowHighlightClass(rowType: CompanyTableType) {
    if (rowType == this.mouseOverRowType)
      return "bg-primary"
    else return ""
  }

  /**
   * input estimate dialog
   */
  showEstimateDialog(item: any) {
    console.log(item)

    const dialogRef = this.dialog.open(EstimateDialogComponent, {
      maxWidth: '25vw',
      minWidth: 350,
      data: {
        title: this.getTitle(),
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
  getTitle() {
    let company = this.getCompanyFromLS()

    if (company == null) return ""
    else return `${company.company} (${company.ticker})`
  }
}
