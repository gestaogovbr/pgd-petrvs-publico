import { EventEmitter, Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
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
    private auth: AuthService,
    private gb: GlobalsService
  ) {
    this._socialUser.pipe(skip(1)).subscribe(this.changeUser);

    // emit receivedAccessToken but skip initial value from behaviorSubject
    this._accessToken.pipe(skip(1)).subscribe(this._receivedAccessToken);
  }

  initialize(autoLogin?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const script = this.utilService.loadScript('https://accounts.google.com/gsi/client')
        script.onerror = (error) => reject(error);
        script.onload = () => {
          let socialUser = GoogleApiService.retrieveSocialUser()

          // if (socialUser != null) {

          //   // refresh the token 10s before it expires
          //   let idToken = JSON.parse(atob(socialUser.idToken.split(".")[1]))
          //   let currentUnixTimestamp = Math.floor(Date.now() / 1000)

          //   if (idToken["exp"] < currentUnixTimestamp) {
          //     this._socialUser.next(null);
          //     GoogleApiService.clearSocialUser();
          //   } else {
          //     this._socialUser.next(socialUser);
          //   }

          //   setTimeout(() => {
          //     this.refreshToken()
          //   }, 3000)
          //   //(idToken["exp"] - currentUnixTimestamp - 10) * 1000
          // }



          google.accounts.id.initialize({
            client_id: this.gb.loginGoogleClientId,
            ux_mode: 'popup',
            autoLogin: autoLogin,
            cancel_on_tap_outside: true,
            oneTapEnabled: true,
            callback: ({ credential }: any) => {
              this.auth.authGoogle(credential).then(res => {
                const socialUser = this.createSocialUser(credential);
                this._socialUser.next(socialUser);
                GoogleApiService.persistSocialUser(socialUser)
              });
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
    GoogleApiService.clearSocialUser();
  }

  refreshToken(): Promise<SocialUser | null> {
    return new Promise((resolve, reject) => {
      const storedUser = GoogleApiService.retrieveSocialUser();
      if (storedUser !== null) {
        this._socialUser.next(storedUser)
      }
      if (this._socialUser?.value) {
        google.accounts.id.revoke(this._socialUser?.value?.id, (response: any) => {
          if (response?.error) reject(response.error);
          else resolve(this._socialUser.value);
        });
      } else {
        reject('Nenhum usuário')
      }
    });
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      // retrieve social user from local storage, if stored
      let storedUser = GoogleApiService.retrieveSocialUser()

      if (storedUser !== null) {
        this._socialUser.next(storedUser)
      }

      if (this._socialUser.value) {
        resolve(this._socialUser.value);
      } else {
        reject(
          `No user is currently logged in with Google`
        );
      }
    });
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
          reject('No token client was instantiated, you should specify some scopes.');
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

  revokeAccessToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._tokenClient) {
        reject(
          'No token client was instantiated, you should specify some scopes.'
        );
      } else if (!this._accessToken.value) {
        reject('No access token to revoke');
      } else {
        google.accounts.oauth2.revoke(this._accessToken.value, () => {
          this._accessToken.next(null);
          resolve();
        });
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


  private static persistSocialUser(socialUser: SocialUser): void {
    localStorage.setItem('google_socialUser', JSON.stringify(socialUser))
  }

  private static retrieveSocialUser(): any {
    let socialUserJson = localStorage.getItem('google_socialUser')
    if (socialUserJson === null) {
      return null
    }

    return JSON.parse(socialUserJson);
  }

  private static clearSocialUser(): void {
    localStorage.removeItem('google_socialUser');
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