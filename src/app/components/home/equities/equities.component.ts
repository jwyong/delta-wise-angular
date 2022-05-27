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
export class EquitiesComponent extends BaseComponent implements OnInit {
  /**
   * search bar UI
   */
  searchBarLabel = $localize`:@@company:${EWStrings.VAL_COMPANY}`
  @ViewChild('searchBar') searchBar: any;

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

  clearSearchBar() {
    this.searchBar.searchInput.nativeElement.value = ''
  }

  /**
   * company details
   */
  getCompanyIdFromRoute() {
    return this.route.firstChild?.snapshot.paramMap.get('ticker')
  }

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
