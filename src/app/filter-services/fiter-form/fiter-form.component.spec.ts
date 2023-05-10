import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiterFormComponent } from './fiter-form.component';

describe('FiterFormComponent', () => {
  let component: FiterFormComponent;
  let fixture: ComponentFixture<FiterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiterFormComponent]
    });
    fixture = TestBed.createComponent(FiterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
