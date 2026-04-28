import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { AtividadeListBase } from '../atividade-list-base';
let AtividadeListKanbanComponent = class AtividadeListKanbanComponent extends AtividadeListBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.minhas = false;
        this.TITLE_OUTRAS = "Outras";
        this.NAOINICIADO = 0;
        this.PAUSADO = 1;
        this.INICIADO = 2;
        this.CONCLUIDO = 3;
        this.AVALIADO = 4;
        this.DOCKERS = ["NAOINICIADO", "PAUSADO", "INICIADO", "CONCLUIDO"];
        this.cards = [[], [], [], []];
        this.cardsConfig = { naoIniciado: false, pausado: false, iniciado: false, concluido: false };
        this.labels = [];
        this.cardsVersion = 0;
        this.dragDrop = {};
        this.rowsLimit = 500;
        this.kanbanQueryOptions = {};
        this.etiquetasEdit = [];
        this.planosEntregas = [];
        this.planosEntregasEntregas = [];
        this.toolbarButtons = [
            {
                icon: "bi bi-search",
                label: "Filtros",
                onClick: () => this.filterRef?.toggle()
            },
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                label: "Incluir",
                onClick: async () => await this.add()
            }
        ];
        this.outrasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.etiquetasButtons = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-success",
                hint: "Incluir nova lista a direita",
                onClick: this.incluirLista.bind(this)
            }
        ];
        this.menuDockerNaoIniciado = [
            {
                icon: "bi bi-plus-circle",
                color: "btn-outline-primary",
                hint: "Incluir",
                onClick: async () => await this.add()
            }
        ];
        this.filterWhere = (filter) => {
            let result = this.fixedFilter || [];
            let form = filter.value;
            if (form.somente_unidade_atual && form.unidade_id != this.auth.unidade?.id) {
                filter.controls.unidade_id.setValue(this.auth.unidade?.id);
                form.unidade_id = this.auth.unidade?.id;
            }
            /* Verifica se Minhas está selecionado e o usuário está diferente do logado (vazio) */
            if (form.atribuidas_para_mim && form.usuario_id != this.auth.usuario?.id) {
                filter.controls.usuario_id.setValue(this.auth.usuario?.id);
                form.usuario_id = this.auth.usuario.id;
            }
            if (form.usuario_id?.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
            }
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.unidades_subordinadas) {
                result.push(["unidades_subordinadas", "==", true]);
            }
            if (form.etiquetas?.length) {
                result.push(["etiquetas", "in", form.etiquetas.map((x) => x.value)]);
            }
            if (form.numero_processo?.length) {
                result.push(["numero_processo", "==", form.numero_processo]);
            }
            if (form.status?.length && !result.find(x => x[0] == "status")) {
                result.push(["status", "==", form.status]);
            }
            if (form.plano_entrega_id?.length) {
                result.push(["plano_entrega_id", "==", form.plano_entrega_id]);
            }
            if (form.plano_entrega_entrega_id?.length) {
                result.push(["plano_entrega_entrega_id", "==", form.plano_entrega_entrega_id]);
            }
            result.push(["data_arquivamento", "==", null]); /* Não trazer as arquivadas */
            return result;
        };
        /* Inicializações */
        this.code = "MOD_DMD";
        this.filter = this.fh.FormBuilder({
            atribuidas_para_mim: { default: this.minhas },
            usuario_id: { default: "" },
            somente_unidade_atual: { default: false },
            unidades_subordinadas: { default: false },
            unidade_id: { default: "" },
            numero_processo: { default: "" },
            status: { default: "" },
            usarEtiquetas: { default: !!this.usuarioConfig?.kanban_usar_etiquetas },
            resumido: { default: !!this.usuarioConfig?.kanban_resumido },
            etiquetas: { default: [] },
            plano_entrega_id: { default: null },
            plano_entrega_entrega_id: { default: null },
        });
        this.formEdit = this.fh.FormBuilder({
            etiqueta: { default: null }
        });
        this.cardsConfig = Object.assign(this.cardsConfig, this.usuarioConfig?.kanban_status_dockers);
        this.groupBy = [];
        this.loadEtiquetas();
        this.loadLabel();
    }
    defaultUsuarioConfig() {
        return Object.assign(super.defaultUsuarioConfig(), {
            active_tab: "TABELA",
            kanban_resumido: false,
            kanban_usar_etiquetas: false,
            kanban_status_dockers: { naoIniciado: false, pausado: false, iniciado: false, concluido: false },
            kanban_etiquetas_dockers: []
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.minhas) {
            this.filter?.controls.atribuidas_para_mim.setValue(true);
            this.filter?.controls.usuario_id.setValue(this.auth.usuario?.id);
        }
        else {
            this.filter?.controls.unidade_id.setValue(this.auth.unidade?.id);
        }
        this.query.onLoadingChange = (loading) => {
            this.loading = loading;
            this.cdRef.detectChanges();
        };
        this.loading = this.query.loading;
        this.query.subject.asObservable().subscribe(this.onQueryLoad.bind(this));
        this.cdRef.detectChanges();
    }
    isOutras(x) {
        return x.title == this.TITLE_OUTRAS && !x.labels.length;
    }
    loadLabel() {
        const dockers = [...(this.usuarioConfig?.kanban_etiquetas_dockers || [])];
        if (!dockers.find(this.isOutras.bind(this)))
            dockers.splice(0, 0, { title: this.TITLE_OUTRAS, labels: [], collapse: false });
        this.labels = dockers.reduce((a, v) => {
            if (!a.find((x) => (x.title?.length && x.title == v.title) || (x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key))) {
                a.push({
                    labels: this.isOutras(v) ? [] : v.labels,
                    title: v.title,
                    menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
                    cards: [],
                    editing: false,
                    collapse: v.collapse
                });
            }
            return a;
        }, []);
        /*this.labels = dockers.map(x => {
          return {
            labels: this.isOutras(x) ? [] : x.labels,
            title: x.title,
            menu: this.isOutras(x) ? this.outrasButtons : this.etiquetasButtons,
            cards: [],
            editing: false,
            collapse: x.collapse
          }
        });*/
    }
    get isEtiquetas() {
        return !!this.filter?.controls?.usarEtiquetas?.value;
    }
    onUsarEtiquetasChange(event) {
        this.saveUsuarioConfig({ kanban_usar_etiquetas: this.filter.controls.usarEtiquetas.value });
        if (this.query)
            this.onQueryLoad(this.query.rows);
    }
    incluirLista(docker) {
        this.labels.splice(docker.key + 1, 0, {
            labels: [],
            menu: this.etiquetasButtons,
            cards: [],
            editing: true,
            collapse: false
        });
        this.kanbanEtiquetas?.refreshDoubleScrollbar();
        this.cdRef.detectChanges();
    }
    onResumidoChange(event) {
        this.saveUsuarioConfig({ kanban_resumido: this.filter.controls.resumido.value });
        this.cdRef.detectChanges();
    }
    loadEtiquetas() {
        //this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
    }
    getLabelStyle(label) {
        const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
        //const txtColor = this.util.contrastColor(bgColor);
        return `border-color: ${bgColor} !important;`;
    }
    onDockerCollapse(docker, collapse) {
        if (this.isEtiquetas) {
            this.labels[docker.key].collapse = collapse;
            this.saveEtiquetasUsuarioConfig();
        }
        else {
            this.cardsConfig = {
                naoIniciado: !!this.dockerNaoIniciado?.collapse,
                pausado: !!this.dockerPausado?.collapse,
                iniciado: !!this.dockerIniciado?.collapse,
                concluido: !!this.dockerConcluido?.collapse
            };
            this.saveUsuarioConfig({ kanban_status_dockers: this.cardsConfig });
        }
        this.kanbanEtiquetas?.refreshDoubleScrollbar();
    }
    async editEtiquetas(docker) {
        const label = this.labels[docker.key];
        const allUsed = this.labels.reduce((a, v, i) => {
            if (v.labels.length && i != docker.key)
                a.push(v.labels[0].key);
            return a;
        }, []);
        this.etiquetasEdit = this.etiquetas.filter(x => !allUsed.includes(x.key));
        this.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
    }
    saveEtiquetasUsuarioConfig() {
        const dockers = this.labels.reduce((a, v) => {
            if (!a.find((x) => (x.title?.length && x.title == v.title) || (x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key))) {
                a.push({
                    title: v.title,
                    labels: v.labels,
                    collapse: v.collapse
                });
            }
            return a;
        }, []);
        /*const dockers = this.labels.map(x => {
          return {
            title: x.title,
            labels: x.labels,
            collapse: x.collapse
          }
        });*/
        this.saveUsuarioConfig({ kanban_etiquetas_dockers: dockers });
    }
    async saveEtiquetas(docker) {
        const key = this.formEdit.controls.etiqueta.value;
        if (key?.length) {
            const label = this.labels[docker.key];
            const etiqueta = this.etiquetasEdit.find(x => x.key == key);
            if (etiqueta)
                label.labels = [etiqueta];
            if (this.query)
                this.onQueryLoad(this.query.rows);
            this.saveEtiquetasUsuarioConfig();
            return true;
        }
        return false;
    }
    async cancelEtiquetas(docker) {
        const label = this.labels[docker.key];
        if (!label.labels?.length) {
            this.labels.splice(docker.key, 1);
            this.kanbanEtiquetas?.refreshDoubleScrollbar();
        }
    }
    async deleteEtiquetas(docker) {
        this.labels.splice(docker.key, 1);
        this.kanbanEtiquetas?.refreshDoubleScrollbar();
        if (this.query)
            this.onQueryLoad(this.query.rows);
        this.saveEtiquetasUsuarioConfig();
    }
    getNomes(context) {
        return Object.getOwnPropertyNames(context.filter.controls || {}).join(",");
    }
    modalRefreshId(atividade) {
        return {
            modal: true,
            modalClose: (modalResult) => {
                const destination = this.dragDrop.destination;
                const source = this.dragDrop.source;
                if (modalResult) {
                    if (destination && source) {
                        destination.list.splice(destination.index, 0, destination.card);
                        source.list.splice(source.index, 1);
                    }
                    (this.grid?.query || this.query).refreshId(atividade.id);
                }
                this.dragDrop = {};
            }
        };
    }
    mergeEtiqueta(etiqueta) {
        if (!this.etiquetas.find(x => x.key == etiqueta.key)) {
            this.etiquetas.push(etiqueta);
        }
    }
    filterSubmit(filter) {
        super.filterSubmit(filter);
        this.cards = [[], [], [], []];
        this.labels.forEach(x => x.cards = []);
        return this.queryOptions;
    }
    onQueryLoad(rows) {
        super.onGridLoad(rows);
        this.cardsVersion++;
        if (!this.filter?.controls?.usarEtiquetas?.value) {
            rows?.forEach(row => {
                const atividade = row;
                let status = this.lookup.ATIVIDADE_STATUS.find(x => x.key == atividade.status)?.key;
                switch (status || "INCLUIDO") {
                    case "PAUSADO":
                        this.putCard(this.cards[this.PAUSADO], atividade);
                        break;
                    case "INICIADO":
                        this.putCard(this.cards[this.INICIADO], atividade);
                        break;
                    case "CONCLUIDO":
                        this.putCard(this.cards[this.CONCLUIDO], atividade);
                        break;
                    default: this.putCard(this.cards[this.NAOINICIADO], atividade);
                }
            });
            for (let cards of this.cards) {
                for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++)
                    ;
            }
        }
        else {
            const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
            rows?.forEach(row => {
                let atividade = row;
                let docker = undefined;
                atividade.etiquetas = atividade.etiquetas || [];
                for (let i = 0; i < atividade.etiquetas.length; i++) {
                    for (let j = 1; j < this.labels.length && !docker; j++) {
                        if (this.labels[j].labels[0].key == atividade.etiquetas[i].key)
                            docker = this.labels[j];
                    }
                    if (!this.etiquetas.some(x => x.key == atividade.etiquetas[i].key))
                        this.etiquetas.push(atividade.etiquetas[i]);
                }
                this.putCard(docker?.cards || this.labels[outrasIndex]?.cards || [], atividade);
            });
            for (let cards of this.labels.map(x => x.cards || [])) {
                for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++)
                    ;
            }
            /*this.labels[0].labels = [];
            this.etiquetas.forEach(x => {
              if(!this.labels.find(y => y.labels.find(z => z.key == x.key))) this.labels[0].labels.push(x)
            });*/
        }
        this.cdRef.detectChanges();
    }
    putCard(list, atividade) {
        const index = list.findIndex(x => x.id == atividade.id);
        const card = {
            id: atividade.id,
            title: atividade.tipo_atividade?.nome || "(" + this.lex.translate('Atividade') + " sem tipo de registro de execução atribuído)",
            subTitle: atividade.descricao || "",
            data: atividade,
            version: this.cardsVersion,
            menu: undefined,
            dynamicMenu: this.dynamicCardMenu.bind(this)
        };
        if (index >= 0) {
            list[index] = Object.assign(list[index], card);
        }
        else {
            list.push(card);
        }
    }
    dynamicCardMenu(card) {
        const menu = this.atividadeService.dynamicButtons.bind(this)(card.data, this.optionsMetadata);
        menu.push({
            icon: "bi bi-three-dots",
            hint: "Opções",
            dynamicItems: this.cardDynamicOptions.bind(this)
        });
        if (!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join())
            card.menu = menu;
        return card.menu;
    }
    cardDynamicOptions(card) {
        const olders = card.menu?.find(x => x.hint == "Opções");
        if (olders) {
            const options = this.atividadeService.dynamicOptions.bind(this)(card.data, this.optionsMetadata);
            if (!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join())
                olders.items = options;
        }
        return olders?.items;
    }
    canDrop(status) {
        let self = this;
        return (drag) => {
            if (self.isEtiquetas) {
                return true;
            }
            else {
                const buttons = self.atividadeService.dynamicOptions.bind(self)(drag.data, self.optionsMetadata);
                return !!buttons.find(x => x.id == status);
            }
        };
    }
    updateEtiquetasAtividade(dragDrop) {
        const sourceLabel = this.labels.find(x => x.cards == dragDrop.source.list)?.labels[0];
        const destinationLabel = this.labels.find(x => x.cards == dragDrop.destination.list)?.labels[0];
        const atividade = dragDrop.destination.atividade;
        if (sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key)
            return;
        if (sourceLabel)
            atividade.etiquetas.splice(atividade.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
        if (destinationLabel)
            atividade.etiquetas.unshift(destinationLabel);
        this.loading = true;
        this.dao.update(atividade.id, { etiquetas: atividade.etiquetas }).then(atividade => this.modalRefreshId(atividade).modalClose.bind(this)(atividade.id)).finally(() => this.loading = false);
    }
    onDragged(item, list, effect) {
        if (["copy", "move"].includes(effect)) {
            const index = list.indexOf(item);
            this.dragDrop.source = { list, index };
            if (this.isEtiquetas)
                this.updateEtiquetasAtividade(this.dragDrop);
        }
    }
    onDrop(event, list) {
        if (list && ["copy", "move"].includes(event.dropEffect)) {
            const atividade = event.data.data;
            const card = event.data;
            let index = typeof event.index === "undefined" ? list.length : event.index;
            this.dragDrop = { destination: { list, index, card, atividade } };
            if (!this.isEtiquetas) {
                const buttons = this.atividadeService.dynamicOptions.bind(this)(atividade, this.optionsMetadata);
                const docker = this.cards.indexOf(list);
                if (docker >= 0) {
                    const action = buttons.find(x => x.id == this.DOCKERS[docker]);
                    if (action?.onClick)
                        action?.onClick(atividade);
                }
            }
        }
    }
    onStatusClick(status) {
        this.filter?.controls.status.setValue(status.data?.status);
        this.filterCollapsed = false;
        this.filterRef?.onButtonFilterClick();
        this.cdRef.detectChanges();
    }
    onEtiquetaClick(etiqueta) {
        let etiquetas = this.filter.controls.etiquetas.value;
        etiquetas.push(etiqueta);
        this.filter?.controls.etiquetas.setValue(etiquetas);
        this.filterCollapsed = false;
        this.filterRef?.onButtonFilterClick();
        this.cdRef.detectChanges();
    }
    filterClear(filter) {
        this.filter.controls.atribuidas_para_mim.setValue(false);
        this.filter.controls.usuario_id.setValue("");
        this.filter.controls.somente_unidade_atual.setValue(false);
        this.filter.controls.unidades_subordinadas.setValue(false);
        this.filter.controls.unidade_id.setValue("");
        this.filter.controls.numero_processo.setValue("");
        this.filter.controls.plano_entrega_id.setValue(null);
        this.filter.controls.plano_entrega_entrega_id.setValue(null);
        if (!this.fixedFilter?.length || !this.fixedFilter.find(x => x[0] == "status"))
            this.filter.controls.status.setValue(null);
        this.filter.controls.etiquetas.setValue([]);
        super.filterClear(filter);
    }
    onSwimlaneDrop(event, fromIndex) {
        const element = this.labels[fromIndex];
        const toIndex = fromIndex < event.index ? event.index - 1 : event.index;
        this.labels.splice(fromIndex, 1);
        this.labels.splice(toIndex, 0, element);
        this.saveEtiquetasUsuarioConfig();
    }
    onEntregaClick(atividade) {
        this.go.navigate({ route: ['gestao', 'atividade', atividade.id, 'hierarquia'] }, { metadata: { atividade: atividade } });
    }
    async onUnidadeChange(event) {
        let unidade_selecionada = await this.unidadeDao.getById(this.filter?.controls.unidade_id.value, ['planos_entrega']);
        this.planosEntregas = unidade_selecionada?.planos_entrega?.map(x => Object.assign({
            key: x.id,
            value: x.nome
        })) || [];
    }
    async onPlanoEntregaChange(event) {
        let plano_entrega_selecionado = [];
        let unidade_selecionada = await this.unidadeDao.getById(this.filter?.controls.unidade_id.value, ['planos_entrega.entregas']);
        unidade_selecionada?.planos_entrega?.forEach(element => {
            if (element.id == this.filter.controls.plano_entrega_id.value)
                plano_entrega_selecionado.push(element.entregas);
        });
        this.planosEntregasEntregas = plano_entrega_selecionado[0].map((x) => Object.assign({
            key: x.id,
            value: x.descricao
        })) || [];
    }
};
__decorate([
    ViewChild("filterRef", { static: false })
], AtividadeListKanbanComponent.prototype, "filterRef", void 0);
__decorate([
    ViewChild("kanbanEtiquetas", { static: false })
], AtividadeListKanbanComponent.prototype, "kanbanEtiquetas", void 0);
__decorate([
    ViewChild("dockerNaoIniciado", { static: false })
], AtividadeListKanbanComponent.prototype, "dockerNaoIniciado", void 0);
__decorate([
    ViewChild("dockerPausado", { static: false })
], AtividadeListKanbanComponent.prototype, "dockerPausado", void 0);
__decorate([
    ViewChild("dockerIniciado", { static: false })
], AtividadeListKanbanComponent.prototype, "dockerIniciado", void 0);
__decorate([
    ViewChild("dockerConcluido", { static: false })
], AtividadeListKanbanComponent.prototype, "dockerConcluido", void 0);
__decorate([
    ViewChild('planoEntrega', { static: false })
], AtividadeListKanbanComponent.prototype, "planoEntrega", void 0);
__decorate([
    ViewChild('planoEntregaEntrega', { static: false })
], AtividadeListKanbanComponent.prototype, "planoEntregaEntrega", void 0);
__decorate([
    Input()
], AtividadeListKanbanComponent.prototype, "snapshot", void 0);
__decorate([
    Input()
], AtividadeListKanbanComponent.prototype, "fixedFilter", void 0);
__decorate([
    Input()
], AtividadeListKanbanComponent.prototype, "minhas", void 0);
AtividadeListKanbanComponent = __decorate([
    Component({
        selector: 'atividade-list-kanban',
        templateUrl: './atividade-list-kanban.component.html',
        styleUrls: ['./atividade-list-kanban.component.scss'],
        standalone: false
    })
], AtividadeListKanbanComponent);
export { AtividadeListKanbanComponent };
//# sourceMappingURL=atividade-list-kanban.component.js.map