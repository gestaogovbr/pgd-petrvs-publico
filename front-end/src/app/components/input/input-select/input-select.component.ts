import { Component, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
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
  @Output() change = new EventEmitter<Event>();
  @Output() details = new EventEmitter<SelectItem>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() value: any = undefined;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() size: number = 0;
  @Input() loading: boolean = false;
  @Input() fields: string[] = [];
  @Input() dao?: DaoBaseService<Base> = undefined;
  @Input() itemNull: string = " - ";
  @Input() itemTodos: string = "";
  @Input() valueTodos: any = undefined;
  @Input() addRoute?: FullRoute;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() nullable?: string;
  @Input() noIcon?: string;
  @Input() noColor?: string;
  @Input() liveSearch?: string;
  @Input() detailsButton?: string;
  @Input() detailsButtonIcon?: string;
  @Input()
  public get where(): any[] | undefined {
    return this._where;
  }
  public set where(value: any[] | undefined) {
    if(JSON.stringify(this._where) != JSON.stringify(value)) {
      this._where = value;
      this.loadItems();
    }
  }
  @Input()
  public get items(): LookupItem[] {
    return this._items;
  }
  public set items(value: LookupItem[]) {
    if(JSON.stringify(this._items) != JSON.stringify(value)) {
      if(this.viewInit) {
        const current = this.control ? this.control.value : this.value;
        this._items = [];
        this.selectPicker?.find('.input-select-dynamic-item').remove().end();
        this.cdRef.detectChanges();
        this._items = value;
        this.cdRef.detectChanges();
        this.selectPicker?.selectpicker('refresh');
        this.selectedValue = undefined;
        this.setValue(current);
        this.inputElement?.nativeElement.dispatchEvent(new Event('change'));
      } else {
        this._items = value;
      }
    }
  }
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }

  public CARREGANDO: string = "Carregando . . .";

  private _items: LookupItem[] = [];
  private _where: any[] | undefined = undefined;
  public selectedValue?: string;
  public selectedItem?: LookupItem;
  public go: NavigateService;
  private selectPicker: any;

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
      //@ts-ignore
      this.selectPicker =  $('#' + this.generatedId(this.controlName));
      this.selectPicker.selectpicker({
        noneSelectedText: " - ",
        noneResultsText: "Nenhum resultado {0}",
        selectAllText: "Selecionar tudo"
      });
      //@ts-ignore
      this.selectPicker.on('changed.bs.select', (e, clickedIndex, isSelected, previousValue) => {
        this.onChange(e);
      });
      if(this.dao) {
        this.loadItems();
      }
      if(this.control) {
        this.control.valueChanges.subscribe(newValue => this.setValue(newValue));
        this.setValue(this.control.value);
      }
    });
  }

  public get isNullable(): boolean {
    return this.nullable != undefined;
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

  public getStringValue(value: any) {
    return JSON.stringify(value);
  }

  private loadItems() {
    this.loading = true;
    this.dao?.searchText("", this.fields.length ? this.fields : undefined, this.where).then(result => {
      this.loading = false;
      this.items = result.map(x => {
        return {
          key: x.value,
          value: x.text
        };
      }) || [];
      this.cdRef.detectChanges();
      this.selectPicker?.selectpicker('refresh');
    });
  }

  public get isDetails(): boolean {
    return this.detailsButton !== undefined;
  }

  public itemSelected(item: LookupItem) {
    return item.key == this.value ? true : undefined;
  }

  public setValue(value: any) {
    const stringValue = this.getStringValue(value);
    if(this.selectedValue != stringValue) {
      this.value = value;
      this.selectedValue = stringValue;
      this.selectedItem = this.items.find(x => x.key == value);
      if(value != null && !this.selectedItem && (!this.itemTodos.length || value != this.valueTodos)) {
        this.selectedItem = {
          key: value,
          value: "- Desconhecido -"
        };
        this.items.push(this.selectedItem);
        this.cdRef.detectChanges();
      }
      this.control?.setValue(value, {emitEvent: false});
      this.selectPicker?.selectpicker('refresh');
      this.selectPicker?.selectpicker('val', stringValue);
      if(this.change) this.change.emit(new Event("change"));
    }
  }

  public onDetailsClick(event: Event){
    if(this.details && (this.isNullable || this.control?.value?.length)) {
      const item = this.items.find(x => x.key == this.control?.value);
      this.details.emit({
        value: item?.key,
        text: item?.value || "",
        entity: item?.data
      });
    }
  }

  public onChange(event: Event){
    const elmValue = (event.target as HTMLInputElement).value;
    try {
      if(elmValue.length && elmValue != this.CARREGANDO) {
        const value =  JSON.parse(elmValue);
        this.setValue(value);
      }
    } catch (error) {
      console.log("PARSER ERROR", error, elmValue);
    }
  }

  public onAddClick(event: Event) {
    const modalRoute = this.addRoute!;
    modalRoute.params = Object.assign(modalRoute.params || {}, { modal: true });
    this.go.navigate(this.addRoute!, {modalClose: (result) => {
      if(result?.length) {
        this.control?.setValue(result);
        this.loadItems();
      }
    }});
  }
}
