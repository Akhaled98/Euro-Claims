import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(private _HttpClient: HttpClient) { }

  getAllPreview() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/examinations`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getPreviewById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/dashboard/admins/examinations/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  getAllPhoto(): Observable<any> {
    return this._HttpClient.get('https://jsonplaceholder.typicode.com/photos')
  }
  updatePreview(previewId, attatchmentId, previewData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/examination/${previewId}/attachments/${attatchmentId}`, previewData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  dislikePreview(previewId, attatchmentId, previewData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/examination/${previewId}/attachments/${attatchmentId}`, previewData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  addPreviewDiscription(examinationId,discriptionData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/agent/examinations/${examinationId}`, discriptionData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
}
