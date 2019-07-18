import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MyFireService } from 'src/app/services/fire.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {


  // @Input() imageName: string;
  // defaultImage: string = "https://er006ogq00-flywheel.netdna-ssl.com/wp-content/uploads/2018/02/default-image-800x600.jpg";
  // imageData: any = {};

  constructor(private notifier: NotificationService,
    private myfire: MyFireService) { }

  nameImage: string;
  description: string;
  personalPostRef: any;
  postLists: any = [];

  ngOnInit() {

    // firebase.database().ref('images').child(this.imageName).once('value').then(snpashot => {
    //   this.imageData = snpashot.val();
    //   this.defaultImage = this.imageData.fileUrl;
    // })



    const uid = firebase.auth().currentUser.uid;
    this.personalPostRef = this.myfire.getUserPostRef(uid);
    this.personalPostRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      });
    })

  }

  onFileSelection($event: Event) {

    // let fileList: FileList = event.currentTarget.files;
    const fileList = (<HTMLInputElement>$event.target).files;

    if (fileList.length > 0 && this.nameImage != null && this.description != null) {
      console.log(fileList);
      const file: File = fileList[0];

      this.myfire.uploadFile(file, this.nameImage, this.description).then(data => {
        this.notifier.display('success', "Picture successfuly uploaded!")

        // LA ALMACENAMOS EL BASE DE DATOS CON EL ID DEL USUARIO
        this.myfire.handleImageUpload(data);

      }).catch(error => {
        this.notifier.display('error', error.message);
      })

    } else {
      this.notifier.display('error', 'please complete text inputs.');
      this.nameImage = null;
    }

  }


  ngOnDestroy() {
    this.personalPostRef.off();
  }

}
