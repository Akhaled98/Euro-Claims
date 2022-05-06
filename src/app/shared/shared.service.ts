import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  URl = environment.apiUrl;

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) { }

  notification(message: string, color: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: [ color,'login-snackbar'],
    });
  }
}
