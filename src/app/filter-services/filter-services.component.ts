import { Component, OnInit } from '@angular/core';
import {   FormGroup, FormControl } from '@angular/forms';
 import { FilterService } from '../filter.services';
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
  filterForm: any
  constructor(

    private filterService: FilterService,

  ) {}

  ngOnInit(): void {

  }
 applyFilter(values:any) {
  this.filterForm=values;
    this.submitted = true;
    if ( values.invalid) {
      return;
    }
    // startCreateDate
    const startCreateDate = values.startCreateDate;
    values.startCreateDate = values.startCreateDate
      ? new Date(startCreateDate).toISOString() //covert date format toISOString
      : null;
      console.log('values.startCreateDate');
      console.log(values );
      console.log(values.startCreateDate );

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


  Previous() {
  console.log('preve from out');
  this.filterForm.pageNumber--;
    this.applyFilter(this.filterForm);
  }
  next() {
    console.log('next');
    this.filterForm.pageNumber++;
    this.applyFilter(this.filterForm);
  }
}
