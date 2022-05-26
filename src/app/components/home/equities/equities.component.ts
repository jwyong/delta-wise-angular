import { Component, OnInit } from '@angular/core';
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

  // setup functions for searchbar
  getOptionsLabel = (item: Company): string => {
    if (item == null) return ""

    return `${item.company} (${item.ticker})`
  }

  // go to equity detail page on option selected
  onOptionSelected = (item: Company): void => {
    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.ticker}`)
  }

  /**
   * company details
   */
  getCompanyIdFromRoute() {
    return this.route.firstChild?.snapshot.paramMap.get('ticker')
  }
}
