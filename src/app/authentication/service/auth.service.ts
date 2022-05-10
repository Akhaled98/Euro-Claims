import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("UserType") == "Super Admin") {
      this.saveCurrentUserAdmin();
    }else if(localStorage.getItem("UserType") == "Insurance Company"){
      this.saveCurrentInsuranceCompany();
    }else if (localStorage.getItem("UserType") == "System User"){
      this.saveCurrentUser();
    }
  }

  currenetUser = new BehaviorSubject(null);
  adminFeatures = new BehaviorSubject(null);
  showNavbar = new BehaviorSubject(false);
  showSidebar = new BehaviorSubject(false);
  showSettings = new BehaviorSubject(false);
  showAdminUserOptions = new BehaviorSubject(false);
  showUserOptions = new BehaviorSubject(false);



  saveCurrentUserAdmin() {
    let token: any = localStorage.getItem("userToken");
    this.currenetUser.next(jwtDecode(token));
    this.showControllerAdmin();
   
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currenetUser.next(jwtDecode(token));
    this.showControllerUser();   
  }

  saveCurrentInsuranceCompany() {
    let token: any = localStorage.getItem("userToken");
    this.currenetUser.next(jwtDecode(token));
    this.showControllerInsurance();
    this.showAdminUserOptions.next(false);
  }

  showControllerAdmin(){
    this.showSidebar.next(true);
    this.showNavbar.next(true);
    this.showSettings.next(true);
    this.showAdminUserOptions.next(true);
    this.showUserOptions.next(true);
  }
  showControllerUser(){
    this.showSidebar.next(true);
    this.showNavbar.next(true);
    this.showSettings.next(true);
    this.showAdminUserOptions.next(true);
  }
  showControllerInsurance(){
    this.showSidebar.next(true);
    this.showNavbar.next(true);
    this.showSettings.next(true);
  }
  displayControllerAdmin(){
    this.showSidebar.next(false);
    this.showNavbar.next(false);
    this.showSettings.next(false);
    this.showAdminUserOptions.next(false);
    this.showUserOptions.next(false);
  }
  displayControllerGeneral(){
    this.showSidebar.next(false);
    this.showNavbar.next(false);
    this.showSettings.next(false);
    this.showAdminUserOptions.next(false);
  }

  login(formData:any): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/auth/login`,
      formData
    );
  }
  user_company_login(formData:any): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiUrl}/api/users/auth/login`,
      formData
    );
  }

  logoutAdmin() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/auth/logout`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  logoutGeneral() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/users/auth/logout`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  

  editPassword(passwordData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/profile/change-password`,passwordData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

}
