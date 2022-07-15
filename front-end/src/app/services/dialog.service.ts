import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DialogButton, DialogComponent } from './dialog/dialog.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';

export type DialogTemplateResult = {
  button: DialogButton,
  dialog: DialogComponent  
};

export type DialogConfig = {
  title?: string;
  modalWidth?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public container?: ViewContainerRef;
  public cdRef?: ChangeDetectorRef;
  public spinnerRef?: ComponentRef<SpinnerOverlayComponent>;
  public dialogs: DialogComponent[] = [];
  public minimized: DialogComponent[] = [];
  private sppinerTimeout: any;

  private _factory?: ComponentFactoryResolver;
  public get factory(): ComponentFactoryResolver { this._factory = this._factory || this.injector.get<ComponentFactoryResolver>(ComponentFactoryResolver); return this._factory };

  constructor(public injector: Injector) { }

  private createDialogView() {
    const componentFactory = this.factory.resolveComponentFactory(DialogComponent);
    const viewContainerRef = this.container!;
    const componentRef = viewContainerRef.createComponent<DialogComponent>(componentFactory);
    this.dialogs.push(componentRef.instance);
    componentRef.instance.componentRef = componentRef;
    componentRef.instance.dialogs = this;
    return componentRef;
  }

  private createSpinnerView() {
    const componentFactory = this.factory.resolveComponentFactory(SpinnerOverlayComponent);
    const viewContainerRef = this.container!;
    this.spinnerRef = viewContainerRef.createComponent<SpinnerOverlayComponent>(componentFactory);
    return this.spinnerRef;
  }

  public restore(popup: DialogComponent) {
    popup.restore();
  }

  public alert(title: string, message: string): Promise<void> {
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.title = title;
    dialog.message = message;
    dialog.buttons = [{ label: "Ok" }];
    dialog.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    return new Promise<void>((resolve, reject) => {
      dialog.onButtonClick.subscribe(button => {
        dialog.close();
        resolve();
      });
    });
  }

  public confirm(title: string, message: string, buttons?: DialogButton[]): Promise<boolean> {
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.title = title;
    dialog.message = message;
    dialog.buttons = buttons || [{ label: "Ok", value: true, color: "btn-success" }, { label: "Cancelar", value: false, color: "btn-danger" }];
    dialog.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    return new Promise<boolean>((resolve, reject) => {
      dialog.onButtonClick.subscribe(button => {
        dialog.close();
        resolve(button.value);
      });
    });
  }

  public choose(title: string, message: string, buttons: DialogButton[]): Promise<DialogButton> {
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.title = title;
    dialog.message = message;
    dialog.buttons = buttons;
    dialog.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    return new Promise<DialogButton>((resolve, reject) => {
      dialog.onButtonClick.subscribe(button => {
        dialog.close();
        resolve(button);
      });
    });
  }

  public template(config: DialogConfig, template: TemplateRef<any>, buttons: DialogButton[], templateContext?: any): Promise<DialogTemplateResult> {
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.title = config.title || "";
    dialog.modalWidth = config.modalWidth || dialog.modalWidth;
    dialog.template = template;
    dialog.templateContext = templateContext;
    dialog.buttons = buttons;
    dialog.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    return new Promise<DialogTemplateResult>((resolve, reject) => {
      dialog.onButtonClick.subscribe(button => {
        resolve({button, dialog});
      });
    });
  }

  public html(config: DialogConfig, html: string, buttons: DialogButton[] = []): Promise<DialogTemplateResult> {
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.title = config.title || "";
    dialog.modalWidth = config.modalWidth || dialog.modalWidth;
    dialog.html = html;
    dialog.buttons = buttons;
    dialog.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    return new Promise<DialogTemplateResult>((resolve, reject) => {
      dialog.onButtonClick.subscribe(button => {
        resolve({button, dialog});
      });
    });
  }

  public modal(route: ActivatedRouteSnapshot){
    const dialogView = this.createDialogView();
    const dialog = dialogView.instance;
    dialog.route = route;
  }

  public closeAll() {
    this.dialogs.map(x => x.close());
    this.dialogs = [];
  }

  public detectChanges() {
    this.dialogs.forEach(x => x.cdRef.detectChanges());
  }

  public showing(idroute?: string): boolean {
    return !!this.dialogs.find(x => x.route?.queryParams?.idroute == idroute)
  }

  public close(idroute?: string, triggerBack: boolean = true) {
    const dialog = idroute ? this.dialogs.find(x => x.route?.queryParams?.idroute == idroute) : this.dialogs[this.dialogs.length-1];
    dialog?.close(triggerBack);
  }

  public showSppinerOverlay(message?: string, timeout?: number) {
    if(!this.spinnerRef) {
      this.createSpinnerView();
    }
    this.spinnerRef!.instance.message = message;
    this.spinnerRef!.instance.show = true;
    this.spinnerRef!.instance.cdRef.detectChanges();
    this.cdRef?.detectChanges();
    if(timeout) {
      this.sppinerTimeout = setTimeout(() => {
        this.closeSppinerOverlay();
      }, timeout);
    }
  }

  public closeSppinerOverlay() {
    if(this.spinnerRef) {
      if(this.sppinerTimeout) clearTimeout(this.sppinerTimeout);
      this.sppinerTimeout = undefined;
      this.spinnerRef!.instance.show = false;
      this.cdRef?.detectChanges();
    }
  }
}
