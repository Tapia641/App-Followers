import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class MyFireService {

  constructor() { }

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);

    return ref.once('value').then(
      snapshot => snapshot.val()
    )

  }

  uploadFile(file, name) {
    const fileref = firebase.storage().ref().child('image/' + name);
    const uploadTask = fileref.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', snapshot => {
      }, error => {
        reject(error);
      }, () => {
        const fileUrl = uploadTask.snapshot.downloadURL;
        resolve({ name, fileUrl });
      });
    });
  }

}
