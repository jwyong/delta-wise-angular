import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-estimate-dialog',
  templateUrl: './estimate-dialog.component.html',
  styleUrls: ['./estimate-dialog.component.css']
})
export class EstimateDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) protected title: string) { }

  ngOnInit(): void {
  }

  // title: string = ""
}
