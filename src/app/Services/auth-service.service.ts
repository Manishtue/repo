import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ConfigService } from './config.service';
import { User } from './../Models/UsersModel';
import { access } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private actionURL: string;
  constructor(private http: HttpClient) { // , private _configService: ConfigService
    // this.actionURL = this._configService.Config.ApiUrl;
    this.actionURL = 'https://filemanagerportalapi.azurewebsites.net/api';
  }

  userAuthentication(Data: User) {
    // var data = "username=" + Data.UserId + "&password=" + Data.UserPassword + "&grant_type=password"
    const data = { UserID: Data.UserId, Pwd: Data.UserPassword };
    return this.http.post<any>(this.actionURL + `/UserDetails/LoginUser`, (data));
  }

  userRegistration(Data: User) {
    const data = {
      UserID: Data.UserId,
      Pwd: Data.UserPassword,
      Name: Data.UserName
    };
    return this.http.post<any>(this.actionURL + `/UserDetails/RegisterUser`, (data));
  }
  userLogin(Data: User) {
    const data = {
      UserID: Data.UserId
      // Pwd: Data.UserPassword
     };
    return this.http.post<any>(this.actionURL + `/UserDetails/ValidateUser`, (data));
  }
  userToken (Data: User) {
    const data = {
      UserID: Data.UserId,
      Token: Data.Token
    };
    return this.http.post<any>(this.actionURL + `/UserDetails/SendOTPMail`, (data));
    }
}

// http://10.155.143.17:90/api/LDAP/ValidateUserCredentials
