import { Routes } from '@angular/router';
import {Home} from './presentation/home/home';
import {Login} from './presentation/login/login';

export const routes: Routes = [
  { path: '', component: Home, title: "Home Page" },
  { path: 'login', component: Login, title: "Login Page"},
];
