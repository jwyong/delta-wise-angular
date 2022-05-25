import { EstimateDialogComponent } from './../../../common/estimate-dialog/estimate-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Company } from './../../../../models/company';
import { CompanyTableType, CompEstTable } from './../../../../models/company-estimate';
import { BaseComponent } from './../../../base/base.component';

// TODO: TEMP - hardcoded companyEst list
@Component({
  selector: 'app-equity-details',
  templateUrl: './equity-details.component.html',
  styleUrls: ['./equity-details.component.css']
})
export class EquityDetailsComponent extends BaseComponent implements OnInit {
  /**
   * company details
   */
  getCompanyIdFromRoute() {
    return this.route.snapshot.paramMap.get('id')
  }

  // this company
  company?: Company

  // list of company estimates from api
  companyEstimates: CompEstTable[] = []
  displayedColumns = ['rowType', 'q122', 'q222', 'q322', 'q422', 'fy22', 'fy23', 'fy24', 'fy25', 'fy26', 'fy27', 'fy28', 'fy29',]

  override ngOnInit(): void {
    // subscribe to company id changes
    this.route.params.subscribe(routeParams => {
      this.setIsLoading(true)

      // TODO: TEMP - hardcoded simulate get from api
      setTimeout(() => {
        // get new company details from api when company id is changed in route
        this.company = {
          name: "Astrazeneca", code: "AZN", Title: "some title", Year: "2007", imdbID: routeParams['id'] ?? ""
        }

        // get company estimates based on company id
        this.companyEstimates = [
          {
            rowType: CompanyTableType.revenue,
            q122: this.getRandomValue(), q222: this.getRandomValue(), q322: this.getRandomValue(), q422: this.getRandomValue(),
            fy22: this.getRandomValue(), fy23: this.getRandomValue(), fy24: this.getRandomValue(), fy25: this.getRandomValue(),
            fy26: this.getRandomValue(), fy27: this.getRandomValue(), fy28: this.getRandomValue(), fy29: this.getRandomValue()
          },
          {
            rowType: CompanyTableType.ebit,
            q122: this.getRandomValue(), q222: this.getRandomValue(), q322: this.getRandomValue(), q422: this.getRandomValue(),
            fy22: this.getRandomValue(), fy23: this.getRandomValue(), fy24: this.getRandomValue(), fy25: this.getRandomValue(),
            fy26: this.getRandomValue(), fy27: this.getRandomValue(), fy28: this.getRandomValue(), fy29: this.getRandomValue()
          },
          {
            rowType: CompanyTableType.ebitda,
            q122: this.getRandomValue(), q222: this.getRandomValue(), q322: this.getRandomValue(), q422: this.getRandomValue(),
            fy22: this.getRandomValue(), fy23: this.getRandomValue(), fy24: this.getRandomValue(), fy25: this.getRandomValue(),
            fy26: this.getRandomValue(), fy27: this.getRandomValue(), fy28: this.getRandomValue(), fy29: this.getRandomValue()
          },
          {
            rowType: CompanyTableType.netIncome,
            q122: this.getRandomValue(), q222: this.getRandomValue(), q322: this.getRandomValue(), q422: this.getRandomValue(),
            fy22: this.getRandomValue(), fy23: this.getRandomValue(), fy24: this.getRandomValue(), fy25: this.getRandomValue(),
            fy26: this.getRandomValue(), fy27: this.getRandomValue(), fy28: this.getRandomValue(), fy29: this.getRandomValue()
          },
          {
            rowType: CompanyTableType.eps,
            q122: this.getRandomValue(), q222: this.getRandomValue(), q322: this.getRandomValue(), q422: this.getRandomValue(),
            fy22: this.getRandomValue(), fy23: this.getRandomValue(), fy24: this.getRandomValue(), fy25: this.getRandomValue(),
            fy26: this.getRandomValue(), fy27: this.getRandomValue(), fy28: this.getRandomValue(), fy29: this.getRandomValue()
          },
        ]

        console.log("compEsti = ", this.companyEstimates)
        this.setIsLoading(false)
      }, 1000);
    });
  }

  getRandomValue(): string {
    return (Math.floor(Math.random() * (100 - -99) + -100)).toString()
  }

  /**
   * table related
   */
  // for highglighting row/col header on mouseover
  mouseOverRowType?: CompanyTableType

  // update which row/col is mouse-over now
  cellOnMouseOver(item: CompanyTableType) {
    // TODO: need to col header highlight when BE ready
    this.mouseOverRowType = item
  }

  // get class for highlighting
  getRowHighlightClass(rowType: CompanyTableType) {
    if (rowType == this.mouseOverRowType)
      return "bg-primary"
    else return ""
  }

  /**
   * input estimate dialog
   */
  showEstimateDialog(item: CompEstTable) {
    console.log("showEstimateDialog", item)
    const dialogRef = this.dialog.open(EstimateDialogComponent, {
      data: {
        title: this.getTitle(),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * UI binding
   */
  // get title (e.g. Aztrazaneca (AZN))
  getTitle() {
    if (this.company == null) return ""
    else return `${this.company.name} (${this.company.code}) - ${this.company.imdbID}`
  }
}
