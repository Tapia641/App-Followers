import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/Forms';
import * as firebase from "firebase";
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier: NotificationService, private router: Router) { }

  login: boolean = true;

  ngOnInit() {
  }

  onSubmitForm(f: NgForm) {
    const inputEmail = f.value.inputEmail;
    const inputPassword = f.value.inputPassword;


    firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).then(userData => {
      console.log(userData);
      this.login = true;
      this.router.navigate(['/allposts']);
    }).catch(error => {
      this.notifier.display('error', error.message);
      this.login = false;
      console.log(error);
    })
  }

}
