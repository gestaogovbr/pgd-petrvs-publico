import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from '../dao/dao-base.service';
import { Base } from '../models/base.model';
import { FullRoute } from './navigate.service';
import { AfastamentoDaoService } from '../dao/afastamento-dao.service';
import { LexicalService } from './lexical.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { TarefaDaoService } from 'src/app/dao/tarefa-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { CadeiaValorDaoService } from '../dao/cadeia-valor-dao.service';
import { CapacidadeDaoService } from '../dao/capacidade-dao.service';
import { DemandaEntregaDaoService } from '../dao/demanda-entrega-dao.service';
import { DocumentoDaoService } from '../dao/documento-dao-service';
import { EixoTematicoDaoService } from '../dao/eixo-tematico-dao.service';
import { EntregaDaoService } from '../dao/entrega-dao.service';
import { IntegracaoDaoService } from '../dao/integracao-dao.service';
import { LotacaoDaoService } from '../dao/lotacao-dao.service';
import { PlanejamentoDaoService } from '../dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from '../dao/planejamento-objetivo-dao.service';
import { PlanoEntregaDaoService } from '../dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from '../dao/plano-entrega-entrega-dao.service';
import { ProgramaParticipanteDaoService } from '../dao/programa-participante-dao.service';
import { ProjetoAlocacaoDaoService } from '../dao/projeto-alocacao-dao.service';
import { ProjetoRegraDaoService } from '../dao/projeto-regra-dao.service';
import { ProjetoRecursoDaoService } from '../dao/projeto-recurso-dao.service';
import { ProjetoTarefaDaoService } from '../dao/projeto-tarefa-dao.service';
import { TipoAvaliacaoJustificativaDaoService } from '../dao/tipo-avaliacao-justificativa-dao.service';
import { TipoCapacidadeDaoService } from '../dao/tipo-capacidade-dao.service';
import { UnidadeIntegranteDaoService } from '../dao/unidade-integrante-dao.service';
import { CadeiaValorProcessoDaoService } from '../dao/cadeia-valor-processo-dao.service';
import { ChangeDaoService } from '../dao/change-dao.service';
import { ErrorDaoService } from '../dao/error-dao.service';
import { TrafficDaoService } from '../dao/traffic-dao.service';
import { PlanoEntregaObjetivoDaoService } from '../dao/plano-entrega-objetivo-dao.service';
import { PlanoEntregaProcessoDaoService } from '../dao/plano-entrega-processo-dao.service';

export type EntityItem = {
    collection: string,
    codigo?: string,
    icon: string,
    label: string,
    dao?: DaoBaseService<Base>,
    selectRoute?: FullRoute,
    table?: string
};

@Injectable({
    providedIn: 'root'
})
export class EntityService {

    public list: EntityItem[];
    public lex: LexicalService;

    public constructor(public injector: Injector) {
        this.lex = injector.get<LexicalService>(LexicalService);
        this.list = [
            { collection: 'Adesao', icon: 'bi bi-universal-access-circle', label: "Adesão" },
            { collection: 'Afastamento', codigo: 'MOD_AFT', table: 'afastamentos', icon: 'bi bi-toggle-off', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), label: "Afastamento", selectRoute: { route: ['cadastros', 'afastamento'] } },
            { collection: 'Atividade', codigo: 'MOD_ATV', table: 'atividades', icon: 'bi bi-clipboard-pulse', dao: injector.get<AtividadeDaoService>(AtividadeDaoService), label: "Atividade", selectRoute: { route: ['gestao', 'atividade'] } },
            { collection: 'CadeiaValor', codigo: 'MOD_CADV', table: 'cadeias_valores', icon: 'bi bi-bar-chart-steps', dao: injector.get<CadeiaValorDaoService>(CadeiaValorDaoService), label: "Cadeia de Valor", selectRoute: { route: ['gestao', 'cadeia-valor'] } },
            { collection: 'CadeiaValorProcesso', table: 'cadeias_valores_processos', icon: '', dao: injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService), label: "Processo da Cadeia de Valor", selectRoute: { route: ['gestao', 'cadeia-valor', 'processoList'] } },
            { collection: 'Capacidade', table: 'capacidades', icon: '', dao: injector.get<CapacidadeDaoService>(CapacidadeDaoService), label: "Capacidade" },
            { collection: 'Change', table: 'changes', icon: 'bi bi-filter-square', dao: injector.get<ChangeDaoService>(ChangeDaoService), label: "Log de Alteração", selectRoute: { route: ['logs', 'change'] } },
            { collection: 'Cidade', codigo: 'MOD_CID', table: 'cidades', icon: 'bi bi-building', dao: injector.get<CidadeDaoService>(CidadeDaoService), label: "Cidade", selectRoute: { route: ['cadastros', 'cidade'] } },
            { collection: 'Demanda', codigo: 'MOD_DMD', table: 'demandas', icon: 'bi bi-activity', dao: injector.get<DemandaDaoService>(DemandaDaoService), label: "Demanda", selectRoute: { route: ['gestao', 'demanda'] } },
            { collection: 'DemandaEntrega', table: 'demandas_entregas', icon: '', dao: injector.get<DemandaEntregaDaoService>(DemandaEntregaDaoService), label: "Entrega da Demanda" },
            { collection: 'Documento', table: 'documentos', icon: '', dao: injector.get<DocumentoDaoService>(DocumentoDaoService), label: "Documento" },
            { collection: 'EixoTematico', codigo: 'MOD_EXTM', table: 'eixos_tematicos', icon: 'bi bi-gear', dao: injector.get<EixoTematicoDaoService>(EixoTematicoDaoService), label: "Eixo Temático", selectRoute: { route: ['cadastros', 'eixo-tematico'] } },
            { collection: 'Entidade', codigo: 'MOD_ENTD', table: 'entidades', icon: 'bi bi-bookmark-heart', dao: injector.get<EntidadeDaoService>(EntidadeDaoService), label: "Entidade", selectRoute: { route: ['configuracoes', 'entidade'] } },
            { collection: 'Entrega', codigo: 'MOD_ENTRG', table: 'entregas', icon: 'bi bi-list-check', dao: injector.get<EntregaDaoService>(EntregaDaoService), label: "Entrega", selectRoute: { route: ['cadastros', 'entrega'] } },
            { collection: 'Error', table: 'errors', icon: 'bi bi-bug', dao: injector.get<ErrorDaoService>(ErrorDaoService), label: "Log de Erro", selectRoute: { route: ['logs', 'error'] } },
            { collection: 'Feriado', codigo: 'MOD_FER', table: 'feriados', icon: 'bi bi-emoji-sunglasses', dao: injector.get<FeriadoDaoService>(FeriadoDaoService), label: "Feriado", selectRoute: { route: ['cadastros', 'feriado'] } },
            { collection: 'Integracao', table: 'integracoes', icon: 'bi bi-pencil-square', dao: injector.get<IntegracaoDaoService>(IntegracaoDaoService), label: "Integração" },
            { collection: 'Lotacao', codigo: 'MOD_LOT', table: 'lotacoes', icon: '', dao: injector.get<LotacaoDaoService>(LotacaoDaoService), label: "Lotação" },
            { collection: 'MaterialServico', codigo: 'MOD_MATSRV', table: 'materiais_servicos', icon: 'bi bi-box-seam', dao: injector.get<MaterialServicoDaoService>(MaterialServicoDaoService), label: "Material/Serviço", selectRoute: { route: ['cadastros', 'material-servico'] } },
            { collection: 'Perfil', codigo: 'MOD_PERF', table: 'perfis', icon: 'bi bi-fingerprint', dao: injector.get<PerfilDaoService>(PerfilDaoService), label: "Perfil", selectRoute: { route: ['configuracoes', 'perfil'] } },
            { collection: 'Planejamento', codigo: 'MOD_PLAN_INST', table: 'planejamentos', icon: 'bi bi-journals', dao: injector.get<PlanejamentoDaoService>(PlanejamentoDaoService), label: "Planejamento Institucional", selectRoute: { route: ['gestao', 'planejamento'] } },
            { collection: 'PlanejamentoObjetivo', table: 'planejamentos_objetivos', icon: 'bi bi-bullseye', dao: injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService), label: "Objetivo do Planejamento", selectRoute: { route: ['gestao', 'planejamento', 'objetivoList'] } },
            { collection: 'Plano', codigo: 'MOD_PTR', table: 'planos', icon: 'bi bi-list-stars', dao: injector.get<PlanoDaoService>(PlanoDaoService), label: "Plano de Trabalho", selectRoute: { route: ['gestao', 'plano-trabalho'] } },
            { collection: 'PlanoEntrega', codigo: 'MOD_PENT', table: 'planos_entregas', icon: 'bi bi-list-columns-reverse', dao: injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService), label: "Plano de Entrega", selectRoute: { route: ['gestao', 'plano-entrega'] } },
            { collection: 'PlanoEntregaEntrega', codigo: 'MOD_PENT_ENTR', table: 'planos_entregas_entregas', icon: '', dao: injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService), label: "Entrega do Plano de Entrega", selectRoute: { route: ['gestao', 'plano-entrega', 'entregaList'] } },
            { collection: 'PlanoEntregaObjetivo', codigo: 'MOD_PENT_OBJ', table: 'planos_entregas_objetivos', campo: 'descricao', icon: '', dao: injector.get<PlanoEntregaObjetivoDaoService>(PlanoEntregaObjetivoDaoService), label: "Objetivo do Plano de Entrega" },
            { collection: 'PlanoEntregaProcesso', codigo: 'MOD_PENT_PRO', table: 'planos_entregas_entregas', campo: 'descricao', icon: '', dao: injector.get<PlanoEntregaProcessoDaoService>(PlanoEntregaProcessoDaoService), label: "Processo do Plano de Entrega" },
            { collection: 'Preferencia', icon: 'bi bi-person-fill-gear', label: "Preferência" },
            { collection: 'Programa', codigo: 'MOD_PRGT', table: 'programas', icon: 'bi bi-graph-up-arrow', dao: injector.get<ProgramaDaoService>(ProgramaDaoService), label: "Programa de Gestão", selectRoute: { route: ['gestao', 'programa'] } },
            { collection: 'ProgramaParticipante', table: 'programas_participantes', icon: '', dao: injector.get<ProgramaParticipanteDaoService>(ProgramaParticipanteDaoService), label: "Participante do Programa" },
            { collection: 'Projeto', codigo: 'MOD_PROJ', table: 'projetos', icon: 'bi bi-diagram-2', dao: injector.get<ProjetoDaoService>(ProjetoDaoService), label: "Projeto", selectRoute: { route: ['gestao', 'projeto'] } },
            { collection: 'ProjetoAlocacao', table: 'projetos_alocacoes', icon: '', dao: injector.get<ProjetoAlocacaoDaoService>(ProjetoAlocacaoDaoService), label: "Alocação" },
            { collection: 'ProjetoRecurso', table: 'projetos_recursos', icon: '', dao: injector.get<ProjetoRecursoDaoService>(ProjetoRecursoDaoService), label: "Recurso" },
            { collection: 'ProjetoRegra', table: 'projetos_regras', icon: '', dao: injector.get<ProjetoRegraDaoService>(ProjetoRegraDaoService), label: "Regra" },
            { collection: 'ProjetoTarefa', table: 'projetos_tarefas', icon: '', dao: injector.get<ProjetoTarefaDaoService>(ProjetoTarefaDaoService), label: "Tarefa do Projeto" },
            { collection: 'RelatorioArea', icon: 'bi bi-diagram-3-fill', label: "Área" },
            { collection: 'RelatorioServidor', icon: 'bi bi-file-person', label: "Servidor" },
            { collection: 'Tarefa', table: 'tarefas', icon: 'bi bi-boxes', dao: injector.get<TarefaDaoService>(TarefaDaoService), label: "Tarefa", selectRoute: { route: ['cadastros', 'tarefa'] } },
            { collection: 'Template', codigo: 'MOD_TEMP', table: 'templates', icon: 'bi bi-archive', dao: injector.get<TemplateDaoService>(TemplateDaoService), label: "Template", selectRoute: { route: ['cadastros', 'template'] } },
            { collection: 'Teste', icon: 'bi bi-clipboard-check', label: "Teste" },
            { collection: 'TipoAtividade', codigo: 'MOD_TIPO_ATV', table: 'tipos_atividades', icon: 'bi bi-check-all', dao: injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService), label: "Tipo de Atividade", selectRoute: { route: ['cadastros', 'tipo-atividade'] } },
            { collection: 'TipoAvaliacao', codigo: 'MOD_TIPO_AVAL', table: 'tipos_avaliacoes', icon: 'bi bi-question-square', dao: injector.get<TipoAvaliacaoDaoService>(TipoAvaliacaoDaoService), label: "Tipo de Avaliação", selectRoute: { route: ['cadastros', 'tipo-avaliacao'] } },
            { collection: 'TipoAvaliacaoJustificativa', table: 'tipos_avaliacoes_justificativas', icon: '', dao: injector.get<TipoAvaliacaoJustificativaDaoService>(TipoAvaliacaoJustificativaDaoService), label: "Justificativa do Tipo de Avaliação" },
            { collection: 'TipoCapacidade', codigo: 'MOD_TIPO_CAP', table: 'tipos_capacidades', icon: '', dao: injector.get<TipoCapacidadeDaoService>(TipoCapacidadeDaoService), label: "Tipo de Capacidade" },
            { collection: 'TipoDocumento', codigo: 'MOD_TIPO_DOC', table: 'tipos_documentos', icon: 'bi bi-files', dao: injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService), label: "Tipo de Documento", selectRoute: { route: ['cadastros', 'tipo-documento'] } },
            { collection: 'TipoJustificativa', codigo: 'MOD_TIPO_JUST', table: 'tipos_justificativas', icon: 'bi bi-window-stack', dao: injector.get<TipoJustificativaDaoService>(TipoJustificativaDaoService), label: "Tipo de Justificativa", selectRoute: { route: ['cadastros', 'tipo-justificativa'] } },
            { collection: 'TipoModalidade', codigo: 'MOD_TIPO_MDL', table: 'tipos_modalidades', icon: 'bi bi-bar-chart-steps', dao: injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService), label: "Tipo de Modalidade", selectRoute: { route: ['cadastros', 'tipo-modalidade'] } },
            { collection: 'TipoMotivoAfastamento', codigo: 'MOD_TIPO_MTV_AFT', table: 'tipos_motivos_afastamentos', icon: 'bi bi-list-ol', dao: injector.get<TipoMotivoAfastamentoDaoService>(TipoMotivoAfastamentoDaoService), label: "Tipo de Motivo de Afastamento", selectRoute: { route: ['cadastros', 'tipo-motivo-afastamento'] } },
            { collection: 'TipoProcesso', codigo: 'MOD_TIPO_PROC', table: 'tipos_processos', icon: 'bi bi-folder-check', dao: injector.get<TipoProcessoDaoService>(TipoProcessoDaoService), label: "Tipo de Processo", selectRoute: { route: ['cadastros', 'tipo-processo'] } },
            { collection: 'Traffic', table: 'traffic', icon: 'bi bi-stoplights', dao: injector.get<TrafficDaoService>(TrafficDaoService), label: "Log de Tráfego", selectRoute: { route: ['logs', 'traffic'] } },
            { collection: 'Unidade', codigo: 'MOD_UND', table: 'unidades', icon: 'fa-unity fab', dao: injector.get<UnidadeDaoService>(UnidadeDaoService), label: "Unidade", selectRoute: { route: ['configuracoes', 'unidade'] } },
            { collection: 'UnidadeIntegrante', table: 'unidades_integrantes', icon: '', dao: injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService), label: "Integrante da Unidade" },
            { collection: 'Usuario', codigo: 'MOD_USER', table: 'usuarios', icon: 'bi bi-people', dao: injector.get<UsuarioDaoService>(UsuarioDaoService), label: "Usuário", selectRoute: { route: ['configuracoes', 'usuario'] } },
        ];
    }

    public getLabel(collection: string): string {
        let entity = this.list.find(x => x.collection == collection);
        return entity ? this.lex.noun(entity.label) : '';
    }

    public getIcon(collection: string): string {
        return this.list.find(x => x.collection == collection)?.icon || '';
    }

    public getTable(collection: string): string | undefined {
        return this.list.find(x => x.collection == collection)?.table;
    }

    public getSelectRoute(collection: string): FullRoute {
        return this.list.find(x => x.collection == collection)?.selectRoute || { route: [] };
    }
}