import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-listing',
  templateUrl: './p-listing.component.html',
  styleUrls: ['./p-listing.component.css']
})
export class PListingComponent implements OnInit {

  constructor() { }

  gridColumns = 3;
  
  ngOnInit(): void {
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
