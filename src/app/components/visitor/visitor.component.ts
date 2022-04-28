import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  faEnvelope = faEnvelope;
  getVisitorAll:any;
  getVisitor:any;

  constructor(
    public datepipe: DatePipe,
  public visitorService: VisitorsService
  ) { }

  ngOnInit(): void {
    this.visitorService.getAll().subscribe(data => {
      this.getVisitorAll = data;
          this.getVisitor = this.getVisitorAll.data;
      setTimeout(()=>{   
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25]
      } );
      }, 1);
            }, error => console.error(error));
    }

}
