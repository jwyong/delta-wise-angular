import { CDConstants } from './../../home/commodities/commodity-dashboard/cd-constants';
import { COMMON_STR } from 'src/app/constants/common-strings';
import { Component, OnInit } from '@angular/core';
import { RecentSearch } from './../../../models/common/recent-search';
import { BaseDashboardComponent } from '../../home/base-dashboard/base-dashboard.component';
import { EnumModules } from 'src/app/constants/enum/enum-modules';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent extends BaseDashboardComponent implements OnInit {
  recentStr = COMMON_STR.recent_search
  tapSearchStr = COMMON_STR.tap_search_get_started

  isLoadingRecentList = false
  recentSearchList: RecentSearch[] = []

  /**
   * expansion panel
   */
  onOpen() {
    // only make api call if not already done
    if (this.recentSearchList.length == 0)
      this.getRecentSearch()
  }

  // get recent search list from api
  getRecentSearch() {
    this.isLoadingRecentList = true

    setTimeout(() => {
      switch (this.module) {
        case EnumModules.equities:
          this.getRecentSearchForEqt()
          break

        case EnumModules.commodities:
          this.getRecentSearchForCommo()
          break

        case EnumModules.crypto:
          this.getRecentSearchForCryp()
          break
      }

      this.isLoadingRecentList = false
    }, 1000);
  }

  getRecentSearchForEqt() {
    this.recentSearchList = [
      { id: "FB", name: "Meta Platforms Inc", symbol: "FB" },
      { id: "AMZN", name: "AMAZON.COM, INC.", symbol: "AMZN" },
      { id: "PYPL", name: "PayPal Holdings, Inc.", symbol: "PYPL" },
      { id: "NFLX", name: "NETFLIX, INC.", symbol: "NFLX" },
      { id: "UBER_US", name: "Uber Technologies Inc", symbol: "UBER_US" },
      { id: "NVDA", name: "NVIDIA CORPORATION", symbol: "NVDA" },
      { id: "SNAP_US", name: "Snap Inc", symbol: "SNAP_US" },
      { id: "PANW", name: "Palo Alto Networks, Inc.", symbol: "PANW" },
      { id: "INTC", name: "INTEL CORPORATION", symbol: "INTC" },
      { id: "SPLK", name: "SPLUNK INC.", symbol: "SPLK" },
      { id: "TWTR", name: "TWITTER, INC.", symbol: "TWTR" },
      { id: "AAPL", name: "Apple Inc.", symbol: "AAPL" },
      { id: "BKNG_US", name: "Booking Holdings Inc", symbol: "BKNG_US" },
      { id: "GPN_US", name: "Global Payments Inc", symbol: "GPN_US" },
      { id: "PXD", name: "PIONEER NATURAL RESOURCES COMPANY", symbol: "PXD" },
      { id: "BABA", name: "Alibaba Group Holding Ltd", symbol: "BABA" },
      { id: "EOG", name: "EOG RESOURCES, INC.", symbol: "EOG" },
    ]
  }

  getRecentSearchForCommo() {
    this.recentSearchList = CDConstants.commodities.slice(0, 24).flatMap(item => {
      return { id: item.id?.toString()!!, name: item.name!!, symbol: item.main_exchange!! }
    })
  }

  getRecentSearchForCryp() {
    this.recentSearchList = [
      {
        "id": "35",
        "name": "Decentraland",
        "symbol": "MANA"
      },
      {
        "id": "36",
        "name": "ApeCoin",
        "symbol": "APE"
      },
      {
        "id": "37",
        "name": "The Sandbox",
        "symbol": "SAND"
      },
      {
        "id": "38",
        "name": "KuCoin Token",
        "symbol": "KCS"
      },
      {
        "id": "39",
        "name": "Internet Computer",
        "symbol": "ICP"
      },
    ]
  }

  /**
   * ui binding
   */
  shouldShowList() {
    return !this.isLoadingRecentList
  }

  // show empty UX if no watchlists / items in selected watchlist after loading
  shouldShowEmptyUx() {
    return !this.isLoadingRecentList && this.recentSearchList.length == 0
  }
}
