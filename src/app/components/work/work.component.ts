import { Component, OnInit } from '@angular/core';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project.model';
import { Template } from 'src/app/models/template.model';
 
declare var navslide: any;

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  
  projects: Project[] = [
    new Project('Online Public Access Catalog', 'St. Cecilias College - Cebu Library', 'assets/image/sccopac-thumb.jpg', 'https://rickmedillo.000webhostapp.com'),
    new Project('A Wonder Paradise', 'Ruvi Cave - Resort', 'assets/image/ruvi-template-thumb.jpg', 'https://ruvicaveresortcebu.000webhostapp.com/')
  ];
  
  templates: Template[] = [
    new Template('assets/image/ruvicave-template.jpg', 'assets/image/ruvicave-template.jpg', 'Resort Template'),
    new Template('assets/image/template01.jpg', 'assets/image/template01.jpg', 'Dating Site Template 01'),
    new Template('assets/image/template02.jpg', 'assets/image/template02.jpg', 'Dating Site Template 02'),
    new Template('assets/image/template03.jpg', 'assets/image/template03.jpg', 'Dating Site Template 03'),
    new Template('assets/image/template04.jpg', 'assets/image/template04.jpg', 'Dating Site Template 04'),
    new Template('assets/image/template05.jpg', 'assets/image/template05.jpg', 'Dating Site Template 05'),
    new Template('assets/image/template06.jpg', 'assets/image/template06.jpg', 'Dating Site Template 06'),
    new Template('assets/image/template07.jpg', 'assets/image/template07.jpg', 'Dating Site Template 07')
  ];

  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];

  tempPage: number = 1;
  tempCount: number = 0;
  tempTableSize: number = 6;
  tempTableSizes: any = [6, 8, 12, 16];
  
  faLaptop = faLaptop;
  faMarker = faMarker;

  constructor() { }

  ngOnInit(): void {
    new navslide();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.projects;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.projects;
  }

  onTableDataChangeTemp(event: any) {
    this.tempPage = event;
    this.templates;
  }
  onTableSizeChangeTemp(event: any): void {
    this.tempTableSize = event.target.value;
    this.tempPage = 1;
    this.templates;
  }

}
