import { Commodity } from 'src/app/models/commodities/commodity';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/components/base/base.component';
import { CommonStrDyn } from 'src/app/constants/common-strings';
import { EnumModules } from 'src/app/constants/enum/enum-modules';
import { Resp } from 'src/app/models/common/resp';
import { Cryptocurrency } from 'src/app/models/crypto/crypto';
import { ERROR_STR } from '../../../constants/error-strings';
import { RequestAddDialogComponent } from './request-add-dialog/request-add-dialog.component';

/**
 * search bar on main module page (includes optional grouping function)
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent extends BaseComponent implements OnInit {
  @ViewChild('searchInput') searchInput: any;

  // search bar label (e.g. Search Company)
  @Input() searchBarLabel: string = "";

  // http url
  @Input() searchUrl: string = ""

  // if grouping is required
  @Input() isGroupingEnabled = false

  /**
   * non-grped funcs
   */
  // get label for each option in dropdown
  @Input() getOptionsLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  // get label to be set to search bar on option selected
  @Input() getSelectedLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  // on option selected function
  @Input() onOptionSelected: ((item: any) => void) = (_: any): string => {
    return ""
  };

  /**
   * grped funcs
   */
  @Input() getGroupLabel: ((item: any) => string) = (_: any): string => {
    return ""
  };

  module: EnumModules = this.route.snapshot.data['module']
  formControl = new FormControl();
  filteredItems: any
  tempSearchValue = ""

  /**
   * no search results related
   */
  shouldShowNSROption = false
  noSearchResultsStr = ERROR_STR.search.no_results

  override ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      // don't search null or blank strings
      filter(res => {
        return res !== null && typeof res === 'string' && res.trim().length >= 1
      }),

      // don't make api call if query not changed from previous
      distinctUntilChanged(),
      debounceTime(400),

      tap(() => {
        this.filteredItems = [];
        this.dataService.setIsLoading(true)
      }),
      switchMap(value => this.getHttpObserver(value)
        .pipe(
          finalize(() => {
            this.dataService.setIsLoading(false)
          }),
          catchError(error =>
            of({
              error
            })
          )
        )
      ),
    ).subscribe((data: any) => {
      console.log('search-bar, data = ', data)

      let error = data['error']

      if (error == null) {
        // no http error - check if got results
        let result = data['data']

        if (result == null || result.length == 0)
          // no results - show no results item
          this.shouldShowNSROption = true

        else {
          // got results - populate autocomplete list
          this.shouldShowNSROption = false

          // TODO: TEMP - get hardcoded data for commo and crypto mods
          switch (this.module) {
            case EnumModules.equities:
              this.filteredItems = result.slice(0, 100)
              break

            case EnumModules.commodities:
              this.getCommoList(result.slice(0, 100))
              break

            case EnumModules.crypto:
              this.filteredItems = result.slice(0, 100)
              break

            default:
              console.log(`search-bar: module "${this.module}" not implemented`)
              break
          }
        }
      } else {
        console.log('search-bar, error = ', error)

        // http error - check token/etc
        this.handleRespError(<Resp<string>>{ status: false, message: error.message, data: data, errors: error.error.errors })
      }
    });
  }

  getHttpObserver(value: any) {
    this.tempSearchValue = value
    return this.httpService.httpClient.get(this.searchUrl + value)
  }

  // get commodity filtered list based on category
  getCommoList(commoList: any) {
    this.filteredItems = [] as Commodity[]

    commoList.forEach((commodity: Commodity) => {
      var existCategory = this.filteredItems.find((commoditySearch: Commodity) => commoditySearch.category == commodity.category)

      if (existCategory)
        // already got this category - just push to items array in this category
        existCategory.items.push(commodity)
      else {
        // no category yet - create new obj and push to main array
        existCategory = { category: commodity.category, items: [commodity] }

        this.filteredItems.push(existCategory)
      }
    })
  }

  /**
   * search input UX
   */
  // "Search Company"
  getSearchLabel() {
    return CommonStrDyn.searchBarLabel(this.searchBarLabel.toLocaleLowerCase())
  }

  // show/hide clear icon
  shouldShowClearIcon() {
    return this.searchInput.nativeElement.value.length > 0
  }

  clearIconOnClick() {
    this.searchInput.nativeElement.value = ""
  }

  /**
   * no search results
   */
  // show dialog for request addition
  showRequestAdditionDialog() {
    const dialogRef = this.dialog.open(RequestAddDialogComponent, {
      panelClass: 'loader-dialog',
      minWidth: 400,
      data: {
        module: this.module
      }
    });
  }
}
