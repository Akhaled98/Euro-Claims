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
    if (localStorage.getItem("userToken") != null) {
      this.saveCurrentUser();
      // this._Router.navigate(["/assignment"]);
    }
  }

  currenetUser = new BehaviorSubject(null);
  adminFeatures = new BehaviorSubject(null);
  showNavbar = new BehaviorSubject(false);
  showSidebar = new BehaviorSubject(false);
  showSettings = new BehaviorSubject(false);


  saveCurrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currenetUser.next(jwtDecode(token));
    this.showController();
  }
 

 
  showController(){
    this.showSidebar.next(true);
    this.showNavbar.next(true);
    this.showSettings.next(true);
  }
  displayController(){
    this.showSidebar.next(false);
    this.showNavbar.next(false);
    this.showSettings.next(false);
  }
 
  login(formData:any): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/auth/login`,
      formData
    );
  }
  

  logout() {
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
