import { Component, HostBinding, Injector, Input, OnInit } from '@angular/core';
import { LookupItem } from 'src/app/services/lookup.service';
import { ComponentBase } from '../component-base';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.scss']
})
export class ButtonTextComponent extends ComponentBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @Input() hostClass: string = ""; 
  @Input() controlName: string | null = null;
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
      const element: any = document.getElementById(this.controlName + value);
      if(element) element.checked = true;
    }
  }
  get value(): any {
    return this._value;
  }
  
  protected _value: any = "";

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    
  }


  ngAfterViewInit() {
    super.ngAfterViewInit();    
  }
}
