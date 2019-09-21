interface IAzurePOCO {
  fileName: string;
  UserID: string;
  Password: string;
  filesize: number;
  lastmod: any;
  BlobName: string;
  mailtouser: string;
  MultiBlob: string[];
  }

export class AzurePOCO  implements IAzurePOCO {
  fileName: string;
  UserID: string;
  Password: string;
  filesize: number;
  lastmod: any;
  BlobName: string;
  mailtouser: string;
  MultiBlob: string[];

  constructor ( data: IAzurePOCO) {
    if (data) {
    this.fileName = data.fileName;
    this.UserID = data.UserID;
    this.Password = data.Password;
    this.filesize = data.filesize;
    this.lastmod = data.lastmod;
    this.BlobName = data.BlobName;
    this.mailtouser = data.mailtouser;
    this.MultiBlob = data.MultiBlob;
    }
  }
}
