import { NewInsuranceCompanyComponent } from "../client/new-insurance-company/new-insurance-company.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "./user.component";
import { NewUserComponent } from "./new-user/new-user.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: UserComponent },
  { path: "createUser", component: NewUserComponent },
  {
    path: "editUser/:id",
    component: NewUserComponent,
  },
  { path: "createInsuranceCompany", component: NewInsuranceCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
