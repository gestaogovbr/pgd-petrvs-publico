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
import { LookupItem } from 'src/app/services/lookup.service';
import { UnidadeService } from 'src/app/services/unidade.service';

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
  public unidadeService: UnidadeService;
  public extraJoin: string[];
  public extra: any;

  public avaliacoes: Avaliacao[] = [];
  public planos_trabalhos: PlanoTrabalho[] = [];
  public programas: Programa[] = [];
  public avaliacao: Avaliacao = new Avaliacao();
  public consolidacaoId?: string[] = [];//public consolidacaoId?: PlanoTrabalhoConsolidacao[] = [];
  public joinAvaliacao: string[] = ["avaliador", "entregas_checklist", "tipo_avaliacao.notas", "avaliacoes:id,recurso", "avaliacao"];

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalhoConsolidacao, PlanoTrabalhoConsolidacaoDaoService);
    this.unidadeService = injector.get<UnidadeService>(UnidadeService);
    /* Inicializações */
    this.join = [
      "avaliacoes:id,recurso",
      "avaliacao", // "avaliacao.tipoAvaliacao.notas"
      "plano_trabalho:id", // "planoTrabalho.unidade:id,sigla,nome", "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", "planoTrabalho.unidade.gestorSubstituto:id,unidade_id,usuario_id", "planoTrabalho.tipoModalidade:id,nome", "planoTrabalho.usuario:id,nome,apelido,url_foto"
    ];
    this.extraJoin = [ // Utilizado pelo RefreshId
      "avaliacao.tipoAvaliacao.notas",
      "planoTrabalho.unidade:id,sigla,nome", 
      "planoTrabalho.unidade.gestor:id,unidade_id,usuario_id", 
      "planoTrabalho.unidade.unidadePai.gestoresSubstitutos:id,unidade_id,usuario_id", 
      "planoTrabalho.unidade.unidadePai.gestor:id,unidade_id,usuario_id", 
      "planoTrabalho.unidade.gestoresSubstitutos:id,unidade_id,usuario_id", 
      "planoTrabalho.tipoModalidade:id,nome", 
      "planoTrabalho.usuario:id,nome,apelido,foto_perfil,url_foto"
    ];

    this.groupBy = [
      { field: "plano_trabalho.unidade.sigla", label: this.lex.translate("Unidade") }, 
      { field: "plano_trabalho.unidade.id", label: "Unidade Id" }, 
      { field: "plano_trabalho.usuario.nome", label: this.lex.translate("Participante") },
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
    this.rowsLimit = 20;
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
    return this.unidadeService.isGestorUnidade(this.filter!.controls.unidade_id.value) ? undefined : 'true';
  }

  public usuarioSeparator(separator: GridGroupSeparator) {
    let usuarioId = separator.group[3].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.usuario = separator.metadata.usuario || this.planos_trabalhos?.find((x: PlanoTrabalho) => x.usuario_id == usuarioId)?.usuario;
    return separator.metadata.usuario;
  }

  public unidadeSeparator(separator: GridGroupSeparator) {
    let unidadeId = separator.group[1].value;
    separator.metadata = separator.metadata || {};
    separator.metadata.unidade = separator.metadata.unidade || this.planos_trabalhos?.find((x: PlanoTrabalho) => x.unidade_id == unidadeId)?.unidade;
    return separator.metadata.unidade;
  }

  public onUnidadeChange(event: Event) {
    if(!this.unidadeService.isGestorUnidade(this.filter!.controls.unidade_id.value)) this.filter!.controls.unidades_subordinadas.setValue(false);
  }

  public onGridLoad(rows?: Base[]) {
    this.extra = (this.grid?.query || this.query!).extra;
    if(this.extra) {
      this.planos_trabalhos = ((this.planos_trabalhos || []) as PlanoTrabalho[]).concat(this.extra?.planos_trabalhos || []);
      this.programas = ((this.programas || []) as Programa[]).concat(this.extra?.programas || []);      
      this.planos_trabalhos.forEach(p => {
        let plano = p as PlanoTrabalho;
        plano.programa = this.programas?.find((x: Programa) => x.id == plano.programa_id);
      });
      rows?.forEach(v => {
        let consolidacao = v as PlanoTrabalhoConsolidacao;
        consolidacao.plano_trabalho = this.planos_trabalhos?.find((x: PlanoTrabalho) => x.id == consolidacao.plano_trabalho_id);
        if(consolidacao.avaliacao) consolidacao.avaliacao.tipo_avaliacao = this.extra?.tipos_avaliacoes?.find((x: TipoAvaliacao) => x.id == consolidacao.avaliacao!.tipo_avaliacao_id);
      });
    }
  }

  public refreshConsolidacao(consolidacao: PlanoTrabalhoConsolidacao) {    
    (async () => {
      await this.grid!.query!.refreshId(consolidacao.id, this.extraJoin);
      this.grid!.refreshRows();
    })();
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let consolidacao: PlanoTrabalhoConsolidacao = row as PlanoTrabalhoConsolidacao;

   
    
    
    let programa: Programa = consolidacao.plano_trabalho!.programa!;
    let isAvaliador: boolean = false;
    const usuarioId = consolidacao.plano_trabalho!.usuario_id;
    const unidadeId = consolidacao.plano_trabalho!.unidade_id;
    const unidade = consolidacao.plano_trabalho!.unidade;
    const usuarioEhDonoDoPlano = usuarioId == this.auth.usuario?.id;
    const usuarioPlanoEhGestor = unidade?.gestor?.usuario_id == usuarioId;
    const usuarioPlanoEhGestorSubstituto = unidade?.gestores_substitutos.map((g: { usuario_id: any; }) => g.usuario_id).includes(usuarioId);
    const usuarioPlanoEhGestorDelegado = unidade?.gestores_delegados.map((g: { usuario_id: any; }) => g.usuario_id).includes(usuarioId);
    const usuarioPlanoEhLotado = !usuarioPlanoEhGestor && !usuarioPlanoEhGestorSubstituto && !usuarioPlanoEhGestorDelegado;
    const temPermissaoAvaliar = this.auth.hasPermissionTo("MOD_PTR_CSLD_AVAL");
    const usuarioLogadoEhGestorSuperior = consolidacao.plano_trabalho!.unidade ? this.unidadeService.isGestorUnidadeSuperior(consolidacao.plano_trabalho!.unidade) : false;
    if(usuarioPlanoEhGestor){
      isAvaliador = usuarioLogadoEhGestorSuperior
    } else if (usuarioPlanoEhGestorSubstituto){
      isAvaliador = usuarioLogadoEhGestorSuperior || this.unidadeService.isGestorTitularUnidade(unidadeId)
    } else if (usuarioPlanoEhGestorDelegado){
      isAvaliador = usuarioLogadoEhGestorSuperior || this.unidadeService.isGestorUnidade(unidadeId, false)
    } else if (usuarioPlanoEhLotado){
      isAvaliador = usuarioLogadoEhGestorSuperior || this.unidadeService.isGestorUnidade(unidadeId, false)
    }

   

    const BOTAO_VER_AVALIACAO = { hint: "Visualizar", icon: "bi bi-eye", color: "btn-outline-primary", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.visualizarAvaliacao(row) };
    const BOTAO_AVALIAR = { hint: "Avaliar", icon: "bi bi-star", color: "btn-outline-info", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_REAVALIAR = { hint: "Reavaliar", icon: "bi bi-star-half", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.avaliar(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_FAZER_RECURSO = { label: 'Recurso',  id: "RECORRIDO", icon: "bi bi-journal-medical", color: "btn-outline-warning", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.fazerRecurso(row, programa, this.refreshConsolidacao.bind(this)) };
    const BOTAO_CANCELAR_AVALIACAO = { hint: "Cancelar avaliação", id: "INCLUIDO", icon: "bi bi-backspace", color: "btn-outline-danger", onClick: (row: PlanoTrabalhoConsolidacao) => this.planoTrabalhoService.cancelarAvaliacao(row, this, this.refreshConsolidacao.bind(this)) };
 
    if(consolidacao.status == "CONCLUIDO" && !usuarioEhDonoDoPlano && isAvaliador && temPermissaoAvaliar) {
      result.push(BOTAO_AVALIAR);
    }
    if(consolidacao.status == "AVALIADO" && consolidacao!.avaliacao) {
      result.push(BOTAO_VER_AVALIACAO);
      /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
      if(usuarioEhDonoDoPlano && this.auth.hasPermissionTo('MOD_PTR_CSLD_REC_AVAL') && consolidacao!.avaliacao?.data_avaliacao && ['Inadequado', 'Não executado'].includes(consolidacao!.avaliacao?.nota)) {       
        result.push(BOTAO_FAZER_RECURSO);
      }

      if(isAvaliador) {
        // const ultimaAvaliacao = consolidacao!.avaliacoes.reduce((latest, current) => current.data_avaliacao > latest.data_avaliacao ? current : latest, consolidacao!.avaliacoes[0]);
        // const recente = ultimaAvaliacao.data_avaliacao > new Date(Date.now() - 24 * 60 * 60 * 1000);
        // Só permite reavaliar se a última avaliação for recente
        result.push(BOTAO_REAVALIAR);
        // Só permite cancelar a avaliacao se não houver recurso na lista de avaliações
        if(!(consolidacao!.avaliacoes.filter(a => a.recurso).length > 0)) result.push(BOTAO_CANCELAR_AVALIACAO);
      }
    }
    return result;
  }

  public async onSelectTab(tab: LookupItem) {
    if(this.viewInit) this.saveUsuarioConfig({active_tab: tab.key});
  }

  public initGrid(grid: GridComponent) {
    grid.queryInit();
  }

  public filterWhereHistorico = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["status", "in", ["AVALIADO"]]);
    if(form.usuario_id?.length) result.push(["plano_trabalho.usuario.id", "==", form.usuario_id]);
    if(form.unidade_id?.length) result.push(["plano_trabalho.unidade.id", "==", form.unidade_id]);
    if(form.unidades_subordinadas) result.push(["unidades_subordinadas", "==", true]);
    if(form.incluir_arquivados) result.push(["incluir_arquivados", "==", true]);
    return result;
  }

  public getAvaliacoes(row: any) {
    return this.avaliacoes!.filter((x: Avaliacao) => x.plano_trabalho_consolidacao_id == row.id);
  }

  public async loadData() {
    this.loading = true;
    try {
      this.avaliacoes = await this.avaliacaoDao!.query({where: [["plano_trabalho_consolidacao_id", "in", this.consolidacaoId]], join: this.joinAvaliacao, orderBy: [["data_avaliacao", "desc"]]}).asPromise();
      this.avaliacao = this.avaliacoes[0] || this.avaliacao;
    } finally {
      this.loading = false;
    }
  }

  public onGridLoadHistorico(rows?: Base[]) {
    this.extra = (this.grid?.query || this.query!).extra;
    let planosTrabalhos = (this.extra?.planos_trabalhos || []) as PlanoTrabalho[];



    planosTrabalhos.forEach(p => {
      let plano = p as PlanoTrabalho;
      plano.programa = this.extra?.programas?.find((x: Programa) => x.id == plano.programa_id);
    });
    rows?.forEach(v => {
      this.consolidacaoId?.push(v.id);
      let consolidacao = v as PlanoTrabalhoConsolidacao;
      consolidacao.plano_trabalho = this.extra?.planos_trabalhos?.find((x: PlanoTrabalho) => x.id == consolidacao.plano_trabalho_id);
      if(consolidacao.avaliacao) consolidacao.avaliacao.tipo_avaliacao = this.extra?.tipos_avaliacoes?.find((x: TipoAvaliacao) => x.id == consolidacao.avaliacao!.tipo_avaliacao_id);
    });
    this.loadData();
  }

  public getNota(row:any) {
    return row.tipo_avaliacao.notas.find((x: any) => x.codigo == row.nota);
  }
}

