import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor() { }

  
  gridColumns = 3;
  
  ngOnInit(): void {
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
