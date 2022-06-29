import { Cryptocurrency } from '../../../models/crypto/crypto';
import { Commodity } from '../../../models/commodities/commodity';
import { EnumModules } from '../../../utils/ew-constants';
import { BaseComponent } from '../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew-constants';
import { RouterConstants } from 'src/app/utils/router-constants';

/**
 * main landing page for each module after logging in
 * - currently hosts watchlist and recent search
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
    console.log('item = ', item)

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
