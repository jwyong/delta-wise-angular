import { Commodity } from './../../../../models/commodities/commodity';
import { CommoditiesComponent } from './../commodities.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-commodity-details',
  templateUrl: './commodity-details.component.html',
  styleUrls: ['./commodity-details.component.css']
})
export class CommodityDetailsComponent extends CommoditiesComponent implements OnInit {
  commodity: Commodity | undefined

  override ngOnInit(): void {
    // TODO: TEMP - simulate get from api
    this.commodity = JSON.parse(localStorage.getItem("commodity") ?? "")

    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS]).subscribe(results => {
      // this.getCompanyDets()
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
  * UI binding
  */
  // get title (e.g. Platinum (NYMEX))
  getCompanyTitle() {
    if (this.commodity == null) return ""

    else return `${this.commodity.commodity} (${this.commodity.mainExchange})`
  }
}
