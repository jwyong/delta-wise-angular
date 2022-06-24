import { Cryptocurrency } from './../../../models/crypto/crypto';
import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { environment } from 'src/environments/environment';
import { BaseHomeComponent } from './../base-home/base-home.component';
import { RouterConstants } from 'src/app/utils/router-constants';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent extends BaseHomeComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = EWStrings.VAL_CRYPTO
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
    console.log("item = ", item)
    // TODO: TEMP - store commodity to ls
    localStorage.setItem("crypto", JSON.stringify(item))

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.symbol}`)
  }
}
