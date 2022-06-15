import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';
import { HttpConstants } from 'src/app/utils/http-constants';
import { CommonServices } from './../../../services/common-services';
import { DataService } from './../../../services/data-service';
import { EWStrings } from './../../../utils/ew-strings';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(
    protected dataService: DataService, protected commonServices: CommonServices,
  ) { }
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

  formControl = new FormControl();
  filteredItems: any

  ngOnInit(): void {
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
          catchError(error => of({
            error
          }))
        )
      ),
    ).subscribe((data: any) => {
      if (data['data'] != null)
        this.filteredItems = data['data'].slice(0, 1000)
      else
        // show snackbar error
        this.commonServices.showSnackbar(EWStrings.errorGeneric(data.error.message))
    });
  }

  getHttpObserver(value: any) {
    console.log("url = ", this.searchUrl)
    return this.commonServices.httpService.httpClient.get(this.searchUrl + value)
  }

  /**
   * search input UX
   */
  // show/hide clear icon
  shouldShowClearIcon() {
    return this.searchInput.nativeElement.value.length > 0
  }

  clearIconOnClick() {
    this.searchInput.nativeElement.value = ""
  }
}
