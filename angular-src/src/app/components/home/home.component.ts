import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

// import { FirebaseService } from '../services/firebase.service';

import { Observable } from 'rxjs';
// import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // user: Observable<firebase.User>;

  constructor(private router: Router) { 
    // this.user = afAuth.authState;
  }

  login() {
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // this.router.navigateByUrl('/home');
  }
  
  ngOnInit() {
  }

}