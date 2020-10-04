import { Employee } from '../models/employee';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { LoadAllEmployees, SetOpenedProfile, LoadManager, UpdateEmployee, GetEmployeeById } from './home.action';
import { EmployeeService } from '../services/employee.service';
import { tap, catchError } from 'rxjs/operators';
import { CoreState } from 'src/app/core/store/state/core.state';

export class HomeStateModel {
    employeeList: Employee[];
    openedProfile?: Employee;
    openedProfileManager?: string;
}
@State<HomeStateModel>({
    name: 'home',
    defaults: new HomeStateModel()
})
@Injectable()
export class HomeState {

    constructor(private employeeService: EmployeeService, private store: Store) {}

    @Selector()
    static getOpenedProfile(state: HomeStateModel) {
        return state.openedProfile;
    }

    @Selector()
    static getOpenedProfileManager(state: HomeStateModel) {
        return state.openedProfileManager;
    }

    @Action(SetOpenedProfile)
    setOpenedProfile(context: StateContext<HomeStateModel>, {emp}: SetOpenedProfile) {
        context.patchState({
            openedProfile: emp
        });
        if (emp.manager_id) {
            context.dispatch(new LoadManager(emp.manager_id));
        }
    }

    @Action(GetEmployeeById)
    loadEmployeeByID(context: StateContext<HomeStateModel>, {id, employeeType}: GetEmployeeById) {
        return this.employeeService.loadEmployeeByID(id).pipe(
            tap((emp: Employee) => {
                if (employeeType === 'employee') {
                    context.dispatch(new SetOpenedProfile(emp));
                }
            }),
            catchError((err: Error) => {
                throw err;
            })
        );
    }

    @Action(LoadManager)
    loadManager(context: StateContext<HomeStateModel>, {id}: LoadManager) {
        const currentState = context.getState();
        // avoiding api call here
        const manager = currentState.employeeList ? currentState.employeeList.find(emp => emp.id === id) : '';
        if (manager) {
            context.patchState({
                openedProfileManager: manager.name
            });
        } else {
            this.store.dispatch(new GetEmployeeById(id, 'manager')).subscribe(emp => {
                context.patchState({
                    openedProfileManager: emp.name
                });
            }, err => {
                context.patchState({
                    openedProfileManager: 'N/A'
                });
            });
        }
    }

    @Action(LoadAllEmployees)
    loadEmployeeList(context: StateContext<HomeStateModel>) {
        return this.employeeService.loadAllEmployees().pipe(
            tap((emplList: Employee[]) => {
                context.patchState({employeeList: emplList});
            }),
            catchError((err: Error) => {
                context.patchState({employeeList: []});
                throw err;
            })
        );
    }

    @Action(UpdateEmployee)
    updateEmployee(context: StateContext<HomeStateModel>, {employee}: UpdateEmployee) {
        return this.employeeService.updateEmployee(employee).pipe(
            tap((updatedEmp: Employee) => {
                context.patchState({openedProfile: updatedEmp});
            }),
            catchError((err: Error) => {
                // context.patchState({openedProfile: {}});
                throw err;
            })
        );
    }

}
