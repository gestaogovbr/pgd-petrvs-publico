import { EventEmitter, Injectable } from '@angular/core';
import { gapiConfig } from 'src/environments/gapi.config';
import { UtilService } from './util.service';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  public readonly changeUser = new EventEmitter<SocialUser | null>();
  private readonly _socialUser = new BehaviorSubject<SocialUser | null>(null);

  private readonly _accessToken = new BehaviorSubject<string | null>(null);
  private readonly _receivedAccessToken = new EventEmitter<any>();
  private _tokenClient: google.accounts.oauth2.TokenClient | undefined;
  
  constructor(
    private utilService: UtilService,
    private auth: AuthService
  ) {
    this._socialUser.pipe(skip(1)).subscribe(this.changeUser);

    // emit receivedAccessToken but skip initial value from behaviorSubject
    this._accessToken.pipe(skip(1)).subscribe(this._receivedAccessToken);
   }
  
  initialize(autoLogin?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try 
      {
        const script = this.utilService.loadScript('https://accounts.google.com/gsi/client')

        script.onload = () => {
            google.accounts.id.initialize({
              client_id: gapiConfig.client_id,
              ux_mode: 'popup',
              cancel_on_tap_outside: true,
              callback: ({ credential }: any) => {
                this.auth.authGoogle(credential).then(res => {
                  const socialUser = this.createSocialUser(credential);
                  this._socialUser.next(socialUser);
                })
                
                
              }
            });
            resolve(google.accounts.id);
        }

      } catch (err) {
        reject(err);
      }
    });
  }

  async signOut(): Promise<void> {
    google.accounts.id.disableAutoSelect();
    this._socialUser.next(null);
  }

  private createSocialUser(idToken: string) {
    const user = new SocialUser();
    user.idToken = idToken;
    const payload = this.decodeJwt(idToken);
    user.id = payload.sub;
    user.name = payload.name;
    user.email = payload.email;
    return user;
  }

  getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this._tokenClient) {
        if (this._socialUser.value) {
          reject(
            'No token client was instantiated, you should specify some scopes.'
          );
        } else {
          reject('You should be logged-in first.');
        }
      } else {
        this._tokenClient.requestAccessToken({
          hint: this._socialUser.value?.email,
        });
        this._receivedAccessToken.pipe(take(1)).subscribe(resolve);
      }
    });
  }

  signIn(): Promise<SocialUser> {
    return Promise.reject(
      'You should not call this method directly for Google, use "<asl-google-signin-button>" wrapper ' +
        'or generate the button yourself with "google.accounts.id.renderButton()" ' +
        '(https://developers.google.com/identity/gsi/web/guides/display-button#javascript)'
    );
  }


  private decodeJwt(idToken: string): Record<string, string | undefined> {
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

}


export class SocialUser {
  provider!: string;
  authToken!: string;
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;

  idToken!: string; // Reference https://developers.google.com/identity/sign-in/web/backend-auth
  authorizationCode!: string; // Reference https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions

  response: any;
}