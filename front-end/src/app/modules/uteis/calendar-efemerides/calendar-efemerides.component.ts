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
  @Input() partial: boolean = true;

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

  public get useDias(): boolean {
    const forma = (this.efemerides?.tipo == "DISTRIBUICAO" ? this.efemerides?.formaDistribuicao : this.efemerides?.formaEntrega) || "HORAS_UTEIS";
    return ["DIAS_UTEIS", "DIAS_CORRIDOS"].includes(forma);
  }

  public get useCorridos(): boolean {
    const forma = (this.efemerides?.tipo == "DISTRIBUICAO" ? this.efemerides?.formaDistribuicao : this.efemerides?.formaEntrega) || "HORAS_UTEIS";
    return ["DIAS_CORRIDOS", "HORAS_CORRIDAS"].includes(forma);
  }

  public get feriados(): [string, string][] {
    return Object.entries(this.efemerides?.feriados || {});
  }

  public get finsSemana(): [string, string][] {
    return Object.entries(this.efemerides?.finsSemana || {});
  }
}
