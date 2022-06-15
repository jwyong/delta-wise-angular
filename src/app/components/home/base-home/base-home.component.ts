import { BaseComponent } from './../../base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EWStrings } from 'src/app/utils/ew-strings';

@Component({
  selector: 'app-base-home',
  templateUrl: './base-home.component.html',
  styleUrls: ['./base-home.component.css']
})
export class BaseHomeComponent extends BaseComponent implements OnInit {
  @ViewChild('searchBar') searchBar: any;

  /**
  * search bar UI
  */
  searchBarLabel: string = ''

  clearSearchBar() {
    this.searchBar.searchInput.nativeElement.value = ''
  }
}
