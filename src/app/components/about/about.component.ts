import { Component, OnInit } from '@angular/core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
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
  getIdResult: any;
  passUserId: any;
  getVisitedResult: any;
  passUserVisited: any;
  passCurrentIp: any;
  visitedCount: any;
  userDate: any;
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

    this.fetchVisitors();
  } 

  fetchVisitors(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'MMMM d, y');
    // let dateToday = currentDateTime | date:'medium';
    this.visitorService.getData().subscribe({
     next: data => {
       this.getVisitor = data;
       if (this.getVisitor.status === 'Failed') {
         console.log('No Visitors Yet!');
          this.getIpResult = this.ipAddress;
          this.addVisitors();
       }  else {
        //  console.log('false about page');
         this.getvisitorAll = this.getVisitor.data;
         this.getvisitorAll.forEach((element: any) => {
          //  console.log(element.user_ip);
           if(element.user_ip == this.ipAddress){
            this.getIp  = true;
            this.passUserId = element.id;
            this.userDate = this.datepipe.transform((element.postedon), 'MMMM d, y');
            this.passUserVisited = element.visited;
           } else {
            this.getIp  = false;
            this.passCurrentIp = this.ipAddress;
           }
         });
         if(this.getIp==true) {
           if(this.userDate  == currentDateTime) {
            console.log('Last Visited: ' + this.userDate);
           } else {
            // console.log('not same date');
            this.getIdResult = this.passUserId;
            this.getVisitedResult = this.passUserVisited; 
            this.update();
           }
         } else {
              this.getIpResult = this.passCurrentIp;
              this.addVisitors();
         }
       }
       
     },
     error: error => {
     }
   })
 }

  // update visitor
  update(): any {
    this.visitedCount = 1;
    this.sum = parseInt(this.visitedCount) + parseInt(this.getVisitedResult);
    // console.log(this.sum);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      visited: this.sum,
      postedon: currentDateTime,
      secretKey:'Stimulator1'
    };

  this.visitorService.update(this.getIdResult,data).subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
          data.status;
        }  else {
          console.log('false');
        }
       },
      error: error => {
      }
    })
  }

  // add visitor
  addVisitors(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    this.visitedCount = 1;
    let data = {
      user_ip: this.getIpResult,
      country: this.visitorCountry,
      visited: this.visitedCount,
      postedon: currentDateTime,
      secretKey:'Stimulator1'
    };

    this.visitorService.create(data).subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
            data.status;
        }  else {
          console.log('false');
        }
      },
      error: error => {
      }
    })
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
