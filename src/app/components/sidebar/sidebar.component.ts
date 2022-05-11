import { Component, OnInit, NgZone } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { LikesService } from 'src/app/services/likes.service';
import { DatePipe } from '@angular/common';
import { VisitorsService } from 'src/app/services/visitors.service';
import { ValidateService } from 'src/app/services/validate.service';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({ 
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  faThumbsUp = faThumbsUp;
  faUsers = faUsers;
  faComments = faComments;

  // like
  ipAddress:any;
  visitorCountry:any;

  visitorIP: any;
  request:any;
  result: any;
  getlike:any = [];
  getlikeAll:any = [];
  getlikeCount:any = [];

  getVisitor:any = [];
  getVisitorCount:any = [];
  getTesti:any = [];
  getTestiCount:any = [];
  getLikeToken:any;
  getVisitorToken:any;
  getResult: any
  getVisitorResult: any
  getIpResult: any;
  getvisitorAll:any = [];
  getIp: any;
  passUserId: any;
  userDate: any;
  passUserVisited: any;
  passCurrentIp: any;
  getIdResult: any;
  getVisitedResult: any;
  visitedCount: any;
  sum: any; 
  // element: any;
  // SKey: any = 'Stimulator1';
  // sKeydecoded: string = atob("U3RpbXVsYXRvcjE=")
  
  sKeyencoded: string = btoa("Stimul@t0r");
  
  constructor(
  public likeService: LikesService,
  public testimonialsService: TestimonialsService,
  public datepipe: DatePipe,
  public visitorService: VisitorsService,
  public ValidateService: ValidateService,
  private router: Router,
  private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    // console.log(this.sKeyencoded)?
    this.fetchLikes();
    this.fetchVisitors();
    this.fetchTestimonials();
  }

  fetchTestimonials(): any {
    this.testimonialsService.getData().subscribe({
      next: data => {
        this.getTesti = data;
        if (this.getTesti.status === 'Failed') {
          // console.log('true');
          this.getTestiCount = '0';
        }  else {
          // console.log('false');
          this.getTestiCount = this.getTesti.count; 
        }
        
      },
      error: error => {
      }
    })
  }
  
  fetchVisitors(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'MMMM d, y');
    // let dateToday = currentDateTime | date:'medium';
    this.visitorService.getData().subscribe({
     next: data => {
       this.getVisitor = data;
       if (this.getVisitor.status === 'Failed') {
          this.getVisitorCount = '0';
         console.log('No Visitors Yet!');
          this.getIpResult = this.ipAddress;
          this.addVisitors();
       }  else {
        //  console.log('false about page');
        this.getVisitorCount = this.getVisitor.count; 
        this.getVisitorToken = this.getVisitor.access_token;
        this.ValidateService.getToken(this.getVisitorToken).subscribe({
          next: data => {
            this.getvisitorAll = data;
            this.getVisitorResult = this.getvisitorAll.data;
            this.getVisitorResult.forEach((element: any) => {
              // console.log(element.user_ip);
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
              if(this.userDate == currentDateTime) {
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
          },
          error: error => {
          }
        })
       }
      },
     error: error => {
     }
   })
 }

  fetchLikes(): any {
     this.likeService.getData().subscribe({
      next: data => {
        this.getlike = data;
        if (this.getlike.status === 'Failed') {
          // console.log('true');
          this.getlikeCount = '0';
        }  else {
          // console.log('false')
          this.getlikeCount = this.getlike.count;
          this.getLikeToken = this.getlike.access_token;
            this.ValidateService.getToken(this.getLikeToken).subscribe({
              next: data => {;
                this.getlikeAll = data;
                this.getResult = this.getlikeAll.data;
                this.getResult.forEach((element: any) => {
                  // console.log(element.user_ip);
                  if(element.user_ip == this.ipAddress){
                    this.visitorIP = element.user_ip;
                  }
                });
              },
              error: error => {
              }
            })
        }
        
      },
      error: error => {
      }
    })
  }

  // add like when click like button
  likeMe() {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      postedon: currentDateTime,
      secretKey:this.sKeyencoded
    };

  this.likeService.create(data)
    .subscribe({
      next: data => {
        if (data.status === 'success') {
          this.toastr.success("Thank You for Liking!", "SUCCESS", {timeOut: 900})
          .onHidden.subscribe(() => {
            this.reloadCurrentRoute();
          })
        }  else {
          console.log('false');
        }
      },
      error: error => {
      }
    })
  }

   // update visitor
   update() {
    this.visitedCount = 1;
    this.sum = parseInt(this.visitedCount) + parseInt(this.getVisitedResult);
    // console.log(this.sum);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss', 'en-PH');
    let data = {
      visited: this.sum,
      postedon: currentDateTime,
      secretKey:this.sKeyencoded
    };

  this.visitorService.update(this.getIdResult,data).subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
          this.reloadCurrentRoute();
        }  else {
          console.log('false');
        }
       },
      error: error => {
      }
    })
  }

  // add visitor 
  addVisitors() {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss', 'en-PH');
    this.visitedCount = 1;
    let data = {
      user_ip: this.getIpResult,
      country: this.visitorCountry,
      visited: this.visitedCount,
      postedon: currentDateTime,
      secretKey:this.sKeyencoded
    };

    this.visitorService.create(data).subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
          this.reloadCurrentRoute();
        }  else {
          console.log('false');
        }
      },
      error: error => {
      }
    })
  }

  // refresh page
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl, {skipLocationChange: true}).then(() => {
      window.location.reload();
    });
  }

}
