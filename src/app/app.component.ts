import { ConsoleToggleService } from './services/console-toggle-service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private consoleToggleService: ConsoleToggleService,
    private dataService: DataService
  ) { 
    this.consoleToggleService.disableConsoleInProduction();
  }

  ngOnInit(): void {
    // subscribe to global obs
    this.dataService.isLoadingSource.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  title = 'edge-wise';

  // universal loading ux
  isLoading = false;
}
