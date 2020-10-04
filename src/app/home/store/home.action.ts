import { Employee } from '../models/employee';

export class LoadAllEmployees {
    static type = `[Employees] Get All Employees`;

    constructor() {}
}

export class FilterEmployees {
    static type = `[Employees] FilterEmployees`;

    constructor(readonly role: string) {}
}

export class SetOpenedProfile {
    static type = `[Employees] Set Opened Profile`;

    constructor(readonly emp: Employee) {}
}

export class GetEmployeeById {
    static type = `[Employees] Get Employee BY ID`;

    constructor(readonly id: number, readonly employeeType: string) {}
}

export class LoadManager {
    static type = `[Employees] Fetch Manager`;

    constructor(readonly id: number) {}
}

export class UpdateEmployee {
    static type = `[Employees] Update Employee`;

    constructor(readonly employee: Employee) {}
}


