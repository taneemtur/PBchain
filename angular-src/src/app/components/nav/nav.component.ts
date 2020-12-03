import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ChangeDetectorRef } from '@angular/core';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private cdref: ChangeDetectorRef) {}

  ngOnInit () {

  }

  
  set_current (name) {
    this.current = name;
    // this.cdref.detectChanges();

    console.log(name)
  }

}
