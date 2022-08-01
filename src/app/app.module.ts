import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemEffects } from './state/item/item.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MenuModule } from './components/main-screen/menu/menu.module';
import { TaskEffects } from './state/task/task.effects';
import { venkoReducer } from './state/app/venko.reducer';
import { LoginComponent } from './components/main-screen/menu/login/login.component';
import { RegisterComponent } from './components/main-screen/menu/register/register.component';
import { ProfileComponent } from './components/main-screen/menu/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', venkoReducer),
    StoreDevtoolsModule.instrument({
      name: 'VENKO',
      maxAge: 20,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ItemEffects, TaskEffects]),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
