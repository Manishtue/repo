
export class User {
    UserId: number;
    _loginName: number;
    UserPassword?: string;
    _firstName: string;
    UserName: string;
    UserEmail: string;
    UserContact: string;
    Token: string;
    userIsPresent: boolean;
    constructor(Data) {
        if (Data) {
            this.UserId = Data.UserId;
            this._loginName = Data._loginName;
            this.UserPassword = Data.UserPassword;
            this.UserEmail = Data.UserEmail;
            this.UserContact = Data.UserContact;
            this._firstName = Data._firstName;
            this.UserName = Data.UserName;
            this.Token = Data.Token;
            this.userIsPresent = Data.userIsPresent;
        }
    }
}
