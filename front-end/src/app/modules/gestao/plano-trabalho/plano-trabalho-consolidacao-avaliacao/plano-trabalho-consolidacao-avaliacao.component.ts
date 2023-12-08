import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent, GridGroupSeparator } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { Base } from 'src/app/models/base.model';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { Programa } from 'src/app/models/programa.model';

@Component({
  selector: 'app-plano-trabalho-consolidacao-avaliacao',
  templateUrl: './plano-trabalho-consolidacao-avaliacao.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-avaliacao.component.scss']
})

export class PlanoTrabalhoConsolidacaoAvaliacaoComponent extends PageListBase<PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public avaliacaoDao: AvaliacaoDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public extraJoin: string[];
  public extra: any;

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoDaoService);
    /* Inicializações */
    this.join = [
      "avaliacao", // "avaliacao.tipoAvaliacao.notas"
      "plano_trabalho:id", // "planoTrabalho.unidade:id,sigla,nome", "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", "planoTrabalho.unidade.gestorSubstituto:id,unidade_id,usuario_id", "planoTrabalho.tipoModalidade:id,nome", "planoTrabalho.usuario:id,nome,apelido,url_foto"
    ];
    this.extraJoin = [ // Utilizado pelo RefreshId
      "avaliacao.tipoAvaliacao.notas",
      "planoTrabalho.unidade:id,sigla,nome", 
      "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", 
      "planoTrabalho.unidade.gestorSubstituto:id,unidade_id,usuario_id", 
      "planoTrabalho.tipoModalidade:id,nome", 
      "planoTrabalho.usuario:id,nome,apelido,url_foto"
    ];
    this.groupBy = [
      { field: "plano_trabalho.unidade.sigla", label: "Unidade" }, 
      { field: "plano_trabalho.unidade.id", label: "Unidade Id" }, 
      { field: "plano_trabalho.usuario.nome", label: "Usuário" },
      { field: "plano_trabalho.usuario.id", label: "Usuário Id" }
    ];
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.avaliacaoDao = injector.get<AvaliacaoDaoService>(AvaliacaoDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.title = "Avaliações " + this.lex.translate("das Consolidações");
    this.code = "MOD_PTR_CSLD_AVAL";
    this.filter = this.fh.FormBuilder({
      usuario_id: {default: ""},
      unidade_id: {default: ""},
      unidades_subordinadas: {default: false},
      incluir_arquivados: {default: false}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.filter!.controls.unidade_id.setValue(this.auth.unidadeGestor()?.id || this.auth.lotacao || null);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["status", "in", ["CONCLUIDO", "AVALIADO"]]);
//    if(form.usuario_id?.length) result.push(["usuario_id", "==", form.usuario_id]);
    if(form.usuario_id?.length) result.push(["plano_trabalho.usuario.id", "==", form.usuario_id]);
    if(form.unidade_id?.length) result.push(["plano_trabalho.unidade.id", "==", form.unidade_id]);
    if(form.unidades_subordinadas) result.push(["unidades_subordinadas", "==", true]);
    if(form.incluir_arquivados) result.push(["incluir_arquivados", "==", true]);
    return result;
  }

  public get canFilterSubordinadas(): string | undefined {
    return this.auth.isGestorUnidade(this.filter!.controls.unidade_id.value) ? undefined : 'true';
  }

  public usuarioSeparator(separator: GridGroupSeparator) {
    let usuarioId = separator.group[3].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.usuario = separator.metadata.usuario || this.extra?.planos_trabalhos?.find((x: PlanoTrabalho) => x.usuario_id == usuarioId)?.usuario;
    return separator.metadata.usuario;
  }

  public unidadeSeparator(separator: GridGroupSeparator) {
    let unidadeId = separator.group[1].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.unidade = separator.metadata.unidade || this.extra?.planos_trabalhos?.find((x: PlanoTrabalho) => x.unidade_id == unidadeId)?.unidade;
    return separator.metadata.unidade;
  }

  public onUnidadeChange(event: Event) {
    if(!this.auth.isGestorUnidade(this.filter!.controls.unidade_id.value)) this.filter!.controls.unidades_subordinadas.setValue(false);
  }

  public onGridLoad(rows?: Base[]) {
    this.extra = (this.grid?.query || this.query!).extra;
    let planosTrabalhos = (this.extra?.planos_trabalhos || []) as PlanoTrabalho[];
    planosTrabalhos.forEach(p => {
      let plano = p as PlanoTrabalho;
      plano.programa = this.extra?.programas?.find((x: Programa) => x.id == plano.programa_id);
    });
    rows?.forEach(v => {
      let consolidacao = v as PlanoTrabalhoConsolidacao;
      consolidacao.plano_trabalho = this.extra?.planos_trabalhos?.find((x: PlanoTrabalho) => x.id == consolidacao.plano_trabalho_id);
      if(consolidacao.avaliacao) consolidacao.avaliacao.tipo_avaliacao = this.extra?.tipos_avaliacoes?.find((x: TipoAvaliacao) => x.id == consolidacao.avaliacao!.tipo_avaliacao_id);
    });
  }

  public refreshConsolidacao(consolidacao: PlanoTrabalhoConsolidacao) {
    (async () => {
      await this.grid!.query!.refreshId(consolidacao.id, this.extraJoin);
      this.grid!.refreshRows();
    })();
  }

  public anterior(consolidacao: PlanoTrabalhoConsolidacao): PlanoTrabalhoConsolidacao | undefined {
    return (this.grid!.items as PlanoTrabalhoConsolidacao[]).reduce((a: PlanoTrabalhoConsolidacao | undefined, v: PlanoTrabalhoConsolidacao) => this.util.asTimestamp(v.data_inicio) < this.util.asTimestamp(consolidacao.data_inicio) && (!a || this.util.asTimestamp(a.data_inicio) < this.util.asTimestamp(v.data_inicio)) ? v : a, undefined);
  }

  public proximo(consolidacao: PlanoTrabalhoConsolidacao): PlanoTrabalhoConsolidacao | undefined {
    return (this.grid!.items as PlanoTrabalhoConsolidacao[]).reduce((a: PlanoTrabalhoConsolidacao | undefined, v: PlanoTrabalhoConsolidacao) => this.util.asTimestamp(v.data_fim) > this.util.asTimestamp(consolidacao.data_fim) && (!a || this.util.asTimestamp(a.data_fim) > this.util.asTimestamp(v.data_fim)) ? v : a, undefined);
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let consolidacao: PlanoTrabalhoConsolidacao = row as PlanoTrabalhoConsolidacao;
    let programa: Programa = consolidacao.plano_trabalho!.programa!;
    const usuarioId = consolidacao.plano_trabalho!.usuario_id;
    const unidadeId = consolidacao.plano_trabalho!.unidade_id;
    const anterior = this.anterior(row as PlanoTrabalhoConsolidacao);
    const proximo = this.proximo(row as PlanoTrabalhoConsolidacao);
    const isAvaliador = this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL") && (this.auth.isGestorUnidade(unidadeId) || this.auth.isIntegrante('AVALIADOR_PLANO_TRABALHO', unidadeId));
    const isUsuarioDoPlano = this.auth.usuario!.id == usuarioId;
    const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_REAVALIAR = { hint: "Reavaliar", icon: "bi bi-star-half", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_FAZER_RECURSO = { hint: "Fazer recurso", id: "RECORRIDO", icon: "bi bi-journal-medical", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.fazerRecurso(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_CANCELAR_AVALIACAO = { hint: "Cancelar avaliação", id: "INCLUIDO", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this)) };
    /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
    const canAvaliar = !anterior || ["AVALIADO"].includes(anterior!.status);
    const canCancelarAvaliacao = !proximo || ["INCLUIDO", "CONCLUIDO"].includes(proximo!.status);
    if(consolidacao.status == "CONCLUIDO" && canAvaliar && isAvaliador) {
      result.push(BOTAO_AVALIAR);
    }
    if(consolidacao.status == "AVALIADO" && consolidacao!.avaliacao) {
      /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
      if(isUsuarioDoPlano && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao!.avaliacao?.data_avaliacao && 
        (!programa.dias_tolerancia_recurso_avaliacao || 
        (this.util.daystamp(consolidacao!.avaliacao!.data_avaliacao) + programa.dias_tolerancia_recurso_avaliacao > this.util.daystamp(this.auth.hora)))) {
        result.push(BOTAO_FAZER_RECURSO);
      }
      /* (RN_AVL_3) [PT] Após o recurso será realizado nova avaliação, podendo essa ser novamente recorrida dentro do mesmo prazo estabelecido no programa; */
      /* (RN_AVL_6) [PT] Qualquer usuário capaz de avaliar tambem terá a capacidade de cancelar a avaliação; */
      if(canAvaliar && isAvaliador) {
        result.push(BOTAO_REAVALIAR);
        if(canCancelarAvaliacao) result.push(BOTAO_CANCELAR_AVALIACAO);
      }
    }
    return result;
  }

}

