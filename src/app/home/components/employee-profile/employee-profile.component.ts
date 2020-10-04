import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../models/employee';
import { CoreState } from 'src/app/core/store/state/core.state';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { HomeState } from '../../store/home.state';
import { SetOpenedProfile, UpdateEmployee, GetEmployeeById } from '../../store/home.action';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public employee: Employee;
  public isRatingEditable = false;
  public isRatingVisible = true;
  public subscriptions = new Subscription();
  @Select(HomeState.getOpenedProfileManager) manager$: Observable<string>;
  @Select(HomeState.getOpenedProfile) employee$: Observable<Employee>;

  constructor(private route: ActivatedRoute, private store: Store, private empService: EmployeeService) { }

  ngOnInit(): void {
    const params$ = this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getEmployee(id);
    });

    this.subscriptions.add(params$);

    this.subscriptions.add(this.employee$.subscribe(emp => {
      if (emp) {
        this.employee = emp;
        this.isRatingVisible = this.canSeeRating(this.employee);
      }
    }));

    this.subscriptions.add(this.manager$.subscribe((openedProfileManager) => {
      if (openedProfileManager) {
        this.isRatingEditable = this.canUpdateRating(this.employee.manager_id);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getEmployee(id: number): void {
    if (id) {
      this.store.dispatch(new GetEmployeeById(id, 'employee'));
    } else {
      const currentEmp = this.store.selectSnapshot(CoreState.getCurrentEmployee);
      this.store.dispatch(new SetOpenedProfile(currentEmp));
    }
  }

  canSeeRating(employee): boolean {
    return this.empService.canSeeRating(employee);
  }

  canUpdateRating(managerId): boolean {
    return this.empService.canUpdateRating(managerId);
  }

  updateRating(newRating: number): void {
    if (newRating) {
      const changeObj = {
        id: this.employee.id,
        rating: newRating
      };
      this.store.dispatch(new UpdateEmployee(changeObj)).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
