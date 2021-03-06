import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewUserComponent } from './new-user/new-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [UserComponent, NewUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatSnackBarModule,
    NgxDatatableModule,
    MatMenuModule,
    MatIconModule,
    NgSelectModule
  ],
})
export class UserModule { }
