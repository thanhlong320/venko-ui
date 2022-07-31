import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs";
import { Token } from "src/app/core/model/token";
import { User } from "src/app/core/model/user";
import { UserService } from "src/app/core/service/user.service";
import * as UserActions from './user.actions';
@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((action) =>
        this.userService.login(action.user).pipe(
          map((token: Token) => {
            return UserActions.loginSuccess({ token });
          })
        )
      )
    );
  });

  
}
