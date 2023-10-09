import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-choose',
  templateUrl: './input-choose.component.html',
  styleUrls: ['./input-choose.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputChooseComponent extends InputBase implements OnInit {
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
  @Input() change?: (value: any) => void;
  @Input() set value(value: any) {
    if(value != this._value) {
      this._value = value;
      this.detectChanges();
      this.control?.setValue(value);
      if(this.change) this.change(value);
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

  public isChecked(item: LookupItem): boolean {
    return this.value == item.key;
  }

  public onClick(item: LookupItem) {
    if(!this.isDisabled) this.value = item.key;
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
