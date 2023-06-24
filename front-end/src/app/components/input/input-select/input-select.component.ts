import { Component, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { FullRoute, NavigateService } from 'src/app/services/navigate.service';
import { InputBase, LabelPosition, SelectItem } from '../input-base';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputSelectComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;
  @ViewChild('dropdownButton', {static: false}) dropdownButton?: ElementRef;
  @Output() change = new EventEmitter<Event>();
  @Output() details = new EventEmitter<SelectItem>();
  @Input() hostClass: string = "";
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() value: any = undefined;
  @Input() icon: string = "bi bi-menu-button-wide";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() fields: string[] = [];
  @Input() dao?: DaoBaseService<Base> = undefined;
  @Input() itemNull: string = " - ";
  @Input() addRoute?: FullRoute;
  @Input() searchRoute?: FullRoute;
  @Input() afterSearch?: (result: any) => void;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() nullable?: string;
  @Input() searchable?: string;
  @Input() noIcon?: string;
  @Input() noColor?: string;
  @Input() liveSearch?: string;
  @Input() detailsButton?: string;
  @Input() detailsButtonIcon?: string;
  @Input() listHeight: number = 200;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() set where(value: any[] | undefined) {
    if(JSON.stringify(this._where) != JSON.stringify(value)) {
      this._where = value;
      this.loadItems();
    }
  }
  get where(): any[] | undefined {
    return this._where;
  }
  @Input() set itemTodos(value: string | undefined) {
    if(this._itemTodos != value) {
      this._itemTodos = value;
      this.itemTodosButton.value = value || "";
    }
  }
  get itemTodos(): string | undefined {
    return this._itemTodos;
  }
  @Input() set valueTodos(value: any) {
    if(this.itemTodosButton.key != value) this.itemTodosButton.key = value;
  }
  get valueTodos(): any {
    return this.itemTodosButton.key;
  }
  @Input() set items(value: LookupItem[]) {
    if(JSON.stringify(this._items) != JSON.stringify(value)) {
      this._items = value;
      this.setValue(this.currentValue);
      this.detectChanges();
    }
  }
  get items(): LookupItem[] {
    return this._items;
  }
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set loading(value: boolean) {
    if (this._loading != value) {
      this._loading = value;
      this.detectChanges();
    }
  }
  get loading(): boolean {
    return this._loading;
  }
  @Input() set size(value: number) {
    this.setSize(value);
  }
  get size(): number {
    return this.getSize();
  }

  private _items: LookupItem[] = [];
  private _loading: boolean = false;
  private _where: any[] | undefined = undefined;
  private _itemTodos?: string = undefined; 

  public go: NavigateService;
  public filterControl: FormControl = new FormControl("");
  public itemNullButton: LookupItem = {
    key: null,
    value: " - "
  };
  public itemTodosButton: LookupItem = {
    key: undefined,
    value: ""
  };
  public itemDesconhecidoButton: LookupItem = {
    key: "UNKNOW",
    value: ""
  };

  constructor(public injector: Injector) {
    super(injector);
    this.go = injector.get<NavigateService>(NavigateService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    $(() => {
      if(this.dao) this.loadItems();
      if(this.control) {
        this.control.valueChanges.subscribe(newValue => this.setValue(newValue));
        this.setValue(this.control.value);
      }
    });
  }

  public get isNullable(): boolean {
    return this.nullable != undefined;
  }

  public get isSearchable(): boolean {
    return this.searchable != undefined;
  }
  
  public get isTodos(): boolean {
    return this.itemTodos != undefined;
  }

  public get isNoIcon(): boolean {
    return this.noIcon != undefined;
  }

  public get isNoColor(): boolean {
    return this.noColor != undefined;
  }

  public get isLiveSearch(): boolean {
    return this.liveSearch != undefined;
  }

  public get dropdownWidth(): number {
    return this.dropdownButton?.nativeElement.offsetWidth || 10; 
  }

/*   public get options(): LookupItem[] {
    let result: LookupItem[] = [];
    if (this.loading) {
      result.push({ code: "LOADING", key: this.value, value: this.CARREGANDO, icon: "bi bi-clock-history" });
    } else {
      if (this.isNullable) result.push({ code: "NULL", key: null, value: this.itemNull });
      if (this.itemTodos.length) result.push({ code: "ALL", key: this.valueTodos, value: this.itemTodos });
      if (this.selectedItem?.code == "UNKNOWN" && !this.items.find(x => x.key == this.selectedItem!.key)) result.push({ code: "ALL", key: this.selectedItem.key, value: this.selectedItem.value || ' - Desconhecido - ' });
      result.push(...this.items);
    }
    if (JSON.stringify(result) != JSON.stringify(this._options)) this._options = result;
    return this._options;
  } */

  public isActive(item: LookupItem): boolean {
    return item.key == this.current.value;
  }

  public getStringId(value: any) {
    return this.util.onlyAlphanumeric(JSON.stringify(value));
  }

  public get currentValue(): any {
    return this.control ? this.control.value : this.value;
  }

  public get current(): LookupItem {
    if(this.isNullable && this.currentValue == null) {
      return this.itemNullButton;
    } else if(this.isTodos && this.currentValue == this.valueTodos) {
      return this.itemTodosButton;
    } else if(!this.selectedItem) {
      return this.itemDesconhecidoButton;
    } else {
      return this.selectedItem!;
    }
  }

  public get selectedItem(): LookupItem | undefined {
    return this.items.find(x => x.key == this.currentValue);
  }

  public onFilterChange() {
    this.cdRef.detectChanges();
  }

  public itemVisible(item: LookupItem): boolean {
    return !this.filterControl.value?.length || (new RegExp(this.filterControl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i")).test(item.value);
  }

  private loadItems() {
    this.loading = true;
    this.detectChanges();
    this.dao?.searchText("", this.fields.length ? this.fields : undefined, this.where).then(result => {
      this.loading = false;
      this.items = result.map(x => {
        return {
          key: x.value,
          value: x.text
        };
      }) || [];
    });
  }

  public get isDetails(): boolean {
    return this.detailsButton !== undefined;
  }

  public setValue(value: any) {
    if((this.control && this.control.value != value) || (this.value != value)) {
      this.value = value;
      if(this.control) this.control.setValue(value);
      if(this.change) this.change.emit(new Event("change"));
    }
  }

  public onDetailsClick(event: Event){
    if(this.details && (this.isNullable || typeof this.currentValue != "undefined")) {
      const item = this.items.find(x => x.key == this.currentValue);
      this.details.emit({
        value: item?.key,
        text: item?.value || "",
        entity: item?.data
      });
    }
  }

  public onItemClick(item: LookupItem){
    this.setValue(item.key);
  }

  public onAddClick(event: Event) {
    const modalRoute = this.addRoute!;
    modalRoute.params = Object.assign(modalRoute.params || {}, { modal: true });
    this.go.navigate(this.addRoute!, {
      modalClose: (result) => {
        if (result?.length) {
          this.control?.setValue(result);
          this.loadItems();
        }
      }
    });
  }

  public onSearchClick(searchRoute?: FullRoute) {
    const modalRoute = searchRoute!;
    modalRoute.params = Object.assign(modalRoute?.params || {}, { modal: true });
    this.go.navigate(searchRoute!, {
      metadata: {selectable: true},
      modalClose: (result: any) => {
        if (result && this.afterSearch) this.afterSearch(result);    
      }
    });
  }
}
