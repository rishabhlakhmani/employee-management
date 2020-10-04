import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadAllEmployees, FilterEmployees } from '../../store/home.action';
import { Employee } from '../../models/employee';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CoreState } from 'src/app/core/store/state/core.state';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employeeList: Employee[];
  public displayList: Employee[];
  public currentEmployee: Employee;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentEmployee = this.store.selectSnapshot(CoreState.getCurrentEmployee);
    this.store.dispatch(new LoadAllEmployees()).subscribe((state) => {
      this.employeeList = state.home.employeeList;
      this.displayList = this.employeeList;
    },
    err => {
      console.log(err);
    });
  }

  filterEmployee(ev: MatButtonToggleChange): void {
    // Do we need to store displayList in Store ?
    this.displayList = ev.value === 'all' ? this.employeeList : this.employeeList.filter(emp => emp.role.toLowerCase() === ev.value);
  }

  sortEmployees(): void {
    this.displayList.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  }

}
