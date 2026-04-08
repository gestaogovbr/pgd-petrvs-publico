import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'src/app/v2/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { API_VERSION, TENANT_ID, TRACE_ID } from './tokens';
import { catchError, throwError } from 'rxjs';

export function authTenantVersionInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(AuthService);
  const gb = inject(GlobalsService);
  const tenant = req.context.get(TENANT_ID) || auth.unidade?.id;
  const trace = req.context.get(TRACE_ID);
  const version = req.context.get(API_VERSION);

  const headers: Record<string, string> = {};
  if (auth.apiToken?.length) headers['Authorization'] = `Bearer ${auth.apiToken}`;
  headers['X-ENTIDADE'] = gb.ENTIDADE;
  headers['X-PETRVS-VERSION'] = version;
  if (tenant) headers['X-PETRVS-UNIDADE'] = tenant;
  if (trace) headers['X-TRACE-ID'] = trace;

  const cloned = req.clone({
    withCredentials: true,
    url: req.url.startsWith('http') ? req.url : `${gb.servidorURL}/${req.url}`,
    setHeaders: headers
  });
  return next(cloned);
}

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const message = inject(MessageService);
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) {
          message.error('Erro interno do servidor. Por favor, tente novamente mais tarde.');
        }
        if (error.status === 422) {
          const msg = (error.error && (error.error.error || error.error.message)) || 'Dados inválidos.';
          message.error(msg);
        }
        if (error.status === 400) {
          const msg = (error.error && (error.error.error || error.error.message)) || 'Requisição inválida.';
          message.error(msg);
        }
      }
      return throwError(() => error);
    })
  );
}
