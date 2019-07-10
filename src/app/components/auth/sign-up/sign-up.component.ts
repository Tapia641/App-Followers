import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  register: boolean = false;

  constructor(private notifier: NotificationService, private router: Router) { }

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
        this.notifier.display('Verify your email');
      }).catch(function (error) {
        this.notifier.display('error', error.message);
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

      // UNA VEZ REGISTRADO NOS MOVEMOS AL LOGIN
      this.router.navigate(['/login']);

    }).catch(err => {
      this.notifier.display('error', err.message);
      console.log(err);
      this.register = false;
    })

  }

}
