
import { MatTimepickerModule } from 'mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PreviewsRoutingModule } from './previews-routing.module';
import { PreviewsComponent } from './previews.component';
import { AssignPreviewComponent } from './component/assign-preview/assign-preview.component';

import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageDrawingModule } from 'ngx-image-drawing';
@NgModule({
  declarations: [PreviewsComponent, AssignPreviewComponent],
  imports: [
    CommonModule,
    PreviewsRoutingModule,
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
    ImageCropperModule,
    ImageDrawingModule

  ]
})
export class PreviewsModule { }
