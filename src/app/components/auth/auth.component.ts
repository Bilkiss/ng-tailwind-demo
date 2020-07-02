import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EndpointsService } from '../../services/endpoints.service';
import { StorageService } from '../../services/storage.service';
import { AuthEventService } from '../../services/events/auth-event.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userCred: any;
  regUserCred: any;
  public loginForm: FormGroup;
  public registrationForm: FormGroup;
  private currentUserToken: any;
  submitted = false;
  errorLogin = false;
  errorLoginMsg = '';
  errorReg = false;
  errorRegMsg = '';
  isLoginTab = true;
  isRegistrationTab = false;
  alertReg = false;
  regSuccessMsg = '';

  constructor(
    public endpointService: EndpointsService,
    public fBuilder: FormBuilder,
    public router: Router,
    public storage: StorageService,
    public authEventService: AuthEventService
  ) {

    this.loginForm = this.fBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
    });
  }

  ngOnInit() {
    this.userCred = {
      email: '',
      password: ''
    };

    this.regUserCred = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      phone: ''
    };
  }

  loginContent() {
    this.isLoginTab = !this.isLoginTab;
    this.isRegistrationTab = false;
  }

  registrationContent() {
    this.isRegistrationTab = !this.isRegistrationTab;
    this.isLoginTab = false;
  }

  userLogin() {
    this.submitted = true;

    // console.log('userCred: ', this.userCred);
    if (this.loginForm.invalid) {
      return;
    }

    this.endpointService.request('signin', 'post', this.userCred).subscribe( res => {
      // console.log('Res login ', res);
      if (res) {
        this.currentUserToken = res;
        this.storage.set('currentUserToken', this.currentUserToken.token);
        this.storage.set('currentUserCred', JSON.stringify(this.currentUserToken.user));

        this.authEventService.getToken(this.currentUserToken.token);
        this.authEventService.getUser(this.currentUserToken.user);


        this.goToHomepage();
      }


    }, error => {
      console.log('Error!! login ', error);
      this.errorLogin = true;
      this.errorLoginMsg = error.error.msg;
    });
  }

  closeRegAlert() {
    this.alertReg = false;
  }

  userRegistration() {

    this.submitted = true;

    // console.log('regUserCred: ', this.regUserCred);

    if (this.registrationForm.invalid) {
      return;
    }

    this.endpointService.request('register', 'post', this.regUserCred).subscribe( res => {
      // console.log('Res - user registration: ', res);
      if (res) {
        this.currentUserToken = res;

        this.regSuccessMsg = this.currentUserToken.msg;
        // console.log('regSuccessMsg .msg: ', this.regSuccessMsg);

        this.alertReg = true;
        this.isRegistrationTab = false;
        this.isLoginTab = true;

        setTimeout(() => {
          this.alertReg = false;
        }, 2000);

      }
    }, error => {
      console.log('Error!! user registration: ', error);
      this.errorReg = true;
      this.errorRegMsg = error.error.msg;
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }
  get fLogin() { return this.loginForm.controls; }

  goToHomepage() {
    this.router.navigate(['']);
  }



}
