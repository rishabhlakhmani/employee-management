import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CoreState } from 'src/app/core/store/state/core.state';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee';
  constructor(private http: HttpClient, private store: Store) { }

  loadAllEmployees(): Observable<Employee[]> {
    const allEmployeeURL = `${this.baseUrl}`;
    return this.http.get<{status: string, data: Employee[]}>(allEmployeeURL).
    pipe(map((res) => {
      return res.data;
    }));
  }

  loadEmployeeByID(id: number): Observable<Employee> {
    const getManagerURL = `${this.baseUrl}/${id}`;
    return this.http.get<{status: string, data: Employee}>(getManagerURL).
    pipe(map((res) => {
      return res.data;
    }));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<{status: string, data: Employee}>(this.baseUrl, employee).
    pipe(map((res) => {
      return res.data;
    }));
  }

  canUpdateRating(managerId): boolean {
    const currentEmployee = this.store.selectSnapshot(CoreState.getCurrentEmployee);
    return currentEmployee.id === managerId;
  }

  canSeeRating(employee): boolean {
    const currentEmployee = this.store.selectSnapshot(CoreState.getCurrentEmployee);
    if (currentEmployee.role.toUpperCase() === 'HR') {
      return true;
    } else if (currentEmployee.id === employee.manager_id) {
      return true;
    } else if (currentEmployee.id === employee.id) {
      return true;
    } else {
      return false;
    }
  }
}
