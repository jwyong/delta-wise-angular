import { Component, OnInit } from '@angular/core';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { RouterConstants } from 'src/app/utils/router-constants';
import { Commodity } from '../../../models/commodities/commodity';
import { Cryptocurrency } from '../../../models/crypto/crypto';
import { BaseComponent } from '../../base/base.component';

/**
 * base class for dashboard page for each module
 * - holds watchlist and recent search, etc
 */
@Component({
  selector: 'app-main',
  templateUrl: './base-dashboard.component.html',
  styleUrls: ['./base-dashboard.component.css']
})
export class BaseDashboardComponent extends BaseComponent implements OnInit {
  module: string = this.getRouterData('module')
  isLoadingDashBoard = false
  
  // can set wl/rc expanded or not from individual component
  isWatchlistExpanded = true
  isRecentSearchExpanded = true

  // list item on click - go to detail page
  listItemOnClick(item: any) {
    // TODO: TEMP - set obj to ls for non-equities (hardcoded without http)
    switch (this.module) {
      case EnumModules.commodities:
        let commodity: Commodity = { id: 23, commodity: item.name, mainExchange: item.id, category: "Category" }

        localStorage.setItem("commodity", JSON.stringify(commodity))
        break

      case EnumModules.crypto:
        let crypto: Cryptocurrency = { name: item.name, symbol: item.id}

        localStorage.setItem("crypto", JSON.stringify(crypto))
        break
    }

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.id}`)
  }
}
