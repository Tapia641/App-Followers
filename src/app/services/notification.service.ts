import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private sub = new Subject<any>();
  public emitter = this.sub.asObservable();

  display(type, message) {
    this.sub.next({ type, message });
  }
}
