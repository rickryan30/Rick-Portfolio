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
        this.getvisitorAll = this.getVisitor.data;
        for(let getVisits of this.getvisitorAll){
          this.getIp = (getVisits.user_ip==this.ipAddress) ? true : false;
        }
        this.getIpResult = (this.getIp==true) ? this.getIp: this.addVisitors();
        console.log(this.getIpResult);
      }
    }, (err) => {
        console.log(err);
        this.addVisitors();
    });
  }

  

  

  // add user IP when click like button
  addVisitors(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      postedon: currentDateTime,
      key:'P@ssw0rd'
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
