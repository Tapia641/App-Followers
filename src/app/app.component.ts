import { Component, OnInit } from '@angular/core';

// IMPORTARLO DE FORMA MAS SENCILLA
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // npm install firebase --save
  ngOnInit() {
    var firebaseConfig = {
      apiKey: "AIzaSyDhpqAxAg1_qOl1AhdQBJKrhLwZB4wPC6k",
      authDomain: "app-followers-f6905.firebaseapp.com",
      databaseURL: "https://app-followers-f6905.firebaseio.com",
      projectId: "app-followers-f6905",
      storageBucket: "",
      messagingSenderId: "270046968903",
      appId: "1:270046968903:web:0096fd5e90490ec5"
    };
    firebase.initializeApp(firebaseConfig);
  }

  title = 'App-Followers';

}
