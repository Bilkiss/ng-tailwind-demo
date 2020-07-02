import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userObj: any;

  constructor(
    private storage: StorageService,
    private router: Router
  ) {

    this.userObj = this.storage.get('currentUserCred');

  }

  canActivate(): boolean {

    let user = this.storage.get('currentUserToken');
    // console.log("user: ", user);
    if (!user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
