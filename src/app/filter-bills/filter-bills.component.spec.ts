import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBillsComponent } from './filter-bills.component';

describe('FilterBillsComponent', () => {
  let component: FilterBillsComponent;
  let fixture: ComponentFixture<FilterBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBillsComponent],
    });
    fixture = TestBed.createComponent(FilterBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
