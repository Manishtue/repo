import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FileHandlerService } from '../Services/filehandler.service';
import { User} from './../Models/UsersModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [FileHandlerService],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // UserID: number;
  fileToUpload: File = null;
  formData: FormData = null;
  public loading = false;
  _user: string;
   file;
  filename;
  isLoading = false;
  constructor(private _FileHandlerService: FileHandlerService,
    private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit() {
    this._user =  sessionStorage.getItem('iuser').toString();
  }

  logout() {
  localStorage.clear();
  sessionStorage.clear();
  }

  fn_isLoading($event) {
    this.isLoading = $event;
  }

  // SelectFile(e) {
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     this.file = e.target.files[i];
  //     this.filename = e.target.files[i].name;
  //   }
  //   this.changeDetectorRef.detectChanges();
  // }

  // UploadFile() {
  //   // debugger;
  //   const formData: FormData = new FormData();
  //   formData.append('UserId', this._user.UserId.toString());
  //   // formData.append('UserId', this.UserID.toString());
  //   // for (var i = 0; i < event.target.files.length; i++) {
  //   formData.append('fileUpload', this.file, this.filename);
  //   // }
  //   // this.formData.append("",);
  //   // this.loading = true;
  //   this._FileHandlerService.uploadFile(formData)
  //     .subscribe(
  //     success => {
  //       success ? alert('Upload successful.') : alert('Upload failed.');
  //       // this.modalService.dismissAll();
  //       this.loading = false;
  //       // this.alertType = 'success';

  //     },
  //     err => {
  //       this.loading = false;
  //       // this.alertType = 'danger';
  //       // this.showAlert('Server error while uploading file.');
  //     }
  //     );
  // }

}
