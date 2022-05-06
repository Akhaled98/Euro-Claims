import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewsComponent } from './previews.component';

const routes: Routes = [{ path: '', component: PreviewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewsRoutingModule { }
