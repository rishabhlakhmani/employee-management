import { Observable } from 'rxjs';
import { Employee } from 'src/app/home/models/Employee';
import { LoginSuccessModel } from '../services/auth.service';

export interface AuthentcationEndPointsModel {
    login(email: string): Observable<LoginSuccessModel>;
    signUp(employee: Employee): Observable<LoginSuccessModel>;
}
