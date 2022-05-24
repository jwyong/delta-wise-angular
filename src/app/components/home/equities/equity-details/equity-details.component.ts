import { Company } from './../../../../models/company';
import { BaseComponent } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';

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

  // TODO: TEMP - hardcoded company obj
  company = <Company>{}

  override ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      // get new company details from api when company id is changed in route
          this.setIsLoading(true)
    setTimeout(() => {
      this.company = {
        name: "Astrazeneca", code: "AZN", Title: "some title", Year: "2007", imdbID: routeParams['id'] ?? ""
      }
      this.setIsLoading(false)
    }, 1000);
    });

    // TODO: TEMP - simulate get company data from api

  }
}
