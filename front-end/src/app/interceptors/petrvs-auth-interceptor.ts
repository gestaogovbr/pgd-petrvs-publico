import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GlobalsService } from '../services/globals.service';

@Injectable()
export class PetrvsAuthInterceptor implements HttpInterceptor {
  constructor(
    private gb: GlobalsService,
    private auth: AuthService,
    private xsrf: HttpXsrfTokenExtractor
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isBackend = req.url.startsWith(this.gb.servidorURL) || req.url.startsWith('/api/');
    if (!isBackend) return next.handle(req);

    const headers: Record<string, string> = {};
    const apiToken = this.auth.apiToken;

    if (apiToken && apiToken.length) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    } else {
      const csrf = this.xsrf.getToken() as string;
      if (csrf) headers['X-XSRF-TOKEN'] = csrf;
    }

    const xPetrvs: any = { version: this.gb.VERSAO_DB };
    if (this.auth.unidade?.id) xPetrvs['unidade_id'] = this.auth.unidade.id;
    headers['X-PETRVS'] = btoa(JSON.stringify(xPetrvs));
    headers['X-ENTIDADE'] = this.gb.ENTIDADE;

    const cloned = req.clone({ setHeaders: headers });
    return next.handle(cloned);
  }
}
