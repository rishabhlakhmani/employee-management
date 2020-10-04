import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { CoreState } from 'src/app/core/store/state/core.state';
import { Router } from '@angular/router';
import { LogoutAUser } from 'src/app/core/store/action/core.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentEmployee: Employee;
  constructor(private store: Store, private router: Router, private actions: Actions) { }

  ngOnInit(): void {
    this.currentEmployee = this.store.selectSnapshot(CoreState.getCurrentEmployee);
    this.actions.pipe(ofActionDispatched(LogoutAUser)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  logout(): void {
    this.store.dispatch(new LogoutAUser());
  }

}
