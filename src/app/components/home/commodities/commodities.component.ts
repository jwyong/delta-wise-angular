import { Commodity, CommoditySearch } from './../../../models/commodities/commodity';
import { BaseHomeComponent } from './../base-home/base-home.component';
import { Component, OnInit } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';
import { environment } from 'src/environments/environment';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';

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
  searchUrl = `${environment.apiUrl}/${HttpConstants.HTTP_API_VERSION}/${HttpConstants.API_EQUITIES_SEARCH}?s=`

  // setup functions for searchbar
  getGroupLabel = (item: CommoditySearch): string => {
    if (item == null) return ""

    return item.category
  }

  getOptionsLabel = (item: Commodity): string => {
    if (item == null) return ""

    return `${item.commodity} (${item.mainExchange})`
  }

  // go to commodity detail page
  onOptionSelected = (item: Commodity): void => {
    // TODO: TEMP - store commodity to ls
    localStorage.setItem("commodity", JSON.stringify(item))

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`)
  }
}
