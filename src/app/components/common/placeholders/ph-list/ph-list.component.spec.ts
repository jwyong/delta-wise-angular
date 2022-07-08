import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhListComponent } from './ph-list.component';

describe('PhListComponent', () => {
  let component: PhListComponent;
  let fixture: ComponentFixture<PhListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
