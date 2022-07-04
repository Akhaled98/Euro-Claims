import { ClientService } from "./client.service";
import { SharedService } from "./../shared/shared.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "./../user/user.service";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
ClientService;
@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  columns = [
    { name: "name", prop: "name" },
    { name: "phone", prop: "phone" },
    { name: "address", prop: "address" },
    { name: "contact_person", prop: "contact_person" },
    { name: "status", prop: "status" },

  ];
  dataInsurance:any=null;
  messages = { emptyMessage: "", totalMessage: "" };

  constructor(
    private _ClientService: ClientService,
    public translate: TranslateService,
    private _Router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllInsurance();
  }
  getAllInsurance() {
    this._ClientService.getAllInsurance().subscribe((res) => {
      this.dataInsurance = res["data"];
    });
  }
  ngDoCheck() {
    this.translate.get("VALIDATION").subscribe((translate) => {
      this.messages.emptyMessage = translate.DATANOTFOUND;
      this.messages.totalMessage = translate.TOTAL;
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
        cancelButtonText: translate.NO,
      }).then((result) => {
        if (result.value) {
          this._ClientService.deleteInsurance(row.id).subscribe(
            (res) => {
              this.translate.get("VALIDATION").subscribe((translate) => {
                this.sharedService.notification(
                  `${translate.DELETE_SUCCESS}`,
                  "bg-green"
                );
              });
              this.getAllInsurance();
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
    this._Router.navigate([`client/editInsurance/${row.id}`]);
  }
}
