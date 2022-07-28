import { Component, OnInit } from '@angular/core';
import { COMMODITY_STR } from 'src/app/constants/modules/commodity-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';
import { environment } from 'src/environments/environment';
import { BaseHomeComponent } from '../base-home/base-home.component';
import { Commodity, CommoditySearch } from './../../../models/commodities/commodity';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent extends BaseHomeComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = COMMODITY_STR.commodity.singular
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
    if (item == null) return

    // TODO: TEMP - store commodity to ls
    localStorage.setItem("commodity", JSON.stringify(item))

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`)
  }
}
