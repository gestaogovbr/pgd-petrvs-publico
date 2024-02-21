import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputRadioComponent extends InputBase implements OnInit {
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
  @Input() circle?: string;
  @Input() inline?: string;
  @Input() change?: (value: any) => void;
  @Input() set value(value: any) {
    if(value != this._value) {
      this._value = value;
      this.detectChanges();
      const element: any = document.getElementById(this.controlName + value);
      if(element) element.checked = true;
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

  public onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selected = this.items.find(x => x.key.toString() == target.value);
    this.control?.setValue(selected?.key);
    if(this.change) this.change(selected?.key);
  }

  public isChecked(item: LookupItem): string | undefined {
    return this.value == item.key ? "" : undefined
  }

  public get isCircle(): boolean {
    return this.circle != undefined;
  }

  public get isInline(): boolean {
    return this.inline != undefined;
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
