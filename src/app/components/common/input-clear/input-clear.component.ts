import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss'],
  providers: [CommonModule]
})
export class InputClearComponent implements OnInit {
  constructor() { }

  @ViewChild('input') input: any;

  @Input()
  _label = ""

  @Input()
  _placeholder = ""

  @Input()
  _name = ""

  @Input()
  _formControl = new FormControl()

  @Input()
  _type: string | undefined

  @Input()
  _required = false

  @Input()
  _shouldCapitalize = false

  @Input()
  _hasPwordToggle = false

  @Input() getErrorMsg: ((formControl: FormControl) => string) = (_: FormControl): string => {
    return ""
  };

  ngOnInit(): void {
  }

  _shouldShowPword = false
  getType() {
    if (!this._hasPwordToggle) return this._type ?? "text"

    return this._shouldShowPword ? 'text' : 'password'
  }
}
