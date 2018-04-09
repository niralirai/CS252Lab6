import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from 'firebase';
import {Observable} from 'rxjs/observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
	
	private user: User;

	isAuthenticated(): Promise<any>{
		return new Promise((resolve, reject) => {
			this.afAuth.authState.subscribe((user) => {
				console.log(user);
				resolve(!!user);
			});
		});
	}
	getUser(): Promise<any>{
		return new Promise((resolve, reject) => {
			this.afAuth.authState.subscribe((user) => {
				resolve(user);
			})
		})
	}
	login(email, password): Promise<any>{
		return this.afAuth.auth.signInWithEmailAndPassword(email,password);
	}
	logout(): Promise<any>{
		return this.afAuth.auth.signOut();
	}
	signup(email, password): Promise<any>{

		return this.afAuth.auth.createUserWithEmailAndPassword(email,password);	
	}
	emailverification(user: User): Promise<any>{
		return user.sendEmailVerification();
	}

	

	reauthenticate(email,password){
		return this.user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, password));
		//return this.user.reauthenticateWithCredential(this.afAuth.auth.EmailAuthProvider.credential(this.user.email, password));
	}


	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.auth.onAuthStateChanged((user) => {
			this.user = user;
		});
	}

}
