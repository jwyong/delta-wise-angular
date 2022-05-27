import { Company } from 'src/app/models/equities/company';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
/**
 * service for global data transfer
 */
export class DataService {
  constructor() {}

  //=== app component
  // for loading animation
  private isLoadingSource = new BehaviorSubject(false);
  isLoadingObs = this.isLoadingSource.asObservable();
  setIsLoading(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }

  /**
   * equities
   */
  // company details for equity details page
  company = <Company>{}
}