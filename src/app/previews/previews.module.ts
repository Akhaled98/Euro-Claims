import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewsRoutingModule } from './previews-routing.module';
import { PreviewsComponent } from './previews.component';


@NgModule({
  declarations: [PreviewsComponent],
  imports: [
    CommonModule,
    PreviewsRoutingModule
  ]
})
export class PreviewsModule { }
