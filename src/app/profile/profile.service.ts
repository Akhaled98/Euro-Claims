import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  URl = environment.apiUrl;

  constructor(private _HttpClient: HttpClient) { }

  getProfileData() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/profile`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  editProfileData(profileData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/profile/edit-profile`,profileData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

 
}
