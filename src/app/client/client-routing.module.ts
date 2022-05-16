import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';
import { NewInsuranceCompanyComponent } from './new-insurance-company/new-insurance-company.component';

const routes: Routes = [ { path: "", redirectTo: "list", pathMatch: "full" },
{ path: "list", component: ClientComponent },
{ path: "createInsuranceCompany", component: NewInsuranceCompanyComponent },
{
  path: "editInsurance/:id",
  component: NewInsuranceCompanyComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
