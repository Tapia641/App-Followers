import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MyFireService } from 'src/app/services/fire.service';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(private notifier: NotificationService,
    private myfire: MyFireService) { }

  nameImage: string;

  ngOnInit() {
  }

  onFileSelection($event) {


    let fileList: FileList = event.currentTarget.files;

    if (fileList.length > 0 && this.nameImage != null) {
      console.log(fileList);
      const file: File = fileList[0];

      this.myfire.uploadFile(file, this.nameImage).then(data => {
        this.notifier.display('success', "Picture successfuly uploaded!")
      }).catch(error => {
        this.notifier.display('error', error.message);
      })

    } else {
      this.notifier.display('error', 'please input a name of image.');
      this.nameImage = null;
    }

  }

}
