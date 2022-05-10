import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewInsuranceCompanyComponent } from './components/new-insurance-company/new-insurance-company.component';


@NgModule({
  declarations: [UserComponent, NewUserComponent, NewInsuranceCompanyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatSnackBarModule
  ],
})
export class UserModule { }
