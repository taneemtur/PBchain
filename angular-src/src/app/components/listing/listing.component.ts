import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  data : {"city" : "Lahore", "location" : "Defecnce", "type" : "HOME", "propertyArea" : "500", "bedroom" : "4", "washroom" : "2", "cost" : "10000000", "purpose" : "RENT"}
  constructor() { }

  propertyDetails = {
    city : "Lahore",
    location : "Defecnce",
    type : "HOME",
    propertyArea : 500,
    bedroom : 4,
    totalRooms : 6,
    washroom : 3,
    cost : 10000000,
    purpose : "RENT"
  }

  
  gridColumns = 3;
  
  ngOnInit(): void {
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
