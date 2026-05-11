import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { AfastamentoDaoService } from '../dao/afastamento-dao.service';
import { LexicalService } from './lexical.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { TipoTarefaDaoService } from 'src/app/dao/tipo-tarefa-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { TemplateDaoService } from "src/app/dao/template-dao.service";
import { CadeiaValorDaoService } from '../dao/cadeia-valor-dao.service';
import { CapacidadeDaoService } from '../dao/capacidade-dao.service';
import { AtividadeTarefaDaoService } from '../dao/atividade-tarefa-dao.service';
import { DocumentoDaoService } from '../dao/documento-dao-service';
import { EixoTematicoDaoService } from '../dao/eixo-tematico-dao.service';
import { EntregaDaoService } from '../dao/entrega-dao.service';
import { IntegracaoDaoService } from '../dao/integracao-dao.service';
import { PlanejamentoDaoService } from '../dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from '../dao/planejamento-objetivo-dao.service';
import { PlanoEntregaDaoService } from '../dao/plano-entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from '../dao/plano-entrega-entrega-dao.service';
import { ProgramaParticipanteDaoService } from '../dao/programa-participante-dao.service';
import { TipoAvaliacaoJustificativaDaoService } from '../dao/tipo-avaliacao-justificativa-dao.service';
import { TipoCapacidadeDaoService } from '../dao/tipo-capacidade-dao.service';
import { UnidadeIntegranteDaoService } from '../dao/unidade-integrante-dao.service';
import { CadeiaValorProcessoDaoService } from '../dao/cadeia-valor-processo-dao.service';
import { ChangeDaoService } from '../dao/change-dao.service';
import { ErrorDaoService } from '../dao/error-dao.service';
import { TrafficDaoService } from '../dao/traffic-dao.service';
import { FuncaoDaoService } from '../dao/funcao-dao.service';
import { PlanoEntregaEntregaObjetivoDaoService } from '../dao/plano-entrega-entrega-objetivo-dao.service';
import { PlanoEntregaEntregaProcessoDaoService } from '../dao/plano-entrega-entrega-processo-dao.service';
import { CapacidadeTecnicaDaoService } from '../dao/capacidade-tecnica-dao.service';
import { AtividadeDaoService } from '../dao/atividade-dao.service';
import { PlanoTrabalhoConsolidacaoDaoService } from '../dao/plano-trabalho-consolidacao-dao.service';
import { OcorrenciaDaoService } from '../dao/ocorrencia-dao.service';
import { EnvioDaoService } from '../dao/envio-dao.service';
import { ClienteDaoService } from '../dao/cliente-dao.service';
import { TipoClienteDaoService } from '../dao/tipo-cliente-dao.service';
import { SolucaoDaoService } from '../dao/solucao-dao.service';
let EntityService = class EntityService {
    constructor(injector) {
        this.injector = injector;
        this.lex = injector.get(LexicalService);
        this.list = [
            { collection: 'Adesao', icon: 'bi bi-universal-access-circle', label: "Adesão" },
            { collection: 'Afastamento', codigo: 'MOD_AFT', table: 'afastamentos', campo: 'observacoes', icon: 'bi bi-toggle-off', dao: injector.get(AfastamentoDaoService), label: "Afastamento", selectRoute: { route: ['gestao', 'afastamento'] } },
            { collection: 'Atividade', codigo: 'MOD_ATV', table: 'atividades', campo: 'descricao', icon: 'bi bi-activity', dao: injector.get(AtividadeDaoService), label: "Atividade", selectRoute: { route: ['gestao', 'atividade'] } },
            { collection: 'AtividadeTarefa', table: 'atividades_tarefas', campo: 'atividade_id', icon: '', dao: injector.get(AtividadeTarefaDaoService), label: "Tarefa da Atividade" },
            { collection: 'CadeiaValor', codigo: 'MOD_CADV', table: 'cadeias_valores', campo: 'nome', icon: 'bi bi-bar-chart-steps', dao: injector.get(CadeiaValorDaoService), label: "Cadeia de Valor", selectRoute: { route: ['gestao', 'cadeia-valor'] } },
            { collection: 'CadeiaValorProcesso', table: 'cadeias_valores_processos', campo: 'nome', icon: '', dao: injector.get(CadeiaValorProcessoDaoService), label: "Processo da Cadeia de Valor", selectRoute: { route: ['gestao', 'cadeia-valor', 'processoList'] } },
            { collection: 'Capacidade', table: 'capacidades', campo: 'tipo_capacidade_id', icon: '', dao: injector.get(CapacidadeDaoService), label: "Capacidade" },
            { collection: 'CapacidadeTecnica', codigo: 'MOD_RX_CURR', table: 'capacidades_tecnicas', campo: 'nome', icon: 'bi bi-arrows-angle-contract', dao: injector.get(CapacidadeTecnicaDaoService), label: "Capacidade Técnica", selectRoute: { route: ['raiox', 'cadastros', 'capacidade-tecnica'] } },
            { collection: 'Cliente', table: 'clientes', campo: 'row_id', icon: 'bi bi-briefcase-fill', dao: injector.get(ClienteDaoService), label: "Clientes", selectRoute: { route: ['cadastros', 'cliente'] } },
            { collection: 'Change', table: 'changes', campo: 'row_id', icon: 'bi bi-filter-square', dao: injector.get(ChangeDaoService), label: "Log de Alteração", selectRoute: { route: ['logs', 'change'] } },
            { collection: 'Cidade', codigo: 'MOD_CID', table: 'cidades', campo: 'nome', icon: 'bi bi-building', dao: injector.get(CidadeDaoService), label: "Cidade", selectRoute: { route: ['cadastros', 'cidade'] } },
            { collection: 'ConsultaCPFSIAPE', icon: 'bi bi-clipboard-check', label: "Consulta CPF SIAPE" },
            { collection: 'ConsultaUnidadeSIAPE', icon: 'bi bi-clipboard2-check-fill', label: "Consulta Unidade SIAPE" },
            { collection: 'Documento', table: 'documentos', campo: 'numero', icon: '', dao: injector.get(DocumentoDaoService), label: "Documento" },
            { collection: 'EixoTematico', codigo: 'MOD_EXTM', table: 'eixos_tematicos', campo: 'nome', icon: 'bi bi-gear', dao: injector.get(EixoTematicoDaoService), label: "Eixo Temático", selectRoute: { route: ['cadastros', 'eixo-tematico'] } },
            { collection: 'Entidade', codigo: 'MOD_ENTD', table: 'entidades', campo: 'nome', icon: 'bi bi-bookmark-heart', dao: injector.get(EntidadeDaoService), label: "Entidade", selectRoute: { route: ['configuracoes', 'entidade'] } },
            { collection: 'Entrega', codigo: 'MOD_ENTRG', table: 'entregas', campo: 'nome', icon: 'bi bi-list-check', dao: injector.get(EntregaDaoService), label: "Entrega", selectRoute: { route: ['cadastros', 'entrega'] } },
            { collection: 'Envio', table: 'envios', campo: 'id', icon: 'bi bi-send', dao: injector.get(EnvioDaoService), label: "Log de Envios à API PGD", selectRoute: { route: ['logs', 'envios'] } },
            { collection: 'Error', table: 'errors', campo: 'type', icon: 'bi bi-bug', dao: injector.get(ErrorDaoService), label: "Log de Erro", selectRoute: { route: ['logs', 'error'] } },
            { collection: 'Feriado', codigo: 'MOD_FER', table: 'feriados', campo: 'nome', icon: 'bi bi-emoji-sunglasses', dao: injector.get(FeriadoDaoService), label: "Feriado", selectRoute: { route: ['cadastros', 'feriado'] } },
            { collection: 'Funcao', codigo: 'MOD_RX_CURR', table: 'funcoes', campo: 'nome', icon: 'bi bi-check-circle-fill', dao: injector.get(FuncaoDaoService), label: "Função", selectRoute: { route: ['raiox', 'cadastros', 'funcao'] } },
            { collection: 'Integracao', table: 'integracoes', campo: 'usuario_id', icon: 'bi bi-pencil-square', dao: injector.get(IntegracaoDaoService), label: "Integração" },
            { collection: 'Perfil', codigo: 'MOD_PERF', table: 'perfis', campo: 'nome', icon: 'bi bi-fingerprint', dao: injector.get(PerfilDaoService), label: "Perfil", selectRoute: { route: ['configuracoes', 'perfil'] } },
            { collection: 'Ocorrencia', codigo: 'MOD_OCOR', table: 'ocorrencias', campo: 'descricao', icon: 'bi bi-exclamation-diamond', dao: injector.get(OcorrenciaDaoService), label: "Ocorrência", selectRoute: { route: ['gestao', 'ocorrencia'] } },
            { collection: 'Planejamento', codigo: 'MOD_PLAN_INST', table: 'planejamentos', campo: 'nome', icon: 'bi bi-journals', dao: injector.get(PlanejamentoDaoService), label: "Planejamento Institucional", selectRoute: { route: ['gestao', 'planejamento'] } },
            { collection: 'PlanejamentoObjetivo', table: 'planejamentos_objetivos', campo: 'nome', icon: 'bi bi-bullseye', dao: injector.get(PlanejamentoObjetivoDaoService), label: "Objetivo do Planejamento", selectRoute: { route: ['gestao', 'planejamento', 'objetivoList'] } },
            { collection: 'PlanoTrabalho', codigo: 'MOD_PTR', table: 'planos_trabalhos', campo: 'numero', icon: 'bi bi-list-stars', dao: injector.get(PlanoTrabalhoDaoService), label: "Plano de Trabalho", selectRoute: { route: ['gestao', 'plano-trabalho'] } },
            { collection: 'PlanoTrabalhoConsolidacao', codigo: 'MOD_PTR_CSLD', table: 'planos_trabalhos_consolidacoes', icon: 'bi bi-clipboard-check', dao: injector.get(PlanoTrabalhoConsolidacaoDaoService), label: "Consolidações", selectRoute: { route: ['gestao', 'plano-trabalho', 'consolidacao'] } },
            { collection: 'PlanoEntrega', codigo: 'MOD_PENT', table: 'planos_entregas', campo: 'nome', icon: 'bi bi-list-columns-reverse', dao: injector.get(PlanoEntregaDaoService), label: "Plano de Entrega", selectRoute: { route: ['gestao', 'plano-entrega'] } },
            { collection: 'PlanoEntregaEntrega', codigo: 'MOD_PENT_ENTR', table: 'planos_entregas_entregas', campo: 'descricao', icon: 'bi bi-list-check', dao: injector.get(PlanoEntregaEntregaDaoService), label: "Entrega do Plano de Entrega", selectRoute: { route: ['gestao', 'plano-entrega', 'entrega-list'] } },
            { collection: 'PlanoEntregaObjetivo', codigo: 'MOD_PENT_OBJ', table: 'planos_entregas_objetivos', campo: 'descricao', icon: '', dao: injector.get(PlanoEntregaEntregaObjetivoDaoService), label: "Objetivo do Plano de Entrega" },
            { collection: 'PlanoEntregaProcesso', codigo: 'MOD_PENT_PRO', table: 'planos_entregas_processos', campo: 'descricao', icon: '', dao: injector.get(PlanoEntregaEntregaProcessoDaoService), label: "Processo do Plano de Entrega" },
            { collection: 'Preferencia', icon: 'bi bi-person-fill-gear', label: "Preferência" },
            { collection: 'Programa', codigo: 'MOD_PRGT', table: 'programas', campo: 'nome', icon: 'bi bi-graph-up-arrow', dao: injector.get(ProgramaDaoService), label: "Programa de Gestão", selectRoute: { route: ['gestao', 'programa'] } },
            { collection: 'ProgramaParticipante', table: 'programas_participantes', campo: 'usuario_id', icon: '', dao: injector.get(ProgramaParticipanteDaoService), label: "Participante do Programa" },
            { collection: 'RelatorioArea', icon: 'bi bi-diagram-3-fill', label: "Área" },
            { collection: 'RelatorioServidor', icon: 'bi bi-file-person', label: "Servidor" },
            { collection: 'Solucao', codigo: 'MOD_SOLUCOES', table: 'solucao_produtos_servicos', campo: 'nome', icon: 'bi bi-cart', dao: injector.get(SolucaoDaoService), label: "Soluções de Produtos e Serviços", selectRoute: { route: ['gestao', 'solucao'] } },
            { collection: 'TipoTarefa', table: 'tipos_tarefas', campo: 'nome', icon: 'bi bi-boxes', dao: injector.get(TipoTarefaDaoService), label: "Tipo de Tarefa", selectRoute: { route: ['cadastros', 'tipo-tarefa'] } },
            { collection: 'Template', codigo: 'MOD_TEMP', table: 'templates', campo: 'titulo', icon: 'bi bi-archive', dao: injector.get(TemplateDaoService), label: "Template", selectRoute: { route: ['cadastros', 'template'] } },
            { collection: 'Teste', icon: 'bi bi-clipboard-check', label: "Teste" },
            { collection: 'TipoAtividade', codigo: 'MOD_TIPO_ATV', table: 'tipos_atividades', campo: 'nome', icon: 'bi bi-clipboard-pulse', dao: injector.get(TipoAtividadeDaoService), label: "Tipo de Atividade", selectRoute: { route: ['cadastros', 'tipo-atividade'] } },
            { collection: 'TipoAvaliacao', codigo: 'MOD_TIPO_AVAL', table: 'tipos_avaliacoes', campo: 'nome', icon: 'bi bi-question-square', dao: injector.get(TipoAvaliacaoDaoService), label: "Tipo de Avaliação", selectRoute: { route: ['cadastros', 'tipo-avaliacao'] } },
            { collection: 'TipoAvaliacaoJustificativa', table: 'tipos_avaliacoes_justificativas', campo: 'tipo_avaliacao_id', icon: '', dao: injector.get(TipoAvaliacaoJustificativaDaoService), label: "Justificativa do Tipo de Avaliação" },
            { collection: 'TipoCapacidade', codigo: 'MOD_TIPO_CAP', table: 'tipos_capacidades', campo: 'descricao', icon: '', dao: injector.get(TipoCapacidadeDaoService), label: "Tipo de Capacidade" },
            { collection: 'TipoCliente', codigo: 'MOD_TIPO_CLI', table: 'tipos_clientes', campo: 'nome', icon: 'bi bi-people', dao: injector.get(TipoClienteDaoService), label: "Tipo de Cliente" },
            { collection: 'TipoDocumento', codigo: 'MOD_TIPO_DOC', table: 'tipos_documentos', campo: 'nome', icon: 'bi bi-files', dao: injector.get(TipoDocumentoDaoService), label: "Tipo de Documento", selectRoute: { route: ['cadastros', 'tipo-documento'] } },
            { collection: 'TipoJustificativa', codigo: 'MOD_TIPO_JUST', table: 'tipos_justificativas', campo: 'nome', icon: 'bi bi-window-stack', dao: injector.get(TipoJustificativaDaoService), label: "Tipo de Justificativa", selectRoute: { route: ['cadastros', 'tipo-justificativa'] } },
            { collection: 'TipoMotivoAfastamento', codigo: 'MOD_TIPO_MTV_AFT', table: 'tipos_motivos_afastamentos', campo: 'nome', icon: 'bi bi-list-ol', dao: injector.get(TipoMotivoAfastamentoDaoService), label: this.lex.translate("Motivo de Afastamento"), selectRoute: { route: ['cadastros', 'tipo-motivo-afastamento'] } },
            { collection: 'TipoProcesso', codigo: 'MOD_TIPO_PROC', table: 'tipos_processos', campo: 'nome', icon: 'bi bi-folder-check', dao: injector.get(TipoProcessoDaoService), label: "Tipo de Processo", selectRoute: { route: ['cadastros', 'tipo-processo'] } },
            { collection: 'Traffic', table: 'traffic', campo: 'url', icon: 'bi bi-stoplights', dao: injector.get(TrafficDaoService), label: "Log de Tráfego", selectRoute: { route: ['logs', 'traffic'] } },
            { collection: 'Unidade', codigo: 'MOD_UND', table: 'unidades', campo: 'nome', icon: 'fa-unity fab', dao: injector.get(UnidadeDaoService), label: "Unidade", selectRoute: { route: ['configuracoes', 'unidade'] } },
            { collection: 'UnidadeIntegrante', table: 'unidades_integrantes', campo: 'atribuicao', icon: '', dao: injector.get(UnidadeIntegranteDaoService), label: "Integrante da Unidade" },
            { collection: 'Usuario', codigo: 'MOD_USER', table: 'usuarios', campo: 'nome', icon: 'bi bi-people', dao: injector.get(UsuarioDaoService), label: "Usuário", selectRoute: { route: ['configuracoes', 'usuario'] } },
        ];
    }
    getDao(collection) {
        return this.list.find(x => x.collection == collection)?.dao;
    }
    getLabel(collection) {
        let entity = this.list.find(x => x.collection == collection);
        return entity ? this.lex.translate(entity.label) : '';
    }
    getIcon(collection) {
        return this.list.find(x => x.collection == collection)?.icon || '';
    }
    getCampo(collection) {
        return this.list.find(x => x.collection == collection)?.campo;
    }
    getTable(collection) {
        return this.list.find(x => x.collection == collection)?.table;
    }
    getSelectRoute(collection) {
        return this.list.find(x => x.collection == collection)?.selectRoute || { route: [] };
    }
};
EntityService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EntityService);
export { EntityService };
//# sourceMappingURL=entity.service.js.map