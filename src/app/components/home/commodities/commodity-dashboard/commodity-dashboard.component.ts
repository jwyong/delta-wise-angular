import { BaseDashboardComponent } from './../../base-dashboard/base-dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commodity-dashboard',
  templateUrl: './commodity-dashboard.component.html',
  styleUrls: ['./commodity-dashboard.component.css']
})
export class CommodityDashboardComponent extends BaseDashboardComponent implements OnInit {
  isLoadingDashBoard = false
}
