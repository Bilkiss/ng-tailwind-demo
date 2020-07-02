import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../services/storage.service';
import { AuthEventService } from '../../../services/events/auth-event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isUserLogin = false;
  userToken;
  user: any = {};
  toggleNavDropdown = false;
  toggleCatDropdown = false;
  isNavOpen = false;

  constructor(
    public storage: StorageService,
    public authEventService: AuthEventService
  ) { }

  ngOnInit() {

    this.getTokenFromAuth();
    this.getCurrUserFromAuth();
    this.getTokenFromStorage();
    this.getUserFromStorage();

  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleAddOffer() {
    this.toggleNavDropdown = !this.toggleNavDropdown;
  }

  toggleCatMenu() {
    // console.log('toggle cat menu');
    this.toggleCatDropdown = !this.toggleCatDropdown;
  }

  getTokenFromStorage() {
    this.userToken = this.storage.get('currentUserToken');
    // console.log('userToken NAV: ', this.userToken);
    if (this.userToken)
      this.isUserLogin = true;

  }

  getUserFromStorage() {
    this.user = this.storage.get('currentUserCred');
    this.user = JSON.parse(this.user);
    // console.log('user NAV: ', this.user);

  }

  getTokenFromAuth() {
    this.authEventService.getCurrentToken.subscribe( token => {
      // console.log('subscribe getCurrentToken on NAV: ', token);
      if (token)
        this.isUserLogin = true;
    }, error => {
      console.log('Error on subscribe to getCurrentToken: ', error);
    });
  }

  getCurrUserFromAuth() {
    this.authEventService.getCurrentUserCed.subscribe( user => {
      // console.log('subscribe getCurrentgetCurrUserFromAuthToken on NAV: ', user);
      if (user) {
        this.user = user;
      }
    }, error => {
      console.log('Error on subscribe to getCurrUserFromAuth: ', error);
    });
  }

}
