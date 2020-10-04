import { Employee } from '../../../home/models/employee';

export class LoginAUser {
    static type = `[Login] Login a User`;

    constructor(readonly emailId: string) {}
}

export class LogoutAUser {
    static type = `[Login] Logout a User`;

    constructor() {}
}

export class RegisterAUser {
    static type = `[Register] Register a User`;

    constructor(readonly employee: Employee) {}
}

export class SetCurrentEmployee {
    static type = `[Employee] Currrent User`;

    constructor(readonly employee: Employee) {}
}
