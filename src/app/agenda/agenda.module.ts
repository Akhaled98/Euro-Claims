import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ColorPickerModule } from "ngx-color-picker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTimepickerModule } from "mat-timepicker";
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from "@angular/material/core";
import { FullCalendarModule } from 'ng-fullcalendar';
import { AgendaDetailsComponent } from './agenda-details/agenda-details.component';

@NgModule({
  declarations: [AgendaComponent, AgendaDetailsComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatSnackBarModule,
    NgxDatatableModule,
    MatMenuModule,
    MatIconModule,
    NgSelectModule,
    FullCalendarModule,
    ColorPickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatStepperModule
  ]
})
export class AgendaModule { }
