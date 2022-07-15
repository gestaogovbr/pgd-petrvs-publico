import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { gapiConfig } from 'src/environments/gapi.config';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  public gapiAuth2?: gapi.auth2.GoogleAuth = undefined;
  public tokenId?: string;

  constructor(public injector: Injector) { }
  
  public signIn() {
    return this.gapiAuth2!.signIn({
      prompt: "select_account"
    });
  }

  public logOut() {
    return this.gapiAuth2!.signOut();
  }

  public load(): Promise<gapi.auth2.GoogleAuth> {
    return new Promise<gapi.auth2.GoogleAuth>((resolve, reject) => {
      if(this.gapiAuth2) {
        resolve(this.gapiAuth2);
      } else if(gapi) {
        gapi.load('auth2', () => {
          gapi.auth2.init(gapiConfig).then((googleAuth) => {
            this.gapiAuth2 = googleAuth;
            resolve(googleAuth);
          }, (reason) => {
            reject("Erro ao inicializar Google Auth2: " + reason.error);
          });
        });
      } else {
        throw new Error("Erro ao carregar a biblioteca gpai");
      }
    });
  }
}
