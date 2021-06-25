import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

// import { FirebaseService } from '../services/firebase.service';

import { Observable } from 'rxjs';
import { PropertyService } from 'src/app/services/property.service';
// import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // user: Observable<firebase.User>;

  properties = []

  constructor(private router: Router, private propertyService : PropertyService) { 
    // this.user = afAuth.authState;
  }

  login() {
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // this.router.navigateByUrl('/home');
  }
  
  ngOnInit() {
    this.propertyService.getFeaturedProperties()
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this.properties = res.properties;
        }
      })
  }

}