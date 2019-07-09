import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// IMPORTAMOS FIREBASE
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})

export class RouteGuard implements CanActivate {

  canActivate() {
    if (firebase.auth().currentUser) {
      return true;
    } else {
      firebase.auth().signOut();
      return false;
    }
  }

  
}
