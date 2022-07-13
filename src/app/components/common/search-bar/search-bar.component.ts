import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { Cryptocurrency } from 'src/app/models/crypto/crypto';
import { ERROR_STR, ErroStrDyn } from '../../../constants/error-strings';
import { Commodity, CommoditySearch } from './../../../models/commodities/commodity';
import { CommonServices } from './../../../services/common-services';
import { DataService } from './../../../services/data-service';
import { RequestAddDialogComponent } from './request-add-dialog/request-add-dialog.component';

/**
 * search bar on main module page (includes optional grouping function)
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(
    protected dataService: DataService, protected commonServices: CommonServices, protected dialog: MatDialog,

    // TODO: TEMP
    protected route: ActivatedRoute,

  ) { }

  @ViewChild('searchInput') searchInput: any;

  // search bar label (e.g. Search Company)
  @Input() searchBarLabel: string = "";

  // http url
  @Input() searchUrl: string = ""

  // if grouping is required
  @Input() isGroupingEnabled = false

  /**
   * non-grped funcs
   */
  // get label for each option in dropdown
  @Input() getOptionsLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  // get label to be set to search bar on option selected
  @Input() getSelectedLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  // on option selected function
  @Input() onOptionSelected: ((item: any) => void) = (_: any): string => {
    return ""
  };

  /**
   * grped funcs
   */
  @Input() getGroupLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  module: EnumModules = this.route.snapshot.data['module']
  formControl = new FormControl();
  filteredItems: any
  tempSearchValue = ""

  /**
   * no search results related
   */
  shouldShowNSROption = false
  noSearchResultsStr = ERROR_STR.search.no_results

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      // don't search null or blank strings
      filter(res => {
        return res !== null && typeof res === 'string' && res.trim().length >= 1
      }),

      // don't make api call if query not changed from previous
      distinctUntilChanged(),
      debounceTime(400),

      tap(() => {
        this.filteredItems = [];
        this.dataService.setIsLoading(true)
      }),
      switchMap(value => this.getHttpObserver(value)
        .pipe(
          finalize(() => {
            this.dataService.setIsLoading(false)
          }),
          catchError(error => of({
            error
          }))
        )
      ),
    ).subscribe((data: any) => {
      if (data['data'] != null) {
        // reset nsr option
        this.shouldShowNSROption = false

        // TODO: TEMP - get hardcoded data for commo and crypto mods
        switch (this.module) {
          case EnumModules.equities:
            this.filteredItems = data['data'].slice(0, 1000)
            break

          case EnumModules.commodities:
            this.getCommoList()
            break

          case EnumModules.crypto:
            this.getCryptoList()
            break

          default:
            console.log(`search-bar: module "${this.module}" not implemented`)
            break
        }
      } else {
        if (data['errors'] == null)
          // no search results
          this.shouldShowNSROption = true
        else
          // show snackbar error
          this.commonServices.showSnackbar(ErroStrDyn.errorGeneric(data.error.message))
      }
    });
  }

  getHttpObserver(value: any) {
    this.tempSearchValue = value
    return this.commonServices.httpService.httpClient.get(this.searchUrl + value)
  }

  // TODO: TEMP - hardcoded results for commo and crypto mods
  commoList: Commodity[] = [
    { id: 1, commodity: "Adzuki bean", mainExchange: "OSE", category: "Agricultural" },
    { id: 2, commodity: "Cocoa", mainExchange: "ICE", category: "Agricultural" },
    { id: 3, commodity: "Coffee C", mainExchange: "CBOT", category: "Agricultural" },
    { id: 4, commodity: "Corn", mainExchange: "EURONEXT", category: "Agricultural" },
    { id: 5, commodity: "Corn", mainExchange: "DCE", category: "Agricultural" },
    { id: 6, commodity: "Cotton No.2", mainExchange: "ICE", category: "Agricultural" },
    { id: 7, commodity: "Frozen Concentrated Orange Juice", mainExchange: "ICE", category: "Agricultural" },
    { id: 8, commodity: "Milk", mainExchange: "CME", category: "Agricultural" },
    { id: 9, commodity: "No 2. Soybean", mainExchange: "DCE", category: "Agricultural" },
    { id: 10, commodity: "Oats", mainExchange: "CBOT", category: "Agricultural" },
    { id: 12, commodity: "Rapeseed", mainExchange: "EURONEXT", category: "Agricultural" },
    { id: 13, commodity: "Natural gas", mainExchange: "ICE", category: "Energy" },
    { id: 14, commodity: "Heating Oil", mainExchange: "NYMEX", category: "Energy" },
    { id: 15, commodity: "Gulf Coast Gasoline", mainExchange: "NYMEX", category: "Energy" },
    { id: 16, commodity: "RBOB Gasoline", mainExchange: "NYMEX", category: "Energy" },
    { id: 17, commodity: "Propane", mainExchange: "NYMEX", category: "Energy" },
    { id: 18, commodity: "Purified Terephthalic Acid (PTA)", mainExchange: "ZCE", category: "Energy" },
    { id: 19, commodity: "Random Length Lumber", mainExchange: "Chicago Mercantile Exchange", category: "Forest products" },
    { id: 20, commodity: "Hardwood Pulp", mainExchange: "Chicago Mercantile Exchange", category: "Forest products" },
    { id: 21, commodity: "Softwood Pulp", mainExchange: "Chicago Mercantile Exchange", category: "Forest products" },
    { id: 22, commodity: "Tin", mainExchange: "London Metal Exchange", category: "Metals" },
    { id: 23, commodity: "Aluminium", mainExchange: "London Metal Exchange, New York", category: "Metals" },
    { id: 24, commodity: "Aluminium alloy", mainExchange: "London Metal Exchange", category: "Metals" },
    { id: 25, commodity: "LME Nickel", mainExchange: "London Metal Exchange", category: "Metals" },
    { id: 26, commodity: "Cobalt", mainExchange: "London Metal Exchange", category: "Metals" },
    { id: 27, commodity: "Molybdenum", mainExchange: "London Metal Exchange", category: "Metals" },
    { id: 28, commodity: "Gold", mainExchange: "COMEX", category: "Metals" },
    { id: 29, commodity: "Platinum", mainExchange: "NYMEX", category: "Metals" },
    { id: 30, commodity: "Palladium", mainExchange: "NYMEX", category: "Metals" },
    { id: 31, commodity: "Silver", mainExchange: "COMEX", category: "Metals" },
  ]
  getCommoList() {
    this.filteredItems = [] as CommoditySearch[]
    const filteredList = this.commoList.filter(item => item.commodity.toLowerCase().includes(this.tempSearchValue));

    filteredList.forEach((commodity) => {
      var existCategory = this.filteredItems.find((commoditySearch: CommoditySearch) => commoditySearch.category == commodity.category)

      if (existCategory)
        // already got this category - just push to items array in this category
        existCategory.items.push(commodity)
      else {
        // no category yet - create new obj and push to main array
        existCategory = { category: commodity.category, items: [commodity] }

        this.filteredItems.push(existCategory)
      }
    })
  }

  // TODO: TEMP - hardcoded crypto list
  cryptoList: Cryptocurrency[] = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Tether", symbol: "USDT" },
    { name: "USD Coin", symbol: "USDC" },
    { name: "BNB", symbol: "BNB" },
    { name: "Cardano", symbol: "ADA" },
    { name: "XRP", symbol: "XRP" },
    { name: "Binance USD", symbol: "BUSD" },
    { name: "Solana", symbol: "SOL" },
    { name: "Dogecoin", symbol: "DOGE" },
    { name: "Polkadot", symbol: "DOT" },
    { name: "Wrapped Bitcoin", symbol: "WBTC" },
    { name: "TRON", symbol: "TRX" },
    { name: "Dai", symbol: "DAI" },
    { name: "Avalanche", symbol: "AVAX" },
    { name: "Shiba Inu", symbol: "SHIB" },
    { name: "UNUS SED LEO", symbol: "LEO" },
    { name: "Polygon", symbol: "MATIC" },
    { name: "Cronos", symbol: "CRO" },
    { name: "Litecoin", symbol: "LTC" },
    { name: "Chainlink", symbol: "LINK" },
    { name: "FTX Token", symbol: "FTT" },
    { name: "Uniswap", symbol: "UNI" },
    { name: "NEAR Protocol", symbol: "NEAR" },
    { name: "Stellar", symbol: "XLM" },
    { name: "Bitcoin Cash", symbol: "BCH" },
    { name: "Monero", symbol: "XMR" },
    { name: "Ethereum Classic", symbol: "ETC" },
    { name: "Algorand", symbol: "ALGO" },
    { name: "Cosmos", symbol: "ATOM" },
    { name: "Flow", symbol: "FLOW" },
    { name: "VeChain", symbol: "VET" },
    { name: "Decentraland", symbol: "MANA" },
    { name: "ApeCoin", symbol: "APE" },
    { name: "The Sandbox", symbol: "SAND" },
    { name: "KuCoin Token", symbol: "KCS" },
    { name: "Internet Computer", symbol: "ICP" },
    { name: "Filecoin", symbol: "FIL" },
    { name: "Elrond", symbol: "EGLD" },
    { name: "Aave", symbol: "AAVE" },
    { name: "Theta Network", symbol: "THETA" },
    { name: "Zcash", symbol: "ZEC" },
    { name: "TrueUSD", symbol: "TUSD" },
    { name: "Helium", symbol: "HNT" },
    { name: "EOS", symbol: "EOS" },
    { name: "Axie Infinity", symbol: "AXS" },
    { name: "Maker", symbol: "MKR" },
    { name: "Huobi Token", symbol: "HT" },
  ]

  getCryptoList() {
    this.filteredItems = this.cryptoList.filter(item => item.name.toLowerCase().includes(this.tempSearchValue));
  }

  /**
   * search input UX
   */
  // show/hide clear icon
  shouldShowClearIcon() {
    return this.searchInput.nativeElement.value.length > 0
  }

  clearIconOnClick() {
    this.searchInput.nativeElement.value = ""
  }

  /**
   * no search results
   */
  // show dialog for request addition
  showRequestAdditionDialog() {
    console.log("showRequestAdditionDialog()")
    const dialogRef = this.dialog.open(RequestAddDialogComponent, {
      panelClass: 'loader-dialog',
      minWidth: 400,
      data: {
        module: this.module
      }
    });
  }
}
