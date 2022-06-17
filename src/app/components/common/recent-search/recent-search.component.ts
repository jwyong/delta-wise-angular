import { EnumModules } from './../../../utils/ew-constants';
import { RecentSearch } from './../../../models/common/recent-search';
import { MainComponent } from './../../home/main/main.component';
import { BaseComponent } from './../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { EWConstants } from 'src/app/utils/ew-constants';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent extends MainComponent implements OnInit {
  isLoadingRecentList = false
  recentSearchList: RecentSearch[] = []

  override ngOnInit(): void {
    // TODO: TEMP - populate recent search list based on module
    this.isLoadingRecentList = true

    setTimeout(() => {
      this.getRecentSearch()
      this.isLoadingRecentList = false
    }, 800);
  }

  getRecentSearch() {
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
  }

  getRecentSearchForEqt() {
    this.recentSearchList = [
      { id: "FB", name: "Meta Platforms Inc" },
      { id: "AMZN", name: "AMAZON.COM, INC." },
      { id: "PYPL", name: "PayPal Holdings, Inc." },
      { id: "NFLX", name: "NETFLIX, INC." },
      { id: "UBER_US", name: "Uber Technologies Inc" },
      { id: "NVDA", name: "NVIDIA CORPORATION" },
      { id: "SNAP_US", name: "Snap Inc" },
      { id: "PANW", name: "Palo Alto Networks, Inc." },
      { id: "INTC", name: "INTEL CORPORATION" },
      { id: "SPLK", name: "SPLUNK INC." },
      { id: "TWTR", name: "TWITTER, INC." },
      { id: "AAPL", name: "Apple Inc." },
      { id: "BKNG_US", name: "Booking Holdings Inc" },
      { id: "GPN_US", name: "Global Payments Inc" },
      { id: "PXD", name: "PIONEER NATURAL RESOURCES COMPANY" },
      { id: "BABA", name: "Alibaba Group Holding Ltd" },
      { id: "EOG", name: "EOG RESOURCES, INC." },
    ]
  }

  getRecentSearchForCommo() {
    this.recentSearchList = [
      { id: "CBOT", name: "Corn" },
      { id: "NYMEX", name: "Propane" },
      { id: "NYMEX", name: "Gulf Coast Gasoline" },
      { id: "NYMEX", name: "Heating Oil" },
      { id: "ICE", name: "Natural gas" },
      { id: "ICE", name: "Brent Crude" },
      { id: "Chicago Mercantile Exchange", name: "Feeder Cattle" },
      { id: "Chicago Mercantile Exchange", name: "Live Cattle" },
      { id: "Chicago Mercantile Exchange", name: "Lean Hogs" },
      { id: "COMEX", name: "Gold" },
      { id: "COMEX", name: "Silver" },
      { id: "NYMEX", name: "Platinum" },
    ]
  }

  getRecentSearchForCryp() {
    this.recentSearchList = [
      // { id: "BTC", name: "Bitcoin" },
      // { id: "ETH", name: "Ethereum" },
      // { id: "USDC", name: "USD Coin" },
      // { id: "ADA", name: "Cardano" },
      // { id: "XRP", name: "XRP" },
      // { id: "DOGE", name: "Dogecoin" },
      // { id: "TRX", name: "TRON" },
      // { id: "AVAX", name: "Avalanche" },
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
    return !this.isLoading() && !this.isLoadingRecentList && this.recentSearchList.length == 0
  }
}
