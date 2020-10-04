import { Injectable, InjectionToken } from '@angular/core';
import { AuthentcationEndPointsModel } from '../models/auth-endpoints.model';
import { Employee } from 'src/app/home/models/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginSuccessModel {
  status: string;
  data: Employee;
}

export const END_POINTS = new InjectionToken<AuthentcationEndPointsModel>('END_POINTS');

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthentcationEndPointsModel {
  public baseUrl = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/';
  constructor(private http: HttpClient) { }

  login(email: string): Observable<LoginSuccessModel> {
    const loginURL = `${this.baseUrl}login/${email}`;
    return this.http.get<LoginSuccessModel>(loginURL);
  }

  signUp(employee: Employee): Observable<LoginSuccessModel> {
    const signUpURL = `${this.baseUrl}employee`;
    return this.http.post<LoginSuccessModel>(signUpURL, employee);
  }
}

