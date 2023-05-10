import { Component, Input, Output ,EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss']
})
export class FilterResultComponent implements OnInit{
@Input() results:any;
@Input() hasPreviousPage?:boolean;
@Input() hasNextPage?:boolean;
@Output() prev=new EventEmitter<any>();
@Output() next=new EventEmitter<any>();
 isModalOpen = false;
 serviceId:any;
ngOnInit(): void {
  console.log('result');

    console.log(this.results);

}

PreviousPage(){
this.prev.emit('event');
console.log('prev from result');
}
nextPage(){
  this.next.emit('event');
console.log('next from result');
}
  openModal(id: any) {
    this.isModalOpen = true;
    this.serviceId = id;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
