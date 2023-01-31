import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaDetailsComponent } from './agenda-details/agenda-details.component';

import { AgendaComponent } from './agenda.component';

const routes: Routes = [{ path: '', component: AgendaComponent },
{path:'agenda-details/:id',component:AgendaDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
