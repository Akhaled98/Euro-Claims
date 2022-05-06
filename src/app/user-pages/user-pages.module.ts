import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login2Component } from './component/login2/login2.component';
import { RegisterComponent } from './component/register/register.component';
import { Register2Component } from './component/register2/register2.component';
import { LockscreenComponent } from './component/lockscreen/lockscreen.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: Login2Component },
  { path: 'register', component: RegisterComponent },
  { path: 'register-2', component: Register2Component },
  { path: 'lock-screen', component: LockscreenComponent }
]

@NgModule({
  declarations: [ Login2Component, RegisterComponent, Register2Component, LockscreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPagesModule { }
