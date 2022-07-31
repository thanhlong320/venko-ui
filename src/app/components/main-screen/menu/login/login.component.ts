import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Token } from 'src/app/core/model/token';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { State } from 'src/app/state/app/app.state';
import * as UserActions from '../../../../state/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = "Username or password not correct!";
  isShowErrorMessage = false;
  constructor(private fb: FormBuilder, private store: Store<State>, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit(form: FormGroup) {
    let username = form.value.username;
    let password = form.value.password;
    let user: User = {username, password} as User;
    this.userService.login(user).subscribe(
      token => {
        localStorage.setItem("token", token.accessToken)
        localStorage.setItem("username", token.username)
        let isLogged = true;
        this.store.dispatch(UserActions.updateIsLogged({isLogged}));
        this.router.navigate(['']);
      },
      err => this.isShowErrorMessage=true,
    )
  }

}
