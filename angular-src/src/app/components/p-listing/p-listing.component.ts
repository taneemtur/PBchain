import { Component, Input, OnInit } from '@angular/core';
import { PropertyDetails } from '../../interfaces/propertyInterface'

@Component({
  selector: 'app-p-listing',
  templateUrl: './p-listing.component.html',
  styleUrls: ['./p-listing.component.css']
})
export class PListingComponent implements OnInit {

  @Input()
  PDetails = undefined;

  constructor() { }

  propertyDetails = {
    city : "Karachi",
    location : "Defecnce",
    propertyArea : 500,
    bedroom : 4,
    totalRooms : 6,
    washroom : 3,
    cost : 10000000,
    purpose : "Rent"
  }

  gridColumns = 3;
  
  ngOnInit(): void {
    if(!(this.PDetails == undefined)) {
      this.propertyDetails = this.PDetails;
    }
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
