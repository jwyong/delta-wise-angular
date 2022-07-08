import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhEstTableSingleComponent } from './ph-est-table-single.component';

describe('PhEstTableSingleComponent', () => {
  let component: PhEstTableSingleComponent;
  let fixture: ComponentFixture<PhEstTableSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhEstTableSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhEstTableSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
