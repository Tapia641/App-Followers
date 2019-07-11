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

  constructor(private notifier: NotificationService, private router: Router) { }

  ngOnInit() {
  }


  // PARA HACER SUBMIT DEL FORM SOLO CON LA CLASE NgForm
  onSubmitForm(form: NgForm) {
    const inputUsername = form.value.inputUsername;
    const inputEmail = form.value.inputEmail;
    const inputPassword = form.value.inputPassword;
    const inputConfirmPassword = form.value.inputConfirmPassword;

    if (inputPassword == inputConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPassword).then(userData => {

        console.log(userData);

        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
          // Email sent and ....
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

        // CONFIRMAMOS
        const message = "A verification email has been sent to ." + inputEmail;
        this.notifier.display('success', message);

        // UNA VEZ REGISTRADO NOS MOVEMOS AL LOGIN
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);


      }).catch(err => {
        this.notifier.display('error', err.message);
        console.log(err);
      })
    } else {
      this.notifier.display('error', 'These passwords are incorrect');
    }

  }

}
