import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { environment } from 'src/environments/environment';
import { BaseHomeComponent } from './../base-home/base-home.component';

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
  getOptionsLabel = (item: any): string => {
    if (item == null) return ""

    return `Crypto`
  }

  // go to coin detail page
  onOptionSelected = (item: any): void => {
  }
}
