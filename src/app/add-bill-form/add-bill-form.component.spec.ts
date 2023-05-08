import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillFormComponent } from './add-bill-form.component';

describe('AddBillFormComponent', () => {
  let component: AddBillFormComponent;
  let fixture: ComponentFixture<AddBillFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillFormComponent]
    });
    fixture = TestBed.createComponent(AddBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
