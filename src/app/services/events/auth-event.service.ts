import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthEventService {

  constructor() { }

  @Output() getCurrentToken: EventEmitter<any> = new EventEmitter();
  @Output() getCurrentUserCed: EventEmitter<any> = new EventEmitter();

  getToken(token) {
    // console.log('AuthEventService  getToken: ', token);
    this.getCurrentToken.emit(token);
  }

  getUser(user) {
    // console.log('AuthEventService  get user: ', user);
    this.getCurrentUserCed.emit(user);
  }

}
