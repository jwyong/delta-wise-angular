import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-equities',
  templateUrl: './equities.component.html',
  styleUrls: ['./equities.component.css']
})
export class EquitiesComponent extends BaseComponent implements OnInit {
  searchBarLabel = $localize`:@@company:${EWStrings.VAL_COMPANY}`

  // setup functions for searchbar
  getOptionsLabel = (item: any): string => {
    return `Equity: ${item.Title} (${item.Year})`
  }

  // go to equity detail page
  onOptionSelected = (item: any): void => {
    console.log("onOptionSelected, item = ", item)
  }
}
