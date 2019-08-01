import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // Recibimos el nombre
  @Input() imageName: string;

  defaultImage: string = "https://www.control.vg/wp-content/themes/crystalskull/img/defaults/default.jpg";
  imageData: any = {};

  constructor() { }

  ngOnInit() {
    firebase.database().ref('images').child(this.imageName).once('value').then(snapshot =>{
      this.imageData = snapshot.val();
      this.defaultImage = this.imageData.fileUrl;
    });

  }

}
