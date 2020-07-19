import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kt-document-stat-fyp-list',
  templateUrl: './document-stat-fyp-list.component.html',
  styleUrls: ['./document-stat-fyp-list.component.scss']
})
export class DocumentStatFypComponentList {
  debugString: string;

  @Input() listvalue: Array<{
    value: string
  }>;
  @Output() listvalueChange = new EventEmitter();
  

  constructor() {}

  ngOnInit() {
    this.listvalue = [{
      value: '',
    }];
  }

  inputchanged($event: any, index: number) {
    console.log(`change! idx:${index} -> ${$event.target.value}`)
    this.listvalue[index].value = $event.target.value;

    this.debugString = JSON.stringify(this.listvalue);
    this.listvalueChange.emit(this.listvalue);
  }

  addItem(item: any) {
    console.log(`Add ${JSON.stringify(item)}`)
    this.listvalue.push({
      value: '',
    })

    this.debugString = JSON.stringify(this.listvalue);
    this.listvalueChange.emit(this.listvalue);
  }

  removeItem(item: any, index: number) {
    console.log(`Remove ${JSON.stringify(item)}`)

    // Remove one item
    this.listvalue.splice(index, 1);

    this.debugString = JSON.stringify(this.listvalue);
    this.listvalueChange.emit(this.listvalue);
  }

}

