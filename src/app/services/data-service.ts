import { Company } from 'src/app/models/equities/company';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/common/user';

@Injectable()
/**
 * service for global data transfer
 */
export class DataService {
  constructor() {}

  //=== app component
  // for loading animation
  isLoadingSource = new BehaviorSubject(false);
  setIsLoading(isLoading: boolean) {
    this.isLoadingSource.next(isLoading);
  }
}