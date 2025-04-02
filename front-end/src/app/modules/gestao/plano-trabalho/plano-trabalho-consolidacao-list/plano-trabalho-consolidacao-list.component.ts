import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ConsolidacaoDados, PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoStatus } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { PlanoTrabalhoConsolidacaoFormComponent } from '../plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { Programa } from 'src/app/models/programa.model';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'plano-trabalho-consolidacao-list',
  templateUrl: './plano-trabalho-consolidacao-list.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-list.component.scss']
})
export class PlanoTrabalhoConsolidacaoListComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set entity(value: PlanoTrabalho | undefined) { super.entity = value; } get entity(): PlanoTrabalho | undefined { return super.entity; }

  public get items(): PlanoTrabalhoConsolidacao[] {
    return this.entity?.consolidacoes || [];
  }

  public dao?: PlanoTrabalhoConsolidacaoDaoService;
  public avaliacaoDao: AvaliacaoDaoService;
  public planoTrabalhoDao?: PlanoTrabalhoDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public unidadeService: UnidadeService;

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.dao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.avaliacaoDao = injector.get<AvaliacaoDaoService>(AvaliacaoDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.unidadeService = injector.get<UnidadeService>(UnidadeService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.title = this.lex.translate("Consolidações");
    this.code = "MOD_PTR_CSLD";
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      'data_inicio': {default: new Date()},
      'data_fim': {default: new Date()}
    }, this.cdRef, this.validate);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    (async () => {
      if (this.urlParams?.has("usuarioId") && this.urlParams?.has("planoTrabalhoId")) {
        let dados = await this.planoTrabalhoDao!.getByUsuario(this.urlParams!.get("usuarioId")!, true, this.urlParams!.get("planoTrabalhoId")!);
        if (dados.planos.length == 1) this.entity = dados.planos[0];
      }
      let agora = (new Date()).getTime();
      this.items.forEach(v => {
        if(!v.plano_trabalho) v.plano_trabalho = this.entity;
        if(this.util.asTimestamp(v.data_inicio) <= agora && agora <= this.util.asTimestamp(v.data_fim)) this.grid!.expand(v.id);
      });
    })();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    // TODO: Validar data
    return result;
  }

  public async addConsolidacao() {
    return new PlanoTrabalhoConsolidacao({
      id: this.dao!.generateUuid(),
      plano_trabalho_id: this.entity!.id
    });
  }

  public async loadConsolidacao(form: FormGroup, row: any) {
    this.form!.patchValue({
      data_inicio: row.data_inicio,
      data_fim: row.data_fim
    });    
    this.cdRef.detectChanges();
  }

  public async removeConsolidacao(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
      try {
        let consolidacao = row as PlanoTrabalhoConsolidacao;
        await this.dao?.delete(consolidacao);
        this.items.splice(this.items.findIndex(x => x.id == consolidacao.id), 1);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  public async saveConsolidacao(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if (this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.data_inicio = form.controls.data_inicio.value;
      row.data_fim = form.controls.data_fim.value;
      result = await this.dao?.save(row);
    }
    return result;
  }

  public refreshConsolidacao(consolidacao: PlanoTrabalhoConsolidacao, dados?: ConsolidacaoDados) {
    if(dados && consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent) {
      let consolidacaoForm = consolidacao._metadata?.planoTrabalhoConsolidacaoFormComponent as PlanoTrabalhoConsolidacaoFormComponent;
      consolidacaoForm.loadConsolidacao(dados);
    } else {
      this.grid!.refreshExpanded(consolidacao.id);
    }
    this.grid!.refreshRows();
  }

  public async concluir(consolidacao: PlanoTrabalhoConsolidacao) {
    this.submitting = true;
    try {
      let response = await this.dao!.concluir(consolidacao.id);
      consolidacao.status = response.status as PlanoTrabalhoConsolidacaoStatus;
      this.refreshConsolidacao(consolidacao, response);
    } catch (error: any) {
      this.error(error.message || error);
    } finally {
      this.submitting = false;
    }
  }

  public async cancelarConclusao(consolidacao: PlanoTrabalhoConsolidacao) {
    this.submitting = true;
    try {
      let response = await this.dao!.cancelarConclusao(consolidacao.id);
      consolidacao.status = response.status as PlanoTrabalhoConsolidacaoStatus;
      this.refreshConsolidacao(consolidacao, response);
    } catch (error: any) {
      this.error(error.message || error);
    } finally {
      this.submitting = false;
    }
  }

  public anterior(consolidacao: PlanoTrabalhoConsolidacao): PlanoTrabalhoConsolidacao | undefined {
    return this.entity!.consolidacoes.reduce((a: PlanoTrabalhoConsolidacao | undefined, v: PlanoTrabalhoConsolidacao) => this.util.asTimestamp(v.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio) && (!a || this.util.asTimestamp(a.data_inicio) < this.util.asTimestamp(v.data_inicio)) ? v : a, undefined);
  }

  public proximo(consolidacao: PlanoTrabalhoConsolidacao): PlanoTrabalhoConsolidacao | undefined {
    return this.entity!.consolidacoes.reduce((a: PlanoTrabalhoConsolidacao | undefined, v: PlanoTrabalhoConsolidacao) => this.util.asTimestamp(v.data_fim) > this.util.asTimestamp(consolidacao.data_fim) && (!a || this.util.asTimestamp(a.data_fim) > this.util.asTimestamp(v.data_fim)) ? v : a, undefined);
  }

  public isDisabled(row?: PlanoTrabalhoConsolidacao): boolean {    
    return row?.status != "INCLUIDO";
  }

  podeInserir(){
    return this.auth.hasPermissionTo("MOD_PTR_CSLD_INCL")
  }
  

  public dynamicButtons(row: any): ToolbarButton[] {
    /*
    (PTR:TABELA_1)
    Ação \ Ator   | PT do Chefe    | PT do Chefe Sub.     | PT do Delegado   | PT do Lotado/Colaborador   
    --------------+----------------+----------------------+------------------+-------------------------
    Avaliar       | CF+,CS+        | CF,CF+,CS+           | CF,CS            | CF,CS
    */
    let result: ToolbarButton[] = [];
    let consolidacao: PlanoTrabalhoConsolidacao = row as PlanoTrabalhoConsolidacao;
    const usuarioId = consolidacao!.plano_trabalho?.usuario_id;
    const unidadeId = this.entity!.unidade_id;
    const temRecurso = consolidacao?.avaliacoes.filter((a: Avaliacao) => a.recurso != null).length > 0;
    const isUsuarioDoPlano = this.auth.usuario!.id == usuarioId;
    const nenhumGestor = { gestor: false, gestorSubstituto: false, gestorDelegado: false };
    const gestorLogado = this.entity?._metadata["atribuicoesGestorUsuarioLogado"] || nenhumGestor;
    const gestorParticipante = this.entity?._metadata["atribuicoesGestorUsuario"] || nenhumGestor;
    const gestorUnidadeSuperior = this.entity?._metadata["gestorUnidadeSuperior"] || nenhumGestor;
    const isAvaliador = !isUsuarioDoPlano && this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL") && 
      (
        this.auth.isIntegrante('AVALIADOR_PLANO_TRABALHO', unidadeId) || 
        (gestorParticipante.gestor && (gestorUnidadeSuperior.gestor || gestorUnidadeSuperior.gestorSubstituto)) ||
        (gestorParticipante.gestorSubstituto && (gestorLogado.gestor || gestorUnidadeSuperior.gestor || gestorUnidadeSuperior.gestorSubstituto)) ||
        (!gestorParticipante.gestor && !gestorParticipante.gestorSubstituto && (gestorLogado.gestor || gestorLogado.gestorSubstituto))
      );
    const BOTAO_CONCLUIR = { hint: "Concluir", icon: "bi bi-check-circle", color: "btn-outline-success", onClick: this.concluir.bind(this) };
    const BOTAO_CANCELAR_CONCLUSAO = { hint: "Cancelar conclusão", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: this.cancelarConclusao.bind(this) };
    const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, this.entity!.programa!, this.refreshConsolidacao.bind(this)) };
    const BOTAO_REAVALIAR = { hint: "Reavaliar", icon: "bi bi-star-half", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, this.entity!.programa!, this.refreshConsolidacao.bind(this)) };
    const BOTAO_FAZER_RECURSO = { label: 'Recurso',  id: "RECORRIDO", icon: "bi bi-journal-medical", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.fazerRecurso(row, this.entity!.programa!, this.refreshConsolidacao.bind(this)) };
    const BOTAO_CANCELAR_AVALIACAO = { hint: "Cancelar avaliação", id: "INCLUIDO", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this)) };

    //!this.isDisabled()
    if(true) {
      if(consolidacao.status == "INCLUIDO" && (isUsuarioDoPlano || this.auth.hasPermissionTo("MOD_PTR_CSLD_CONCL"))) {
        result.push(BOTAO_CONCLUIR);
      }
      // this.planoTrabalhoService.diasParaConcluirConsolidacao(row, this.entity!.programa) >= 0 &&
      if(consolidacao.status == "CONCLUIDO" && (isUsuarioDoPlano || this.auth.hasPermissionTo("MOD_PTR_CSLD_DES_CONCL"))) {
        result.push(BOTAO_CANCELAR_CONCLUSAO);
      }
      if(consolidacao.status == "CONCLUIDO" && isAvaliador) {
        /* (RN_CSLD_16) A avaliação somente poderá ser realizado caso não exista período anterior ou o período anterior esteja AVALIADO, e respeitando os critérios da tabela [PTR:TABELA_1] */
        result.push(BOTAO_AVALIAR);
      }
      
      if(consolidacao.status == "AVALIADO" && consolidacao!.avaliacao) {
        /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
        if(isUsuarioDoPlano && !temRecurso && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao!.avaliacao?.data_avaliacao && ['Inadequado', 'Não executado'].includes(consolidacao!.avaliacao?.nota)) {
          result.push(BOTAO_FAZER_RECURSO);
        }
        if(isAvaliador) {
          //const ultimaAvaliacao = consolidacao!.avaliacoes.reduce((latest, current) => current.data_avaliacao > latest.data_avaliacao ? current : latest, consolidacao!.avaliacoes[0]);
          //const recente = ultimaAvaliacao.data_avaliacao > new Date(Date.now() - 24 * 60 * 60 * 1000);
          // Só permite reavaliar se a última avaliação for recente
          result.push(BOTAO_REAVALIAR);
          // Só permite cancelar a avaliacao se não houver recurso na lista de avaliações
          if(!(consolidacao!.avaliacoes.filter(a => a.recurso).length > 0)) result.push(BOTAO_CANCELAR_AVALIACAO);
        }
      }
    }
    return result;
  }

  mostrarAvaliacao(row: PlanoTrabalhoConsolidacao){
    this.planoTrabalhoService.visualizarAvaliacao(row)
  }

}
