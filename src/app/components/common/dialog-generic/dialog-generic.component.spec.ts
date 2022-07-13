import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenericComponent } from './dialog-generic.component';

describe('DialogGenericComponent', () => {
  let component: DialogGenericComponent;
  let fixture: ComponentFixture<DialogGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
