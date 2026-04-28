var GoogleApiService_1;
import { __decorate } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
let GoogleApiService = GoogleApiService_1 = class GoogleApiService {
    constructor(utilService, auth, gb) {
        this.utilService = utilService;
        this.auth = auth;
        this.gb = gb;
        this.changeUser = new EventEmitter();
        this._socialUser = new BehaviorSubject(null);
        this._accessToken = new BehaviorSubject(null);
        this._receivedAccessToken = new EventEmitter();
        this._socialUser.pipe(skip(1)).subscribe(this.changeUser);
        // emit receivedAccessToken but skip initial value from behaviorSubject
        this._accessToken.pipe(skip(1)).subscribe(this._receivedAccessToken);
    }
    initialize(autoLogin) {
        return new Promise((resolve, reject) => {
            try {
                const script = this.utilService.loadScript('https://accounts.google.com/gsi/client');
                script.onload = () => {
                    let socialUser = GoogleApiService_1.retrieveSocialUser();
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
                        callback: ({ credential }) => {
                            this.auth.authGoogle(credential).then(res => {
                                const socialUser = this.createSocialUser(credential);
                                this._socialUser.next(socialUser);
                                GoogleApiService_1.persistSocialUser(socialUser);
                            });
                        }
                    });
                    resolve(google.accounts.id);
                };
            }
            catch (err) {
                reject(err);
            }
        });
    }
    async signOut() {
        google.accounts.id.disableAutoSelect();
        this._socialUser.next(null);
        GoogleApiService_1.clearSocialUser();
    }
    refreshToken() {
        return new Promise((resolve, reject) => {
            const storedUser = GoogleApiService_1.retrieveSocialUser();
            if (storedUser !== null) {
                this._socialUser.next(storedUser);
            }
            if (this._socialUser?.value) {
                google.accounts.id.revoke(this._socialUser?.value?.id, (response) => {
                    if (response?.error)
                        reject(response.error);
                    else
                        resolve(this._socialUser.value);
                });
            }
            else {
                reject('Nenhum usuário');
            }
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            // retrieve social user from local storage, if stored
            let storedUser = GoogleApiService_1.retrieveSocialUser();
            if (storedUser !== null) {
                this._socialUser.next(storedUser);
            }
            if (this._socialUser.value) {
                resolve(this._socialUser.value);
            }
            else {
                reject(`No user is currently logged in with Google`);
            }
        });
    }
    createSocialUser(idToken) {
        const user = new SocialUser();
        user.idToken = idToken;
        const payload = this.decodeJwt(idToken);
        user.id = payload.sub;
        user.name = payload.name;
        user.email = payload.email;
        return user;
    }
    getAccessToken() {
        return new Promise((resolve, reject) => {
            if (!this._tokenClient) {
                if (this._socialUser.value) {
                    reject('No token client was instantiated, you should specify some scopes.');
                }
                else {
                    reject('You should be logged-in first.');
                }
            }
            else {
                this._tokenClient.requestAccessToken({
                    hint: this._socialUser.value?.email,
                });
                this._receivedAccessToken.pipe(take(1)).subscribe(resolve);
            }
        });
    }
    revokeAccessToken() {
        return new Promise((resolve, reject) => {
            if (!this._tokenClient) {
                reject('No token client was instantiated, you should specify some scopes.');
            }
            else if (!this._accessToken.value) {
                reject('No access token to revoke');
            }
            else {
                google.accounts.oauth2.revoke(this._accessToken.value, () => {
                    this._accessToken.next(null);
                    resolve();
                });
            }
        });
    }
    signIn() {
        return Promise.reject('You should not call this method directly for Google, use "<asl-google-signin-button>" wrapper ' +
            'or generate the button yourself with "google.accounts.id.renderButton()" ' +
            '(https://developers.google.com/identity/gsi/web/guides/display-button#javascript)');
    }
    decodeJwt(idToken) {
        const base64Url = idToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(window.atob(base64)
            .split("")
            .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(""));
        return JSON.parse(jsonPayload);
    }
    static persistSocialUser(socialUser) {
        localStorage.setItem('google_socialUser', JSON.stringify(socialUser));
    }
    static retrieveSocialUser() {
        let socialUserJson = localStorage.getItem('google_socialUser');
        if (socialUserJson === null) {
            return null;
        }
        return JSON.parse(socialUserJson);
    }
    static clearSocialUser() {
        localStorage.removeItem('google_socialUser');
    }
};
GoogleApiService = GoogleApiService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GoogleApiService);
export { GoogleApiService };
export class SocialUser {
}
//# sourceMappingURL=google-api.service.js.map