import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app/app.state';
import * as UserActions from '../../../app/state/user/user.actions';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.sass']
})
export class MainScreenComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null){
      let isLogged = true;
      this.store.dispatch(UserActions.updateIsLogged({isLogged}));
    }
  }

}
