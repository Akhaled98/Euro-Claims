import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedComponent } from "./shared.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartsModule } from "ng2-charts";
import { DropdownModule } from "ng2-dropdown";
import { BrowserModule } from "@angular/platform-browser";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    DropdownModule,
    BrowserModule,
    MatSnackBarModule, 
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    ChartsModule,
    DropdownModule,
    BrowserModule,
    MatSnackBarModule,
  ],
})
export class SharedModule { }
