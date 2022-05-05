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
  getVisitorAllMobile:any;
  getVisitorMobile:any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];

  constructor(
    public datepipe: DatePipe,
  public visitorService: VisitorsService
  ) { }

  ngOnInit(): void {
      this.visitorService.getData().subscribe({
          next: data => {
            this.getVisitorAll = data;
            if (this.getVisitorAll.status === 'Failed') {
                this.getVisitorAll.status
            }  else {
              // console.log('false');
              this.getVisitor = this.getVisitorAll.data;
              setTimeout(()=>{   
                $('#datatableexample').DataTable( {
                  pagingType: 'full_numbers',
                  pageLength: 5,
                  processing: true,
                  lengthMenu : [5, 10, 25]
              } );
              }, 1);
            }
            
          },
          error: error => {
          }
        })
      this.fetchVisitors();
    }

    fetchVisitors(): void {
      this.visitorService.getData().subscribe({
        next: data => {
          this.getVisitorAllMobile = data;
          if (this.getVisitorAllMobile.status === 'Failed') {
              this.getVisitorAll.status
          }  else {
            // console.log('false');
            this.getVisitorMobile = this.getVisitorAllMobile.data;
          }
          
        },
        error: error => {
        }
      })
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.fetchVisitors();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchVisitors();
    }

}
