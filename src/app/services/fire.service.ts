import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class MyFireService {

  MyUrl: string;

  constructor(private user: UserService) { }

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);

    return ref.once('value').then(
      snapshot => snapshot.val()
    )

  }

  uploadFile(file, name, description) {
    const fileref = firebase.storage().ref().child('/image/' + name);
    const uploadTask = fileref.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', snapshot => {
      }, error => {
        reject(error);
      }, () => {

        fileref.getDownloadURL().then(url => {
          // SOLO ASI ENVIA LA URL
          resolve({ name, url, description });
        });

      });
    });
  }

  handleImageUpload(data) {
    const user = this.user.getProfile();

    // Get a key for a new Post.
    const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
    const personalPostDetails = {
      fileUrl: data.url,
      name: data.name,
      description: data.description,
      creationDate: new Date().toString()
    };

    // Get a key for all posts
    const allpostkey = firebase.database().ref('allposts').push().key;
    const allpostdetails = {
      fileUrl: data.url,
      name: data.name,
      description: data.description,
      creationDate: new Date().toString(),
      uploadBy: user
    }

    // Data for the image
    const imageDetails = {
      fileUrl: data.url,
      name: data.name,
      description: data.description,
      creationDate: new Date().toString(),
      uploadBy: user,
      favoriteCount: 0
    }

    // Write the new post's data simultaneously in the posts list and the user's post list
    const updates = {};
    updates['/myposts/' + user.uid + "/" + newPersonalPostKey] = personalPostDetails;
    updates['/allposts/' + allpostkey] = allpostdetails;
    updates['/images/' + data.name] = imageDetails;


    console.log(personalPostDetails.fileUrl);

    return firebase.database().ref().update(updates);
  }

  getUserPostRef(uid) {
    return firebase.database().ref('myposts').child(uid);
  }
}
