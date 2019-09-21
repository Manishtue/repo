import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { promise } from 'protractor';
import { url } from 'inspector';

@Injectable()
export class FileHandlerService {
    private actionURL: string;
    constructor(private http: HttpClient) { // , private _configService: ConfigService
       // this.actionURL = this._configService.Config.ApiUrl;
        this.actionURL = 'https://filemanagerportalapi.azurewebsites.net/api';
    }

      uploadFile(_model) {
          const headers = new HttpHeaders();
        headers.append('Content-Type', 'undefined');
        return this.http.post(this.actionURL + '/FileHandler/UploadFile', _model, { headers: headers });
    }

    getFileList(_model) {
        return this.http.get<any>(this.actionURL + '/FileHandler/GetFile?UserId=' + _model  ).toPromise();
    }

    downloadFile(_model) {
        const paths  = '/FileHandler/DownloadFile/' + _model.UserID  + '/' + _model.BlobName;
        return this.http.get(`${this.actionURL}${paths}/`, {responseType: 'blob'}).toPromise();
    }

    deleteFiledata(_model) {
      return this.http.post(this.actionURL + '/FileHandler/DeleteFile', _model );
    }

    shareFiledata(_model) {
      return this.http.post(this.actionURL + '/FileHandler/SendMail', _model );
    }
}
