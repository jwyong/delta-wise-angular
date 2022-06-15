import { BaseHomeComponent } from './../base-home/base-home.component';
import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';
import { environment } from 'src/environments/environment';
import { HttpConstants } from 'src/app/utils/http-constants';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent extends BaseHomeComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = EWStrings.VAL_COMMODITY
  }

  /**
   * search bar
   */
  // url
  searchUrl = `${environment.apiUrl}/${HttpConstants.HTTP_API_VERSION}/${HttpConstants.API_EQUITIES_SEARCH}?s=`

  // setup functions for searchbar
  getOptionsLabel = (item: any): string => {
    if (item == null) return ""

    return `Commodity: ${item.Title} (${item.Type})`
  }

  // go to commodity detail page
  onOptionSelected = (item: any): void => {
  }
}
