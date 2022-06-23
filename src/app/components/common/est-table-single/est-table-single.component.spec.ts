import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstTableSingleComponent } from './est-table-single.component';

describe('EstTableSingleComponent', () => {
  let component: EstTableSingleComponent;
  let fixture: ComponentFixture<EstTableSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstTableSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstTableSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
