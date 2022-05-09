import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { ValidateService } from 'src/app/services/validate.service';
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
  getVisitorToken:any;
  getVisitorAllMobile:any;
  getVisitorMobile:any;
  getVisitorMobileToken:any;
  getResult: any;
  getResultMobile: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];

  // string: any = 'Stimulator1';
  constructor(
    public datepipe: DatePipe,
    public visitorService: VisitorsService,
    public ValidateService: ValidateService
  ) { }

  ngOnInit(): void {
      this.visitorService.getData().subscribe({
          next: data => {
            this.getVisitorAll = data;
            if (this.getVisitorAll.status === 'Failed') {
                this.getVisitorAll.status
            }  else {
              // console.log('false');
              this.getVisitorToken = this.getVisitorAll.access_token;
              this.ValidateService.getToken(this.getVisitorToken).subscribe({
                next: data => {
                  this.getVisitor = data;
                  this.getResult = this.getVisitor.data;
                  setTimeout(()=>{   
                    $('#datatableexample').DataTable( {
                      pagingType: 'full_numbers',
                      pageLength: 5,
                      processing: true,
                      lengthMenu : [5, 10, 25]
                  } );
                  }, 1);
                },
                error: error => {
                }
              })
            } 
            
          },
          error: error => {
          }
        })
      this.fetchVisitors();
      // var encoded: string = btoa("Stimulator1");
      // console.log(encoded);
      // var decoded: string = atob("U3RpbXVsYXRvcjE=");
      // console.log(decoded);

      // if(this.string === decoded) {
      //   console.log('true');
      // } else {
      //   console.log('false');
      // }
    }

 
    
    fetchVisitors(): void {
      this.visitorService.getData().subscribe({
        next: data => {
          this.getVisitorAllMobile = data;
          if (this.getVisitorAllMobile.status === 'Failed') {
              this.getVisitorAll.status
          }  else {
            // console.log('false');
            this.getVisitorMobileToken = this.getVisitorAllMobile.access_token;
            this.ValidateService.getToken(this.getVisitorMobileToken).subscribe({
              next: data => {
                this.getVisitorMobile = data;
                this.getResultMobile = this.getVisitorMobile.data;
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
      this.fetchVisitors();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchVisitors();
    }
    
   

}