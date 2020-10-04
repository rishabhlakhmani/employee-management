import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../../../home/models/employee';
import { LoginAUser, SetCurrentEmployee, RegisterAUser, LogoutAUser } from '../action/core.action';
import { AuthService, LoginSuccessModel } from '../../services/auth.service';
import { Injectable } from '@angular/core';

export class CoreStateModel {
    isUserLoggedIn: boolean;
    currentEmployee?: Employee;
}

@State<CoreStateModel>({
    name: 'core',
    defaults: new CoreStateModel()
})
@Injectable()
export class CoreState {

    constructor(private authService: AuthService) {}

    @Selector()
    static isUserLoggegIn(state: CoreStateModel) {
        return state.isUserLoggedIn;
    }

    @Selector()
    static getCurrentEmployee(state: CoreStateModel) {
        return state.currentEmployee;
    }

    @Action(LoginAUser)
    login(context: StateContext<CoreStateModel>, {emailId}: LoginAUser){
        return this.authService.login(emailId).pipe(
            tap((resp: LoginSuccessModel) => {
                context.patchState({isUserLoggedIn: true});
                context.dispatch(new SetCurrentEmployee(resp.data));
            }),
            catchError((err: Error) => {
                context.patchState({isUserLoggedIn: false});
                throw err;
            })
        );
    }

    @Action(LogoutAUser)
    logout(context: StateContext<CoreStateModel>){
        context.setState({
            isUserLoggedIn: false,
            currentEmployee: null
        });
    }

    @Action(RegisterAUser)
    signUp(context: StateContext<CoreStateModel>, {employee}: RegisterAUser){
        return this.authService.signUp(employee).pipe(
            catchError((err: Error) => {
                throw err;
            })
        );
    }

    @Action(SetCurrentEmployee)
    setCurrentEmployee({getState, patchState}: StateContext<CoreStateModel>, {employee}: SetCurrentEmployee) {
        patchState({
            currentEmployee: employee
        });
    }
}
