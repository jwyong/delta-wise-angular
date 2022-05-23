import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent extends BaseComponent implements OnInit {
  searchBarLabel = $localize`:@@crypto:${EWStrings.VAL_CRYPTO}`

  // setup functions for searchbar
  getOptionsLabel = (item: any): string => {
    return `Crypto: ${item.Title} (${item.Type})`
  }

  // go to equity detail page
  onOptionSelected = (item: any): void => {
    console.log("crypto: onOptionSelected, item = ", item)
  }
}
