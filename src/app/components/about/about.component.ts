import { Component, OnInit } from '@angular/core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
