import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  satatusChange: any = new EventEmitter<any>();

  constructor() { }

  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.satatusChange.emit(userFromDatabase);
  }

  destroy() {
    localStorage.removeItem('user');
    this.satatusChange.emit(null);
  }

  getProfile() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }
}
