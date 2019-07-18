import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


// IMPORTAMOS FIREBASE
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})

export class HomeGuard implements CanActivate {

  canActivate() {
    if (firebase.auth().currentUser) {
      return false;
    } else {
      // firebase.auth().signOut();
      return true;
    }
  }
}
