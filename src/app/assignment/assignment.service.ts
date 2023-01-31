import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private _HttpClient: HttpClient) { }

  createNewAssignment(assignmentData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/dashboard/admins/assignments`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  createNewAssignmentAgent(assignmentData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/agents/assignments`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  createNewAssignmentInsurance(assignmentData) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.post(
      `${environment.apiUrl}/api/insurance-users/assignments`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllAssignment() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/dashboard/admins/assignments`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllAssignmentAgent() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/agents/assignments`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllAssignmentInsurance() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/insurance-users/assignments`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllCarsBrands() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/cars/brands`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllCarsModels(id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/cars/brands/${id}/models`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  getAllCarIssuedYear() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/cars/models/issued-years`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }


  updateAssignment(assignmentData,id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/admins/assignments/${id}`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  updateAssignmentAgent(assignmentData,id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/agents/assignments/${id}`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }

  updateAssignmentInsurance(assignmentData,id) {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.put(
      `${environment.apiUrl}/api/dashboard/insurance-users/assignments/${id}`,assignmentData,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  getAssignmentById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/dashboard/admins/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  getAssignmentAgentById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/agents/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  getAssignmentInsuranceById(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(`${environment.apiUrl}/api/insurance-users/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  deleteAssignment(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.delete(`${environment.apiUrl}/api/dashboard/admins/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  deleteAssignmentAgent(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.delete(`${environment.apiUrl}/api/agents/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }

  deleteAssignmentInsurance(id): Observable<any> {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.delete(`${environment.apiUrl}/api/insurance-users/assignments/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      }),
    });
  }
  getAllExaminationType() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/examination-types`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
  getAllExaminationLocationType() {
    let token: any = localStorage.getItem("userToken");
    return this._HttpClient.get(
      `${environment.apiUrl}/api/euro-users/examination-location-types`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      }
    );
  }
}
