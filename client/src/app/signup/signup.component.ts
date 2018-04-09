import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	create = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		rePassword: "",


	}
	
	

	constructor( private router: Router, private auth: AuthService) {}

	ngOnInit() {}

	onSubmit() {
    console.log("Signup button pressed")
    console.log(this.create.firstName + " " + this.create.lastName)

	this.auth.signup(this.create.email, this.create.password).then((user) => {
			 //this.auth.emailver(user).then(() => { //idk if email is working
 				//this.router.navigateByUrl("create");
 				console.log("hello you were created")
			// }).catch((err) => {
	//		 	console.error(err);
	//		 })
		})





  }
}
