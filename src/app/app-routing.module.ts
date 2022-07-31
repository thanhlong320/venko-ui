import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/main-screen/menu/login/login.component';
import { RegisterComponent } from './components/main-screen/menu/register/register.component';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () =>
      import('./components/main-screen/menu/menu.module').then(
        (m) => m.MenuModule
      ),
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
