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
 
    // fetch like by user_IP
    this.likeService.getLikesUserIP(this.ipAddress)
    .subscribe({
      next:(res: Likes) => {
        this.getlike = res;
        if (this.getlike.status === 'success') {
          this.visitorIP = this.getlike.data[0].user_ip;
        }
      }, error: err => console.error(err) 
    });
    
    // fetch all likes and count
    this.likeService.getLikes().subscribe(data => {
      // console.log(data);
      this.getlikeAll = data;
      if (this.getlikeAll.status === 'success') {
        this.getlikeCount = this.getlikeAll.count;
      }
    });

    // fetch all visitors and count
    this.visitorService.getVisitors().subscribe(data => {
      // console.log(data);
      this.getVisitorAll = data;
      this.getVisitorCount = this.getVisitorAll.count; 
    });

    // fetch all testimoniala and count
    this.testimonialsService.geTesti().subscribe(data => {
      // console.log(data);
      this.getTesti = data;
      this.getTestiCount = this.getTesti.count; 
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

    this.likeService.addLikes(data)
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
        console.log(err);
    });
  }

  // refresh page
  refreshPage() {
    window.location.reload();
  }

}
