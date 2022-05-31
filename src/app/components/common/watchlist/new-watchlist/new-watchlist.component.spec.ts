import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWatchlistComponent } from './new-watchlist.component';

describe('AddWatchlistComponent', () => {
  let component: NewWatchlistComponent;
  let fixture: ComponentFixture<NewWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWatchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
