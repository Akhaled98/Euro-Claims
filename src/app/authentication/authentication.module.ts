import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { EditPasswordComponent } from './edit-password/edit-password/edit-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserLoginComponent } from './user-login/user-login.component';



@NgModule({
  declarations: [LoginComponent, EditPasswordComponent, UserLoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    MatSnackBarModule
    // SharedModule
  ],
 
  
})
export class AuthenticationModule {}
