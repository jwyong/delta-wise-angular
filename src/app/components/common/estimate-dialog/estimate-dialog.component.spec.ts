import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateDialogComponent } from './estimate-dialog.component';

describe('EstimateDialogComponent', () => {
  let component: EstimateDialogComponent;
  let fixture: ComponentFixture<EstimateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
