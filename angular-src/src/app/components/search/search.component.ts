import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  selectedCity : string;
  location : string;
  selectedPropertyType : string;
  selectedPriceRange = {
    "min" : 0,
    "max" : 0
  }
  selectedAreaRange = {
    "min" : 0,
    "max" : 0
  }
  selectedBedrooms : any = 0;


  cities = ["NONE","KARACHI", "LAHORE", "HYDERABAD", "ISLAMABAD"];
  propertyTypes = ["HOMES", "FLAT", "PORTION", "ROOM", "COMMERCIAL"];
  bedrooms = [1, 2, 3, 4, 5, 6, 8, 9, "10+"]
  

  constructor() { }

  ngOnInit(): void {
  }

  buildSearchQuery (purpose) {
    
  }

  onSubmit (purpose) {

  }

}
