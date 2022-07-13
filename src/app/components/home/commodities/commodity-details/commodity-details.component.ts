import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { Commodity } from './../../../../models/commodities/commodity';
import { EstTableSingleComponent } from './../../../common/est-table-single/est-table-single.component';
import { CommoditiesComponent } from './../commodities.component';

@Component({
  selector: 'app-commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.css']
})
export class CommodityDetailsComponent extends CommoditiesComponent implements OnInit {
  module = EnumModules.commodities
  title = ""
  commodity = <Commodity>{}

  override ngOnInit(): void {
    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS]).subscribe(results => {
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
  // get commodity est detail
  getCommodityDetail() {
    // TODO: TEMP - get commodity obj from ls
    this.commodity = JSON.parse(localStorage.getItem("commodity") ?? "")

    // update title after getting commodity obj
    this.title = `${this.commodity.commodity} (${this.commodity.mainExchange})`
  }

  /**
  * UI binding
  */
  shouldShowTablePH(estTable?: EstTableSingleComponent) {
    return estTable?.isLoadingTable && estTable.displayedData.length == 0
  }
}
