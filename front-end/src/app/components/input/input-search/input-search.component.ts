import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { FullRoute, NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { GroupBy } from '../../grid/grid.component';
import { InputBase, LabelPosition, SelectItem } from '../input-base';

export class SearchGroupSeparator {
  constructor(public groups: GroupBy[]) {}
  public get text(): string {
    return this.groups.map(x => x.value).join(" - ");
  }
}

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputSearchComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() details = new EventEmitter<SelectItem>();
  @Output() select = new EventEmitter<SelectItem>();
  @Output() load = new EventEmitter<SelectItem | undefined>();
  @Output() change = new EventEmitter<Event>();
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() size: number = 0;
  @Input() loading: boolean = false;
  @Input() value: any = "";
  @Input() emptyValue: any = "";
  @Input() placeholder: string = "";
  @Input() fields?: string[];
  @Input() join?: string[];
  @Input() groupBy?: GroupBy[];
  @Input() where?: any;
  @Input() dao?: DaoBaseService<Base> = undefined;
  @Input() detailsButton?: string;
  @Input() addRoute?: FullRoute;
  @Input() selectRoute?: FullRoute;
  @Input() onlySelect?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }

  private DEBOUNCE_TIMER = 1000;
  private queryText: string = "";
  private timer: any = undefined;
  private dropdown?: bootstrap.Dropdown;
  public dropdownWidth: number = 200;
  public items: (SelectItem | SearchGroupSeparator)[] = [];
  public selectedItem?: SelectItem = undefined;
  public selectedValue?: string = undefined;
  public searching: boolean = false;
  public searchObj: any = undefined;
  public go: NavigateService;
  public util: UtilService;
  public uuid: string;

  constructor(public injector: Injector) {
    super(injector);
    this.util = this.injector.get<UtilService>(UtilService);
    this.go = injector.get<NavigateService>(NavigateService);
    this.uuid = this.util.md5();
  }

  public get controlId(): string {
    return this.controlName + this.uuid;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(!this.isDisabled){
      $(() => {
        const elm = document.getElementById(this.controlId + '_search_dropdown');
        // @ts-ignore
        if(elm) this.dropdown = new bootstrap.Dropdown(elm);
      });
    }
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.control?.valueChanges.subscribe(async newValue => {
      if(this.selectedValue != newValue) {
        this.selectedValue = newValue;
        await this.loadSearch();
      }
    });
    this.control?.setValue(this.control.value);
  }

  public selectItem(value: string, loadEntity: boolean = true, emitEvent: boolean = true) {
    const selected = this.items.find(x => !(x instanceof SearchGroupSeparator) && x.value == value) as SelectItem;
    const setSelect = (entity: any) => {
      if(selected) selected.entity = entity;
      this.searchObj = entity;
      this.selectedItem = selected;
      if(this.select && emitEvent) this.select.emit(selected);
      if(this.change && emitEvent) this.change.emit(new Event("change"));
    }
    if(selected) {
      $("#"+ this.controlId).val(selected.text);
      this.selectedValue = selected.value;
      this.control?.setValue(this.selectedValue, {emitEvent: false});
      this.searchObj = undefined;
      if(this.selectedValue?.length) {
        if(loadEntity) {
          this.loading = true;
          this.dao?.getById(this.selectedValue, this.join).then(setSelect).finally(() => this.loading = false);
        } else {
          setSelect(selected.entity);
        }
      }
    }
    this.cdRef.detectChanges();
  }

  public onItemClick(item: SelectItem | SearchGroupSeparator) {
    this.selectItem((item as SelectItem).value);
  }

  public async onAddClick(event: Event) {
    const modalRoute = this.addRoute!;
    modalRoute.params = Object.assign(modalRoute.params || {}, { modal: true });
    this.go.navigate(modalRoute, {modalClose: async (result) => {
      if(result?.length) {
        this.control?.setValue(result, {emitEvent: false});
        await this.loadSearch();
      }
    }});
  }

  public onSelectClick(event: Event) {
    if(this.selectRoute) {
      const modalRoute = this.selectRoute!;
      modalRoute.params = Object.assign(modalRoute.params || {}, { selectable: true, modal: true });
      this.go.navigate(modalRoute, {modalClose: async (result) => {
        if(result?.id?.length) {
          this.control?.setValue(result.id, {emitEvent: false});
          await this.loadSearch();
        }
      }});
    }
  }

  public onKeyDown(event: any) {
    if(["Enter", "ArrowDown", "ArrowUp"].indexOf(event.key) >= 0) {
      if(event.key == "Enter") {
        this.onEnterKeyDown(event);
        console.log("Enter");
      } else if(event.key == "Esc") {
        console.log("Esc");
      } else if(event.key == "ArrowDown") {
        console.log("Down");
      } else if(event.key == "ArrowUp") {
        console.log("Up");
      }
      event.preventDefault();
    }
  }

  public onKeyUp(event: any) {
    this.typed(event.target.value);
  }

  public typed(newValue: string) {
    if(this.queryText != newValue) {
      this.queryText = newValue;
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.search(this.queryText);
      }, this.DEBOUNCE_TIMER);
    }
  }

  public isSeparator(row: any): boolean {
    return (row instanceof SearchGroupSeparator);
  }

  public get isOnlySelect(): boolean {
    return this.onlySelect != undefined;
  }

  public group(items: (SelectItem | SearchGroupSeparator)[]) {
    if(this.groupBy && items.length) {
      let buffer = "";
      items = items.filter(x => !(x instanceof SearchGroupSeparator));
      for(let i = 0; i < items.length; i++) {
        let group = this.groupBy.map((x, j) => Object.assign({}, x, { value: (items[i] as SelectItem).order![j] }));
        if(buffer != JSON.stringify(group)) {
          buffer = JSON.stringify(group);
          items.splice(i, 0, new SearchGroupSeparator(group));
        }
      }
    }
    return items;
  }

  public search(text: string) {
    this.searching = true;
    this.clear();
    this.dao?.searchText(text, this.fields, this.where, this.groupBy?.map(x => [x.field, "asc"])).then(result => {
      if(this.queryText == text){
        this.items = this.group(result);
        this.dropdownWidth = $("#"+ this.controlId).first().outerWidth() || 200;
        this.cdRef.detectChanges();
        if(this.items.length) {
          this.dropdown?.show();
        } else {
          this.dropdown?.hide();
        }
      }
    }).finally(() => {
      this.searching = false;
    });
  }

  public get isDetails(): boolean {
    return this.detailsButton !== undefined;
  }

  public onDetailsClick(event: Event){
    if(this.details && this.selectedItem && this.searchObj) this.details.emit({...this.selectedItem, entity: this.searchObj});
  }

  public clear(clearControl: boolean = true, emitEvent: boolean = true) {
    this.items = [];
    this.selectedItem = undefined;
    this.selectedValue = undefined;
    this.searchObj = undefined;
    if(clearControl && !this.isDisabled && this.control) this.control.setValue(this.emptyValue);
    if(this.change && emitEvent) this.change.emit(new Event("change"));
    this.cdRef.detectChanges();
  }

  public isTypeSelectItem(toBeDetermined: SelectItem | any): toBeDetermined is SelectItem {
    return !!(toBeDetermined as SelectItem).value && !!(toBeDetermined as SelectItem).text;
  }

  public async loadSearch(keyOrSelectItem?: string | SelectItem | any, emitEvent: boolean = true) {
    this.clear(false, emitEvent);
    let selectedItem: SelectItem | undefined = undefined;
    if(keyOrSelectItem) {
      const key = typeof keyOrSelectItem == "string" ? keyOrSelectItem : (keyOrSelectItem.id || keyOrSelectItem.value);
      this.selectedValue = key;
      this.control?.setValue(key, {emitEvent: false});
      selectedItem = typeof keyOrSelectItem == "object" ? (!!keyOrSelectItem.id ? this.dao?.entityToSelectItem(keyOrSelectItem, this.fields) : keyOrSelectItem) : undefined;
    }
    if(this.control?.value?.length){
      this.searching = true;
      this.cdRef.detectChanges();
      try {
        let result = selectedItem || await this.dao?.searchKey(this.control?.value, this.fields, this.join);
        if(result){
          this.items = [result];
          this.selectItem(this.control?.value, false, emitEvent);
        }
      } finally {
        this.searching = false;
      }
    }
  }
}
