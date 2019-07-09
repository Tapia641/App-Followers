import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/Forms';
import * as firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  login: boolean = true;

  ngOnInit() {
  }

  onSubmitForm(f: NgForm) {
    const inputEmail = f.value.inputEmail;
    const inputPassword = f.value.inputPassword;

    firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).then(userData => {
      console.log(userData);
      this.login = true;
    }).catch(error => {
      this.login = false;
      console.log(error);
    })
  }

}
