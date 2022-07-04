import { BaseDashboardComponent } from './../../base-dashboard/base-dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equity-dashboard',
  templateUrl: './equity-dashboard.component.html',
  styleUrls: ['./equity-dashboard.component.css']
})
export class EquityDashboardComponent extends BaseDashboardComponent implements OnInit {
  override ngOnInit(): void {
    console.log('equityDashboard comp')
  }
}
