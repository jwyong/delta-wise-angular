import { Component, OnInit } from '@angular/core';
import { CommonStrDyn } from 'src/app/constants/common-strings';
import { Commodity } from 'src/app/models/commodities/commodity';
import { BaseDashboardComponent } from './../../base-dashboard/base-dashboard.component';
import { CDConstants } from './cd-constants';

@Component({
  selector: 'app-commodity-dashboard',
  templateUrl: './commodity-dashboard.component.html',
  styleUrls: ['./commodity-dashboard.component.css']
})
export class CommodityDashboardComponent extends BaseDashboardComponent implements OnInit {
  /**
   * table related
   */
  // disaplayed cols based on wiki grps
  // fullDC = ["commodity", "mainExchange", "mic", "contractSize", "symbol", "currency", "category", "subCategory"]
  displayedCols1 = ["commodity", "mainExchange", "mic", "contractSize", "symbol"]
  displayedCols2 = ["commodity", "contractSize", "currency", "mainExchange", "symbol"]
  displayedCols3 = ["commodity", "mainExchange", "contractSize", "symbol"]
  displayedCols4 = ["commodity", "contractSize", "currency", "mainExchange"]

  // displayed data for each sub/category
  agri1DisplayedData: any[] = []
  agri2DisplayedData: any[] = []
  energyDD: any[] = []
  forestDD: any[] = []
  metals1DD: any[] = []
  metals2DD: any[] = []
  othersDD: any[] = []

  // TODO: TEMP - hardcoded full list of commo (get from BE when ready)
  commoList: Commodity[] = CDConstants.commodities
  isCommoListExpanded = false

  onCommoListExpanded() {
    if (this.agri1DisplayedData.length == 0) {
      // simulate get table data
      this.isLoadingDashBoard = true

      setTimeout(() => {
        this.agri1DisplayedData = CDConstants.commodities.filter(item => item.subCategory == "\"Grains, food and fiber\"")
        this.agri2DisplayedData = CDConstants.commodities.filter(item => item.subCategory == "Livestock and meat")
        this.energyDD = CDConstants.commodities.filter(item => item.category == "Energy")
        this.forestDD = CDConstants.commodities.filter(item => item.category == "Forest products")
        this.metals1DD = CDConstants.commodities.filter(item => item.subCategory == "Industrial")
        this.metals2DD = CDConstants.commodities.filter(item => item.subCategory == "Precious")
        this.othersDD = CDConstants.commodities.filter(item => item.category == "Other")

        this.isLoadingDashBoard = false
      }, 800);
    }
  }

  getHumanisedHeaderCellValue(value: string) {
    switch (value) {
      case "commodity":
      case "symbol":
      case "currency":
        return CommonStrDyn.capitalise(value);

      case "mainExchange":
        return "Main Exchange"

      case "contractSize":
        return "Contract Size"

      case "mic":
        return "MIC"

      default:
        return value
    }
  }
}
