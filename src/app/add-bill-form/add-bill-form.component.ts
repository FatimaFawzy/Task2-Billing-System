import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

import { FilterService } from '../filter.services';

@Component({
  selector: 'app-add-bill-form',
  templateUrl: './add-bill-form.component.html',
  styleUrls: ['./add-bill-form.component.scss'],
})
export class AddBillFormComponent implements OnInit {
  @Input() serviceId: any;
  responseMessage = ''; // new variable to store the response message
  succeeded = false;
  submitted = false;
  // form data initializer
  billForm: FormGroup = new FormGroup({
    billId: new FormControl(''),
    customerName: new FormControl(''),
    dueDate: new FormControl(''),
    clientType: new FormControl(''),
    phoneNumber: new FormControl(''),
    amount: new FormControl(''),
    note: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    // set form  validator
    this.billForm = this.formBuilder.group({
      payId: '',
      customerName: ['', [Validators.required, Validators.minLength(1)]],
      dueDate: [null, [Validators.required, Validators.minLength(1)]],
      clientType: [0, Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]{9,20}$'),
        ],
      ],
      serviceId: [
        this.serviceId,
        [Validators.required, Validators.minLength(1)],
      ],
      amount: [
        '',
        [Validators.required, Validators.minLength(1), Validators.min(251)],
      ],
      note: [''],
    });
  }
  // return  form validatore controls to be checked on html form
  get form(): { [key: string]: AbstractControl } {
    return this.billForm.controls;
  }

  onSubmit(): void {
    // submit form is true
    this.submitted = true;
    if (this.billForm.invalid) {
      return;
    }
    const values = this.billForm.value;
    const dueDate = values.dueDate;
    values.startCreateDate = values.dueDate
      ? new Date(dueDate).toISOString()
      : null;
    values.serviceId = this.serviceId; //set serviceId that received from addBill form modal
    // Make the API call with the form values and add bill
    this.filterService.getFilteredResults(values, 'Bill/AddBill ').subscribe(
      (response) => {
        // check responce and update responseMessage
        this.succeeded = response.succeeded;
        this.responseMessage = response.succeeded
          ? 'Bill Added succeesfuly '
          : response.error.message;
        // set duration to let responseMessage disappear after delay
        setTimeout(() => {
          this.responseMessage = '';
        }, 1500);
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
