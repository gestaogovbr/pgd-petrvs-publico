import { Component, EventEmitter, HostBinding, HostListener, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';


export type InputTextCase = "upper" | "lower" | "";

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputTextComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Output() change = new EventEmitter<Event>();
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() size: number = 12;
  @Input() loading: boolean = false;
  @Input() numbers?: string;
  @Input() password?: string;
  @Input() textCase: InputTextCase = "";
  @Input() minValue?: any;
  @Input() maxValue?: any;
  @Input() stepValue?: any;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() placeholder?: string;
  @Input() maxLength?: number;
  @Input() maskFormat: string = "";
  @Input() right?: string;
  @Input() maskDropSpecialCharacters: boolean = false; 
  @Input() maskSpecialCharacters: string[] = ["-", "/", "(", ")", ".", ":", " ", "+", ",", "@", "[", "]", '"', "'"];
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }

  constructor(public injector: Injector) {
    super(injector);
  }

  public get isNumbers(): boolean {
    return this.numbers !== undefined;
  }

  public get isRight(): boolean {
    return this.right !== undefined;
  }

  public get isPassword(): boolean {
    return this.password !== undefined;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public onChange(event: Event) {
    if(this.change) this.change.emit(event); 
  }

}
