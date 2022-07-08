import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { EstTableSingleComponent } from 'src/app/components/common/est-table-single/est-table-single.component';
import { EnumModules } from 'src/app/utils/ew-constants';
import { Cryptocurrency } from './../../../../models/crypto/crypto';
import { CryptoComponent } from './../crypto.component';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent extends CryptoComponent implements OnInit {
  module = EnumModules.commodities
  title = ""
  crypto = <Cryptocurrency>{}

  override ngOnInit(): void {
    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS]).subscribe(results => {
      this.getCryptoDetail()
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
  getCryptoDetail() {
    // TODO: TEMP - get commodity obj from ls
    this.crypto = JSON.parse(localStorage.getItem("crypto") ?? "")

    // update title after getting commodity obj
    this.title = `${this.crypto.name} (${this.crypto.symbol})`
  }

  /**
  * UI binding
  */
  shouldShowTablePH(estTable?: EstTableSingleComponent) {
    return estTable?.isLoadingTable && estTable.displayedData.length == 0
  }
}
