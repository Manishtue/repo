import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './../Services/auth-service.service';
import { User} from './../Models/UsersModel';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'Document Manager';
  User: User = new User(null);
  loading = false;
  footyear: number = new Date().getFullYear();

  constructor(private _AuthService: AuthServiceService, private router: Router) { }

  Login() {

    this._AuthService.userAuthentication(this.User).subscribe(
      (success: User) => {
        console.log(success);
        // this.router.navigateByUrl(this.returnUrl);
        if (success) {
          localStorage.setItem('currentUser', JSON.stringify(success));
          sessionStorage.setItem('iname', success._firstName);
          sessionStorage.setItem('ipass', this.User.UserPassword);
              alert('Authenticated User');
          this.router.navigate(['home']);
        } else { alert('Invalid User'); }
      }, error => {
        console.log(error);
      });
  }
}
