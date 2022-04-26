import { Component, OnInit, NgZone } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { Likes } from 'src/app/models/likes.model';
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

  getVisitorAll:any = [];
  getVisitorCount:any = [];
  getTesti:any = [];
  getTestiCount:any = [];
 
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
 
   // fetch all likes and count
    this.likeService.getAll().subscribe(data => {
      this.getlike = data;
      if (this.getlike.status === 'success') {
        this.getlikeAll = this.getlike.data;
        this.getlikeCount = this.getlike.count;
        for(let getLikes of  this.getlikeAll){
          if(getLikes.user_ip == this.ipAddress){
             this.visitorIP = getLikes.user_ip;
          }
        }
      }
    }, (err) => {
      this.getlikeCount = '0';
    });

    //  fetch all visitors and count
    this.visitorService.getAll().subscribe(data => {
      // console.log(data);
      this.getVisitorAll = data;
      this.getVisitorCount = this.getVisitorAll.count; 
    }, (err) => {
      this.getVisitorCount = '0';
    });

    // fetch all testimoniala and count
    this.testimonialsService.getAll().subscribe(data => {
      // console.log(data);
      this.getTesti = data;
      this.getTestiCount = this.getTesti.count; 
    }, (err) => {
      this.getTestiCount = '0';
    });
  }

  // add like when click like button
  likeMe(): any {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      postedon: currentDateTime,
      key:'P@ssw0rd'
    };

    this.likeService.create(data)
   .subscribe((res:any) => {
      if (res.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Thank You for your likes!.',
          icon: 'success',
        }).then(() => {
          this.refreshPage();
        });
      }
    }, (err) => {
        console.log('ERROR');
    });
  }

  // refresh page
  refreshPage() {
    window.location.reload();
  }

}
