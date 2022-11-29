import { Injectable, Injector, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { IIndexable } from '../models/base.model';
import { DialogService } from './dialog.service';
import { GlobalsService } from './globals.service';

export type FullRoute = {
  label?: string,
  route: any[],
  params?: any
}

export type RouteMetadata = {
  id?: string, /* ID unico da rota */
  title?: string, /* Título da rota */
  modalClose?: (modalResult: any) => Promise<any> | void, /* Callback para o método back() caso seja modal (ao fechar a janela) */
  back?: FullRoute, /* Rota de maior prioridade, será utilizado caso esteja definido, mesmo que esteja no modal */
  source?: FullRoute, /* Rota de prioridade intermediaria, origem alimentado automaticamente pelo Navigate Service */
  default?: FullRoute, /* Roda de menor prioridade, caso não tenha nenhuma rota acima, voltará para a rota especificada aqui */
  destination?: FullRoute, /* Destino da rota (Rota atual) */
  path?: string, /* Path como definido nas rotas (Ex.: /cadastros/afastamento/:id/edit) */
  modalResult?: any, /* Utilizado caso quei passar algum valor para o modalClose */
  filterSnapshot?: any, /* Snapshot dos form de filter */
  querySnapshot?: any, /* Snapshot da query do grid */
  metadata?: any, /* Parametros que podem ser passados, como objetos por referência */
  root?: boolean, /* Módulos raiz, permite limpar todo histórico de Back, deve ser utilizado no acesso a módulos base/listagem */
  modal?: boolean, /* Se é um modal */
  modalWidth?: number /* Width da janela */
}

export class NavigateResult {
  public modalResult: any;

  constructor(result: any) {
    this.modalResult = result;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  public ROOT_ROUTE = ["home"]

  private routes: RouteMetadata[] = [];

  private _ngZone?: NgZone;
  public get ngZone(): NgZone { this._ngZone = this._ngZone || this.injector.get<NgZone>(NgZone); return this._ngZone };
  private _router?: Router;
  public get router(): Router { this._router = this._router || this.injector.get<Router>(Router); return this._router };
  private _dialogs?: DialogService;
  public get dialogs(): DialogService { this._dialogs = this._dialogs || this.injector.get<DialogService>(DialogService); return this._dialogs };
  private _gb?: GlobalsService;
  public get gb(): GlobalsService { this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService); return this._gb };

  constructor(public injector: Injector) { }

  public encodeParam(obj: IIndexable) {
    for (let [key, value] of Object.entries(obj)) {
      if(["function", "object"].includes(typeof value)) {
        obj["_$" + key + "$_"] = JSON.stringify(value);
        if(Array.isArray(value)) obj[key] = '[object Array]';
      }
    }
  }

  public decodeParam(obj: IIndexable) {
    if(obj) {
      let result: IIndexable = {};
      for (let [key, value] of Object.entries(obj)) {
        if(typeof value == "string" && value.startsWith("[object") && obj["_$" + key + "$_"]) {
          const parsed = JSON.parse(obj["_$" + key + "$_"]);
          switch (value) {
            case '[object Object]': result[key] = parsed; break;
            case '[object Function]': result[key] = parsed; break;
            case '[object Array]': result[key] = parsed as Array<any>; break;
            case '[object RegExp]': result[key] = parsed as RegExp; break;
            case '[object Date]': result[key] = new Date(parsed); break;
            default: result[key] = value;
          }
        } else if(!/_\$.*\$_$/g.test(key)) {
          result[key] = value;
        }
      }
      return result;
    }
    return obj;
  }

  public navigate(destination: FullRoute, metadata?: RouteMetadata) {
    destination.params = Object.assign(destination.params || {}, { idroute: Md5.hashStr(this.currentOrDefault.route.join("") + destination.route.join("")) });
    destination.params.modal = metadata?.modal || destination.params.modal;
    if(metadata?.modalWidth) destination.params.modalWidth = metadata?.modalWidth;
    this.encodeParam(destination.params);
    let route = Object.assign(metadata || {} as RouteMetadata, {
      id: destination.params.idroute,
      source: this.current,
      destination: destination,
      //title: destination.params?.title,
      modal: destination.params?.modal,
      modalClose: metadata?.modalClose
    });
    if(route.root) this.clearRoutes();
    this.routes.push(route);
    return this.ngZone.run(() => this.router.navigate(destination.route, { queryParams: destination.params }));
  }

  public getMetadata(idroute: string): any {
    return this.routes.find(x => x.id == idroute)?.metadata;
  }

  public getRouteUrl(): string {
    return this.router.url.split('?')[0];
  }

  public getStackRouteUrl(): string {
    return this.routes.map(x => x.path || x.destination?.route.join("/") || "").join(";");
  }

  public clearRoutes() {
    this.routes = [];
    this.dialogs.closeAll();
  }

  public get first(): boolean {
    return !this.routes.length;
  }

  /* Método utilizado para voltar a URL (Utilizar o ID da rota sempre que possível)*/
  public back(idroute?: string, back?: FullRoute) {
    if(this.routes.length) {
      if(idroute?.length && this.routes[this.routes.length-1].id != idroute) {
        return;
      }
      let route = this.routes.pop()!;
      if(route.modal) {
        this.dialogs.close(route.id, false);
        if(route.modalClose) route.modalClose(route?.modalResult);
      } else if(route.back) {
        this.clearRoutes();
        return this.ngZone.run(() => this.router.navigate(route.back!.route, { queryParams: route.back!.params }));
      }
      if(!route.modal) {
        if(route.source) return this.ngZone.run(() => this.router.navigate(route.source!.route, { queryParams: route.source!.params }));
        if(route.default) return this.ngZone.run(() => this.router.navigate(route.default!.route, { queryParams: route.default!.params }));
      }
    } else {
      return this.ngZone.run(() => this.router.navigate(back?.route || this.ROOT_ROUTE, { queryParams: back?.params }));
    }
    return null;
  }

  public get current(): FullRoute | undefined {
    return this.routes.length ? this.routes[this.routes.length-1].destination! : undefined;
  }

  public get currentOrDefault(): FullRoute {
    return this.current || { route: this.router.url.split("?")[0].split("/") };
  }

  public config(idroute: string, config: any) {
    let route = this.routes.find(x => x.id == idroute);
    if(route) {
      if(config.title) route.title = config.title;
      if(config.modal) route.modal = config.modal;
      if(config.path) route.path = config.path;
    }
  }

  /*public setModal(idroute?: string, isModal: boolean = true) {
    let route = this.routes.find(x => x.id == idroute);
    if(route) route.modal = isModal;
  }*/

  public setModalResult(idroute: string, modalResult: any) {
    let route = this.routes.find(x => x.id == idroute);
    if(route) route.modalResult = modalResult;
  }

  public getModalResult(idroute: string, modalResult: any) {
    return this.routes.find(x => x.id == idroute)?.modalResult;
  }

  public setDefaultBackRoute(idroute: string, defaultBackRoute: FullRoute) {
    let route = this.routes.find(x => x.id == idroute);
    if(route) route.default = defaultBackRoute;
  }

  /* Verifica se uma rota está ativa, ou parte dela */
  public isActivePath(route: any[] | string): boolean {
    //console.log(this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/")), this.router.url, typeof route == "string" ? route : "/" + route.join("/"));
    //this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/"))
    return this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/"));
  }

  /* Método específico para utilizar com diretiva routerLink, evitar utilizar, use o (click)="go.navigate(...)" */
  public link(route: any[]) {
    return route;
  }

  /* Método específico para utilizar com diretiva queryPatams, evitar utilizar, use o (click)="go.navigate(...)" */
  public params(params: any) {
    return params;
  }

  public openNewBrowserTab(route?: ActivatedRouteSnapshot) {
    if(route) {
      let url = this.gb.servidorURL + '#' + route.pathFromRoot.map(x => x.url.map(y => y.path).join("/")).join("/");
      url += route.queryParamMap.keys.length > 0 ? '?' + route.queryParamMap.keys.map(key => route.queryParamMap.getAll(key).map(value => key + '=' + value).join('&')).join('&') : "";
      window?.open(url, '_blank')?.focus();
    }
  }

  public openNewTab(url: string) {
    window.open(url,'_blank')?.focus();
  }

  public openPopup(url: string, width: number = 500, height: number = 600) {
    window.open(url, 'targetWindow', "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=" + width + ", height=" + height)?.focus();
  }

  public refresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
