import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SplashComponent } from './splash/splash.component';


export const ROUTES: Routes = [
	{
		path: "",
		component: SplashComponent
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "signup",
		component: SignupComponent
	},

];