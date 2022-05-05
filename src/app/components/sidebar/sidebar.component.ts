import { Component, OnInit, NgZone } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { LikesService } from 'src/app/services/likes.service';
import { DatePipe } from '@angular/common';
import { VisitorsService } from 'src/app/services/visitors.service';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import Swal from 'sweetalert2';


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
  getVisitorAll:any = [];
  getVisitorCount:any = [];
  getTesti:any = [];
  getTestiCount:any = [];
  // element: any;

  constructor(
  public likeService: LikesService,
  public testimonialsService: TestimonialsService,
  public datepipe: DatePipe,
  public visitorService: VisitorsService
  ) { }

  async ngOnInit(): Promise<void> {
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
 
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
    this.visitorService.getData().subscribe({
      next: data => {
        this.getVisitor = data;
        if (this.getVisitor.status === 'Failed') {
          // console.log('true');
          this.getVisitorCount = '0';
        }  else {
          // console.log('false');
          this.getVisitorCount = this.getVisitor.count; 
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
          // console.log('false');
          this.getlikeAll = this.getlike.data;
          this.getlikeCount = this.getlike.count;
          this.getlikeAll.forEach((element: any) => {
            // console.log(element.user_ip);
            if(element.user_ip == this.ipAddress){
              this.visitorIP = element.user_ip;
            }
          });
        }
        
      },
      error: error => {
      }
    })
  }

  // add like when click like button
  likeMe(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      postedon: currentDateTime,
      secretKey:'Stimulator1'
    };

  this.likeService.create(data)
    .subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
          Swal.fire({
            title: 'Success!',
            text: 'Thank You for your likes!.',
            icon: 'success',
          }).then(() => {
            this.refreshPage();
          });
        }  else {
          console.log('false');
        }
      },
      error: error => {
      }
    })
  }

  // refresh page
  refreshPage() {
    window.location.reload();
  }

}
