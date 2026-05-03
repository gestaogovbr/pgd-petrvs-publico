import { PageListBase } from 'src/app/modules/base/page-list-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { AtividadeService } from './atividade.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
export class AtividadeListBase extends PageListBase {
    constructor(injector) {
        super(injector, Atividade, AtividadeDaoService);
        this.injector = injector;
        this.etiquetas = [];
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this.DATAS_FILTRO = [
            { key: "DISTRIBUICAO", value: "Distribuição", icon: "bi bi-file-earmark-plus", color: "badge rounded-pill bg-warning text-dark" },
            { key: "PRAZO", value: "Prazo", icon: "bi bi-calendar-check", color: "badge rounded-pill bg-info text-dark" },
            { key: "CONCLUSAO", value: "Conclusão", icon: "bi bi-check-circle", color: "badge rounded-pill bg-info text-dark" }
        ];
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.planoTrabalhoDao = injector.get(PlanoTrabalhoDaoService);
        this.tipoAtividadeDao = injector.get(TipoAtividadeDaoService);
        this.tipoProcessoDao = injector.get(TipoProcessoDaoService);
        this.atividadeService = injector.get(AtividadeService);
        this.calendar = injector.get(CalendarService);
        this.comentario = injector.get(ComentarioService);
        this.join = ["tipo_atividade", "plano_trabalho_entrega.plano_entrega_entrega:id,descricao", "demandante", "pausas", "usuario", "unidade", "comentarios.usuario:id,nome,apelido", "tarefas.tipo_tarefa", "tarefas.comentarios.usuario:id,nome,apelido", "reacoes.usuario:id,nome,apelido"];
        /* Inicializações */
        this.extra = { planos_trabalho: {}, afastamentos: {} };
        this.optionsMetadata = {
            refreshId: ((id) => (this.grid?.query || this.query).refreshId(id)).bind(this),
            removeId: ((id) => (this.grid?.query || this.query).removeId(id)).bind(this),
            refresh: this.refresh.bind(this)
        };
    }
    onGridLoad(rows) {
        /* Ordena os comentários */
        rows?.forEach((atividade) => {
            atividade.comentarios = this.comentario.orderComentarios(atividade.comentarios);
        });
        /* Recebe informações extra da query para auxiliar em cálculos e melhorar performace da consulta */
        const extra = (this.grid?.query || this.query).extra;
        if (extra) {
            //this.extra.avaliadores = Object.assign(this.extra.avaliadores, extra.avaliadores || {});
            this.extra.planos_trabalho = Object.assign(this.extra.planos_trabalho, extra.planos || {});
            for (let [key, value] of Object.entries(extra.afastamentos || {})) {
                this.extra.afastamentos[key] = value.reduce((a, v) => {
                    if (!a.find(x => x.id == v.id))
                        a.push(v);
                    return a;
                }, this.extra.afastamentos[key] || []);
            }
            Object.entries(extra.feriados || {}).forEach(([key, value]) => {
                if (!this.calendar.feriadosCadastrados[key])
                    this.calendar.feriadosCadastrados[key] = value;
            });
            rows?.forEach(a => {
                a.planoTrabalho = extra.planos_trabalho[a.plano_trabalho_id];
            });
            this.cdRef.detectChanges();
        }
    }
    onAtribuidasParaMimChange(event) {
        if (this.filter.controls.atribuidas_para_mim.value) {
            this.filter.controls.usuario_id.setValue(this.auth.usuario.id);
        }
        else {
            this.filter.controls.usuario_id.setValue(undefined);
        }
    }
    onSomenteUnidadeAtualChange(event) {
        if (this.filter.controls.somente_unidade_atual.value) {
            this.filter.controls.unidade_id.setValue(this.auth.unidade.id);
        }
        else {
            this.filter.controls.unidade_id.setValue(undefined);
        }
    }
    onDespendidoClick(row) {
        if (row.metadados && !row.metadados.concluido) {
            const cargaHoraria = this.extra?.planos_trabalho[row.plano_trabalho_id]?.carga_horaria || 0;
            const afastamentos = this.extra?.afastamentos[row.usuario_id] || [];
            this.efemerides = this.calendar.calculaDataTempoUnidade(row.data_inicio, this.auth.hora, cargaHoraria, row.unidade, "ENTREGA", row.pausas, afastamentos);
            this.dialog.template({ title: "Cálculos do tempo despendido" }, this.calendarEfemerides, []);
        }
    }
    onEtiquetaConfigClick() {
        this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id], params: { etiquetas: true } }, {
            modal: true, modalClose: (modalResult) => {
                this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
                this.cdRef.detectChanges();
            }
        });
    }
    comentarioClick(element) {
        const value = element.getAttribute("data-expanded");
        element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }
    addComentarioClick(row) {
        this.go.navigate({ route: ['gestao', 'atividade', row.id, 'comentar'] }, { modal: true, modalClose: modalResult => { if (modalResult)
                (this.grid?.query || this.query).refreshId(row.id); } });
    }
}
//# sourceMappingURL=atividade-list-base.js.map