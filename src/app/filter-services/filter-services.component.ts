import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterService } from '../filter.services';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter-services.component.html',
  styleUrls: ['./filter-services.component.scss'],
})
export class FilterServicesComponent implements OnInit {
  results: any;
  submitted = false;
  serviceId: any;
  tatalResult = 0;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isModalOpen = false;
  // initialize form data
  filterForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    note: new FormControl(''),
    active: new FormControl(''),
    pageNumber: new FormControl(''),
    pageSize: new FormControl(''),
    startCreateDate: new FormControl(''),
    endCreateDate: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      name: '',
      note: '',
      active: null,
      pageNumber: 1,
      pageSize: 10,
      startCreateDate: null,
      endCreateDate: null,
    });
    // apply first defualt filter
    this.applyFilters(this.filterForm.value);
    // check if any of input value change
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500), // wait for 500ms between consecutive changes
        distinctUntilChanged() // ignore changes if they are the same as the previous value
      )
      .subscribe((values: any) => {
        // apply filter while data changed
        this.applyFilters(values);
      });
  }

  applyFilters(values: any) {
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    // startCreateDate
    const startCreateDate = values.startCreateDate;
    values.startCreateDate = values.startCreateDate
      ? new Date(startCreateDate).toISOString() //covert date format toISOString
      : null;
    // endCreateDate
    const endCreateDate = values.endCreateDate;
    values.endCreateDate = values.endCreateDate
      ? new Date(endCreateDate).toISOString()
      : null;

    // Make the API call with the form values and update the results property
    this.filterService
      .getFilteredResults(values, 'Service/FilterServices ')
      .subscribe(
        (response) => {
          this.results = response.data.items;
          this.tatalResult = response.data.totalCount;
          this.hasNextPage = response.data.hasNextPage;
          this.hasPreviousPage = response.data.hasPreviousPage;
          this.submitted = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  openModal(id: any) {
    this.isModalOpen = true;
    this.serviceId = id;
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
