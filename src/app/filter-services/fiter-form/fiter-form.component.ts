
import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-fiter-form',
  templateUrl: './fiter-form.component.html',
  styleUrls: ['./fiter-form.component.scss']
})
export class FiterFormComponent  implements OnInit{
  @Output()   ApplyFilter = new EventEmitter<any>();
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
   ) {
  }
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

 this.ApplyFilter.emit(this.filterForm.value);


    // check if any of input value change
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500), // wait for 500ms between consecutive changes
        distinctUntilChanged() // ignore changes if they are the same as the previous value
      )
      .subscribe((values: any) => {
        // apply filter while data changed
        this.applyFilter(values)



      });
  }
    applyFilter(values:any){

      this.ApplyFilter.emit(values);
      };
}
