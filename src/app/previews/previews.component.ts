import { PreviewService } from './preview.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-previews",
  templateUrl: "./previews.component.html",
  styleUrls: ["./previews.component.scss"],
})
export class PreviewsComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  columns = [
    { name: "assignment.customer_name", prop: "assignment.customer_name" },
    { name: "assignment.customer_phone", prop: "assignment.customer_phone" },
    { name: "assignment.insurance_company", prop: "assignment.insurance_company" },
    { name: "assignment.contact_person_name", prop: "assignment.contact_person_name" },
    { name: "assignment.examination_type", prop: "assignment.examination_type" },
    { name: "assignment.examination_location_type", prop: "assignment.examination_location_type" },
    { name: "assignment.car_model", prop: "assignment.car_model" },
  ];
  previewData: any = null;
  messages = { emptyMessage: "", totalMessage: "" };

  constructor(
    public translate: TranslateService,
    private _Router: Router,
    private sharedService: SharedService,
    private _PreviewService: PreviewService
  ) {}

  ngOnInit(): void {
    this.getAllPreview();
  }
  getAllPreview(){
    this._PreviewService.getAllPreview().subscribe((res) => {
      this.previewData = res['data'];
    });
  }
  ngDoCheck() {
    this.translate.get('VALIDATION').subscribe((translate) => {
      this.messages.emptyMessage = translate.DATANOTFOUND;
      this.messages.totalMessage= translate.TOTAL;
    });
  } 
  editRow(row) {
    this._Router.navigate([`previews/assignPreview/${row.id}`]);
  }
}
