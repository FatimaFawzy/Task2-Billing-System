import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { FilterService } from '../filter.services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-bills',
  templateUrl: './filter-bills.component.html',
  styleUrls: ['./filter-bills.component.scss'],
})
export class FilterBillsComponent implements OnInit {
  loggedIn = this.authService.isLoggedIn();
  results: any;
  payment: any;
  isModalOpen = false;
  // new variable to get id from route url
  id = this.router.snapshot.paramMap.get('id')
    ? this.router.snapshot.paramMap.get('id')
    : null;
  tatalResult = 0;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  submitted = false;
  // billStatus array to use in form or  request result
  billStatus = ['All', 'UnPaid', 'Paid', 'Canceled', 'Late'];
  // initialize   form data
  filterForm: FormGroup = new FormGroup({
    payId: new FormControl(''),
    serviceId: new FormControl(this.id),
    phoneNumber: new FormControl(''),
    customerName: new FormControl(''),
    note: new FormControl(''),
    status: new FormControl(''),
    startCreateDate: new FormControl(''),
    endCreateDate: new FormControl(''),
    startDueDate: new FormControl(''),
    endDueDate: new FormControl(''),
    startPayDate: new FormControl(''),
    endPayDate: new FormControl(''),
    pageNumber: new FormControl(''),
    pageSize: new FormControl(''),
    orderByColumn: new FormControl(''),
    orderByType: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      payId: '',
      serviceId: [
        this.id,
        Validators.pattern(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' //parrern for Guid
        ),
      ],
      phoneNumber: '',
      customerName: '',
      note: '',
      status: null,
      startCreateDate: null,
      endCreateDate: null,
      startDueDate: null,
      endDueDate: null,
      startPayDate: null,
      endPayDate: null,
      pageNumber: 1,
      pageSize: 10,
      orderByColumn: 0,
      orderByType: 0,
    });
    //apply  filter on default form values
    this.applyFilters(this.filterForm.value);
    // check if any of inpyt data change
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000), // wait for 1000ms between consecutive changes
        distinctUntilChanged() // ignore changes if they are the same as the previous value
      )
      .subscribe((values: any) => {
        // reset serviceId to null if its value take '' by deleting its value to be with empty string
        values.serviceId = values.serviceId == '' ? null : values.serviceId;
        //apply  filter on changed form values
        this.applyFilters(values);
      });
  }
  applyFilters(values: any) {
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    const startCreateDate = values.startCreateDate;
    values.startCreateDate = values.startCreateDate
      ? new Date(startCreateDate).toISOString()
      : null;
    //  endCreateDate
    const endCreateDate = values.endCreateDate;
    values.endCreateDate = values.endCreateDate
      ? new Date(endCreateDate).toISOString()
      : null;
    //  startDueDate
    const startDueDate = values.startDueDate;
    values.startDueDate = values.startDueDate
      ? new Date(startDueDate).toISOString()
      : null;
    // endDueDate
    const endDueDate = values.endDueDate;
    values.endDueDate = values.endDueDate
      ? new Date(endDueDate).toISOString()
      : null;
    // startPayDate
    const startPayDate = values.startPayDate;
    values.startPayDate = values.startPayDate
      ? new Date(startPayDate).toISOString()
      : null;
    // endPayDate
    const endPayDate = values.endPayDate;
    values.endPayDate = values.endPayDate
      ? new Date(endPayDate).toISOString()
      : null;
    // Make the API call with the form values and update the results property
    this.filterService.getFilteredResults(values, 'Bill/FilterBills').subscribe(
      (response) => {
        this.results = response.data.items;
        this.hasNextPage = response.data.hasNextPage;
        this.hasPreviousPage = response.data.hasPreviousPage;
        this.tatalResult = response.data.totalCount;
        this.submitted = false;
        console.log(this.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get form(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }
  openModal(payment: any) {
    this.payment = payment;
    console.log(payment);

    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  Previous() {
    this.filterForm.value.pageNumber--;
    this.applyFilters(this.filterForm.value);
  }
  next() {
    this.filterForm.value.pageNumber++;
    this.applyFilters(this.filterForm.value);
  }
}
