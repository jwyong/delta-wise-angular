import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { COMMON_STR } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { CommodityDetails } from 'src/app/models/commodities/commodity-details';
import { HttpConstants } from 'src/app/utils/http-constants';
import { Commodity } from './../../../../models/commodities/commodity';
import { EstTableSingleComponent } from './../../../common/est-table-single/est-table-single.component';
import { CommoditiesComponent } from './../commodities.component';

@Component({
  selector: 'app-commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.css']
})
export class CommodityDetailsComponent extends CommoditiesComponent implements OnInit {
  @ViewChild('estTable') estTable: any;

  tableStr = COMMON_STR.estimates.est_table_disclaimer

  module = EnumModules.commodities
  commoId: number | undefined
  commodity = <Commodity>{}

  override ngOnInit(): void {
    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS, this.dataService.shouldRefreshDetails]).subscribe(results => {
      this.commoId = results[0]['id']

      this.getCommodityDetail()
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
   * http
   */
  isLoadingTable = false

  // get commodity est detail
  async getCommodityDetail() {
    this.setIsLoading(true)
    this.isLoadingTable = true

    // call api
    let result = await this.httpPost<CommodityDetails>(HttpConstants.API_COMMO_DETAIL, {
      date_range: this.selectedDateRange, commodity_id: Number(this.commoId)
    })

    this.setIsLoading(false)
    this.isLoadingTable = false

    // check success status and update jwt + navigate to home
    if (result.status) {
      const idNum = Number(result.data?.id)
      this.commodity = {
        id: idNum,
        name: result.data?.commodity_name
      }
      const colList = result.data?.data

      // create row object to be pushed to table array
      const tableArray: any[] = []
      Object.keys(colList).map((key) => {
        tableArray.push(
          {
            name: key,
            percDiff: colList[key]
          }
        )
      })

      this.estTable.displayedData = tableArray
    }
  }

  /**
  * UI binding
  */
  getCommoTitle() {
    if (this.commodity == null) return ""

    return this.commodity.name ?? ""
  }

  shouldShowTablePH(estTable?: EstTableSingleComponent) {
    return this.isLoadingTable && estTable?.displayedData.length == 0
  }
}
