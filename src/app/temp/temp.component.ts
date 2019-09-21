import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';

// import { ConfigService } from '../Services/config.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

   @Output() messageEvent:  EventEmitter<string> = new EventEmitter<string>();

   private readonly notifier: NotifierService;
  sendmessage = 'false';
  accept = '*';
  files: File[] = [];
  progress: number;
  // url = 'https://filemanagerportalapi.azurewebsites.net/api/FileHandler/UploadFile';
  hasBaseDropZoneOver: boolean = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<Event>;
  lastFileAt: Date;
  maxSize: number;
  lastInvalids: {file: File, type: string}[] = [];
  // validDrag: any = false;
  baseDropValid: boolean;
  dragFiles: File[];

  private actionURL: string;




  sendableFormData: FormData; // populated via ngfFormData directive
  @ViewChild('myautoTrigger') myautoTrigger: ElementRef;
  @ViewChild('myautoTrigger1') myautoTrigger1: ElementRef;

  constructor(public _HttpClient: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
    // , private _configService: ConfigService
    // this.actionURL = this._configService.Config.ApiUrl;
    this.actionURL = 'https://filemanagerportalapi.azurewebsites.net/api';
   // this.actionURL = 'http://localhost:65313/api';
  }



// sends data to parent grid component
fn_send() {
    console.log('send');
     this.sendmessage = 'true';
     this.messageEvent.emit('Hello World!');
    console.log('send end');
   }

  cancel() {
    this.progress = 0;
    if ( this.httpEmitter ) {
      console.log('cancelled');
      this.httpEmitter.unsubscribe();
    }
  }

  uploadFiles(files: File[]): Subscription {
    const user = JSON.parse(sessionStorage.getItem('iuser'));
       this.sendableFormData.append('UserId', user.toString() );
       // this._user._loginName.toString() append actual username when we'll have that
    const req = new HttpRequest<FormData>('POST', this.actionURL + '/FileHandler/UploadFile', this.sendableFormData, {
      reportProgress: true// , responseType: 'text'
    });

    return this.httpEmitter = this._HttpClient.request(req)
    .subscribe(
     ( event: HttpEvent<Event> ) => {
        this.httpEvent = event;

        if (event instanceof HttpResponse) {
          delete this.httpEmitter;
          // console.log('request done', event.status );
          //           if (event.status === 200) {            // to refresh table after upload
          //   sessionStorage.setItem('tablerefresh', 'true');
          // }
          if (event.status === 200) {
            // console.log('1');
            // this.messageEvent.emit('200');
            this.fn_send();
            this.progress = 0;
            this.notifier.show({
              type: 'success',
              message: 'Files Uploaded Successfully'
              // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
            });
          }
        }
        this.triggerCancel();

      },
      error => {
        console.log('Error Uploading', error);
        this.notifier.show({
          type: 'error',
          message: 'Some error occured'
          // id: 'THAT_NOTIFICATION_ID' // Again, this is optional
        });
      }
    );
  }
  getDate() {
    setTimeout(() => {
      this.uploadFiles(this.files);
    }, 200);

    return new Date();
  }


  triggerCancel() {
    const el: HTMLElement = this.myautoTrigger.nativeElement as HTMLElement;
    el.click();
   // { console.log('clicked'); }
    }

  ngOnInit() {
    // this.triggerFalseClick();
    // if (this.progress === 100) {
    //     alert('100%');
    //     console.log("100%............................................");
    // }
  // myFunction() {
  //   console.log('doublesure');
   }
    }

