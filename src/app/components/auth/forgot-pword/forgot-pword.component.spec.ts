import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwordComponent } from './forgot-pword.component';

describe('ForgotPwordComponent', () => {
  let component: ForgotPwordComponent;
  let fixture: ComponentFixture<ForgotPwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
