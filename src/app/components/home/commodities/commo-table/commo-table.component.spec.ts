import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoTableComponent } from './commo-table.component';

describe('CommoTableComponent', () => {
  let component: CommoTableComponent;
  let fixture: ComponentFixture<CommoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
