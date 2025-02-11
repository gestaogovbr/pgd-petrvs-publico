import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Injector,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import {
	AbstractControl,
	ControlContainer,
	FormGroup,
	FormGroupDirective,
} from "@angular/forms";
import {Dropdown} from "bootstrap";
import {DaoBaseService} from "src/app/dao/dao-base.service";
import {Base, IIndexable} from "src/app/models/base.model";
import {FullRoute, NavigateService} from "src/app/services/navigate.service";
import {UtilService} from "src/app/services/util.service";
import {GroupBy} from "../../grid/grid.component";
import {InputBase, LabelPosition, SelectItem} from "../input-base";
import {EntityService} from "src/app/services/entity.service";
//import * as bootstrap from 'bootstrap';

export class SearchGroupSeparator {
	constructor(public groups: GroupBy[]) {}
	public get text(): string {
		return this.groups.map((x) => x.value).join(" - ");
	}
}

@Component({
	selector: "input-search",
	templateUrl: "./input-search.component.html",
	styleUrls: ["./input-search.component.scss"],
	viewProviders: [
		{
			provide: ControlContainer,
			useExisting: FormGroupDirective,
		},
	],
})
export class InputSearchComponent extends InputBase implements OnInit {
	@HostBinding("class") class = "form-group";
	@ViewChild("inputElement") inputElement?: ElementRef;
	@Output() details = new EventEmitter<SelectItem>();
	@Output() select = new EventEmitter<SelectItem>();
	@Output() load = new EventEmitter<SelectItem | undefined>();
	@Output() change = new EventEmitter<Event>();
	@Input() relativeId?: string;
	@Input() hostClass: string = "";
	@Input() labelPosition: LabelPosition = "top";
	@Input() controlName: string | null = null;
	@Input() labelInfo: string = "";
	@Input() labelClass?: string;
	@Input() bold: boolean = false;
	@Input() loading: boolean = false;
	@Input() value: any = "";
	@Input() emptyValue: any = "";
	@Input() placeholder: string = "";
	@Input() fields?: string[];
	@Input() join?: string[];
	@Input() groupBy?: GroupBy[];
	@Input() where?: any;
	@Input() metadata?: any;
	@Input() dao?: DaoBaseService<Base> = undefined;
	@Input() detailsButton?: string;
	@Input() addRoute?: FullRoute;
	@Input() selectParams?: any;
	@Input() onlySelect?: string;
	@Input() form?: FormGroup;
	@Input() source?: any;
	@Input() path?: string;
	@Input() required?: string|undefined;
	@Input() displayOnlySelected?: string;
	@Input() displayTemplate?: TemplateRef<unknown>;
	@Input() set control(value: AbstractControl | undefined) {
		this._control = value;
	}
	get control(): AbstractControl | undefined {
		return this.getControl();
	}
	@Input() set size(value: number) {
		this.setSize(value);
	}
	get size(): number {
		return this.getSize();
	}
	@Input() set disabled(value: string | undefined) {
		if (value != this._disabled) {
			this._disabled = value;
			this.detectChanges();
			this.dropdown?.toString(); /* Força atualização do dropdown */
			if (this.selectedValue) this.selectItem(this.selectedValue, false, false);
		}
	}
	get disabled(): string | undefined {
		return this._disabled;
	}
	@Input() set icon(value: string) {
		if (value != this._icon) {
			this._icon = value;
		}
	}
	get icon(): string {
		return typeof this._icon != "undefined"
			? this._icon
			: (this.dao ? this.entities.getIcon(this.dao.collection) : undefined) ||
					"";
	}
	@Input() set label(value: string) {
		if (value != this._label) {
			this._label = value;
		}
	}
	get label(): string {
		return typeof this._label != "undefined"
			? this._label
			: (this.dao ? this.entities.getLabel(this.dao.collection) : undefined) ||
					"";
	}
	@Input() set selectRoute(value: FullRoute) {
		if (value != this._selectRoute) {
			this._selectRoute = value;
		}
	}
	get selectRoute(): FullRoute {
		return typeof this._selectRoute != "undefined"
			? this._selectRoute
			: this.dao
			? this.entities.getSelectRoute(this.dao!.collection)
			: {route: []};
	}

	private DEBOUNCE_TIMER = 1000;
	private queryText: string = "";
	private timer: any = undefined;
	private _dropdown?: Dropdown;
	private _disabled?: string;
	private _icon?: string;
	private _label?: string;
	private _selectRoute?: FullRoute;

	public dropdownWidth: number = 200;
	public items: (SelectItem | SearchGroupSeparator)[] = [];
	public selectedItem?: SelectItem = undefined;
	public selectedValue?: string = undefined;
	public selectedEntity?: any = undefined;
	public searching: boolean = false;
	public go: NavigateService;
	public entities: EntityService;
	public util: UtilService;
	public get dropdown(): Dropdown | undefined {
    const elm = document.getElementById(
        this.generatedId(this.controlName) + "_search_dropdown"
    );

    this._dropdown = this.isDisabled
        ? undefined
        : this._dropdown || (elm ? new Dropdown(elm) : undefined);
    return this._dropdown;
  }

	constructor(public injector: Injector) {
		super(injector);
		this.entities = this.injector.get<EntityService>(EntityService);
		this.util = this.injector.get<UtilService>(UtilService);
		this.go = injector.get<NavigateService>(NavigateService);
	}

	ngOnInit(): void {
		super.ngOnInit();
	}

	public ngAfterViewInit(): void {
		super.ngAfterViewInit();
		this.control?.valueChanges.subscribe(async (newValue) => {			
			if (this.selectedValue != newValue) {
				this.selectedValue = newValue;
				await this.loadSearch();
			}
		});
		this.control?.setValue(this.control.value);
	}

	public selectItem(
		value: string,
		loadEntity: boolean = true,
		emitEvent: boolean = true
	) {
		const selected = this.items.find(
			(x) => !(x instanceof SearchGroupSeparator) && x.value == value
		) as SelectItem;
		const setSelect = (entity: any) => {
			if (selected) selected.entity = entity;
			this.selectedEntity = entity;
			this.selectedItem = selected;
			if (this.select && emitEvent) {
				this.select.emit(selected);
			}
			if (this.change && emitEvent) this.change.emit(new Event("change"));
			
		};
		if (selected) {
			const element = document.getElementById(
				this.generatedId(this.controlName)
			) as HTMLInputElement;
			if (element) {
				element.value = selected.text;
			}
			this.selectedValue = selected.value;
			this.control?.setValue(this.selectedValue, {emitEvent: false});
			this.selectedEntity = undefined;
			if (this.selectedValue?.length) {
				if (loadEntity) {
					this.loading = true;
					this.dao
						?.getById(this.selectedValue, this.join)
						.then(setSelect)
						.finally(() => (this.loading = false));
				} else {
					setSelect(selected.entity);
				}
			}
		}
		this.cdRef.detectChanges();
	}

	public get isTextValid(): boolean {
		let valid =
			!!this.selectedItem || !this.inputElement?.nativeElement.value?.length;
		if (this.control) {
			if (valid && this.control.errors?.incorrect) {
				let {incorrect, ...others} = this.control.errors;
				this.control.setErrors(
					Object.entries(this.control.errors).length == 1 ? null : others
				);
			} else if (!valid && !this.control.errors?.incorrect) {
				let incorrect = Object.assign(this.control.errors || {}, {
					incorrect: true,
				});
				this.control.setErrors(incorrect);
			}
		}
		return valid;
	}

	public onItemClick(item: SelectItem | SearchGroupSeparator) {
		this.queryText = '';
		this.selectItem((item as SelectItem).value);
	}

	public async onAddClick(event: Event) {
		const modalRoute = this.addRoute!;
		modalRoute.params = Object.assign(modalRoute.params || {}, {modal: true});
		this.go.navigate(modalRoute, {
			modalClose: async (result) => {
				if (result?.length) {
					this.control?.setValue(result, {emitEvent: false});
					await this.loadSearch();
				}
			},
		});
	}

	public async onSelectClick(event: Event) {		
		return new Promise<string>((resolve, reject) => {
			if (this.selectRoute) {
				const modalRoute = this.selectRoute!;
				modalRoute.params = Object.assign(
					modalRoute.params || {},
					this.selectParams || {},
					{selectable: true, modal: true}
				);
				this.go.navigate(modalRoute, {
					metadata: this.metadata || {},
					modalClose: async (result) => {
						if (result?.id?.length) {
							this.control?.setValue(result.id, {emitEvent: false});
							await this.loadSearch();
							resolve(result?.id);
						} else {
							reject("Nada foi selecionado");
						}
					},
				});
			} else {
				reject("Rota de seleção inexistente");
			}
		});
	}

	public onKeyDown(event: any) {		
		if (["Enter", "ArrowDown", "ArrowUp"].indexOf(event.key) >= 0) {
			if (event.key == "Enter") {
				this.onEnterKeyDown(event);
				console.log("Enter");
			} else if (event.key == "Esc") {
				console.log("Esc");
			} else if (event.key == "ArrowDown") {
				console.log("Down");
			} else if (event.key == "ArrowUp") {
				console.log("Up");
			}
			event.preventDefault();
		}
	}

	public onKeyUp(event: any) {
		this.typed(event.target.value, event);
	}

	public typed(newValue: string, event?: any) {
		if (event.key != "Tab" && this.queryText != newValue) {
			this.queryText = newValue;
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.search(this.queryText);
			}, this.DEBOUNCE_TIMER);
		}
	}

	public getItemId(item: SelectItem | SearchGroupSeparator): string {
		return (
			this.generatedId(this.controlName) +
			(item.hasOwnProperty("value")
				? "_item_" + (item as IIndexable)["value"]
				: "_sep_" +
				  this.util.onlyAlphanumeric((item as IIndexable)["groups"].text))
		);
	}

	public isSeparator(row: any): boolean {
		return row instanceof SearchGroupSeparator;
	}

	public get isOnlySelect(): boolean {
		return this.onlySelect != undefined;
	}

	public isDisplayOnlySelected(): boolean {
		return this.displayOnlySelected != undefined;
	}

	public group(items: (SelectItem | SearchGroupSeparator)[]) {
		if (this.groupBy && items.length) {
			let buffer = "";
			items = items.filter((x) => !(x instanceof SearchGroupSeparator));
			for (let i = 0; i < items.length; i++) {
				let group = this.groupBy.map((x, j) =>
					Object.assign({}, x, {value: (items[i] as SelectItem).order![j]})
				);
				if (buffer != JSON.stringify(group)) {
					buffer = JSON.stringify(group);
					items.splice(i, 0, new SearchGroupSeparator(group));
				}
			}
		}
		return items;
	}

	public search(text: string) {
		this.searching = true;
		if (this.control)
			this.control!.setValue(this.emptyValue, {emitEvent: false});
		this.clear(false, true, false);
		this.dao
			?.searchText(
				text,
				this.fields,
				this.where,
				this.groupBy?.map((x) => [x.field, "asc"])
			)
			.then((result) => {
				if (this.queryText == text) {
					this.items = this.group(result);
					const element = document.getElementById(
						this.generatedId(this.controlName)
					);
					if (element) {
						const computedStyle = getComputedStyle(element);
						const width =
							element.offsetWidth +
							parseInt(computedStyle.marginLeft) +
							parseInt(computedStyle.marginRight);
						this.dropdownWidth = width || 200;
					} else {
						this.dropdownWidth = 200;
					}
					this.cdRef.detectChanges();
					if (this.items.length) {
						this.dropdown?.show();
					} else {
						this.dropdown?.hide();
					}
				}
			})
			.finally(() => {
				this.searching = false;
			});
	}

	public get isDetails(): boolean {
		return this.detailsButton !== undefined;
	}

	public onDetailsClick(event: Event) {
		if (this.details && this.selectedItem && this.selectedEntity)
			this.details.emit({...this.selectedItem, entity: this.selectedEntity});
	}

	public clear(
		clearControl: boolean = true,
		emitEvent: boolean = true,
		clearText = true
	) {		
		this.items = [];
		this.selectedItem = undefined;
		this.selectedValue = undefined;
		this.selectedEntity = undefined;
		if (clearText && this.inputElement)
			this.queryText = this.inputElement!.nativeElement.value = "";
		if (clearControl && !this.isDisabled && this.control)
			this.control.setValue(this.emptyValue);
		if (this.change && emitEvent) this.change.emit(new Event("change"));
		this.cdRef.detectChanges();
	}

	public isTypeSelectItem(
		toBeDetermined: SelectItem | any
	): toBeDetermined is SelectItem {
		return (
			!!(toBeDetermined as SelectItem).value &&
			!!(toBeDetermined as SelectItem).text
		);
	}

	public async loadSearch(
		keyOrSelectItem?: string | SelectItem | any,
		emitEvent: boolean = true
	) {		
		this.clear(false, emitEvent);
		let selectedItem: SelectItem | undefined = undefined;
		if (keyOrSelectItem) {
			const key =
				typeof keyOrSelectItem == "string"
					? keyOrSelectItem
					: keyOrSelectItem.id || keyOrSelectItem.value;
			this.selectedValue = key;
			this.control?.setValue(key, {emitEvent: false});
			selectedItem =
				typeof keyOrSelectItem == "object"
					? !!keyOrSelectItem.id
						? this.dao?.entityToSelectItem(keyOrSelectItem, this.fields)
						: keyOrSelectItem
					: undefined;
		}
		if (this.control?.value?.length) {
			this.searching = true;
			this.cdRef.detectChanges();
			try {
				let result =
					selectedItem ||
					(await this.dao?.searchKey(
						this.control?.value,
						this.fields,
						this.join
					));
				if (result) {
					this.items = [result];
					this.selectItem(this.control?.value, false, emitEvent);
				}
			} finally {
				this.searching = false;
			}
		}
	}
}
