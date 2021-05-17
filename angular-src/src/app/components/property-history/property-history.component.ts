import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-history',
  templateUrl: './property-history.component.html',
  styleUrls: ['./property-history.component.css']
})
export class PropertyHistoryComponent implements OnInit {

  @Input()
  propertyId : string;

  constructor(
    private loginService : LoginService,
    private propertyService : PropertyService
    ) { }
  displayedColumns: string[] = ['propertyId', 'txId', 'owner'];
  dataSource = [];

  user : any;
  userLoggedIn : Boolean = false;

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        if(user) {
          this.user = user;
          this.userLoggedIn = true
        }
        else {
          this.userLoggedIn = false
        }
      })

      this.propertyService.getPropertyHistory(this.propertyId, this.user.email)
        .subscribe(res => {
          console.log(res)
          if(res.success) {
            this.dataSource = res.history;
          }
          else {
            console.log(res)
          }
        })

  }

}
