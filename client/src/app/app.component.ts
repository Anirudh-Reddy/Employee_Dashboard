import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  showLoader:boolean=false;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe(routerEvent=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoader = true;
      } 
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.showLoader = false;
      }
    })
  }
}
