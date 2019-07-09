// CREAMOS LAS RUTAS
// NOTA> QUITAR EN TSLINT.JSON TODO DE "quotemark": [],

import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FollowingComponent } from './components/following/following.component';
import { HeaderComponent } from './components/header/header.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes =
    [
        { path: '', component: HomeComponent },
        { path: 'allposts', component: AllPostsComponent },
        { path: 'favorites', component: FavoritesComponent },
        { path: 'following', component: FollowingComponent },
        { path: 'myposts', component: MyPostsComponent },
        { path: '', component: LoginComponent },
        { path: '', component: SignUpComponent },

    ];

// NECESARIO PARA EXPORTAR ESTE MODUO
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
