import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient) { }

  createNewUser(UserData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/agents/auth/signup`,UserData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  createInsuranceCompany(InsuranceCompanyData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/accounts/insurance-users/store`,InsuranceCompanyData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllUser() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/accounts/agents`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  getAllInsurance() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/accounts/insurance-users`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
}
