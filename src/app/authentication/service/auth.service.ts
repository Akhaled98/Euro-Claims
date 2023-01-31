import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import jwtDecode from "jwt-decode";
import { environment } from "src/environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "src/app/shared/shared.service";
import { catchError, map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router, public translate: TranslateService,
    private _SharedService: SharedService) {
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
  autoLogOut = new BehaviorSubject(false);



  saveCurrentUser() {
    let token: any = localStorage.getItem("userToken");
    this.currenetUser.next(jwtDecode(token));
    this.showController();
    // this.idleLogOut(900000)
  }



  showController() {
    this.showSidebar.next(true);
    this.showNavbar.next(true);
    this.showSettings.next(true);
  }
  displayController() {
    this.showSidebar.next(false);
    this.showNavbar.next(false);
    this.showSettings.next(false);
  }

  login(formData: any): Observable<any> {
    console.log(formData)

    console.log(environment.apiUrl)
    return this._HttpClient.post<any>(
      `${environment.apiUrl}/api/dashboard/admins/auth/login`,
      formData,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
        }),
      }

    );

    // return this._HttpClient
    // .post(`${environment.apiUrl}/api/dashboard/admins/auth/login`,formData)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  userLogin(formData: any): Observable<any> {
    console.log(formData)
    return this._HttpClient.post(
      `${environment.apiUrl}/api/users/auth/login`,
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

  logoutUser() {
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
  // idleLogOut(expirationDate: number) {
  //   setTimeout(() => {
  //     this.currenetUser.next(null);
  //     this.displayController();
  //     localStorage.removeItem("userToken");
  //     this._Router.navigate(["/authentication/login"]);
  //     this.translate.get("VALIDATION").subscribe((translate) => {
  //       this._SharedService.notification(
  //         `${translate.SIGN_OUT}`,
  //         "bg-green"
  //       );
  //     });
  //   }, expirationDate);
  // }



  editPassword(passwordData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/profile/change-password`, passwordData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage))
  }
}
