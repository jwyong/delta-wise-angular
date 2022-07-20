import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss']
})
export class InputClearComponent implements OnInit {
  constructor() { }

  @Input()
  _label = ""

  @Input()
  _formControl = new FormControl()

  @Input()
  _type = ""

  @Input()
  _required = false

  @Input()
  _hasPwordToggle = false

  @Input() getErrorMsg: ((formControl: FormControl) => string) = (_: FormControl): string => {
    return ""
  };

  ngOnInit(): void {
  }

  _shouldShowPword = false  
  getType() {
    if (!this._hasPwordToggle) return this._type

    return this._shouldShowPword ? 'text' : 'password'
  }
}
