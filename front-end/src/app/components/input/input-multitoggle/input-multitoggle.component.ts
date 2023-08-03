import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition, MultiselectStyle } from '../input-base';
import { InputSearchComponent } from '../input-search/input-search.component';
import { InputSelectComponent } from '../input-select/input-select.component';

@Component({
  selector: 'input-multitoggle',
  templateUrl: './input-multitoggle.component.html',
  styleUrls: ['./input-multitoggle.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputMultitoggleComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() classButton: string = "btn-outline-primary";
  @Input() set value(value: LookupItem[]) {
    if(JSON.stringify(this._value) != JSON.stringify(value)) {
      this._value = value;
      this.control?.setValue(this.value);
    }
    this.cdRef.markForCheck();
  }
  get value(): LookupItem[] {
    return this._value;
  }
  @Input() set items(value: LookupItem[]) {
    this._items = value || [];
    this.value = this.value.filter(x => !!this._items?.find(y => y.key == x.key));
    this.cdRef.detectChanges();
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
  @Input() set size(value: number) {
    this.setSize(value); 
  }
  get size(): number {
    return this.getSize(); 
  }

  // Propriedades privadas e motodos get e set
  protected _items: LookupItem[] = [];
  protected _value: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      const controlChange = (newValue: LookupItem[]) => {
        this.value = newValue?.filter(x => !!this._items?.find(y => y.key == x.key)) || [];
      };
      this.control.valueChanges.subscribe(controlChange);
      controlChange(this.control.value);
    }
  }

  public onButtonToggle(item: LookupItem) {
    const index = this.value.findIndex(x => x.key == item.key);
    let values = [...this.value];
    if(index >= 0) {
      values.splice(index, 1);
    } else {
      values.push(item);
    }
    this.value = values;
  }

  public isChecked(item: LookupItem): boolean {
    return !!this.value.find(x => x.key == item.key);
  }
}
