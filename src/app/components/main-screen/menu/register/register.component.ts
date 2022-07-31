import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { State } from 'src/app/state/app/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  errorMessage: string = "Username already exist!";
  isShowErrorMessage = false;
  constructor(private fb: FormBuilder, private store: Store<State>, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: '',
      password: '',
      email: '',
      fullname: ''
    });
  }

  onSubmit(form: FormGroup) {
    let username = form.value.username;
    let password = form.value.password;
    let email = form.value.email;
    let fullname = form.value.fullname;
    let user: User = {username, password, email, fullname} as User;
    this.userService.register(user).subscribe(
      success => {
        this.router.navigate(['login']);
      },
      err => {
        console.log(err)
        this.isShowErrorMessage = true;
        this.errorMessage = err.error.message
      },
    )
  }
}
