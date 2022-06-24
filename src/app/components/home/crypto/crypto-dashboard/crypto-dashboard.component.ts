import { Component, OnInit } from '@angular/core';
import { BaseDashboardComponent } from '../../base-dashboard/base-dashboard.component';

@Component({
  selector: 'app-crypto-dashboard',
  templateUrl: './crypto-dashboard.component.html',
  styleUrls: ['./crypto-dashboard.component.css']
})
export class CryptoDashboardComponent extends BaseDashboardComponent implements OnInit {
}
