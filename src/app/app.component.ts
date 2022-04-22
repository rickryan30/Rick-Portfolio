import { Component } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Rick Ryan Medillo';
  
  faDownload = faDownload;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faEnvelope = faEnvelope;
  faMobile = faMobile;

  currentYear: number = new Date().getFullYear();

}
