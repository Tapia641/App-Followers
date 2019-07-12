import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class MyFireService {

  constructor(private user: UserService) { }

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
        const fileUrl = uploadTask.snapshot.ref.getDownloadURL();
        resolve({ name, fileUrl });
      });
    });
  }

  handleImageUpload(data) {
    const user = this.user.getProfile();

    // Get a key for a new Post.
    const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
    const personalPostDetails = {
      fileUrl: data.fileUrl,
      name: data.name,
      creationDate: new Date().toString()
    };

    // Write the new post's data simultaneously in the posts list and the user's post list
    const updates = {};
    updates['/myposts/' + user.uid + "/" + newPersonalPostKey] = personalPostDetails;

    console.log(personalPostDetails.fileUrl);

    return firebase.database().ref().update(updates);
  }

}
