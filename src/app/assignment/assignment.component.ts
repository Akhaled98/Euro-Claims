import { AssignmentService } from './assignment.service';
import { SharedService } from './../shared/shared.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  userType: any;

  columns = [
    { name: "id", prop: "id" },
    { name: "customer_name", prop: "customer_name" },
    { name: "customer_phone", prop: "customer_phone" },
    { name: "insurance_company", prop: "insurance_company" },
    { name: "contact_person_name", prop: "contact_person_name" },
    { name: "examination_type", prop: "examination_type" },
    { name: "examination_location_type", prop: "examination_location_type" },
    { name: "car_model", prop: "car_model" },
  ];
  assignmentDatas: any = null;
  messages = { emptyMessage: "", totalMessage: "" };
  loader = true;

  constructor(
    public translate: TranslateService,
    private _Router: Router,
    private sharedService: SharedService,
    private _AssignmentService: AssignmentService
  ) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };

    this.userType = JSON.parse(localStorage.getItem("user details")).role;
    console.log(this.userType)
    if (this.userType === 'Super Admin') {
      this.getAllAssignment();
    } else if (this.userType === 'Agent') {
      this.getAllAssignmentAgent()
    } else if (this.userType === 'Insurance User') {
      this.getAllAssignmentInsurance()
    }
  }
  getAllAssignment() {
    this._AssignmentService.getAllAssignment().subscribe((res) => {
      setTimeout(() => {
        this.loader = false;
      }, 500);

      if (res) {
        hideloader();
      }
      this.assignmentDatas = res['data'];
      console.log("assignment data: ", JSON.stringify(this.assignmentDatas))

      function hideloader() {

        // Setting display of spinner
        // element to none
        document.getElementById('loading').style.display = 'none';
      }
    });
  }

  saveId(id){
    localStorage.setItem("assignment id",JSON.stringify(id))
  }

  getAllAssignmentAgent() {
    this._AssignmentService.getAllAssignmentAgent().subscribe((res) => {
      setTimeout(() => {
        this.loader = false;
      }, 500);

      if (res) {
        hideloader();
      }
      this.assignmentDatas = res['data'];
      console.log("assignment data: ", JSON.stringify(this.assignmentDatas))

      function hideloader() {

        // Setting display of spinner
        // element to none
        document.getElementById('loading').style.display = 'none';
      }
    });
  }

  getAllAssignmentInsurance() {
    this._AssignmentService.getAllAssignmentInsurance().subscribe((res) => {
      setTimeout(() => {
        this.loader = false;
      }, 500);

      if (res) {
        hideloader();
      }
      this.assignmentDatas = res['data'];
      console.log("assignment data: ", JSON.stringify(this.assignmentDatas))

      function hideloader() {

        // Setting display of spinner
        // element to none
        document.getElementById('loading').style.display = 'none';
      }
    });
  }


  ngDoCheck() {
    this.translate.get('VALIDATION').subscribe((translate) => {
      this.messages.emptyMessage = translate.DATANOTFOUND;
      this.messages.totalMessage = translate.TOTAL;
    });
  }
  deleteAssignment(deleteAssignment) {
    this.translate.get("VALIDATION").subscribe((translate) => {
      Swal.fire({
        title: translate.CONFIRMMESSAGE,
        text: translate.MESSAGE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: translate.YES,
        cancelButtonText: translate.NO,
      }).then((result) => {
        if (result.value) {
          if (this.userType === 'Super Admin') {
          this._AssignmentService.deleteAssignment(deleteAssignment.id).subscribe(
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
      } else if (this.userType === 'Agent') {
        this._AssignmentService.deleteAssignmentAgent(deleteAssignment.id).subscribe(
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
      } else if (this.userType === 'Insurance User') {
        this._AssignmentService.deleteAssignmentInsurance(deleteAssignment.id).subscribe(
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
                }
      );
    });
  }
  editRow(row) {
    this._Router.navigate([`assignment/editAssignment/${row.id}`]);
  }
}
