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

  sendEmail():any{
    var data = {
      mailername: this.sendmailForm.value.mailername,
      maileremail: this.sendmailForm.value.maileremail,
      mailarea: this.sendmailForm.value.mailarea
    }

    console.log(this.sendmailForm.value.mailername);
    console.log(this.sendmailForm.value.maileremail);
    console.log(this.sendmailForm.value.mailarea);

    this.sendmailService.sendmail(data)
    .subscribe(data => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });

  }

}
