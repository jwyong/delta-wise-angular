import { map, Observable, startWith } from 'rxjs';
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
  companyList = <Company[]>{}
  // options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<Company[]>;

  override ngOnInit() {
    this.filteredOptions = this.companyAutoFC.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.companyList.slice())),
    );
  }

  displayFn(company: Company): string {
    return company && company.name ? company.name : '';
  }

  private _filter(name: string): Company[] {
    const filterValue = name.toLowerCase();

    return this.companyList.filter(company => company.name.toLowerCase().includes(filterValue));
  }
}
