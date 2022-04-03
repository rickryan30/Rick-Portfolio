import { Component, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faThumbsUp = faThumbsUp;
  faUsers = faUsers;
  faComments = faComments;

  constructor() { }

  ngOnInit(): void {
  }

}
