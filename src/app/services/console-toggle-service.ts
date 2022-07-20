import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * service for disabling console log on prod
 */
export class ConsoleToggleService {

  constructor() {

  }

  disableConsoleInProduction(): void {
    if (environment.production) {
      console.info(`Welcome to DeltaWise!`);
      console.log = function (): void { };
      console.debug = function (): void { };
      console.warn = function (): void { };
      console.info = function (): void { };
    }
  }
}
