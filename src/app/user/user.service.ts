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
      `${environment.apiUrl}/api/agents/auth/create-insurance-account`,InsuranceCompanyData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
}
