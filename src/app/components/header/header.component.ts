import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userservice: UserService, private router: Router) { }

  isLoggedIn: boolean = false;
  name: string;
  email: string;
  uid: string;

  ngOnInit() {
    // OBTENEMOS DEL EVENEMIITER DE USERSERVICE
    this.userservice.satatusChange.subscribe(userData => {
      if (userData) {
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.name = null;
        this.email = null;
        this.uid = null;
      }
    })

    // COMPROBAMOS EL LOGIN
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;

        // MANTENGA LA INFORMACION INCLUSO DESPUES DE REFRESCAR
        const user = this.userservice.getProfile();
        if (user && user.name) {
          this.name = user.name;
          this.email = user.email;
          this.uid = user.uid;
        }

        // NAVEGAMOS A ALLPOSTS
        this.router.navigate(['/allposts']);

      } else {
        this.isLoggedIn = false;
      }
    });

  }

  onLogout() {
    firebase.auth().signOut().then(() => {
      this.userservice.destroy();
      this.isLoggedIn = false;
    })

    this.router.navigate(['/home']);

  }

}
