import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../driver-sidebar/driver-sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { SocketIoService } from '../../../services/socket-io.service';
import {DriverProfileService} from '../../../services/driver-profile.service'


@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})

export class DriverNavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public notification = 0;
  public nbrNotf = Array(this.notification+1).fill(1);
  public socket;
  public name : string;
  public location: Location;

  constructor(location: Location,  
              private element: ElementRef, 
              private router: Router,
              public authService: AuthService,
              private socketIoService : SocketIoService,
              private driverProfileService : DriverProfileService) {
                this.location = location;
              }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    
    this.socket = this.socketIoService.setupSocketConnection().on('notification', (data)=>{
      this.notification += 1;
      console.log (this.notification);
    });
    this.getname()
  } 

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout(){
    this.authService.logout()
  }

  deletNotf(){
    this.notification = 0;
  }

  getname(){
    this.driverProfileService.fetchData().subscribe(res => {
      console.log(res)
      this.name = res["driver"].first_name
    })
  }
}
