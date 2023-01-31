import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private _HttpClient: HttpClient) { }

  getRooms() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/chat/list-chat-rooms`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getMessages(){
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/chat/get-conversation/1`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  sendMessage(assignmentData){
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/euro-users/chat/send-message`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
}
