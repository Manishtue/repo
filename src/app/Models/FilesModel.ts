export class FilesModel {
  fileName?: string;
  filesize?: number;
  lastmod?: Date;

    constructor(Data) {
        if (Data) {
            this.fileName = Data.fileName;
            this.filesize = Data.filesize;
            this.lastmod = Data.lastmod;
        }
    }
}
