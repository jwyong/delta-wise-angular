import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddDialogComponent } from './request-add-dialog.component';

describe('RequestAddDialogComponent', () => {
  let component: RequestAddDialogComponent;
  let fixture: ComponentFixture<RequestAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
