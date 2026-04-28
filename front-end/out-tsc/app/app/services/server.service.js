var ServerService_1;
import { __decorate } from "tslib";
import { HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { GlobalsService } from './globals.service';
let ServerService = class ServerService {
    static { ServerService_1 = this; }
    static { this.BATCH_TIMEOUT = 5000; }
    get auth() { this._auth = this._auth || this.injector.get(AuthService); return this._auth; }
    get http() { this._http = this._http || this.injector.get(HttpClient); return this._http; }
    get gb() { this._gb = this._gb || this.injector.get(GlobalsService); return this._gb; }
    get tokenExtractor() { this._tokenExtractor = this._tokenExtractor || this.injector.get(HttpXsrfTokenExtractor); return this._tokenExtractor; }
    constructor(injector) {
        this.injector = injector;
    }
    startBatch(sameTransaction = true, ignoreStarted = false) {
        if (!ignoreStarted && typeof this.batch != "undefined")
            throw new Error("Already exists a batch started");
        this.batch = {
            sameTransaction: sameTransaction,
            actions: []
        };
        //@ts-ignore
        this._batchTimeout = setTimeout(() => {
            this.endBatch();
        }, ServerService_1.BATCH_TIMEOUT);
    }
    endBatch() {
        if (typeof this.batch == "undefined")
            throw new Error("Batch not started");
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
        let request = this.http.post(this.gb.servidorURL + '/api/batch', params, this.requestOptions());
        /* Error handle */
        request.pipe(catchError((err, caught) => {
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
    errorHandle(err, caught) {
        if (err instanceof HttpErrorResponse) {
            if ([419, 401].includes(err.status)) {
                if (this.auth.logged) {
                    this.auth.logOut();
                }
                else {
                    return throwError(() => (err.error.error));
                }
            }
            if (err.status === 422) {
                if (err?.error?.errors) {
                    return throwError(() => ({ validationErrors: err.error.errors }));
                }
                if (err?.error?.error) {
                    return throwError(() => ({ message: err.error.error }));
                }
            }
            if (err.status === 503) {
                return throwError(() => ("Serviço temporariamente indisponível"));
            }
        }
        // Retornar qualquer outro erro
        // return err;
        return throwError(() => err);
    }
    requestOptions() {
        let options = {
            withCredentials: true,
            headers: {}
        };
        let xPetrvs = {};
        /* Opções de autenticação do usuário */
        if (this.gb.isEmbedded && this.auth.apiToken?.length) {
            options.headers["Authorization"] = "Bearer " + this.auth.apiToken;
        }
        else {
            let token = this.tokenExtractor.getToken();
            if (token !== null) {
                options.headers["X-XSRF-TOKEN"] = token;
            }
        }
        /* Parametros adicionais do Petrvs */
        xPetrvs["version"] = this.gb.VERSAO_DB;
        if (this.auth.unidade) {
            xPetrvs["unidade_id"] = this.auth.unidade.id;
        }
        options.headers["X-PETRVS"] = btoa(JSON.stringify(xPetrvs));
        options.headers["X-ENTIDADE"] = this.gb.ENTIDADE;
        return options;
    }
    get(url) {
        let result;
        if (typeof this.batch != "undefined") {
            let action = {
                route: this.gb.servidorURL + '/' + url,
                method: "GET",
                data: null,
                response: new Subject()
            };
            this.batch.actions.push(action);
            result = action.response.asObservable();
        }
        else {
            /* X-XSRF-TOKEN add from requestOptions because Angular do not add automatic */
            result = this.http.get(this.gb.servidorURL + '/' + url, this.requestOptions());
            /* Error handle */
            result.pipe(catchError(this.errorHandle.bind(this)));
        }
        return result;
    }
    postDownload(url, params) {
        let result;
        if (typeof this.batch !== "undefined") {
            let action = {
                route: this.gb.servidorURL + '/' + url,
                method: "POST",
                data: params,
                response: new Subject()
            };
            this.batch.actions.push(action);
            result = action.response.asObservable();
        }
        else {
            const options = { ...this.requestOptions(), responseType: 'blob' };
            result = this.http.post(this.gb.servidorURL + '/' + url, params, options)
                .pipe(catchError(this.errorHandle.bind(this)));
        }
        return result;
    }
    post(url, params) {
        let result;
        if (typeof this.batch != "undefined") {
            let action = {
                route: this.gb.servidorURL + '/' + url,
                method: "POST",
                data: params,
                response: new Subject()
            };
            this.batch.actions.push(action);
            result = action.response.asObservable();
        }
        else {
            result = this.http.post(this.gb.servidorURL + '/' + url, params, this.requestOptions())
                .pipe(catchError(this.errorHandle.bind(this)));
        }
        return result;
    }
    delete(url, params) {
        let options = this.requestOptions();
        options.params = params;
        return this.http.delete(this.gb.servidorURL + '/' + url, options);
    }
    getSvg(svg) {
        let request = this.http.get(svg, { responseType: 'text' });
        request.pipe(catchError(this.errorHandle.bind(this)));
        return request;
    }
    getPDF(url, params) {
        let options = this.requestOptions();
        options = this.addCustomHeaders(options);
        return this.http.get(this.gb.servidorURL + '/' + url, { ...options, params: params, responseType: 'blob' });
    }
    getBlob(url, params) {
        let options = this.requestOptions();
        options.responseType = 'blob';
        const result = this.http.post(this.gb.servidorURL + '/' + url, params, options);
        return result.pipe(catchError(this.errorHandle.bind(this)));
    }
    getBlobWithReponse(url, params) {
        let options = this.requestOptions();
        options.responseType = 'blob';
        options.observe = 'response';
        return this.http.post(this.gb.servidorURL + '/' + url, params, options);
    }
    addCustomHeaders(options) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        options.headers['Accept'] = "application/pdf";
        return options;
    }
};
ServerService = ServerService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ServerService);
export { ServerService };
//# sourceMappingURL=server.service.js.map