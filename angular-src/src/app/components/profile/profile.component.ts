import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/userInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = undefined

  constructor(private router : Router) { 
    this.user = this.router.getCurrentNavigation().extras.state.user;
    console.log(this.user)
  }

  ngOnInit(): void {
  }

}
