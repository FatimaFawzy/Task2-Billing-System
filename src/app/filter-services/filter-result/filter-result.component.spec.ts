import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResultComponent } from './filter-result.component';

describe('FilterResultComponent', () => {
  let component: FilterResultComponent;
  let fixture: ComponentFixture<FilterResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterResultComponent]
    });
    fixture = TestBed.createComponent(FilterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
