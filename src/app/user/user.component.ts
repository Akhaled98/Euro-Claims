import { Router } from '@angular/router';
import { UserService } from './user.service';

import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "../shared/shared.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  columns = [
    { name: "name", prop: "name" },
    { name: "email", prop: "email" },
    { name: "phone", prop: "phone" },
    { name: "role", prop: "role" },
    { name: "address", prop: "address" },

  ];
  dataUser:any=null;
  messages = {emptyMessage: '', totalMessage: ''};

  constructor(private _UserService:UserService,
    public translate: TranslateService,
    private _Router: Router,
    private sharedService: SharedService,
    ) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(){
    this._UserService.getAllUser().subscribe((res) => {
      this.dataUser = res['data'];
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
          this._UserService.deleteUser(row.id).subscribe(
            (res) => {
              this.translate.get("VALIDATION").subscribe((translate) => {
                this.sharedService.notification(
                  `${translate.DELETE_SUCCESS}`,
                  "bg-green"
                );
              });
              this.getAllUser();
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
    this._Router.navigate([`user/editUser/${row.id}`]);
  }
}
