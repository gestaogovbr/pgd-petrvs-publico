import { Injectable, Injector } from '@angular/core';
import { LookupItem, LookupService } from './lookup.service';
import { FormGroup } from '@angular/forms';
import { IntegranteConsolidado } from '../models/unidade-integrante.model';
import { IntegranteAtribuicao } from '../models/base.model';
import { UtilService } from './util.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class IntegranteService {

  public lookup: LookupService;
  public util: UtilService;
  public dialog: DialogService;

  constructor(public injector: Injector){
    /* Injections */
    this.lookup = this.injector.get<LookupService>(LookupService);
    this.dialog = this.injector.get<DialogService>(DialogService);
    this.util = this.injector.get<UtilService>(UtilService);
  }

  public converterAtribuicoes(atribuicoes: string[]): LookupItem[] {
    return atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    }))
  }

  public alterandoGestor(form: FormGroup, items: IntegranteAtribuicao[]): string[] {
    let result: string[] = [];
    let novasAtribuicoes: string[] = form!.controls.atribuicoes.value.map((a: { key: string; }) => a.key);
    //['GESTOR', 'GESTOR_DELEGADO', 'GESTOR_SUBSTITUTO'].forEach(g => {
    ['GESTOR'].forEach(g => {
      if (this.util.array_diff_simm(novasAtribuicoes, items).includes(g)) result.push(this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, g)); 
    });
    return result;
  }

  public ordenar(items: IntegranteConsolidado[]): IntegranteConsolidado[] {
    items.sort((a, b) => {
      let x = (a.usuario_nome || a.unidade_nome)?.toLowerCase();
      let y = (b.usuario_nome || b.unidade_nome)?.toLowerCase();
      return x! < y! ? -1 : (x! > y! ? 1 : 0)
    });
    items.forEach(item => { item.atribuicoes.sort(); });
    return items;
  }

  public completarIntegrante(base: any, unidade_id: string, usuario_id: string, atribuicoes: IntegranteAtribuicao[]): IntegranteConsolidado {
    let obj = {'unidade_id': unidade_id, 'usuario_id': usuario_id, 'atribuicoes': atribuicoes};
    return Object.assign({}, base, obj);
  }

  public permitidoApagar(atribuicao: string, noPersist: boolean): boolean {
    //let proibicoes = noPersist ? ["LOTADO", "GESTOR", "GESTOR_SUBSTITUTO"] : ["LOTADO"];
    let proibicoes = ["LOTADO"];
    let permitidoApagar = !proibicoes.includes(atribuicao);
    //let msg = atribuicao == "LOTADO" ? "A lotação do servidor não pode ser apagada. Para alterá-la, lote-o em outra Unidade." : "Para alterar/excluir o Gestor/Substituto use a aba 'Principal'.";
    let msg = atribuicao == "LOTADO" ? "A lotação do servidor não pode ser apagada. Para alterá-la, lote-o em outra Unidade." : "";
    (async () => {
      if (!permitidoApagar) await this.dialog.alert("Não permitido!", msg);
    })();
    return permitidoApagar;
  }
}
