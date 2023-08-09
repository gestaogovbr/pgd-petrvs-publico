import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IIndexable } from '../models/base.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { GlobalsService } from '../services/globals.service';
import { FullRoute } from '../services/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb }
  private _auth?: AuthService;
  public get auth(): AuthService { this._auth = this._auth || this.injector.get<AuthService>(AuthService); return this._auth }
  private _dialogs?: DialogService;
  private get dialogs(): DialogService { this._dialogs = this._dialogs || this.injector.get<DialogService>(DialogService); return this._dialogs }
  private _router?: Router;
  private get router(): Router { this._router = this._router || this.injector.get<Router>(Router); return this._router }

  constructor(public injector: Injector) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = !!this.auth.usuario;
    let result: Promise<boolean | UrlTree> | boolean | UrlTree = logged;

    if(route.data.login) {
      result = logged ? this.router.parseUrl(this.gb.initialRoute.join("/")) : true;
    } else {
      if(!logged && this.gb.requireLogged) {
        result = new Promise((resolve, reject) => {
          const handle = (success: boolean) => {
            if(success) {
              resolve(true);
            } else {
              if(!this.gb.isToolbar) {
                let redirectUrl = this.router.parseUrl('/login');
                const qParams = Object.entries(route.queryParams || {}).reduce((acumulador, valorAtual) => {
                  if(valorAtual[0] != "idroute") acumulador[valorAtual[0]] = valorAtual[1];
                  return acumulador;
                }, {} as IIndexable);
                let redirectTo: FullRoute = {
                  route: route.url.map(x => x.path),
                  params: qParams
                };
                redirectUrl.queryParams = { redirectTo: JSON.stringify(redirectTo), noSession: true };
                resolve(redirectUrl);
              } else {
                /* Caso seja toolbar, ficará o botão de login disponível caso globals.requireLogged */
                resolve(!this.gb.requireLogged);
              }
            }
          };
          this.auth.authSession().then(handle).catch(error => handle(false));
        }); 
      } else if(route.data.permission && !this.auth.hasPermissionTo(route.data.permission)) {
        this.dialogs.alert("Permissão negada", "O usuário não tem permissão para acessar esse recurso");
        result = false;
      }
    }

    return result;
  }  
}
