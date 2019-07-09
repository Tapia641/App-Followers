import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from "firebase";
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  register: boolean = false;

  constructor(router: Router) { }

  ngOnInit() {
  }


  // PARA HACER SUBMIT DEL FORM SOLO CON LA CLASE NgForm
  onSubmitForm(form: NgForm) {
    const inputUsername = form.value.inputUsername;
    const inputEmail = form.value.inputEmail;
    const inputPassword = form.value.inputPassword;
    const inputConfirmPassword = form.value.inputConfirmPassword;

    firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPassword).then(userData => {
      this.register = true;

      console.log(userData);

      let user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
        // Email sent and ....
      }).catch(function (error) {
        console.log(error);
      });

      firebase.database().ref('users/' + user.uid).set({
        uid: user.uid,
        name: inputUsername,
        email: inputEmail,
        registrationDate: new Date().toString(),
        password: inputPassword
      }).then(() => {
        firebase.auth().signOut();
      })


      
    }).catch(err => {
      console.log(err);
      this.register = false;
    })

  }

}
