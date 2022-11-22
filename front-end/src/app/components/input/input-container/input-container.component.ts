import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputContainerComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() isRadio: boolean = false;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() errorMessageIcon?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() classLabel?: string;
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

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
