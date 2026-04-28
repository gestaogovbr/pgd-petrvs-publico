import { __decorate } from "tslib";
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { DialogService } from 'src/app/services/dialog.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { UtilService } from 'src/app/services/util.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EntityService } from 'src/app/services/entity.service';
let PageBase = class PageBase {
    set loading(value) {
        if (!value) {
            this.dialog.closeSppinerOverlay();
        }
        else if (!this._loading) {
            this.dialog.showSppinerOverlay(this.mensagemCarregando);
        }
        this._loading = value;
    }
    get loading() {
        return this._loading;
    }
    set submitting(value) {
        if (!value) {
            this.dialog.closeSppinerOverlay();
        }
        else if (!this._submitting || !this.dialog.sppinerShowing) {
            this.dialog.showSppinerOverlay(this.mensagemSalvando);
        }
        this._submitting = value;
    }
    get submitting() {
        return this._submitting;
    }
    get MAX_LENGTH_TEXT() { return 65500; }
    ;
    get MIN_LENGTH_TEXT() { return 10; }
    ;
    set title(value) { if (this._title != value) {
        this._title = value;
        this.titleSubscriber.next(value);
    } }
    ;
    get title() { return this._title; }
    ;
    set usuarioConfig(value) {
        if (this.code.length)
            this.auth.usuarioConfig = { [this.code]: value };
    }
    get usuarioConfig() {
        return Object.assign(this.defaultUsuarioConfig(), this.auth.usuarioConfig[this.code] || {});
    }
    constructor(injector) {
        this.injector = injector;
        this.action = "";
        this.modalInterface = true;
        this.shown = false;
        this.JSON = JSON;
        this.code = "";
        this.titleSubscriber = new Subject();
        this._loading = false;
        this._submitting = false;
        /* Constantes */
        this.OPTION_INFORMACOES = {
            icon: "bi bi-info-circle",
            label: "Informações",
            hint: "Informações",
            color: "btn-outline-info",
        };
        this.OPTION_ALTERAR = {
            icon: "bi bi-pencil-square",
            label: "Alterar",
            hint: "Alterar",
            color: "btn-outline-warning",
        };
        this.OPTION_EXCLUIR = {
            icon: "bi bi-trash",
            label: "Excluir",
            hint: "Excluir",
            color: "btn-outline-danger",
        };
        this.OPTION_LOGS = {
            icon: "bi bi-list-ul",
            label: "Logs",
            hint: "Alterar",
            color: "btn-outline-secondary",
        };
        /* Configurações */
        this.mensagemCarregando = "Carregando...";
        this.mensagemSalvando = "Salvando...";
        this.breadcrumbs = [];
        this.backRoute = { route: ['home'] };
        this.modalWidth = 1000;
        this.viewInit = false;
        this.options = [];
        this._title = "";
        this.error = (error) => {
            let message = 'Ocorreu um erro desconhecido';
            if (typeof error === 'string') {
                message = error;
            }
            else if (error) {
                message = error?.error?.error || error?.error?.message || error?.message || error?.toString?.() || message;
            }
            this.dialog.topAlert(message);
        };
        /* Injections */
        this.lookup = this.injector.get(LookupService);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.fb = this.injector.get(FormBuilder);
        this.fh = this.injector.get(FormHelperService);
        this.gb = this.injector.get(GlobalsService);
        this.cdRef = this.injector.get(ChangeDetectorRef);
        this.dialog = this.injector.get(DialogService);
        this.util = this.injector.get(UtilService);
        this.go = this.injector.get(NavigateService);
        this.lex = this.injector.get(LexicalService);
        this.auth = this.injector.get(AuthService);
        this.entityService = injector.get(EntityService);
    }
    ngOnInit() {
        this.snapshot = this.snapshot || this.modalRoute || this.route.snapshot;
        this.urlParams = this.snapshot.paramMap;
        this.queryParams = this.go.decodeParam(this.snapshot.queryParams);
        this.metadata = this.go.getMetadata(this.snapshot.queryParams.idroute);
        this.url = this.snapshot.url;
        if (this.snapshot.queryParams?.idroute?.length)
            this.go.setDefaultBackRoute(this.snapshot.queryParams.idroute, this.backRoute);
    }
    get isModal() {
        return !!this.modalRoute;
    }
    ngAfterViewInit() {
        if (!this.title?.length && this.snapshot?.data?.title?.length)
            this.title = this.snapshot.data?.title;
        if (!this.modalRoute) {
            this.shown = true;
            if (this.onShow)
                this.onShow();
        }
        ;
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = Array.from(tooltipTriggerList).map((tooltipTriggerEl) => {
            if (!(tooltipTriggerEl instanceof HTMLElement))
                return null;
            const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                trigger: 'manual'
            });
            const isVisible = (el) => {
                if (!document.body.contains(el))
                    return false;
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden';
            };
            const safeShow = () => {
                try {
                    if (isVisible(tooltipTriggerEl))
                        tooltip.show();
                }
                catch (_) { /* no-op */ }
            };
            const safeHide = () => {
                try {
                    tooltip.hide();
                }
                catch (_) { /* no-op */ }
            };
            tooltipTriggerEl.addEventListener('mouseenter', safeShow);
            tooltipTriggerEl.addEventListener('mouseleave', safeHide);
            tooltipTriggerEl.addEventListener('click', safeHide);
            return tooltip;
        }).filter(Boolean);
        this.cdRef.detectChanges();
        this.viewInit = true;
    }
    saveUsuarioConfig(config) {
        const extra = this.storeExtra ? this.storeExtra() : undefined;
        this.usuarioConfig = Object.assign(this.usuarioConfig || {}, extra || {}, config || {});
    }
    defaultUsuarioConfig() {
        return {};
    }
    addOption(button, capacidade) {
        if (!capacidade || this.auth.hasPermissionTo(capacidade))
            this.options.push(button);
    }
    isInvalid(control) {
        return !control ? true : control.invalid && (control.dirty || control.touched);
    }
    hasError(control) {
        return !control ? false : !!control.errors;
    }
    errorMessage(control) {
        return control.errors?.errorMessage;
    }
    getBackRoute() {
        return this.backRoute ? this.backRoute : this.breadcrumbs.length ? this.breadcrumbs[this.breadcrumbs.length - 1] : { route: [] };
    }
    close() {
        this.go.back(undefined, this.backRoute);
    }
};
PageBase = __decorate([
    Injectable()
], PageBase);
export { PageBase };
//# sourceMappingURL=page-base.js.map