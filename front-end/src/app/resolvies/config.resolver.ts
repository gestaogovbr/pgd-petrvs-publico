import { Injectable, Injector } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { GlobalsService } from '../services/globals.service';
import { NavigateService } from '../services/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigResolver  {
  
  private _gb?: GlobalsService;
  private get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb };
  private _go?: NavigateService;
  private get go(): NavigateService { this._go = this._go || this.injector.get<NavigateService>(NavigateService); return this._go };
  private _dialog?: DialogService;
  private get dialog(): DialogService { this._dialog = this._dialog || this.injector.get<DialogService>(DialogService); return this._dialog };

  constructor(public injector: Injector) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let result = of(true);
    let modal = false;
    if(route.queryParams?.idroute?.length) {
      if(!this.go.first && ((route.data.modal && this.gb.useModals) || route.queryParams?.modal)) {
        this.dialog.modal(route);
        modal = true;
        result = EMPTY;
      }
      this.go.config(route.queryParams?.idroute, {
        title: route.data.title,
        modal: modal,
        path: route.pathFromRoot.map(o => o.routeConfig?.path || "").join('/')
      });
    }
    return result;
  }
}
