import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  cities = ["NONE","KARACHI", "LAHORE", "HYDERABAD", "ISLAMABAD"];
  propertyTypes = ["HOMES", "FLAT", "PORTION", "ROOM", "COMMERCIAL"];
  selectedPropertyType : string;
  selectedCity : string;
  location : string;
  constructor() { }

  ngOnInit(): void {
  }

}
