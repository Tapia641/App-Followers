import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FollowingComponent } from './components/following/following.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/Forms';
import { FooterComponent } from './components/footer/footer.component';
import { RouteGuard } from './guards/route.guard';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { MyFireService } from './services/fire.service';
import { UserService } from './services/user.service';
import { PostComponent } from './components/shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FollowingComponent,
    FavoritesComponent,
    MyPostsComponent,
    SignUpComponent,
    LoginComponent,
    AllPostsComponent,
    HomeComponent,
    FooterComponent,
    NotificationComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard,
    NotificationService,
    MyFireService,
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
