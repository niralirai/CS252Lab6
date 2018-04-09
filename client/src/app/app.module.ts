import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';


import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { fbConfig } from '../environments/firebase.config';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


// import { UserComponent } from './user/user.component';

import { AuthService } from './services/auth.service';
// import { DatabaseService } from './services/database.service';



@NgModule({
  declarations: [
     AppComponent,
    SignupComponent,
    SplashComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(fbConfig, 'ConnecPlus'), 
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKfbDYJM_6rEnYqBgGbQrR5lNqtffjYR0'
    })
  ],
  providers: [
    AuthService,
    // DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
