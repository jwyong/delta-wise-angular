import { COMMON_STR } from 'src/app/constants/common-strings';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { EstTableSingleComponent } from 'src/app/components/common/est-table-single/est-table-single.component';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { Cryptocurrency } from './../../../../models/crypto/crypto';
import { CryptoComponent } from './../crypto.component';
import { HttpConstants } from 'src/app/utils/http-constants';
import { CryptoDetails } from 'src/app/models/crypto/crypto-details';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css']
})
export class CryptoDetailsComponent extends CryptoComponent implements OnInit {
  @ViewChild('estTable') estTable: any;

  tableStr = COMMON_STR.estimates.est_table_disclaimer

  module = EnumModules.crypto
  cryptoId: number | undefined
  crypto = <Cryptocurrency>{}

  override ngOnInit(): void {
    // combine router ticker changes + data range changes
    combineLatest([this.route.params, this.selectedDateRangeBS, this.dataService.shouldRefreshDetails]).subscribe(results => {
      this.cryptoId = results[0]['id']

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
  isLoadingTable = false

  // get commodity est detail
  async getCryptoDetail() {
    this.setIsLoading(true)
    this.isLoadingTable = true

    // call api
    let result = await this.httpPost<CryptoDetails>(HttpConstants.API_CRYPTO_DETAIL, {
      date_range: this.selectedDateRange, crypto_id: Number(this.cryptoId)
    })

    this.setIsLoading(false)
    this.isLoadingTable = false

    // check success status and update jwt + navigate to home
    if (result.status) {
      const idNum = Number(result.data?.id)
      this.crypto = {
        id: idNum,
        name: result.data?.crypto_name
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

      console.log("tableArray = ", tableArray)

      this.estTable.displayedData = tableArray
    }
  }

  /**
  * UI binding
  */
  getCryptoTitle() {
    if (this.crypto == null) return ""

    return this.crypto.name ?? ""
  }

  shouldShowTablePH(estTable?: EstTableSingleComponent) {
    return this.isLoadingTable && estTable?.displayedData.length == 0
  }
}
