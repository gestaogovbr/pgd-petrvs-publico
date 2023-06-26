import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition, MultiselectStyle } from '../input-base';
import { InputSearchComponent } from '../input-search/input-search.component';
import { InputSelectComponent } from '../input-select/input-select.component';
import { ToolbarButton } from '../../toolbar/toolbar.component';

type ItemHandleResult = LookupItem | undefined;

@Component({
  selector: 'input-multiselect',
  templateUrl: './input-multiselect.component.html',
  styleUrls: ['./input-multiselect.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputMultiselectComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group my-2';
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() noForm?: string;
  @Input() noBox?: string;
  @Input() loading: boolean = false;
  @Input() maxItemWidth: number = 150;
  @Input() maxListHeight: number = 0;
  @Input() change?: () => undefined | void;
  @Input() deleteItemHandle?: (item: LookupItem) => boolean | undefined | void;
  @Input() loadItemHandle?: (item: LookupItem) => void | Promise<void>;
  @Input() saveItemHandle?: (item: LookupItem) => ItemHandleResult | Promise<ItemHandleResult>;
  @Input() addItemHandle?: () => LookupItem | undefined;
  @Input() addItemAsyncHandle?: () => Promise<ItemHandleResult>;
  @Input() clearItemForm?: () => void;
  @Input() addItemControl?: InputBase;
  @Input() multiselectStyle: MultiselectStyle = "rows";
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() canEdit?: boolean = false;
  @Input() set items(value: LookupItem[]) {
    this._items = value;
    this.control?.setValue(value);
    this.detectChanges();
  }
  get items(): LookupItem[] {
    return this.control?.value || this._items || [];
  }
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

  public editing?: LookupItem;

  // Propriedades privadas e motodos get e set
  private selectedItem?: { value: any, text: string } = undefined;  
  private _items?: LookupItem[];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.class = this.isNoBox ? this.class.replace(' my-2', '') : this.class;
  }

  public async onEdit(item: LookupItem) {
    this.editing = item;
    if(this.loadItemHandle) await this.loadItemHandle(item);
    this.cdRef.detectChanges();
  }

  public onDelete(item: LookupItem) {
    let before = item.data?._status;
    let canDelete = !this.deleteItemHandle || this.deleteItemHandle(item);
    if(canDelete) this.items.splice(this.items.findIndex(x => x.key == item.key), 1);
    this.cdRef.detectChanges();
    if(this.change && (canDelete || before != item.data?._status)) this.change();
  }

  public get isNoForm(): boolean {
    return this.noForm != undefined;
  }

  public get isNoBox(): boolean {
    return this.noBox != undefined;
  }

  public async onSaveItemClick() {
    let result = undefined;
    if(this.saveItemHandle) {
      result = await this.saveItemHandle(this.editing!); 
    } if(this.addItemControl) {
      if(this.addItemControl instanceof InputSearchComponent && (this.addItemControl as InputSearchComponent).selectedItem?.value) {
        const search = this.addItemControl as InputSearchComponent;
        this.editing!.key = search.selectedItem!.value;
        this.editing!.value = search.selectedItem!.text;
        this.editing!.data = search.selectedItem?.entity;
        result = this.editing;
      } else if(this.addItemControl instanceof InputSelectComponent && (this.addItemControl as InputSelectComponent).selectedItem?.key) {
        const select = this.addItemControl as InputSelectComponent;
        this.editing!.key = select.selectedItem?.key;
        this.editing!.value = select.selectedItem?.value || "";
        this.editing!.data = select.selectedItem?.data;
        result = this.editing;
      }
    }
    if(result) this.endEdit();
    return result;
  }

  public onCancelItemClick() {
    this.endEdit();
  }

  public endEdit() {
    this.editing = undefined;
    if(this.clearItemForm) {
      this.clearItemForm();
    } else if(this.addItemControl) {
      this.addItemControl?.setValue("");
      this.addItemControl?.control?.setValue("");
    }
    this.cdRef.detectChanges();
  }

  public async onAddItemClick() {
    let newItem: LookupItem | undefined = undefined;
    if(this.addItemHandle) {
      newItem = this.addItemHandle();
    } else if(this.addItemAsyncHandle) {
      newItem = await this.addItemAsyncHandle();
    } else if(this.addItemControl) {
      if(this.addItemControl instanceof InputSearchComponent && (this.addItemControl as InputSearchComponent).selectedItem?.value) {
        const search = this.addItemControl as InputSearchComponent;
        newItem = {
          key: search.selectedItem!.value,
          value: search.selectedItem!.text,
          data: (this.addItemControl as InputSearchComponent).selectedItem?.entity
        }
      } else if(this.addItemControl instanceof InputSelectComponent && (this.addItemControl as InputSelectComponent).selectedItem?.key) {
        const select = this.addItemControl as InputSelectComponent;
        newItem = Object.assign({}, select.items.find(x => x.key == select.selectedItem?.key));
      }
    }
    if(newItem) {
      if(!this._items) this._items = [];
      this.items.push(newItem);
      this.items = this.items;
      if(this.clearItemForm) this.clearItemForm();
      this.cdRef.detectChanges();
      if(this.change) this.change();
    }
  } 
}
