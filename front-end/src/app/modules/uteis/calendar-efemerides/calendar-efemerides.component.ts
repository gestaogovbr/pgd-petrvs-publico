import { Component, Input, OnInit } from '@angular/core';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Turno } from 'src/app/models/expediente.model';
import { LookupService } from 'src/app/services/lookup.service';
import { isNoSubstitutionTemplateLiteral } from 'typescript';
import { Efemerides } from '../../../services/calendar.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'calendar-efemerides',
  templateUrl: './calendar-efemerides.component.html',
  styleUrls: ['./calendar-efemerides.component.scss']
})
export class CalendarEfemeridesComponent implements OnInit {
  @Input() efemerides?: Efemerides;
  @Input() partial: boolean = true;

  private _expediente: string[] = [];

  constructor(public util: UtilService, public lookup: LookupService) { }

  ngOnInit(): void {
  }

  public get forma(): string {
    return this.efemerides ? this.lookup.getValue(this.lookup.DIA_HORA_CORRIDOS_OU_UTEIS, this.efemerides.forma) : "Desconhecido";
  }

  public get expediente(): string[] {
    let expediente = this.lookup.DIA_SEMANA.map(x => this.efemerides?.expediente[x.code!]?.length ? x.value + ": " + this.efemerides.expediente[x.code!].map((y: Turno) => y.inicio + " até " + y.fim).join(", ") : "").filter(x => x.length);
    if(this.efemerides?.expediente?.especial?.length) expediente.push("Expecial: " + this.efemerides.expediente.especial.map((y: Turno) => this.util.getDateFormatted(y.data!) + " - " + y.inicio + " até " + y.fim + (y.sem ? " (Sem expediente)" : "")).join(", "));
    if(JSON.stringify(this._expediente) != JSON.stringify(expediente)) this._expediente = expediente;
    return this._expediente;
  }

  public get useDias(): boolean {
    return ["DIAS_UTEIS", "DIAS_CORRIDOS"].includes(this.efemerides!.forma);
  }

  public get useCorridos(): boolean {
    return ["DIAS_CORRIDOS", "HORAS_CORRIDAS"].includes(this.efemerides!.forma);
  }

  public isoToFormatted(iso: string): string {
    return iso.substr(8, 2) + "/" + iso.substr(5, 2) + "/" + iso.substr(0, 4);
  }

  public get feriados(): [string, string][] {
    return Object.entries(this.efemerides?.feriados || {}).map(x => [this.isoToFormatted(x[0]), x[1]]);
  }

  public get diasNaoUteis(): [string, string][] {
    return Object.entries(this.efemerides?.diaNaoUtil || {}).map(x => [this.isoToFormatted(x[0]), x[1]]);
  }

}
