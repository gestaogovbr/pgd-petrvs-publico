import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Expediente } from 'src/app/models/expediente.model';
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
    }
  }
  get expediente(): Expediente | undefined {
    return this._expediente;
  }

  private _expediente?: Expediente;
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
    });
  }

  ngOnInit(): void {
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
    const key = this.util.textHash((dia == "especial" ? this.util.getDateFormatted(data) : "") + dia + inicio + fim);
    if(this.util.isTimeValid(inicio) && this.util.isTimeValid(fim) && (dia != "especial" || data) && this.util.validateLookupItem(this.form.controls[dia].value, key)) {
      result = {
        key: key,
        value: (dia == "especial" ? this.util.getDateFormatted(data) + " - " : "") + inicio + " até " + fim,
        data: {
          dia: dia,
          inicio: inicio,
          fim: fim,
          data: data
        }  
      };
      this.form.controls[dia + "_inicio"].setValue("");
      this.form.controls[dia + "_fim"].setValue("");
      if(dia == "especial") this.form.controls[dia + "_data"].setValue(null);
    }
    return result;
  };

}
