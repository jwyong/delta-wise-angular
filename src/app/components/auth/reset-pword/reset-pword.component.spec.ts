import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPwordComponent } from './reset-pword.component';

describe('ResetPwordComponent', () => {
  let component: ResetPwordComponent;
  let fixture: ComponentFixture<ResetPwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPwordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
