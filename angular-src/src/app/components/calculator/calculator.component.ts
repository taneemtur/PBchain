import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  

  constructor(
    private propertyService : PropertyService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  
  

}
