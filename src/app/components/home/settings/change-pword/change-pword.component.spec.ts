import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwordComponent } from './change-pword.component';

describe('ChangePwordComponent', () => {
  let component: ChangePwordComponent;
  let fixture: ComponentFixture<ChangePwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
