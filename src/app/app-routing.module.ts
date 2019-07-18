// CREAMOS LAS RUTAS
// NOTA> QUITAR EN TSLINT.JSON TODO DE "quotemark": [],

import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FollowingComponent } from './components/following/following.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouteGuard } from './guards/route.guard';
import { HomeGuard } from './guards/home.guard';

const appRoutes: Routes =
    [
        { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
        { path: 'allposts', component: AllPostsComponent, canActivate: [RouteGuard] },
        { path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard] },
        { path: 'following', component: FollowingComponent, canActivate: [RouteGuard] },
        { path: 'myposts', component: MyPostsComponent, canActivate: [RouteGuard] },
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignUpComponent },
    ];

// NECESARIO PARA EXPORTAR ESTE MODUO
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
