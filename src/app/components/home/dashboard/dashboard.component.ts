import { debounceTime, distinctUntilChanged, filter, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { Company } from './../../../models/company';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  companyAutoFC = new FormControl();
  filteredCompanies = <Company[]>{};

  override ngOnInit() {
    // this.filteredOptions = this.companyAutoFC.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap(val => {
    //     console.log(`query = ${val}`)
    //     return this._filter(val || '')
    //   })
    // );

    this.companyAutoFC.valueChanges.pipe(
      // don't search null or blank strings
      filter(res => {
        console.log("res", res)
        return res !== null && res.trim().length >= 1
      }),

      // don't make api call if query not changed from previous
      distinctUntilChanged(),
      debounceTime(400),

      tap(() => {
        console.log("tap")
        // this.errorMsg = "";
        this.filteredCompanies = [];
        this.setIsLoading(true)
      }),
      switchMap(value => this.http.get('http://www.omdbapi.com/?apikey=e8067b53&s=' + value)
        .pipe(
          finalize(() => {
            this.setIsLoading(false)
          }),
        )
      )
    ).subscribe((data: any) => {
      if (data['Search'] == undefined) {
        console.log("search result undefined")
        // this.errorMsg = data['Error'];
        this.filteredCompanies = [];
      } else {
        console.log(`data = `, data)
        // this.errorMsg = "";
        this.filteredCompanies = data['Search'];
      }
      console.log(this.filteredCompanies);
    });

  }

  displayFn(company: Company): string {
    return company && company.name ? company.name : '';
  }

  onSelected(company: Company) {
    console.log("company = ", company)
  }

  // _filter(val: string): Observable<any[]> {
  //   // call the service which makes the http-request
  //   return this.service.getData()
  //     .pipe(
  //       map(response => response.filter(option => {
  //         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
  //       }))
  //     )
  // }


  // private _filter(name: string): Company[] {
  //   const filterValue = name.toLowerCase();

  //   return this.companyList.filter(company => company.name.toLowerCase().includes(filterValue));
  // }
}
