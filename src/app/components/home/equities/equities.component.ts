import { BaseHomeComponent } from './../base-home/base-home.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Company } from 'src/app/models/equities/company';
import { EWStrings } from 'src/app/utils/ew-strings';
import { RouterConstants } from 'src/app/utils/router-constants';

@Component({
  selector: 'app-equities',
  templateUrl: './equities.component.html',
  styleUrls: ['./equities.component.css']
})
export class EquitiesComponent extends BaseHomeComponent implements OnInit {
  override ngOnInit(): void {
    this.searchBarLabel = EWStrings.VAL_COMPANY
  }

  /**
   * search bar 
   */
  // setup functions for searchbar
  getOptionsLabel = (item: Company): string => {
    if (item == null) return ""

    return `${item.company} (${item.ticker})`
  }

  // go to equity detail page on option selected
  onOptionSelected = (item: Company): void => {
    // set company to dataService
    this.setCompanyToLS(item)

    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.ticker}`)
  }

  /**
   * company details
   */
  // set company to ls
  getCompanyFromLS() {
    let company = localStorage.getItem("company")
    if (company == null)
      return null
    else
      return JSON.parse(company)
  }

  setCompanyToLS(company: Company) {
    localStorage.setItem("company", JSON.stringify(company))
  }
}
