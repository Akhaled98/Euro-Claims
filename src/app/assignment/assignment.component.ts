import { AssignmentService } from './assignment.service';
import { SharedService } from './../shared/shared.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './../user/user.service';
import { ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2';


@Component({
  selector: "app-assignment",
  templateUrl: "./assignment.component.html",
  styleUrls: ["./assignment.component.scss"],
})
export class AssignmentComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  columns = [
    { name: "customer_name", prop: "customer_name" },
    { name: "customer_phone", prop: "customer_phone" },
    { name: "insurance_company", prop: "insurance_company" },
    { name: "contact_person_name", prop: "contact_person_name" },
    { name: "examination_type", prop: "examination_type" },
    { name: "examination_location_type", prop: "examination_location_type" },
    { name: "car_model", prop: "car_model" },
  ];
  assignmentData:any=null;
  messages = { emptyMessage: "", totalMessage: "" };

  constructor(
    private _UserService: UserService,
    public translate: TranslateService,
    private _Router: Router,
    private sharedService: SharedService,
    private _AssignmentService:AssignmentService
  ) {}

  ngOnInit(): void {
    this.getAllAssignment();
  }
  getAllAssignment(){
    this._AssignmentService.getAllAssignment().subscribe((res) => {
      this.assignmentData = res['data'];
    });
  }
  ngDoCheck() {
    this.translate.get('VALIDATION').subscribe((translate) => {
      this.messages.emptyMessage = translate.DATANOTFOUND;
      this.messages.totalMessage= translate.TOTAL;
    });
  }
  deleteRow(row) {
    this.translate.get("VALIDATION").subscribe((translate) => {
      Swal.fire({
        title: translate.CONFIRMMESSAGE,
        text: translate.MESSAGE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: translate.YES,
        cancelButtonText: translate. NO,
      }).then((result) => {
        if (result.value) {
          this._AssignmentService.deleteAssignment(row.id).subscribe(
            (res) => {
              this.translate.get("VALIDATION").subscribe((translate) => {
                this.sharedService.notification(
                  `${translate.DELETE_SUCCESS}`,
                  "bg-green"
                );
              });
              this.getAllAssignment();
            },
            (err) => {
              this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
                this.sharedService.notification(
                  `${translate[err.errors]}`,
                  "bg-red"
                );
              });
            }
          );
        }
      });
    });
  }  
  editRow(row) {
    this._Router.navigate([`assignment/editAssignment/${row.id}`]);
  }
}
