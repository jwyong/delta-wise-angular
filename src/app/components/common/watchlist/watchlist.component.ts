import { Component, OnInit } from '@angular/core';
import { EnumModules, EWConstants } from 'src/app/utils/ew-constants';
import { EWStrings } from 'src/app/utils/ew-strings';
import { Watchlist, WatchlistItem } from './../../../models/common/watchlist';
import { BaseDashboardComponent } from '../../home/base-dashboard/base-dashboard.component';
import { NewWatchlistComponent } from './new-watchlist/new-watchlist.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent extends BaseDashboardComponent implements OnInit {
  isLoadingWatchlist = false
  isEditMode = false
  watchlists: Watchlist[] = [];
  selectedWatchlist = <Watchlist>{}

  /**
   * expansion panel
   */
  onPanelExpanded() {
    this.isWatchlistExpanded = true

    // only make api call if not already done
    if (this.watchlists.length == 0)
      this.getWatchlists()
  }

  onPanelCollapsed() {
    this.isWatchlistExpanded = false
  }

  /**
   * watchlist
   */
  // get watchlists based on module
  getWatchlists() {
    this.isLoadingWatchlist = true

    setTimeout(() => {
      switch (this.module) {
        case EnumModules.equities:
          this.getWatchlistForEquities()
          break

        case EnumModules.crypto:
          this.getWatchlistForCrypto()
          break

        case EnumModules.commodities:
          this.getWatchlistForCommodities()
          break
      }

      // select first item by default if got
      if (this.watchlists.length > 0) {
        this.selectedWatchlist = {
          id: this.watchlists[0].id, name: this.watchlists[0].name,
          children: this.getRandomWatchlistItems()
        }
      }

      this.isLoadingWatchlist = false
    }, 800);

  }

  getWatchlistForEquities() {
    this.watchlists = [
      { id: "1", name: 'Tech' },
      { id: "2", name: 'Energy' },
      { id: "3", name: 'Finance' },
      { id: "4", name: 'Healthcare' },
      { id: "5", name: 'Consumer' },
      { id: "6", name: 'Real Estate' },
      { id: "7", name: 'Utils' },
    ]
  }

  getWatchlistForCrypto() {
    this.watchlists = [
      { id: "1", name: 'Stable' },
      { id: "2", name: 'Holding' },
      { id: "3", name: 'Monitor' },
      { id: "4", name: 'Hype' },
      { id: "5", name: 'Meta' },
    ]
  }

  getWatchlistForCommodities() {
    this.watchlists = [
      // { id: "1", name: 'Watchlist' },
      // { id: "2", name: 'agri' },
      // { id: "3", name: 'energy' },
      // { id: "4", name: 'metals' },
      // { id: "5", name: 'KIV' },
    ]
  }

  /**
   * chips
   */
  // chipOnClick: get whatchlist from api
  chipOnClick(watchlist: Watchlist) {
    // TODO: TEMP - hardcoded selected watchlist
    this.isLoadingWatchlist = true

    setTimeout(() => {
      var children: WatchlistItem[] = []
      if (watchlist.id != "2") children = this.getRandomWatchlistItems()

      this.selectedWatchlist = {
        id: watchlist.id, name: watchlist.name,
        children: children
      }
      this.isLoadingWatchlist = false
      this.isEditMode = false
    }, 500);
  }

  // remove chip btn: confirm then remove chip on UI + api
  removeChipOnClick(watchlist: Watchlist): void {
    this.showGenericDialog(
      {
        title: EWStrings.VAL_DEL_WATCHLIST_TITLE,
        subTitle: EWStrings.deleteWatchlist(watchlist.name),
        positiveBtnFunc: () => {
          const index = this.watchlists.indexOf(watchlist);

          if (index >= 0) {
            this.watchlists.splice(index, 1);
          }
        }
      }
    )
  }

  // TEMP: generate random items for each watchlist
  randomCompanies: WatchlistItem[] = [
    { id: "FB", name: "Meta Platforms Inc" },
    { id: "SQ_US", name: "Block, Inc." },
    { id: "AMZN", name: "AMAZON.COM, INC." },
    { id: "PYPL", name: "PayPal Holdings, Inc." },
    { id: "GOOGL", name: "Alphabet Inc." },
    { id: "CRM", name: "SALESFORCE COM INC" },
    { id: "NFLX", name: "NETFLIX, INC." },
    { id: "UBER_US", name: "Uber Technologies Inc" },
    { id: "NVDA", name: "NVIDIA CORPORATION" },
    { id: "SNAP_US", name: "Snap Inc" },
    { id: "LYFT_US", name: "Lyft, Inc" },
    { id: "ABNB_US", name: "Airbnb Inc" },
    { id: "PANW", name: "Palo Alto Networks, Inc." },
    { id: "INTC", name: "INTEL CORPORATION" },
    { id: "FANG_US", name: "DIAMONDBACK ENERGY INC" },
    { id: "SPLK", name: "SPLUNK INC." },
    { id: "TWTR", name: "TWITTER, INC." },
    { id: "MCD", name: "McDONALDS CORPORATION" },
    { id: "AAPL", name: "Apple Inc." },
    { id: "BKNG_US", name: "Booking Holdings Inc" },
    { id: "MSFT", name: "MICROSOFT CORPORATION" },
    { id: "GPN_US", name: "Global Payments Inc" },
    { id: "PXD", name: "PIONEER NATURAL RESOURCES COMPANY" },
    { id: "FIS", name: "Fidelity National Information Services, Inc." },
    { id: "FISV", name: "Fiserv, Inc." },
    { id: "BABA", name: "Alibaba Group Holding Ltd" },
    { id: "SHOP_US", name: "SHOPIFY INC" },
    { id: "V", name: "VISA INC." },
    { id: "EOG", name: "EOG RESOURCES, INC." },
  ]

  randomCommodities: WatchlistItem[] = [
    // { id: "1", name: "Corn" },
    // { id: "2", name: "Purified Terephthalic Acid (PTA)" },
    // { id: "3", name: "Propane" },
    // { id: "4", name: "Gulf Coast Gasoline" },
    // { id: "5", name: "Heating Oil" },
    // { id: "6", name: "Natural gas" },
    // { id: "7", name: "Ethanol" },
    // { id: "8", name: "Brent Crude" },
    // { id: "9", name: "WTI Crude Oil" },
    // { id: "10", name: "Feeder Cattle" },
    // { id: "11", name: "Live Cattle" },
    // { id: "12", name: "Lean Hogs" },
    // { id: "13", name: "Wheat" },
    // { id: "14", name: "Soybean" },
    // { id: "15", name: "Sugar No.11" },
    // { id: "16", name: "Sugar No.14" },
    // { id: "17", name: "Aluminium" },
    // { id: "18", name: "Gold" },
    // { id: "19", name: "Silver" },
    // { id: "20", name: "Platinum" },
  ]

  randomCryptos: WatchlistItem[] = [
    { id: "BTC", name: "Bitcoin" },
    { id: "ETH", name: "Ethereum" },
    { id: "USDT", name: "Tether" },
    { id: "USDC", name: "USD Coin" },
    { id: "BNB", name: "BNB" },
    { id: "ADA", name: "Cardano" },
    { id: "XRP", name: "XRP" },
    { id: "BUSD", name: "Binance USD" },
    { id: "SOL", name: "Solana" },
    { id: "DOGE", name: "Dogecoin" },
    { id: "DOT", name: "Polkadot" },
    { id: "WBTC", name: "Wrapped Bitcoin" },
    { id: "TRX", name: "TRON" },
    { id: "DAI", name: "Dai" },
    { id: "AVAX", name: "Avalanche" },
    { id: "SHIB", name: "Shiba Inu" },
    { id: "LEO", name: "UNUS SED LEO" },
    { id: "MATIC", name: "Polygon" },
  ]

  getRandomWatchlistItems(): any[] {
    switch (this.module) {
      case EnumModules.equities:
        return this.randomCompanies.slice(Math.floor(Math.random() * (11 - 3 + 1)) + 3)

      case EnumModules.commodities:
        return this.randomCommodities.slice(Math.floor(Math.random() * (11 - 3 + 1)) + 3)

      case EnumModules.crypto:
        return this.randomCryptos.slice(Math.floor(Math.random() * (11 - 3 + 1)) + 3)

      default:
        return []
    }
  }

  /**
   * ui
   */
  // show edit btn if there are watchlists to edit
  shouldShowWLEditBtn() {
    return this.isWatchlistExpanded && !this.isLoadingWatchlist && this.watchlists.length > 0
  }

  // show watchlists chips if got watchlist + not loading
  shouldShowWatchlists() {
    return !this.isLoading() && this.watchlists.length > 0
  }

  // show watchlist items if got items in selected watchlist + not loading
  shouldShowWLItems() {
    return (this.selectedWatchlist.children ?? []).length > 0
  }

  // show empty UX if no watchlists / items in selected watchlist after loading
  shouldShowEmptyUx() {
    return !this.isLoading() && !this.isLoadingWatchlist &&
      (this.watchlists.length == 0 || (this.selectedWatchlist.children ?? []).length == 0)
  }

  /**
   * empty watchlist(s) ux
   */
  isWatchlistsEmpty() {
    return this.watchlists.length == 0
  }

  // click on empty watchlist - either add new watchlist or focus on search bar
  emptyWatchlistOnClick() {
    if (this.isWatchlistsEmpty())
      // watchlist empty - add new watchlist
      this.showNewWatchlistDialog()
  }

  /**
   * new watchlist
   */
  showNewWatchlistDialog() {
    const dialogRef = this.dialog.open(NewWatchlistComponent, {
      maxWidth: '25vw',
      minWidth: 350,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showSnackbar(`New watchlist created: ${result['name']}`)
    });
  }
}
