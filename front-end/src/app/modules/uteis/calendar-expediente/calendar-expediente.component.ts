import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input() set expediente(value: Expediente | undefined) {
    if(this._expediente != value) {
      this._expediente = value;
      this.loadExpediente();
    }
  }
  get expediente(): Expediente | undefined {
    if(this._changed) this.saveExpediente();
    return this._expediente;
  }

  private _expediente?: Expediente;
  private _changed: boolean = false;
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

  public loadExpediente() {
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
    this._expediente = this._expediente || new Expediente();
    this.form.controls.domingo.setValue(getLookupItems(this._expediente.domingo, "domingo"));
    this.form.controls.segunda.setValue(getLookupItems(this._expediente.segunda, "segunda"));
    this.form.controls.terca.setValue(getLookupItems(this._expediente.terca, "terca"));
    this.form.controls.quarta.setValue(getLookupItems(this._expediente.quarta, "quarta"));
    this.form.controls.quinta.setValue(getLookupItems(this._expediente.quinta, "quinta"));
    this.form.controls.sexta.setValue(getLookupItems(this._expediente.sexta, "sexta"));
    this.form.controls.sabado.setValue(getLookupItems(this._expediente.sabado, "sabado"));
    this.form.controls.especial.setValue(getLookupItems(this._expediente.especial, "especial"));
  }

  public saveExpediente() {
    this._expediente = this._expediente || new Expediente();
    this._expediente.domingo = this.form.controls.domingo.value.map((x: LookupItem) => x.data); 
    this._expediente.segunda = this.form.controls.segunda.value.map((x: LookupItem) => x.data); 
    this._expediente.terca = this.form.controls.terca.value.map((x: LookupItem) => x.data); 
    this._expediente.quarta = this.form.controls.quarta.value.map((x: LookupItem) => x.data); 
    this._expediente.quinta = this.form.controls.quinta.value.map((x: LookupItem) => x.data); 
    this._expediente.sexta = this.form.controls.sexta.value.map((x: LookupItem) => x.data); 
    this._expediente.sabado = this.form.controls.sabado.value.map((x: LookupItem) => x.data); 
    this._expediente.especial = this.form.controls.especial.value.map((x: LookupItem) => x.data); 
    this._changed = false;
    console.log("Salvou");
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
      this._changed = true;
    }
    return result;
  };

}
