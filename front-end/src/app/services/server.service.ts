import { HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, ObservableInput, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IIndexable } from '../models/base.model';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';

export type BatchActionMethod = "POST" | "GET";

export type BatchAction = {
  route: string,
  method: BatchActionMethod,
  data: any,
  response: Subject<any>
}

export type Batch = {
  sameTransaction: boolean,
  actions: BatchAction[]
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public static BATCH_TIMEOUT = 5000;

  private _auth?: AuthService;
  public get auth(): AuthService { this._auth = this._auth || this.injector.get<AuthService>(AuthService); return this._auth }
  private _http?: HttpClient;
  public get http(): HttpClient { this._http = this._http || this.injector.get<HttpClient>(HttpClient); return this._http }
  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb }
  private _tokenExtractor?: HttpXsrfTokenExtractor;
  public get tokenExtractor(): HttpXsrfTokenExtractor { this._tokenExtractor = this._tokenExtractor || this.injector.get<HttpXsrfTokenExtractor>(HttpXsrfTokenExtractor); return this._tokenExtractor }

  public batch?: Batch;

  private _batchTimeout?: number;

  constructor(public injector: Injector) { }

  public startBatch(sameTransaction: boolean = true, ignoreStarted: boolean = false) {
    if(!ignoreStarted && typeof this.batch != "undefined") throw new Error("Already exists a batch started");
    this.batch = {
      sameTransaction: sameTransaction,
      actions: []
    };
    //@ts-ignore
    this._batchTimeout = setTimeout(() => {
      this.endBatch();
    }, ServerService.BATCH_TIMEOUT);
  }

  public endBatch() {
    if(typeof this.batch == "undefined") throw new Error("Batch not started");
    let params = {
      sameTransaction: this.batch.sameTransaction,
      actions: this.batch.actions.map(x => Object.assign({}, {
        route: x.route,
        method: x.method,
        data: x.data
      }))
    };
    /* Clean */
    let batch = this.batch;
    this.batch = undefined;
    clearTimeout(this._batchTimeout);
    /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
    let request: Observable<any> = this.http.post(this.gb.servidorURL + '/api/batch', params, this.requestOptions());
    /* Error handle */
    request.pipe(catchError((err: any, caught: Observable<Object>): ObservableInput<any> => {
      let subjects = batch.actions.map(x => x.response);
      subjects.forEach((x, i) => {
        x.error(err);
      });
      return this.errorHandle(err, caught);
    }));
    /* Process response */
    request.subscribe(response => {
      let subjects = batch.actions.map(x => x.response);
      subjects.forEach((x, i) => {
        x.next(response.error ? response : response.returns[i]);
        x.complete();
      });
    });
    return request;
  }

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
    options.headers["X-ENTIDADE"] = this.gb.ENTIDADE;
    return options;
  }

  public get(url: string): Observable<any> {
    let result;
    if(typeof this.batch != "undefined") {
      let action: BatchAction = {
        route: this.gb.servidorURL + '/' + url,
        method: "GET",
        data: null,
        response: new Subject<any>()
      };
      this.batch.actions.push(action);
      result = action.response.asObservable();
    } else {
      /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
      result = this.http.get(this.gb.servidorURL + '/' + url, this.requestOptions());
      /* Error handle */
      result.pipe(catchError(this.errorHandle.bind(this)));
    }
    return result;
  }

  public post(url: string, params: any): Observable<any> {
    let result;
    if(typeof this.batch != "undefined") {
      let action: BatchAction = {
        route: this.gb.servidorURL + '/' + url,
        method: "POST",
        data: params,
        response: new Subject<any>()
      };
      this.batch.actions.push(action);
      result = action.response.asObservable();
    } else {
      /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
      result = this.http.post(this.gb.servidorURL + '/' + url, params, this.requestOptions());
      /* Error handle */
      result.pipe(catchError(this.errorHandle.bind(this)));
    }
    return result;
  }

  public getSvg(svg: string): Observable<any> {
    let request = this.http.get(svg, { responseType: 'text' })
    request.pipe(catchError(this.errorHandle.bind(this)));
    return request;
  }
}
