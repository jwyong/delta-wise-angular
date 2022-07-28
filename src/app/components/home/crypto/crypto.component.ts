import { Component, OnInit } from '@angular/core';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';
import { BaseModuleComponent } from '../base-home/base-home.component';
import { CRYPTO_STR } from '../../../constants/modules/crypto-strings';
import { Cryptocurrency } from './../../../models/crypto/crypto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent extends BaseModuleComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = CRYPTO_STR.crypto.singular
  }

  /**
   * search bar
   */
  searchUrl = `${environment.apiUrl}/${HttpConstants.HTTP_API_VERSION}/${HttpConstants.API_EQUITIES_SEARCH}?s=`

  // setup functions for searchbar
  getOptionsLabel = (item: Cryptocurrency): string => {
    if (item == null) return ""

    return `${item.name} (${item.symbol})`
  }

  // go to coin detail page
  onOptionSelected = (item: Cryptocurrency): void => {
    if (item == null) return

    // TODO: TEMP - store commodity to ls
    localStorage.setItem("crypto", JSON.stringify(item))

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.symbol}`)
  }
}
