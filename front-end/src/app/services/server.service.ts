import { HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IIndexable } from '../models/base.model';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private _auth?: AuthService;
  public get auth(): AuthService { this._auth = this._auth || this.injector.get<AuthService>(AuthService); return this._auth }
  private _http?: HttpClient;
  public get http(): HttpClient { this._http = this._http || this.injector.get<HttpClient>(HttpClient); return this._http }
  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb }
  private _tokenExtractor?: HttpXsrfTokenExtractor;
  public get tokenExtractor(): HttpXsrfTokenExtractor { this._tokenExtractor = this._tokenExtractor || this.injector.get<HttpXsrfTokenExtractor>(HttpXsrfTokenExtractor); return this._tokenExtractor }

  constructor(public injector: Injector) { }

  public errorHandle(err: any, caught: Observable<Object>): ObservableInput<any> {
    const httpError = err instanceof HttpErrorResponse;
    if(httpError && [419, 401].includes(err.status)) {
      this.auth.logOut();
    }
    return throwError(err);
  }

  private requestOptions(): any {
    let options: any = {
      withCredentials: true,
      headers: {}
    };
    let xPetrvs: any = {};
    /* Opções de autenticação do usuário */ 
    if(this.gb.isEmbedded && this.auth.apiToken?.length) {
      options.headers["Authorization"] = "Bearer " + this.auth.apiToken;
    } else {
      let token = this.tokenExtractor.getToken() as string;
      if (token !== null) {
        options.headers["X-XSRF-TOKEN"] = token;
      }
    }
    /* Parametros adicionais do Petrvs */
    xPetrvs["version"] = this.gb.VERSAO_DB;
    if(this.auth.unidade) {
      xPetrvs["unidade_id"] = this.auth.unidade.id;
    }
    options.headers["X-PETRVS"] = btoa(JSON.stringify(xPetrvs));

    return options;
  }

  public get(url: string): Observable<any> {
    /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
    let request = this.http.get(this.gb.servidorURL + '/' + url, this.requestOptions());
    /* Error handle */
    request.pipe(catchError(this.errorHandle.bind(this)));
    return request;
  }

  public post(url: string, params: any): Observable<any> {
    /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
    let request = this.http.post(this.gb.servidorURL + '/' + url, params, this.requestOptions());
    /* Error handle */
    request.pipe(catchError(this.errorHandle.bind(this)));
    return request;
  }
}
