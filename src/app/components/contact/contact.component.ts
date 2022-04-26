import { Component, OnInit } from '@angular/core';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SendmailService } from 'src/app/services/sendmail.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

declare var navslide: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faMailReply = faMailReply;
  faEnvelope = faEnvelope;

  sendmailForm!: FormGroup;

  constructor(private sendmailService: SendmailService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    new navslide();

    this.sendmailForm = this.formBuilder.group({
      mailername: ['', Validators.required],
      maileremail: ['', Validators.required],
      mailarea: ['', Validators.required]
    });

  }

  get f(){
    return this.sendmailForm.controls;
  }

  sendEmail():void{
    this.sendmailService.sendmail(this.sendmailForm.value.mailername,this.sendmailForm.value.maileremail,this.sendmailForm.value.mailarea)
    .subscribe(data => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });

  }

}
