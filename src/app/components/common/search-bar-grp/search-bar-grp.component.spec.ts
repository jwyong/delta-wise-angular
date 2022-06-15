import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarGrpComponent } from './search-bar-grp.component';

describe('SearchBarGrpComponent', () => {
  let component: SearchBarGrpComponent;
  let fixture: ComponentFixture<SearchBarGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarGrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
