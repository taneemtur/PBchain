import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service'

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  data : {"city" : "Lahore", "location" : "Defecnce", "type" : "HOME", "propertyArea" : "500", "bedroom" : "4", "washroom" : "2", "cost" : "10000000", "purpose" : "RENT"}
  constructor(private propertyService : PropertyService) { }

  // 'Flat', 'Commercial', 'Home', 'Portion', 'Room'
  sale : boolean;
  rent : boolean;
  flat : boolean;
  commercial : boolean;
  home : boolean;
  portion : boolean;
  room : boolean;

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

  properties = [];

  gridColumns = 3;
  
  ngOnInit(): void {
    this.getAllProperties()
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  getAllProperties () {
    this.propertyService.getAllProperties()
    .subscribe(res => {
      console.log(res)
      if(res.success) {
        this.properties = res.property;
      }
      else { 

      }
    })
  }

}
