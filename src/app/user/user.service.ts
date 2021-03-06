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
      `${environment.apiUrl}/api/dashboard/admins/web-users`,UserData,
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
      `${environment.apiUrl}/api/dashboard/admins/web-users`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  updateUser(UserData,id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/web-users/${id}`,UserData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  getUserById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/dashboard/admins/web-users/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  deleteUser(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.delete(`${environment.apiUrl}/api/dashboard/admins/web-users/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  
}
