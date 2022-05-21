import { NgSelectModule } from "@ng-select/ng-select";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssignmentRoutingModule } from "./assignment-routing.module";
import { AssignmentComponent } from "./assignment.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddAssignmentComponent } from "./component/add-assignment/add-assignment.component";
import { UpdateAssignmentComponent } from "./component/update-assignment/update-assignment.component";
import { ColorPickerModule } from "ngx-color-picker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTimepickerModule } from "mat-timepicker";
@NgModule({
  declarations: [
    AssignmentComponent,
    AddAssignmentComponent,
    UpdateAssignmentComponent,
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatSnackBarModule,
    NgxDatatableModule,
    MatMenuModule,
    MatIconModule,
    NgSelectModule,
    ColorPickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTimepickerModule,
  ],
})
export class AssignmentModule {}
