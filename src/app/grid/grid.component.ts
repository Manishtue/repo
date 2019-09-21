import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FileHandlerService } from '../Services/filehandler.service';
import { AzurePOCO } from '../Models/AzureModel';
import { FilterPipe } from '../filter.pipe';
import { NotifierService } from 'angular-notifier';
import { empty } from 'rxjs';


// import { Subject } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';
// import {FileSaver} from 'file-saver';
const filesaver = require('File-Saver');

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Output() isLoadingevent: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoading = true;
  private readonly notifier: NotifierService;

  @ViewChild('modal') openModal: ElementRef;
  // @ViewChild('modal') closeModal: ElementRef;
  // receivemessage: 'false';
  searchText: string;
  isVisible = false;
  tempdata: string;
  user: any = [];
  public loading = false;
  staticAlertClosed = false;
  successMessage: string;
  alertType: string;
  searchString: string;
  deleteFilename = '';
  shareFilename = '';
  mailtouser = '';
  cognipassword: string;
  data: any = [];
  temparray: any = [];
  isCheckedAll: any = false;
  receiveMessage = '';

  isFileSelected: any = false;
  deleteFileName: string;
  constructor(
    private filehandlerservice: FileHandlerService,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }


  fn_isLoading() {
    this.isLoadingevent.emit(this.isLoading);
  }

  fn_receive($event) {
    console.log('recieved');
    this.receiveMessage = $event;
    this.fn_getFileList();
    console.log('received end..');
  }


  fn_getFileList() {
    this.isLoading = true;
    this.fn_isLoading();
    let user: any;
    // user = JSON.parse(localStorage.getItem('currentUser'));
    user = sessionStorage.getItem('iuser');
    console.log(user);
    this.filehandlerservice.getFileList(user).then(
      // this.filehandlerservice.getFileList('575393').then(
      data => {
        // this.fileList = data;
        this.data = data;
        this.isLoading = false;
        for (let i = 0; i < this.data.length; i++) {
          const name = unescape(this.data[i].fileName);
          this.data[i].fileName = name;
          this.data[i].filesize = (this.data[i].filesize / 1024).toFixed(0) + ' Kb';
          this.data[i].lastmod = this.setDateFormat(this.data[i].lastmod);
          this.data[i].isChecked = false;
          // this.rowData[i].lastmod.substring(0, this.rowData[i].lastmod.indexOf('T'));
        }
        this.fn_isLoading();
      },
      err => {
        this.alertType = 'danger';
        this.isLoading = false;
        this.fn_isLoading();
      }
    );
  }


  downloadFiles() {

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isChecked) {
        console.log(this.data[i]);
        this.fn_downloadFile(this.data[i].fileName);
      }
    }
  }
  deleteFiles() {

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isChecked) {
        console.log(this.data[i]);
        this.fn_deleteFile(this.data[i].fileName);
      }
      this.isCheckedAll = false;
    }
  }
  shareFiles(pass, mailid) {
    if (this.shareFilename != null && this.shareFilename !== '') { this.temparray.push(this.shareFilename);
      this.shareFilename = '';
      } else {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].isChecked) {
          this.temparray.push(this.data[i].fileName);
       }
      }
    }
    console.log(this.temparray);
    this.fn_shareFile(this.temparray, pass, mailid);
    this.shareFilename = '';
    this.temparray = [];
  }
  public fn_downloadFile(blobfile) {
    let user: any = ([] = this.user);
    user = JSON.parse(localStorage.getItem('currentUser'));
    const data: AzurePOCO = new AzurePOCO(null);
    data.BlobName = blobfile;
    data.UserID = sessionStorage.getItem('iuser').toString();
    this.filehandlerservice
      .downloadFile(data)
      .then(res => {
        // const url = window.URL.createObjectURL(Data);
        filesaver.saveAs(res, blobfile);
        // window.open(url);
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.alertType = 'danger';
      });
  }

  fn_confirmDelete(fileName) {
    this.deleteFileName = fileName;
  }
  fn_Delete() {
    this.fn_deleteFile(this.deleteFileName);
  }

  fn_deleteFile(blobfile) {
    this.isLoading = true;
    this.fn_isLoading();
    let user: any = ([] = this.user);
    user = JSON.parse(localStorage.getItem('currentUser'));
    const data: AzurePOCO = new AzurePOCO(null);
    data.BlobName = blobfile;
    data.UserID = sessionStorage.getItem('iuser').toString();
    this.filehandlerservice
      .deleteFiledata(data)
      .subscribe(success => {
        this.notifier.show({
          type: 'success',
          message: 'File deleted Successfully'
          // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
        });
        this.fn_getFileList();
      }, error => {
        this.isLoading = false;
        this.fn_isLoading();
        this.notifier.show({
          type: 'error',
          message: 'Some error occured'
          // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
        });
      });
  }

  fn_shareFile(temparray, pass, mail) {
    this.isLoading = true;
    this.fn_isLoading();
    this.mailtouser = mail;
    this.cognipassword = pass;
    this.temparray = temparray;
    // const mailtouser = '575393'; // change
    // let user: any = ([] = this.user);
    // user = JSON.parse(localStorage.getItem('currentUser'));
    const data: AzurePOCO = new AzurePOCO(null);
    // data.BlobName = this.shareFilename;
    data.MultiBlob = this.temparray;
    data.mailtouser = this.mailtouser;
    data.UserID = sessionStorage.getItem('iuser').toString();
    // this.tempdata = sessionStorage.getItem('ipass');
    data.Password = this.cognipassword;

    this.filehandlerservice.shareFiledata(data).subscribe(
      success => {
        this.isLoading = false;
        this.fn_isLoading();
        this.notifier.show({
          type: 'success',
          message: 'File Shared Successfully'
          // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
        });
      },
      error => {
        this.isLoading = false;
        this.fn_isLoading();
        this.notifier.show({
          type: 'error',
          message: 'Please check ID and Password and try again'
          // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
        });
      });

    // this.modalService.dismissAll();
  }



  open(blobfile) {
    this.shareFilename = blobfile.fileName;
    this.openModal.nativeElement.click();
  }
  // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  //  .result.then((result) => {
  //    this.closeResult = `Closed with: ${result}`;
  //  }, (reason) => {
  //    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //  });


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  ngOnInit() {
    // this.user.UserID =  sessionStorage.getItem('iuser');
    this.fn_getFileList();
    // if (sessionStorage.getItem('tablerefresh') === 'true')    {
    //   this.fn_getFileList();
    //   }
    //   sessionStorage.setItem('tablerefresh', 'false');
  }

  setDateFormat(str: string) {
    const date = new Date(str);
    const datestr =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return datestr;
  }

  checkUncheckAllFiles() {
    console.log(this.isCheckedAll);
    for (let i = 0; i < this.data.length; i++) {
      if (this.isCheckedAll) {
        this.data[i].isChecked = true;
        this.isFileSelected = true;
      } else {
        this.data[i].isChecked = false;
        this.isFileSelected = false;
      }
    }
  }
  checkUncheckFiles() {
    // let fileChecked = false;

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isChecked) {
        this.isFileSelected = true;
        return;
        // fileChecked = true;
      }
      if (i === (this.data.length - 1)) {
        this.isFileSelected = false;
      }

    }
  }
}
