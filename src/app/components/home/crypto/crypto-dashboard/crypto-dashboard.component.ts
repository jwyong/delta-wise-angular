import { EWStrings } from 'src/app/utils/ew-strings';
import { CryptoConstants } from './cr-constants';
import { Cryptocurrency } from 'src/app/models/crypto/crypto';
import { Component, OnInit } from '@angular/core';
import { BaseDashboardComponent } from '../../base-dashboard/base-dashboard.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.css']
})
export class CryptoDashboardComponent extends BaseDashboardComponent implements OnInit {
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
    return EWStrings.capitalise(value)
  }

  onPaged(pageIndex: number) {
    console.log("index = ", pageIndex)

    this.pageIndex = pageIndex
    this.getCryptoListForCurrentPage()
  }
}
