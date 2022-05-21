import { UpdateAssignmentComponent } from './component/update-assignment/update-assignment.component';
import { AddAssignmentComponent } from './component/add-assignment/add-assignment.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AssignmentComponent } from "./assignment.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: AssignmentComponent },
  { path: "newAssignment", component: AddAssignmentComponent },
  {
    path: "editAssignment/:id",
    component: UpdateAssignmentComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}
