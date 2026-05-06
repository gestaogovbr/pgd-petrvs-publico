import { __decorate } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { DialogService } from './dialog.service';
import { GlobalsService } from './globals.service';
import { NavigateResult } from '../app-types';
export { NavigateResult };
let NavigateService = class NavigateService {
    get ngZone() { this._ngZone = this._ngZone || this.injector.get(NgZone); return this._ngZone; }
    ;
    get router() { this._router = this._router || this.injector.get(Router); return this._router; }
    ;
    get dialogs() { this._dialogs = this._dialogs || this.injector.get(DialogService); return this._dialogs; }
    ;
    get gb() { this._gb = this._gb || this.injector.get(GlobalsService); return this._gb; }
    ;
    constructor(injector) {
        this.injector = injector;
        this.ROOT_ROUTE = ["home"];
        this.routes = [];
    }
    encodeParam(obj) {
        for (let [key, value] of Object.entries(obj)) {
            if (["function", "object"].includes(typeof value)) {
                obj["_$" + key + "$_"] = JSON.stringify(value);
                if (Array.isArray(value))
                    obj[key] = '[object Array]';
            }
        }
    }
    decodeParam(obj) {
        if (obj) {
            let result = {};
            for (let [key, value] of Object.entries(obj)) {
                if (typeof value == "string" && value.startsWith("[object") && obj["_$" + key + "$_"]) {
                    const parsed = JSON.parse(obj["_$" + key + "$_"]);
                    switch (value) {
                        case '[object Object]':
                            result[key] = parsed;
                            break;
                        case '[object Function]':
                            result[key] = parsed;
                            break;
                        case '[object Array]':
                            result[key] = parsed;
                            break;
                        case '[object RegExp]':
                            result[key] = parsed;
                            break;
                        case '[object Date]':
                            result[key] = new Date(parsed);
                            break;
                        default: result[key] = value;
                    }
                }
                else if (!/_\$.*\$_$/g.test(key)) {
                    result[key] = value;
                }
            }
            return result;
        }
        return obj;
    }
    navigate(destination, metadata) {
        destination.params = Object.assign(destination.params || {}, { context: this.gb.contexto?.key, idroute: Md5.hashStr(this.currentOrDefault.route.join("") + destination.route.join("")) });
        destination.params.modal = metadata?.modal || destination.params.modal;
        if (metadata?.modalWidth)
            destination.params.modalWidth = metadata?.modalWidth;
        this.encodeParam(destination.params);
        let route = Object.assign(metadata || {}, {
            id: destination.params.idroute,
            context: destination.params.context,
            source: this.current,
            destination: destination,
            //title: destination.params?.title,
            modal: destination.params?.modal,
            modalClose: metadata?.modalClose
        });
        if (route.root)
            this.clearRoutes();
        this.routes.push(route);
        return this.ngZone.run(() => this.router.navigate(destination.route, { queryParams: destination.params }));
    }
    getMetadata(idroute) {
        return this.routes.find(x => x.id == idroute)?.metadata;
    }
    getRouteUrl() {
        return this.router.url.split('?')[0];
    }
    getStackRouteUrl() {
        return this.routes.map(x => x.path || x.destination?.route.join("/") || "").join(";");
    }
    clearRoutes() {
        this.routes = [];
        this.dialogs.closeAll();
    }
    get first() {
        return !this.routes.length;
    }
    /* Método utilizado para voltar a URL (Utilizar o ID da rota sempre que possível)*/
    back(idroute, back) {
        if (this.routes.length) {
            if (idroute?.length && this.routes[this.routes.length - 1].id != idroute) {
                return;
            }
            let route = this.routes.pop();
            if (route.modal) {
                this.dialogs.close(route.id, false);
                if (route.modalClose)
                    route.modalClose(route?.modalResult);
            }
            else if (route.back) {
                this.clearRoutes();
                return this.ngZone.run(() => this.router.navigate(route.back.route, { queryParams: route.back.params }));
            }
            if (!route.modal) {
                if (route.source)
                    return this.ngZone.run(() => this.router.navigate(route.source.route, { queryParams: route.source.params }));
                if (route.default)
                    return this.ngZone.run(() => this.router.navigate(route.default.route, { queryParams: route.default.params }));
            }
        }
        else {
            return this.ngZone.run(() => this.router.navigate(back?.route || this.ROOT_ROUTE, { queryParams: back?.params }));
        }
        return null;
    }
    get current() {
        return this.routes.length ? this.routes[this.routes.length - 1].destination : undefined;
    }
    get currentOrDefault() {
        return this.current || { route: this.router.url.split("?")[0].split("/") };
    }
    config(idroute, config) {
        let route = this.routes.find(x => x.id == idroute);
        if (route) {
            if (config.title)
                route.title = config.title;
            if (config.modal)
                route.modal = config.modal;
            if (config.path)
                route.path = config.path;
        }
    }
    setModalResult(idroute, modalResult) {
        let route = this.routes.find(x => x.id == idroute);
        if (route)
            route.modalResult = modalResult;
    }
    getModalResult(idroute, modalResult) {
        return this.routes.find(x => x.id == idroute)?.modalResult;
    }
    setDefaultBackRoute(idroute, defaultBackRoute) {
        let route = this.routes.find(x => x.id == idroute);
        if (route)
            route.default = defaultBackRoute;
    }
    /* Verifica se uma rota está ativa, ou parte dela */
    isActivePath(route) {
        //console.log(this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/")), this.router.url, typeof route == "string" ? route : "/" + route.join("/"));
        //this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/"))
        return this.router.url.toLowerCase().startsWith(typeof route == "string" ? route : "/" + route.join("/"));
    }
    /* Método específico para utilizar com diretiva routerLink, evitar utilizar, use o (click)="go.navigate(...)" */
    link(route) {
        return route;
    }
    /* Método específico para utilizar com diretiva queryPatams, evitar utilizar, use o (click)="go.navigate(...)" */
    params(params) {
        return params;
    }
    openNewBrowserTab(route) {
        if (route) {
            let url = this.gb.servidorURL + '#' + route.pathFromRoot.map(x => x.url.map(y => y.path).join("/")).join("/");
            url += route.queryParamMap.keys.length > 0 ? '?' + route.queryParamMap.keys.map(key => route.queryParamMap.getAll(key).map(value => key + '=' + value).join('&')).join('&') : "";
            window?.open(url, '_blank')?.focus();
        }
    }
    openNewTab(url) {
        window.open(url, '_blank')?.focus();
    }
    openPopup(url, width = 500, height = 600) {
        window.open(url, 'targetWindow', "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=" + width + ", height=" + height)?.focus();
    }
    refresh() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
};
NavigateService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NavigateService);
export { NavigateService };
//# sourceMappingURL=navigate.service.js.map