import { AssignPreviewComponent } from './component/assign-preview/assign-preview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviewsComponent } from './previews.component';

const routes: Routes = [ { path: "", redirectTo: "list", pathMatch: "full" },
{ path: "list", component: PreviewsComponent },
{
  path: "assignPreview/:id",
  component: AssignPreviewComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewsRoutingModule { }
