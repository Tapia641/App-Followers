import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  //inputUserame: string;

  // PARA HACER SUBMIT DEL FORM SOLO CON LA CLASE NgForm
  onSubmitForm(form: NgForm) {
    const inputUserame = form.value.inputUserame;
    const inputEmail = form.value.inputEmail;
    const inputPassword = form.value.inputPassword;
    const inputConfirmPassword = form.value.inputConfirmPassword;

    console.log(form.value.inputUserame);

  }

}
