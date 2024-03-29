import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  path_details = [
    {path : '/', name : "Home"},
    {path : '/listing', name : "Browse Properties"},
    {path : '/add-property', name : "Add Property"},
  ]

  current : String = "Home";
  userLoggedIn : boolean = false; 
  user : undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private cdref: ChangeDetectorRef, 
    private router : Router,
    private loginService : LoginService
    ) {
      this.set_current()
    }

  ngOnInit () {
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
  }

  
  set_current () {
    let url;
    // await url = this.router.url;
    this.router.events.subscribe((u:any) => {
      this.path_details.forEach((p) => {
        if(p.path == u.url) {
          // console.log(p.name)
          this.current= p.name;
        }
      })
    });
    
  }

  logout () {
    this.loginService.nextUser(undefined);
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile'])
  }

}
