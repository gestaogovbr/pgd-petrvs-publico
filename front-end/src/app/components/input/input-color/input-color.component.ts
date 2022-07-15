import { Component, EventEmitter, HostBinding, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base } from 'src/app/models/base.model';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputColorComponent extends InputBase implements OnInit {
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

  public lookup: LookupService;

  constructor(public injector: Injector) {
    super(injector);
    this.lookup = injector.get<LookupService>(LookupService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(newValue => {
        this.select(newValue);
      });
    } else {
      this.select(this.value);
    }
  }

  public select(value: string) {
    if(this.value != value) {
      this.value = value;
      if(this.lookup.CORES.find(x => x.key == this.value)) {
        $('#' + this.controlName).val(this.value);
      } else {
        $('#' + this.controlName).val("");
      }
      this.control?.setValue(this.value);
    }
  }

  public onChange(event: Event){
    let value = (event.target as HTMLInputElement).value || "#000000";
    this.select(value);
    if(this.change) this.change.emit(event);
  }
}

