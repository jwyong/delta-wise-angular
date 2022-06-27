import { BaseDashboardComponent } from './../../base-dashboard/base-dashboard.component';
import { Component, OnInit } from '@angular/core';
import { Commodity } from 'src/app/models/commodities/commodity';
import { CDConstants } from './cd-constants';

@Component({
  selector: 'app-commodity-dashboard',
  templateUrl: './commodity-dashboard.component.html',
  styleUrls: ['./commodity-dashboard.component.css']
})
export class CommodityDashboardComponent extends BaseDashboardComponent implements OnInit {
  isLoadingDashBoard = false

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

  // TODO: TEMP - hardcoded full list of commo (get from BE when ready)
  commoList: Commodity[] = CDConstants.commodities

  override ngOnInit(): void {
    // simulate get table data
    this.setIsLoading(true)

    setTimeout(() => {
      this.agri1DisplayedData = CDConstants.commodities.filter(item => item.subCategory == "\"Grains, food and fiber\"")
      this.agri2DisplayedData = CDConstants.commodities.filter(item => item.subCategory == "Livestock and meat")
      this.energyDD = CDConstants.commodities.filter(item => item.category == "Energy")

      this.setIsLoading(false)
    }, 800);
  }

  getHumanisedHeaderCellValue(value: string) {
    switch (value) {
      case "commodity":
      case "symbol":
      case "currency":
        return value[0].toUpperCase() + value.substring(1);

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
