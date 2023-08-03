import { Component, EventEmitter, HostBinding, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-rate',
  templateUrl: './input-rate.component.html',
  styleUrls: ['./input-rate.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputRateComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Output() change = new EventEmitter<Event>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() value: number = 0;
  @Input() loading: boolean = false;
  @Input() starMargin: number = 2;
  @Input() starSize: number = 4;
  @Input() starIcon: string = "bi bi-star text-secondary h4 mx-2";
  @Input() starFillIcon: string = "bi bi-star-fill text-warning h4 mx-2";
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set max(value: number) {
    if(this._max != value) {
      this._max = value;
      this.stars = Array<boolean>(value).fill(false);
      this.stars.map((x, i) => this.stars[i] = i < this.value);
      this.detectChanges();
    }
  }
  get max(): number {
    return this._max;
  }
  @Input() set size(value: number) {
    this.setSize(value); 
  }
  get size(): number {
    return this.getSize(); 
  }

  public startClass(index: number): string {
    return 'float-start mx-'+ this.starMargin + ' h'+ this.starSize + ' ' + (index < this.value ? this.starFillIcon : this.starIcon);
  }

  public stars: boolean[] = Array<boolean>(10).fill(false);

  private _max: number = 10;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(this.controlChange.bind(this));
      this.controlChange(this.control.value);
    }
  }

  public controlChange(value: number) {
    if(this.value != value) {
      this.value = value;
      if(this.change) this.change.emit(new Event("change"));
      this.stars.map((x, i) => this.stars[i] = i < this.value);
      this.cdRef.detectChanges();
    }
  }

  public onClick(index: number) {
    const newValue = (index + 1) == this.value && this.stars[index] ? 0 : index + 1;
    this.control?.setValue(newValue);
    this.controlChange(newValue);
    this.cdRef.detectChanges();
  }
}
