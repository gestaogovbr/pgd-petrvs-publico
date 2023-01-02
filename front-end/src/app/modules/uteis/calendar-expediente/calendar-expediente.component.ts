import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Expediente, Turno } from 'src/app/models/expediente.model';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'calendar-expediente',
  templateUrl: './calendar-expediente.component.html',
  styleUrls: ['./calendar-expediente.component.scss']
})
export class CalendarExpedienteComponent implements OnInit {
  @Input() expedienteDisabled?: Expediente;
  @Input() set disabled(value: string | undefined) {
    if(this._disabled != value) {
      this._disabled = value;
      this.loadExpediente();
    }
  }
  get disabled(): string | undefined {
    return this._disabled;
  }
  @Input() set control(value: AbstractControl | undefined) {
    if(this._control != value) {
      this._control != value;
      this.expediente = this.control?.value;
      value?.valueChanges.subscribe(async newValue => {
        this.expediente = newValue;
      });
    }
  } 
  get control(): AbstractControl | undefined {
    return this._control;
  }
  @Input() set expediente(value: Expediente | undefined | null) {
    if(this._expediente != value) {
      this._expediente = value;
      this.loadExpediente();
    }
  }
  get expediente(): Expediente | undefined | null {
    return this._expediente;
  }

  private _expediente?: Expediente | null;
  private _disabled?: string;
  private _control?: AbstractControl;
  public form: FormGroup;

  constructor(
    public fh: FormHelperService,
    public util: UtilService
  ) {
    this.form = fh.FormBuilder({
      domingo: {default: []},
      segunda: {default: []},
      terca: {default: []},
      quarta: {default: []},
      quinta: {default: []},
      sexta: {default: []},
      sabado: {default: []},
      especial: {default: []},
      domingo_inicio: {default: ""},
      domingo_fim: {default: ""},
      segunda_inicio: {default: ""},
      segunda_fim: {default: ""},
      terca_inicio: {default: ""},
      terca_fim: {default: ""},
      quarta_inicio: {default: ""},
      quarta_fim: {default: ""},
      quinta_inicio: {default: ""},
      quinta_fim: {default: ""},
      sexta_inicio: {default: ""},
      sexta_fim: {default: ""},
      sabado_inicio: {default: ""},
      sabado_fim: {default: ""},
      especial_inicio: {default: ""},
      especial_fim: {default: ""},
      especial_data: {default: null},
      especial_sem: {default: false}
    });
  }

  ngOnInit(): void {
  }

  public get isDisabled(): boolean {
    return this._disabled != undefined;
  }

  public loadExpediente() {
    let expediente = (this.isDisabled ? this.expedienteDisabled : this._expediente) || new Expediente();
    const getLookupItems = (turnos: Turno[], dia: string): LookupItem[] => turnos.map(x => Object.assign({}, {
      key: this.util.textHash((dia == "especial" ? this.util.getDateFormatted(x.data) : "") + dia + x.inicio + x.fim),
      value: (dia == "especial" ? this.util.getDateFormatted(x.data) + " - " : "") + x.inicio + " até " + x.fim,
      data: {
        inicio: x.inicio,
        fim: x.fim,
        data: x.data,
        sem: x.sem
      }
    }));
    if(!this.isDisabled) this._expediente = expediente;
    this.form.controls.domingo.setValue(getLookupItems(expediente.domingo, "domingo"));
    this.form.controls.segunda.setValue(getLookupItems(expediente.segunda, "segunda"));
    this.form.controls.terca.setValue(getLookupItems(expediente.terca, "terca"));
    this.form.controls.quarta.setValue(getLookupItems(expediente.quarta, "quarta"));
    this.form.controls.quinta.setValue(getLookupItems(expediente.quinta, "quinta"));
    this.form.controls.sexta.setValue(getLookupItems(expediente.sexta, "sexta"));
    this.form.controls.sabado.setValue(getLookupItems(expediente.sabado, "sabado"));
    this.form.controls.especial.setValue(getLookupItems(expediente.especial, "especial"));
  }

  public saveExpediente() {
    if(!this.isDisabled) {
      this._expediente = this._expediente || new Expediente();
      this._expediente.domingo = this.form.controls.domingo.value.map((x: LookupItem) => x.data); 
      this._expediente.segunda = this.form.controls.segunda.value.map((x: LookupItem) => x.data); 
      this._expediente.terca = this.form.controls.terca.value.map((x: LookupItem) => x.data); 
      this._expediente.quarta = this.form.controls.quarta.value.map((x: LookupItem) => x.data); 
      this._expediente.quinta = this.form.controls.quinta.value.map((x: LookupItem) => x.data); 
      this._expediente.sexta = this.form.controls.sexta.value.map((x: LookupItem) => x.data); 
      this._expediente.sabado = this.form.controls.sabado.value.map((x: LookupItem) => x.data); 
      this._expediente.especial = this.form.controls.especial.value.map((x: LookupItem) => x.data); 
      if(this.control) this.control.setValue(this._expediente);
    }
  }

  public isEmpty(): boolean {
    return false;
  }

  public addItemHandleDomingo(): LookupItem | undefined {
    return this.addItemHandle("domingo");
  }

  public addItemHandleSegunda(): LookupItem | undefined {
    return this.addItemHandle("segunda");
  }

  public addItemHandleTerca(): LookupItem | undefined {
    return this.addItemHandle("terca");
  }

  public addItemHandleQuarta(): LookupItem | undefined {
    return this.addItemHandle("quarta");
  }

  public addItemHandleQuinta(): LookupItem | undefined {
    return this.addItemHandle("quinta");
  }

  public addItemHandleSexta(): LookupItem | undefined {
    return this.addItemHandle("sexta");
  }

  public addItemHandleSabado(): LookupItem | undefined {
    return this.addItemHandle("sabado");
  }

  public addItemHandleEspecial(): LookupItem | undefined {
    return this.addItemHandle("especial");
  }

  public onChange() {
    this.saveExpediente();
  }

  public addItemHandle(dia: string): LookupItem | undefined {
    let result = undefined;
    const inicio = this.form.controls[dia + "_inicio"].value;
    const fim = this.form.controls[dia + "_fim"].value;
    const data = this.form.controls.especial_data.value;
    const sem = this.form.controls.especial_sem.value;
    const key = this.util.textHash((dia == "especial" ? this.util.getDateFormatted(data) : "") + dia + inicio + fim);
    if(this.util.isTimeValid(inicio) && this.util.isTimeValid(fim) && (dia != "especial" || data) && this.util.validateLookupItem(this.form.controls[dia].value, key)) {
      result = {
        key: key,
        value: (dia == "especial" ? this.util.getDateFormatted(data) + " - " : "") + inicio + " até " + fim,
        data: {
          inicio: inicio,
          fim: fim,
          data: data,
          sem: sem
        }  
      };
      this.form.controls[dia + "_inicio"].setValue("");
      this.form.controls[dia + "_fim"].setValue("");
      if(dia == "especial") {
        this.form.controls[dia + "_data"].setValue(null);
        this.form.controls[dia + "_sem"].setValue(false);
      }
    }
    return result;
  };

}
