import { Component, Input, OnInit } from '@angular/core';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Efemerides } from '../../../services/calendar.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'calendar-efemerides',
  templateUrl: './calendar-efemerides.component.html',
  styleUrls: ['./calendar-efemerides.component.scss']
})
export class CalendarEfemeridesComponent implements OnInit {
  @Input() efemerides?: Efemerides;

  constructor(public util: UtilService) { }

  ngOnInit(): void {
  }

  public get forma(): string {
    const forma = this.efemerides?.tipo == "DISTRIBUICAO" ? this.efemerides?.formaDistribuicao : this.efemerides?.formaEntrega;
    switch(forma) {
      case "DIAS_UTEIS": return "Dias úteis";
      case "DIAS_CORRIDOS": return "Dias corridos";
      case "HORAS_UTEIS": return "Horas úteis";
      case "HORAS_CORRIDAS": return "Horas corridas";
      default: return "Desconhecido";
    }
  }

  public get feriados(): [string, string][] {
    return Object.entries(this.efemerides?.feriados || {});
  }

  public get finsSemana(): [string, string][] {
    return Object.entries(this.efemerides?.finsSemana || {});
  }
}
