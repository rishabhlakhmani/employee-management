import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { LoginAUser } from '../core/store/action/core.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.store.dispatch(new LoginAUser(this.email)).subscribe((resp) => {
      this.router.navigate(['home']);
    }, error => {
      console.log(error);
    });
  }

  register() {
    this.router.navigate(['register']);
  }

}
