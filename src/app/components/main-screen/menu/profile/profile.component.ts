import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { State } from 'src/app/state/app/app.state';
import { getUser } from 'src/app/state/app/venko.selectors';
import * as UserActions from '../../../../state/user/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User>;
  form!: FormGroup;
  errorMessage: string = "Username already exist!";
  isShowErrorMessage = false;
  constructor(private fb: FormBuilder, private store: Store<State>, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.userService.getUser(localStorage.getItem("username"))
    
  }

  onSubmit(form: FormGroup) {
    
  }

}
