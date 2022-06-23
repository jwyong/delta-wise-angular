import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-est-table-single',
  templateUrl: './est-table-single.component.html',
  styleUrls: ['./est-table-single.component.css']
})
export class EstTableSingleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: any[] = []
  displayedData: any[] = []
}
