import { CRYPTO_STR } from './../../../../constants/modules/crypto-strings';
import { Component, OnInit } from '@angular/core';
import { Cryptocurrency } from 'src/app/models/crypto/crypto';
import { BaseDashboardComponent } from '../../base-dashboard/base-dashboard.component';
import { CommonStrDyn } from '../../../../constants/common-strings';
import { CryptoConstants } from './cr-constants';

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.css']
})
export class CryptoDashboardComponent extends BaseDashboardComponent implements OnInit {
  cryptoStr = CRYPTO_STR
  
  /**
   * table related
   */
  displayedColumns = ['name', 'symbol']
  displayedData: Cryptocurrency[] = []

  pageIndex = 0
  pageSize = 50
  pageLength = CryptoConstants.cryptoList.length

  onCryptoListExpanded() {
    if (this.displayedData.length == 0) {
      this.isLoadingDashBoard = true

      setTimeout(() => {
        this.getCryptoListForCurrentPage()
        this.isLoadingDashBoard = false
      }, 800);
    }
  }

  getCryptoListForCurrentPage() {
    this.displayedData = CryptoConstants.cryptoList.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize)
  }

  getHumanisedHeaderCellValue(value: string) {
    return CommonStrDyn.capitalise(value)
  }

  onPaged(pageIndex: number) {
    this.pageIndex = pageIndex
    this.getCryptoListForCurrentPage()
  }
}
