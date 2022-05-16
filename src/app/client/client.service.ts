import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _HttpClient: HttpClient) { }

  createInsuranceCompany(InsuranceCompanyData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/insurance-companies`,InsuranceCompanyData,
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
      `${environment.apiUrl}/api/dashboard/admins/insurance-companies`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  updateInsurance(UserData,id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/insurance-companies/${id}`,UserData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  getInsuranceById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/dashboard/admins/insurance-companies/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  deleteInsurance(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.delete(`${environment.apiUrl}/api/dashboard/admins/insurance-companies/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  
  
}
