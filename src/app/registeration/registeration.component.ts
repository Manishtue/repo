import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../Models/UsersModel';
import { AuthServiceService } from './../Services/auth-service.service';
import { error } from '@angular/compiler/src/util';
import { userInfo } from 'os';
import { debounceTime } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
// import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})

export class RegisterationComponent {
  User: User = new User(null);
  loading = false;
  vartoken: string;
  q: string;
  userResult = false;
  InputValue: any;
  ischecked = false;
  private readonly notifier: NotifierService;

  // UserID: Data.UserId,
  // Pwd: Data.UserPassword,
  // Name: Data._firstName
  constructor(
    private router: Router,
    private _AuthService: AuthServiceService,
    private http: HttpClient,
    private el: ElementRef,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }
  // private userService: UserService,
  // private alertService: AlertService) { }

    Login() {
    this.loading = true;
    this._AuthService.userLogin(this.User)
      .subscribe(
        data => {
          if (data) {
            this.loading = false;
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            sessionStorage.setItem('iuser', this.User.UserId.toString());
            // sessionStorage.setItem('ipass', this.User.UserPassword);
            // alert('Authenticated User');
            this.router.navigate(['home']);
            // this.alertService.success('Registration successful', true);
            // this.router.navigate(['/login']);
          }
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
          alert('Incorrect Details or user does not exist, please register first');

        });

  }

  register() {
    this.loading = true;
    this._AuthService.userRegistration(this.User)
      .subscribe(
        data => {
          this.loading = false;
          alert('Registration Successfull. Please login to continue');
          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
          alert('error');
        });
  }

  token() {
    this.loading = true;
    const randtoken = Math.random().toString(36).substr(2); // remove `0.`
    this.User.Token = randtoken;
    this._AuthService.userToken(this.User)
      .subscribe(
        data => {
           this.loading = false;
          sessionStorage.setItem('itoken', this.User.Token.toString());
          // alert('Token Sent Successfully. Please login to continue');
          this.notifier.show({
            type: 'success',
            message: 'Token Sent Successfully. Please login to continue'
            // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
          });
        },
        error => {
          this.loading = false;
          this.notifier.show({
            type: 'error',
            message: 'Token Sending failed'
            // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
          });
        });     // returns random token
  }

  validatetoken() {
    const temp = sessionStorage.getItem('itoken');
    if (this.vartoken === temp) {
      this.router.navigate(['home']);
    } else {
      this.loading = false;
      // alert('Invalid token');
      this.notifier.show({
        type: 'error',
        message: 'Token Mismatch'
        // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      });

    }


  }

  validateuser(event: any) {
     const userid = (event.target.value);
    if (userid > 99999 && !this.ischecked) {
      this.http.get('http://pmoportalapi.azurewebsites.net/rest/user/userValidation/' + userid)
      .subscribe(
        (data: any) => {
          // alert(res.userIsPresent ? 'user exist' : 'user does not exist');
          if (data.userIsPresent === true) {
            this.User.UserId = userid;
            // localStorage.setItem('currentUser', JSON.stringify(data));
            sessionStorage.setItem('iuser', this.User.UserId.toString());
            this.ischecked = true;
            this.notifier.show({
              type: 'success',
              message: 'User Verified'
              // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
            });
             this.token();
            this.ischecked = true;

            } else {
              this.notifier.show({
                type: 'error',
                message: 'User not present, Please register at https://deerepmoportal.cognizant.com/'
                // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
              });
            }
        });
    }
  }
}
