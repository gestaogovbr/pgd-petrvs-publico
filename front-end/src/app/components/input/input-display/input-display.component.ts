import { Component, ElementRef, HostBinding, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-display',
  templateUrl: './input-display.component.html',
  styleUrls: ['./input-display.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputDisplayComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() size: number = 0;
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
