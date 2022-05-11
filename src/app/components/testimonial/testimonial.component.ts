import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import { RepliesService } from 'src/app/services/replies.service';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { Testimonials } from 'src/app/models/testimonials.model';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { ValidateService } from 'src/app/services/validate.service';

declare var navslide: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})

export class TestimonialComponent implements OnInit {
  // @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; } | any;
  
  faComments = faComments;
  faCommentAlt = faCommentAlt;
  faUser = faUser;
  faTimesCircle = faTimesCircle;
  faCommentDots = faCommentDots;
  faCalendar = faCalendar;
  faLocation = faLocation;
  faMailReply = faMailReply;

  ipAddress:any;
  visitorCountry:any;
  request:any;
  result: any;

  getTesti:any;
  getAllTesti:any;
  getTestiId:any;

  getReply:any;
  getAllReply:any;
  getReplyTid:any;
  getReplyName:any;
  getReplyBody:any;
  getReplyCountry:any;
  getReplyPostedon:any;

  getTestiToken: any
  getTestiAll: any;
  getTestiResult: any;

  getReplyToken: any
  getReplyAll: any;
  getReplyResult: any;
  
  form!: FormGroup; 
  replyForm!: FormGroup; 

  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];
  
  tIdValue: any;
  sKeyencoded: string = btoa("Stimul@t0r");
  testimonials: Testimonials = {
    name: '',
    testimonials: '', 
    country: '',
    postedon: ''
  };

  constructor(
    private testimonialsService: TestimonialsService,
    public repliesService: RepliesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public datepipe: DatePipe,
    public ValidateService: ValidateService,
    private toastr: ToastrService
    ) { 
      
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        testimonials: ['', Validators.required]
      })

      this.replyForm = this.formBuilder.group({
        name: ['', Validators.required],
        reply: ['', Validators.required]
      })
    }

    onItemSelector(value :any) {
      this.tIdValue = value;
    // console.log(this.tIdValue);
    }

   async ngOnInit(): Promise<void> {
    new navslide();
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    // console.log(this.result.ip);

    this.fetcTestimonials();
    this.fetcReplies();
}

fetcReplies(): void {
  this.repliesService.getData().subscribe({
    next: data => {
      this.getReply = data;
      if (this.getReply.status === 'Failed') {
        // console.log('true');
        this.getReply.status ;
      }  else {
        // console.log('false')
        this.getReplyToken = this.getReply.access_token;
          this.ValidateService.getToken(this.getReplyToken).subscribe({
            next: data => {;
              this.getReplyAll = data;
              this.getReplyResult = this.getReplyAll.data;
              this.getReplyTid = this.getReplyResult.id; 
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

fetcTestimonials(): any {
  this.testimonialsService.getData().subscribe({
   next: data => {
     this.getTesti = data;
     if (this.getTesti.status === 'Failed') {
       // console.log('true');
       this.getTesti.status ;
     }  else {
       // console.log('false')
       this.getTestiToken = this.getTesti.access_token;
         this.ValidateService.getToken(this.getTestiToken).subscribe({
           next: data => {;
             this.getTestiAll = data;
             this.getTestiResult = this.getTestiAll.data;
             this.getTestiId = this.getTestiResult.id; 
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

onTableDataChange(event: any) {
  this.page = event;
  this.fetcTestimonials();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.fetcTestimonials();
} 

get f(){
  return this.form.controls;
}

get rF(){
  return this.replyForm.controls;
}

  addTesti() {
    var currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    var data = {
      name: this.form.value.name,
      testimonials: this.form.value.testimonials,
      country: this.visitorCountry,
      postedon: currentDateTime,
      secretKey:this.sKeyencoded
    }
    // console.log(this.form.value.name);
    // console.log(this.form.value.testimonials);
    // console.log(this.visitorCountry);
    // console.log(currentDateTime);

  this.testimonialsService.create(data)
    .subscribe({
      next: data => {
        if (data.status === 'success') {
          // console.log('true');
          this.toastr.success("Testimonial has been Posted!", "SUCCESS", {timeOut: 900})
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


  addReplies(): any {
    // console.log(this.tIdValue);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      tid: this.tIdValue,
      name: this.replyForm.value.name,
      reply: this.replyForm.value.reply,
      country: this.visitorCountry,
      postedon: currentDateTime,
      secretKey:this.sKeyencoded
    };

    this.repliesService.create(data)
    .subscribe({
      next: data => {
        if (data.status === 'success') {
          this.toastr.success("Reply has been Posted!", "SUCCESS", {timeOut: 900})
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

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl, {skipLocationChange: true}).then(() => {
      window.location.reload();
    });
  }

}

