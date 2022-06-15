import { BaseHomeComponent } from './../base-home/base-home.component';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent extends BaseHomeComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = EWStrings.VAL_CRYPTO 
  }

  // setup functions for searchbar
  getOptionsLabel = (item: any): string => {
    if (item == null) return ""

    return `Crypto: ${item.Title} (${item.Type})`
  }

  // go to coin detail page
  onOptionSelected = (item: any): void => {
  }
}
