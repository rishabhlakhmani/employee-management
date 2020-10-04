import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { CoreState } from '../store/state/core.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router) {}

    canActivate() {
        if (this.store.selectSnapshot(CoreState.isUserLoggegIn)) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }

}
