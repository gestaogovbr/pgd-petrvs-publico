import { Injectable, Injector } from '@angular/core';
import { LookupItem, LookupService } from './lookup.service';
import { FormGroup } from '@angular/forms';
import { IntegranteConsolidado } from '../models/unidade-integrante.model';
import { IntegranteAtribuicao } from '../models/base.model';
import { UtilService } from './util.service';
import { DialogService } from './dialog.service';
import { LexicalService } from './lexical.service';

@Injectable({
  providedIn: 'root',
})
export class IntegranteService {

  public lookup: LookupService;
  public lex: LexicalService;
  public util: UtilService;
  public dialog: DialogService;

  constructor(public injector: Injector){
    /* Injections */
    this.lookup = this.injector.get<LookupService>(LookupService);
    this.lex = this.injector.get<LexicalService>(LexicalService);
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

  /**
   * Verifica qual das seguintes possíveis alterações ocorrerá na atribuição de GESTOR TITULAR do usuário: nenhuma, perda, ganho ou troca. Retorna um array com as seguintes informações, 
   * nessa ordem: [tipo de alteração, índice do grid relativo à antiga gerência, mensagem para o usuário, booleano indicando se haverá alteração também na sua lotação]
   * @param form  Formulário de edição preenchido pelo usuário
   * @param row   
   */
  public alteracaoGestor(novasAtribuicoes: IntegranteAtribuicao[], row: IntegranteConsolidado, itensGrid: IntegranteConsolidado[], nomeUsuario: string): [string, number, string, boolean] {
    //************************ TODO: alterar no back-und o método SAVEINTEGRANTE para se comportar corretamente independentemente da ordem de execução LOTADO/GESTOR ou GESTOR/LOTADO
    //************************ TODO: no front-end, ao editar um integrante, bloquear o input-search de unidade
    let msg = "";
    let perda = this.util.array_diff(row.atribuicoes, novasAtribuicoes).includes('GESTOR'); 
    let ganho = this.util.array_diff(novasAtribuicoes, row.atribuicoes).includes('GESTOR'); 
    if(!perda && !ganho) return ['nenhuma', -1, "", false];
    if(perda) {
      msg = nomeUsuario.toUpperCase() + " deixará de ser " + this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, "GESTOR") + this.lex.translate("da Unidade") + " - " + row.unidade_sigla?.toUpperCase() + ".";
      return ['perda', -1, msg, false];
    }
    let ehLotadoNaNovaGerencia = row.atribuicoes.includes("LOTADO");
    let meio = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, "GESTOR") + this.lex.translate("da Unidade") + " - ";
    msg = nomeUsuario.toUpperCase() + " passará a ser " + meio + row.unidade_sigla?.toUpperCase();
    let itemAntigaGerencia = itensGrid.find(i => i.atribuicoes.includes('GESTOR'));
    msg = itemAntigaGerencia?.id.length ? msg + " e deixará de ser " + meio + ". " : msg + ". ";
    if(!ehLotadoNaNovaGerencia) msg+= "Por consequência, sua lotação também será alterada para " + this.lex.translate("a Unidade") + " - " + row.unidade_sigla?.toUpperCase() + ".";
    return itemAntigaGerencia?.id.length ? ['troca', itensGrid.findIndex(x => x.id == itemAntigaGerencia?.id), msg, true] : ['ganho', -1, msg, !ehLotadoNaNovaGerencia]; 
  }

  public insereAtribuicao(atribuicoes: LookupItem[], atribuicao: IntegranteAtribuicao ): LookupItem[] {
    atribuicoes.push({ key: 'LOTADO', value: 'Lotado'});
    return this.lookup.uniqueLookupItem(atribuicoes);
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
