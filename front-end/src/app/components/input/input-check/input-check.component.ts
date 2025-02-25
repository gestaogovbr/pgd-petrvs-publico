import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-check',
  templateUrl: './input-check.component.html',
  styleUrls: ['./input-check.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputCheckComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "bi bi-toggle-on";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() items: LookupItem[] = [];
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() required?: string;
  @Input() inline?: boolean = false;
  @Input() change?: (value: any) => void;
  @Input() set value(value: any) {
    if(value != this._value) {
      this._value = value;
      this.updateValue();
    }
  }
  get value(): any {
    return this._value;
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

  protected _value: any = "";

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public updateValue() {
    this.detectChanges();
    for (let item of this.items) {
      const element: any = document.getElementById(this.controlName + item.key);
      if(element) element.checked = (this.value || []).includes(item.key);
    }
  }

  public onCheckChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selected = this.items.find(x => x.key.toString() == target.value);
    let list = this.control?.value || [];
    if(target.checked && !list.includes(target.value) && selected) {
      list.push(selected.key);
    } else if(!target.checked) {
      const index = list.findIndex((x: any) => x.toString() == target.value);
      if(index >= 0) list.splice(index, 1);
    }
    this.control?.setValue(list);
    if(this.change) this.change(selected?.key);
  }

  public isChecked(item: LookupItem): string | undefined {
    return (this.value || []).includes(item.key) ? "" : undefined
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.value = this.control.value;
      this.control.valueChanges.subscribe(newValue => {
        this.value = newValue;
      });
    }
  }
}
