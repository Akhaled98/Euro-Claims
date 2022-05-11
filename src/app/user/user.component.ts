import { UserService } from './user.service';

import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "../shared/shared.service";

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
  dataUser = [];
  dataInsurance=[];
  messages = {emptyMessage: '', totalMessage: ''};




  constructor(private _UserService:UserService,
    public translate: TranslateService
    ) {}

  ngOnInit(): void {
    this.getAllUser();
    this.getAllInsurance();
  }
  getAllUser(){
    this._UserService.getAllUser().subscribe((res) => {
      this.dataUser = res['data'];
    });
  }
  getAllInsurance(){
    this._UserService.getAllInsurance().subscribe((res) => {
      this.dataInsurance = res['data'];
    });
  }
  ngDoCheck() {
    this.translate.get('VALIDATION').subscribe((translate) => {
      this.messages.emptyMessage = translate.DATANOTFOUND;
      this.messages.totalMessage= translate.TOTAL;
    });
  }
}
