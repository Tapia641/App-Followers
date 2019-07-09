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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
