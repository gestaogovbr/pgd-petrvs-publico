import { NavigateService } from 'src/app/services/navigate.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ContentChildren, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { GridComponent } from '../grid/grid.component';
import { InputButtonComponent } from '../input/input-button/input-button.component';
import { InputColorComponent } from '../input/input-color/input-color.component';
import { InputContainerComponent } from '../input/input-container/input-container.component';
import { InputDatetimeComponent } from '../input/input-datetime/input-datetime.component';
import { InputDisplayComponent } from '../input/input-display/input-display.component';
import { InputMultiselectComponent } from '../input/input-multiselect/input-multiselect.component';
import { InputMultitoggleComponent } from '../input/input-multitoggle/input-multitoggle.component';
import { InputRadioComponent } from '../input/input-radio/input-radio.component';
import { InputRateComponent } from '../input/input-rate/input-rate.component';
import { InputSearchComponent } from '../input/input-search/input-search.component';
import { InputSelectComponent } from '../input/input-select/input-select.component';
import { InputSwitchComponent } from '../input/input-switch/input-switch.component';
import { InputTextComponent } from '../input/input-text/input-text.component';
import { InputTextareaComponent } from '../input/input-textarea/input-textarea.component';
import { InputTimerComponent } from '../input/input-timer/input-timer.component';
import { ComponentBase } from '../component-base';
import { InputEditorComponent } from '../input/input-editor/input-editor.component';
import { InputNumberComponent } from '../input/input-number/input-number.component';

@Component({
  selector: 'editable-form',
  templateUrl: './editable-form.component.html',
  styleUrls: ['./editable-form.component.scss'],
  providers: [
    {
      provide: FormGroupDirective,
      useFactory: (self: EditableFormComponent) => {
        const fakeForm = new FormGroupDirective([], []);
        fakeForm.form = self.form!;
        return self.formDirective || fakeForm;
      },
      deps: [EditableFormComponent]
    }
  ]
})
export class EditableFormComponent extends ComponentBase implements OnInit {
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  @ContentChildren(GridComponent, { descendants: true }) grids!: QueryList<GridComponent>;
  @ContentChildren(InputContainerComponent, { descendants: true }) inputContainers!: QueryList<InputContainerComponent>;
  @ContentChildren(InputSwitchComponent, { descendants: true }) inputSwitchs!: QueryList<InputSwitchComponent>;
  @ContentChildren(InputDisplayComponent, { descendants: true }) inputDisplays!: QueryList<InputDisplayComponent>;
  @ContentChildren(InputSearchComponent, { descendants: true }) inputSearchs!: QueryList<InputSearchComponent>;
  @ContentChildren(InputButtonComponent, { descendants: true }) inputButtons!: QueryList<InputButtonComponent>;
  @ContentChildren(InputTextComponent, { descendants: true }) inputTexts!: QueryList<InputTextComponent>;
  @ContentChildren(InputNumberComponent, { descendants: true }) inputNumbers!: QueryList<InputNumberComponent>;
  @ContentChildren(InputTextareaComponent, { descendants: true }) inputTextareas!: QueryList<InputTextareaComponent>;
  @ContentChildren(InputDatetimeComponent, { descendants: true }) inputDatetimes!: QueryList<InputDatetimeComponent>;
  @ContentChildren(InputRadioComponent, { descendants: true }) inputRadios!: QueryList<InputRadioComponent>;
  @ContentChildren(InputSelectComponent, { descendants: true }) inputSelects!: QueryList<InputSelectComponent>;
  @ContentChildren(InputColorComponent, { descendants: true }) inputColors!: QueryList<InputColorComponent>;
  @ContentChildren(InputMultiselectComponent, { descendants: true }) inputMultiselects!: QueryList<InputMultiselectComponent>;
  @ContentChildren(InputTimerComponent, { descendants: true }) inputTimers!: QueryList<InputTimerComponent>;
  @ContentChildren(InputRateComponent, { descendants: true }) inputRates!: QueryList<InputRateComponent>;
  @ContentChildren(InputEditorComponent, { descendants: true }) inputEditors!: QueryList<InputEditorComponent>;
  @ContentChildren(InputMultitoggleComponent, { descendants: true }) inputMultitoggles!: QueryList<InputMultitoggleComponent>;
  @Output() disable = new EventEmitter<Event>();
  @Output() submit = new EventEmitter<EditableFormComponent>();
  @Output() cancel = new EventEmitter<void>();
  @Input() form?: FormGroup;
  @Input() title: string = "";
  @Input() buttons: ToolbarButton[] = [];
  @Input() toolbarButtons: ToolbarButton[] = [];
  @Input() confirmLabel?: string;
  @Input() cancelLabel?: string;
  @Input() noButtons?: string;
  @Input() noMargin?: string;
  @Input() forceInvalid: boolean = false;
  @Input() set disabled(value: boolean) {
    if(this._disabled != value) {
      this._disabled = value;
      this.disableAll(value);
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  /* Propriedades private e métodos get e set */
  private _error?: string;
  private _disabled: boolean = false;

  /* Propriedades publicas */
  public fb: FormBuilder;
  public go: NavigateService;
  public submitting: boolean = false;
  public set error(error: string | undefined) {
    this._error = error;
    this.submitting = false;
  }
  public get error(): string | undefined {
    return this._error;
  }

  public get isNoButtons(): boolean {
    return this.noButtons !== undefined;
  }

  public get isNoMargin(): boolean {
    return this.noMargin !== undefined;
  }

  constructor(injector: Injector) {
    super(injector);
    this.fb = injector.get<FormBuilder>(FormBuilder);
    this.go = injector.get<NavigateService>(NavigateService);
  }

  ngOnInit(): void {
  }

  public get hasSubmit(): boolean {
    return !!this.submit.observers.length;
  }

  public get hasCancel(): boolean {
    return !!this.cancel.observers.length;
  }

  ngAfterViewInit() {
    if(this.disabled) this.disableAll(true);
  }

  public get components() {
    return [
      ...(this.grids?.toArray() || []),
      ...(this.inputContainers?.toArray() || []),
      ...(this.inputSwitchs?.toArray() || []),
      ...(this.inputDisplays?.toArray() || []),
      ...(this.inputSearchs?.toArray() || []),
      ...(this.inputButtons?.toArray() || []),
      ...(this.inputTexts?.toArray() || []),
      ...(this.inputNumbers?.toArray() || []),
      ...(this.inputTextareas?.toArray() || []),
      ...(this.inputDatetimes?.toArray() || []),
      ...(this.inputRadios?.toArray() || []),
      ...(this.inputSelects?.toArray() || []),
      ...(this.inputColors?.toArray() || []),
      ...(this.inputMultiselects?.toArray() || []),
      ...(this.inputTimers?.toArray() || []),
      ...(this.inputRates?.toArray() || []),
      ...(this.inputEditors?.toArray() || []),
      ...(this.inputMultitoggles?.toArray() || [])
    ];
  }

  public disableAll(disabled: boolean) {
    for (const component of this.components) {
      component.disabled = disabled ? "true" : undefined;
    }
    if(this.disable) this.disable.emit(new Event("disabled"));
  }

  public revalidate() {
    Object.values(this.form?.controls || {}).forEach(x => x.updateValueAndValidity({emitEvent: false}));
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick();
    }
  }

  public onSubmit() {
    if(this.form!.valid){
      this.submitting = true;
      this.submit.emit(this);
    } else {
      this.form!.markAllAsTouched();
      Object.entries(this.form!.controls).forEach(([key, value]) => {
        if(value.invalid) console.log("Validate => " + key, value.value, value.errors)
      });
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
