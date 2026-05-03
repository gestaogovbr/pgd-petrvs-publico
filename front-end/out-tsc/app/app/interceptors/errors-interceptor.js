import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let ErrorsInterceptor = class ErrorsInterceptor {
    constructor(toastService) {
        this.toastService = toastService;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((error) => {
            if (error.status === 500) {
                console.error('Erro 500 global:', error);
                //retornar um toast do bootstrap
                this.toastService.showError('Erro interno do servidor. Por favor, tente novamente mais tarde.');
            }
            return throwError(() => error);
        }));
    }
};
ErrorsInterceptor = __decorate([
    Injectable()
], ErrorsInterceptor);
export { ErrorsInterceptor };
//# sourceMappingURL=errors-interceptor.js.map