import { Component, OnInit } from '@angular/core';
import { Employee } from '../home/models/employee';
import { Store } from '@ngxs/store';
import { RegisterAUser } from '../core/store/action/core.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerFormValue = new Employee();
  public roles = ['HR', 'Developer', 'Manager'];

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  register(regForm) {
    this.store.dispatch(new RegisterAUser(this.registerFormValue)).subscribe(() => {
      regForm.form.reset();
    }, err => {
      console.log(err);
    });
  }

}
