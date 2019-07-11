import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/Forms';
import * as firebase from "firebase";
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { MyFireService } from 'src/app/services/fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier: NotificationService,
    private router: Router,
    private myfire: MyFireService,
    private userservice: UserService) { }

  login: boolean = true;

  ngOnInit() {
  }

  onSubmitForm(f: NgForm) {
    const inputEmail = f.value.inputEmail;
    const inputPassword = f.value.inputPassword;


    firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).then(userData => {

      // COMPROBAMOS LA VERFICIACION 
      if (userData.user.emailVerified) {

        console.log(userData);
        this.login = true;
        this.router.navigate(['/allposts']);
        return this.myfire.getUserFromDatabase(userData.user.uid);

      } else {

        const message = "Your email not yet verified";
        this.notifier.display('error', message);
        firebase.auth().signOut();

      }
    }).catch(error => {

      this.notifier.display('error', error.message);
      this.login = false;
      console.log(error);

    }).then(userDataFromDatabase => {

      if (userDataFromDatabase) {

        this.userservice.set(userDataFromDatabase);
        console.log(userDataFromDatabase)
        this.router.navigate(['/allposts']);
      }

    }).catch(error => {
      this.notifier.display('error', error.message);
    })
  }

}
