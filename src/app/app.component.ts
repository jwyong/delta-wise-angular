import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    // private localStorageService: LocalStorageService,
    // private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // subscribe to global obs
    this.dataService.isLoadingObs.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  title = 'edge-wise';

  // universal loading ux
  isLoading = false;
}
