import { __decorate } from "tslib";
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { UtilService } from './util.service';
import { Subject } from 'rxjs';
export class DialogResult {
    constructor(dialog, result) {
        this.dialog = dialog;
        this.result = result;
    }
    asPromise() { return this.result; }
}
let DialogService = class DialogService {
    get factory() { this._factory = this._factory || this.injector.get(ComponentFactoryResolver); return this._factory; }
    ;
    get utils() { this._utils = this._utils || this.injector.get(UtilService); return this._utils; }
    ;
    constructor(injector) {
        this.injector = injector;
        this.dialogs = [];
        this.minimized = [];
        this.topAlerts = [];
        this.modalClosed = new Subject();
    }
    createDialogView() {
        const componentFactory = this.factory.resolveComponentFactory(DialogComponent);
        const viewContainerRef = this.container;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        this.dialogs.push(componentRef.instance);
        componentRef.instance.componentRef = componentRef;
        componentRef.instance.dialogs = this;
        return componentRef;
    }
    createSpinnerView() {
        const componentFactory = this.factory.resolveComponentFactory(SpinnerOverlayComponent);
        const viewContainerRef = this.container;
        this.spinnerRef = viewContainerRef.createComponent(componentFactory);
        return this.spinnerRef;
    }
    restore(popup) {
        popup.restore();
    }
    topAlert(message, timer) {
        const gid = this.utils.md5();
        const close = (id) => {
            const index = this.topAlerts.findIndex(x => x.id == id);
            if (index >= 0)
                this.topAlerts.splice(index, 1);
            this.cdRef?.detectChanges();
        };
        const timeout = () => {
            close(gid);
        };
        this.topAlerts.push({
            id: gid,
            message: message,
            closable: timer ? undefined : "true",
            timer: timer,
            setTimer: timer ? setTimeout(timeout.bind(this), timer) : undefined,
            close: close.bind(this)
        });
    }
    alert(title, message, labelfechar = "OK", iconTitle) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = title;
        dialog.message = message;
        dialog.buttons = [{ label: labelfechar }];
        dialog.iconTitle = iconTitle;
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                dialog.close();
                resolve();
            });
        });
    }
    confirm(title, message, buttons) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = title;
        dialog.message = message;
        dialog.buttons = buttons || [{ label: "Ok", value: true, color: "btn-success" }, { label: "Cancelar", value: false, color: "btn-danger" }];
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                dialog.close();
                resolve(button.value);
            });
        });
    }
    choose(title, message, buttons) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = title;
        dialog.message = message;
        dialog.buttons = buttons;
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                dialog.close();
                resolve(button);
            });
        });
    }
    template(config, template, buttons, templateContext) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = config.title || "";
        dialog.modalWidth = config.modalWidth || dialog.modalWidth;
        dialog.template = template;
        dialog.templateContext = templateContext;
        dialog.buttons = buttons;
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new DialogResult(dialog, new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                resolve({ button, dialog });
            });
        }));
    }
    html(config, html, buttons = []) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = config.title || "";
        dialog.modalWidth = config.modalWidth || dialog.modalWidth;
        dialog.html = html;
        dialog.buttons = buttons;
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new DialogResult(dialog, new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                resolve({ button, dialog });
            });
        }));
    }
    prompt(title, message, defaultValue) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.title = title;
        dialog.message = message;
        dialog.defaultValue = defaultValue ?? '';
        dialog.isPrompt = true;
        dialog.buttons = [{ label: "Ok", value: true, color: "btn-success" }, { label: "Cancelar", value: false, color: "btn-danger" }];
        dialog.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        return new Promise((resolve, reject) => {
            dialog.onButtonClick.subscribe(button => {
                dialog.close();
                resolve(button.value ? dialog.inputValue || '' : null);
            });
        });
    }
    modal(route) {
        const dialogView = this.createDialogView();
        const dialog = dialogView.instance;
        dialog.route = route;
    }
    closeAll() {
        this.dialogs.map(x => x.close());
        this.dialogs = [];
    }
    detectChanges() {
        this.dialogs.forEach(x => x.cdRef.detectChanges());
    }
    showing(idroute) {
        return !!this.dialogs.find(x => x.route?.queryParams?.idroute == idroute);
    }
    close(idroute, triggerBack = true) {
        const dialog = idroute ? this.dialogs.find(x => x.route?.queryParams?.idroute == idroute) : this.dialogs[this.dialogs.length - 1];
        dialog?.close(triggerBack);
    }
    showSppinerOverlay(message, timeout) {
        if (!this.spinnerRef) {
            this.createSpinnerView();
        }
        this.spinnerRef.instance.message = message;
        this.spinnerRef.instance.show = true;
        this.spinnerRef.instance.cdRef.detectChanges();
        this.cdRef?.detectChanges();
        if (timeout) {
            this.sppinerTimeout = setTimeout(() => {
                this.closeSppinerOverlay();
            }, timeout);
        }
    }
    closeSppinerOverlay() {
        if (this.spinnerRef) {
            if (this.sppinerTimeout)
                clearTimeout(this.sppinerTimeout);
            this.sppinerTimeout = undefined;
            this.spinnerRef.instance.show = false;
            this.cdRef?.detectChanges();
        }
    }
    get sppinerShowing() {
        return !!this.spinnerRef?.instance.show;
    }
};
DialogService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DialogService);
export { DialogService };
//# sourceMappingURL=dialog.service.js.map