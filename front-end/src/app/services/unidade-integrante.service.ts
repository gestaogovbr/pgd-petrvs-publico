import { Injectable, Injector } from '@angular/core';
import { LookupItem, LookupService } from './lookup.service';
import { FormGroup } from '@angular/forms';
import { IntegranteConsolidado } from '../models/unidade-integrante.model';

@Injectable({
  providedIn: 'root'
})

export class UnidadeIntegranteService {

  public lookup: LookupService;

  constructor(public injector: Injector) {
    this.lookup = this.injector.get<LookupService>(LookupService);
  }

  public converterAtribuicoes(atribuicoes: string[]): LookupItem[] {
    return atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    }))
  }

  public alterandoGestor(form: FormGroup, items: IntegranteConsolidado[]): string[] {
    let result: string[] = [];
    ['GESTOR', 'GESTOR_DELEGADO', 'GESTOR_SUBSTITUTO'].forEach(g => { if (form!.controls.atribuicoes.value.map((a: { key: string; }) => a.key).includes(g) && items.find(i => i.atribuicoes.includes(g))) result.push(this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, g)); });
    return result;
  }
}
