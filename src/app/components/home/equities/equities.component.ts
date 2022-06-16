import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/equities/company';
import { EWStrings } from 'src/app/utils/ew-strings';
import { HttpConstants } from 'src/app/utils/http-constants';
import { RouterConstants } from 'src/app/utils/router-constants';
import { environment } from 'src/environments/environment';
import { BaseHomeComponent } from './../base-home/base-home.component';

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
  searchUrl = `${environment.apiUrl}/${HttpConstants.HTTP_API_VERSION}/${HttpConstants.API_EQUITIES_SEARCH}?s=`

  // setup functions for searchbar
  getOptionsLabel = (item: Company): string => {
    if (item == null) return ""

    return `${item.company} (${item.ticker})`
  }

  // go to equity detail page on option selected
  onOptionSelected = (item: Company): void => {
    this.navigateTo(`${RouterConstants.ROUTER_PATH_DETAILS}/${item.ticker}`)
  }
}
