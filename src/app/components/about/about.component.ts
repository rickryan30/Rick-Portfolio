import { Component, OnInit } from '@angular/core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { Visitors } from 'src/app/models/visitors.model';
import { VisitorsService } from 'src/app/services/visitors.service';

declare var navslide: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  faUserTie = faUserTie; 
  faGraduationCap = faGraduationCap;
  faAward = faAward;
  faWrench = faWrench;
  faBriefcase = faBriefcase;

  request:any;
  result: any;
  ipAddress:any;
  visitorCountry:any;
  
  visitorLocation:any;
  foundIp = false;
  getVisitor:any = [];
  getvisitorAll:any = [];
  getIp: any;
  getIpResult: any;
  passUserId: any;
  getVisitedResult: any;
  passUserVisited: any;
  passCurrentIp: any;
  visitedCount: any;
  sum: any; 
  constructor(
  public datepipe: DatePipe,
  public visitorService: VisitorsService
  ) {  }

  

  async ngOnInit(): Promise<void> {
    new navslide();
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    // console.log(this.result.country);

    
    this.visitorService.getAll().subscribe(data => {
      this.getVisitor = data;
      if (this.getVisitor.status === 'success') {
        console.log("success");
        this.getvisitorAll = this.getVisitor.data;
        for(let getVisits of this.getvisitorAll){
          // this.getIp = (getVisits.user_ip==this.ipAddress) ? "user_ip " + getVisits.id : "computers ip " + this.ipAddress;
          if(getVisits.user_ip==this.ipAddress) {
            this.getIp  = true;
            this.passUserId = getVisits.id;
            this.passUserVisited = getVisits.visited;
          }else {
            this.getIp  = false;
            this.passCurrentIp = this.ipAddress;
          }
        }
        // end of for
        if(this.getIp==true) {
          this.getIpResult = this.passUserId;
          this.getVisitedResult = this.passUserVisited; 
          this.update();
        }else {
          this.getIpResult = this.passCurrentIp;
          this.addVisitors();
        }
        // this.getIpResult = (this.getIp==true) ? this.passUserId : this.passCurrentIp;
        // this.update();
      } 
    }, (err) => {
      this.addVisitors();
    });
  }

  // add user IP when click like button
  update(): any {
    this.visitedCount = 1;
    this.sum = parseInt(this.visitedCount) + parseInt(this.getVisitedResult);
    console.log(this.sum);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      visited: this.sum,
      postedon: currentDateTime,
      secretKey:'Stimulator1'
    };

    this.visitorService.update(this.getIpResult,data)
   .subscribe((res:any) => {
      if (res.status === 'success') {
        console.log(res);
      }
    }, (err) => {
        console.log(err);
    });
  }

  // add user IP when click like button
  addVisitors(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    this.visitedCount = 1;
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      visited: this.visitedCount,
      postedon: currentDateTime,
      secretKey:'Stimulator1'
    };

    this.visitorService.create(data)
   .subscribe((res:any) => {
      if (res.status === 'success') {
        console.log(res);
      }
    }, (err) => {
        console.log(err);
    });
  }

  birthYear: number = 1986;
  birthMonth:number = 9;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1;
  myLessAge: number = 0;

  getLessAge() {
   this.myLessAge = this.currentYear - this.birthYear;
    return this.myLessAge - 1;
  }

  getMoreAge() {
   return this.myLessAge = this.currentYear - this.birthYear;
   }

   refreshPage() {
    window.location.reload();
  }

}
