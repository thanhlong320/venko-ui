import { createAction, props } from '@ngrx/store';
import { Token } from 'src/app/core/model/token';
import { User } from 'src/app/core/model/user';

export const login = createAction(
    '[User] Login',
    props<{ user: User }>()
);

export const loginSuccess = createAction(
    '[User] Login success',
    props<{ token: Token }>()
);

export const updateIsLogged = createAction(
    '[User] Update isLogged',
    props<{ isLogged: boolean }>()
);


export const getUser = createAction(
    '[User] Get User',
    props<{ username: string | null}>()
);

export const getUserSuccess = createAction(
    '[User] Get User success',
    props<{ user: User }>()
);