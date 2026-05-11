import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, ViewContainerRef, } from "@angular/core";
import { GlobalsService } from "../globals.service";
import { NavigateService } from "../navigate.service";
import { UtilService } from "../util.service";
let DialogComponent = class DialogComponent {
    set message(value) {
        if (this._message != value) {
            this._message = value;
            this.cdRef.detectChanges();
        }
    }
    get message() {
        return this._message;
    }
    set title(value) {
        if (this._title != value) {
            this._title = value;
            this.cdRef.detectChanges();
        }
    }
    get title() {
        return this._title;
    }
    get factory() {
        this._factory =
            this._factory ||
                this.injector.get(ComponentFactoryResolver);
        return this._factory;
    }
    get cdRef() {
        this._cdRef =
            this._cdRef || this.injector.get(ChangeDetectorRef);
        return this._cdRef;
    }
    get go() {
        this._go = this._go || this.injector.get(NavigateService);
        return this._go;
    }
    get gb() {
        this._gb = this._gb || this.injector.get(GlobalsService);
        return this._gb;
    }
    constructor(injector) {
        this.injector = injector;
        this.onClose = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        this.buttons = [];
        this.modalWidth = 500;
        this.minimized = false;
        this.inputValue = "";
        this.defaultValue = "";
        this.isPrompt = false;
        this._title = "";
        this._message = "";
        this.id = "dialog" + new Date().getTime();
    }
    ngOnInit() { }
    minimize() {
        this.minimized = true;
        this.dialogs?.minimized.push(this);
        if (this.gb.refresh)
            this.gb.refresh();
        this.bootstapModal.hide();
        //$(".modal-backdrop").addClass("d-none");
    }
    restore() {
        const index = this.dialogs.minimized.indexOf(this);
        if (index >= 0) {
            this.minimized = false;
            this.dialogs?.minimized.splice(index, 1);
            if (this.gb.refresh)
                this.gb.refresh();
            this.bootstapModal.show();
            //$(".modal-backdrop").removeClass("d-none");
        }
    }
    get bootstapModal() {
        if (!this.modal) {
            const element = document.getElementById(this.id);
            //@ts-ignore
            this.modal = new bootstrap.Modal(element, {
                backdrop: "static",
                keyboard: false,
            });
            element.addEventListener("hidden.bs.modal", (event) => {
                if (!this.minimized)
                    this.hide();
            });
            element.addEventListener("shown.bs.modal", (event) => {
                const modal = this.modalBodyRef?.instance;
                if (modal) {
                    modal.shown = true;
                    if (modal.onShow)
                        modal?.onShow();
                    this.cdRef.detectChanges();
                }
            });
        }
        return this.modal;
    }
    /* Executado quando a janela fechar */
    hide() {
        let index = this.dialogs.dialogs.findIndex((x) => x.id == this.id);
        if (index >= 0)
            this.dialogs.dialogs.splice(index, 1);
        if (this.route)
            this.go.back(this.route.queryParams?.idroute);
        if (this.onClose)
            this.onClose.emit();
        this.componentRef?.destroy();
        const modal = this.componentRef?.instance.modalBodyRef?.instance;
        if (modal && modal.form) {
            this.dialogs?.modalClosed.next();
        }
    }
    ngAfterViewInit() {
        if (this.route && this.route.component) {
            const componentType = this.route.component;
            const componentFactory = this.factory.resolveComponentFactory(componentType);
            if (this.route.data.title?.length)
                this.title = this.route.data.title;
            this.modalBodyRef =
                this.body.createComponent(componentFactory);
            if ("modalInterface" in this.modalBodyRef.instance) {
                const modal = this.modalBodyRef.instance;
                modal.modalRoute = this.route;
                this.modalWidth = parseInt(this.route.queryParams?.modalWidth || modal.modalWidth);
                modal.modalInfiniteScrollContainer = `#${this.id}`;
                modal.titleSubscriber.subscribe((title) => {
                    this.title = title;
                    this.cdRef.detectChanges();
                });
                if (modal.title?.length)
                    this.title = modal.title;
                this.cdRef.detectChanges();
            }
            else if (this.template) {
                this.modalWidth = 600;
                this.cdRef.detectChanges();
            }
        }
        this.bootstapModal.show();
        this.zIndexRefresh();
    }
    zIndexRefresh() {
        document.querySelectorAll(".modal").forEach((element, index) => {
            element.style.zIndex = `${(index + 1) * 1055}`;
        });
        document.querySelectorAll(".modal-backdrop").forEach((element, index) => {
            element.style.zIndex = `${(index + 1) * 1050}`;
        });
    }
    show() {
        this.bootstapModal.show();
    }
    close(triggerBack = true) {
        if (!triggerBack)
            this.route = undefined;
        this.bootstapModal.hide();
    }
    buttonClick(button) {
        this.onButtonClick?.emit(button);
    }
    openNewBrowserTab() {
        this.go.openNewBrowserTab(this.route);
    }
};
__decorate([
    Input()
], DialogComponent.prototype, "iconTitle", void 0);
__decorate([
    ViewChild("body", { read: ViewContainerRef })
], DialogComponent.prototype, "body", void 0);
__decorate([
    Output()
], DialogComponent.prototype, "onClose", void 0);
__decorate([
    Output()
], DialogComponent.prototype, "onButtonClick", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "message", null);
__decorate([
    Input()
], DialogComponent.prototype, "title", null);
DialogComponent = __decorate([
    Component({
        selector: "app-dialog",
        templateUrl: "./dialog.component.html",
        styleUrls: ["./dialog.component.scss"],
        providers: [
            {
                provide: "ID_GENERATOR_BASE",
                useFactory: (self, go, util) => {
                    return util.onlyAlphanumeric(go.getStackRouteUrl());
                },
                deps: [DialogComponent, NavigateService, UtilService],
            },
        ],
        standalone: false
    })
], DialogComponent);
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map