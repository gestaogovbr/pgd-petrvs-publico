import {
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	EventEmitter,
	Injector,
	Input,
	OnInit,
	Output,
	TemplateRef,
	Type,
	ViewChild,
	ViewContainerRef,
} from "@angular/core";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Subject} from "rxjs";
import {DialogService, DialogTemplateResult} from "../dialog.service";
import {GlobalsService} from "../globals.service";
import {NavigateService} from "../navigate.service";
import {UtilService} from "../util.service";
import {FormGroup} from "@angular/forms";

export type DialogButton = {
	label: string;
	icon?: string;
	color?: string;
	value?: any;
};

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
	providers: [
		{
			provide: "ID_GENERATOR_BASE",
			useFactory: (
				self: DialogComponent,
				go: NavigateService,
				util: UtilService
			) => {
				return util.onlyAlphanumeric(go.getStackRouteUrl());
			},
			deps: [DialogComponent, NavigateService, UtilService],
		},
	],
})
export class DialogComponent implements OnInit {
	@Input() iconTitle?: string;
	@ViewChild("body", {read: ViewContainerRef}) body?: ViewContainerRef;
	@Output() onClose = new EventEmitter<void>();
	@Output() onButtonClick = new EventEmitter<DialogButton>();
	@Input() set message(value: string) {		
		if (this._message != value) {
			this._message = value;
			this.cdRef.detectChanges();
		}
	}
	get message(): string {
		return this._message;
	}

	@Input() set title(value: string) {
		if (this._title != value) {
			this._title = value;
			this.cdRef.detectChanges();
		}
	}
	get title(): string {
		return this._title;
	}

	public id: string;
	public modal?: bootstrap.Modal;
	public route?: ActivatedRouteSnapshot;
	public buttons: DialogButton[] = [];
	public modalBodyRef?: ComponentRef<Type<any>>;
	public componentRef?: ComponentRef<DialogComponent>;
	public dialogs?: DialogService;
	public modalWidth: number = 500;
	public template?: TemplateRef<any>;
	public html?: string;
	public icon?: string;
	public minimized: boolean = false;
	public templateContext: any;
	public templateResult?: Promise<DialogTemplateResult>;
	public inputValue: string = "";
	public defaultValue: string = "";
	public isPrompt: boolean = false;

	private _factory?: ComponentFactoryResolver;
	public get factory(): ComponentFactoryResolver {
		this._factory =
			this._factory ||
			this.injector.get<ComponentFactoryResolver>(ComponentFactoryResolver);
		return this._factory;
	}
	private _cdRef?: ChangeDetectorRef;
	public get cdRef(): ChangeDetectorRef {
		this._cdRef =
			this._cdRef || this.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
		return this._cdRef;
	}
	private _go?: NavigateService;
	public get go(): NavigateService {
		this._go = this._go || this.injector.get<NavigateService>(NavigateService);
		return this._go;
	}
	private _gb?: GlobalsService;
	public get gb(): GlobalsService {
		this._gb = this._gb || this.injector.get<GlobalsService>(GlobalsService);
		return this._gb;
	}

	private _title: string = "";
	private _message: string = "";

	constructor(public injector: Injector) {
		this.id = "dialog" + new Date().getTime();
	}

	ngOnInit(): void {}

	public minimize() {
		this.minimized = true;
		this.dialogs?.minimized.push(this);
		if (this.gb.refresh) this.gb.refresh();
		this.bootstapModal.hide();
		//$(".modal-backdrop").addClass("d-none");
	}

	public restore() {
		const index = this.dialogs!.minimized.indexOf(this);
		if (index >= 0) {
			this.minimized = false;
			this.dialogs?.minimized.splice(index, 1);
			if (this.gb.refresh) this.gb.refresh();
			this.bootstapModal.show();
			//$(".modal-backdrop").removeClass("d-none");
		}
	}

	public get bootstapModal(): bootstrap.Modal {
		if (!this.modal) {
			const element = document.getElementById(this.id);
			//@ts-ignore
			this.modal = new bootstrap.Modal(element as Element, {
				backdrop: "static",
				keyboard: false,
			});
			element!.addEventListener("hidden.bs.modal", (event) => {
				if (!this.minimized) this.hide();
			});
			element!.addEventListener("shown.bs.modal", (event) => {
				const modal = this.modalBodyRef?.instance as any;
				if (modal) {
					modal.shown = true;
					if (modal.onShow) modal?.onShow();
					this.cdRef.detectChanges();
				}
			});
		}
		return this.modal;
	}

	/* Executado quando a janela fechar */
	public hide() {
		let index = this.dialogs!.dialogs.findIndex((x) => x.id == this.id);
		if (index >= 0) this.dialogs!.dialogs.splice(index, 1);
		if (this.route) this.go.back(this.route.queryParams?.idroute);
		if (this.onClose) this.onClose.emit();
		this.componentRef?.destroy();
    const modal = this.componentRef?.instance.modalBodyRef?.instance as any;
    if (modal && modal.form) {
		  this.dialogs?.modalClosed.next();
    }
	}

	public ngAfterViewInit() {
		if (this.route && this.route.component) {
			const componentType = this.route.component as Type<any>;
			const componentFactory =
				this.factory.resolveComponentFactory(componentType);
			if (this.route.data.title?.length) this.title = this.route.data.title;
			this.modalBodyRef =
				this.body!.createComponent<typeof componentType>(componentFactory);
			if ("modalInterface" in this.modalBodyRef.instance) {
				const modal = this.modalBodyRef.instance as any;
				modal.modalRoute = this.route;
				this.modalWidth = parseInt(
					this.route.queryParams?.modalWidth || modal.modalWidth
				);
				modal.modalInfiniteScrollContainer = `#${this.id}`;
				(modal.titleSubscriber as Subject<string>).subscribe((title) => {
					this.title = title;
					this.cdRef.detectChanges();
				});
				if (modal.title?.length) this.title = modal.title;
				this.cdRef.detectChanges();
			} else if (this.template) {
				this.modalWidth = 600;
				this.cdRef.detectChanges();
			}
		}
		this.bootstapModal.show();
		this.zIndexRefresh();
	}

	public zIndexRefresh() {
		document.querySelectorAll(".modal").forEach((element, index) => {
			(element as HTMLElement).style.zIndex = `${(index + 1) * 1055}`;
		});
		document.querySelectorAll(".modal-backdrop").forEach((element, index) => {
			(element as HTMLElement).style.zIndex = `${(index + 1) * 1050}`;
		});
	}

	public show() {
		this.bootstapModal.show();
	}

	public close(triggerBack: boolean = true) {
		if (!triggerBack) this.route = undefined;
		this.bootstapModal.hide();
	}

	public buttonClick(button: DialogButton) {
		this.onButtonClick?.emit(button);
	}

	public openNewBrowserTab() {
		this.go.openNewBrowserTab(this.route);
	}
}