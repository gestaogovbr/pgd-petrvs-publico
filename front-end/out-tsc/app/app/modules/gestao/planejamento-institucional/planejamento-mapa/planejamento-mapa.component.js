import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let PlanejamentoMapaComponent = class PlanejamentoMapaComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.canEdit = true;
        this.planejamentos = [];
        this.eixos = [];
        this.objetivos = [];
        this.subObjetivosMenu = {
            icon: "bi bi-three-dots-vertical",
            color: "transparent-black p-1 py-0",
            items: [
                {
                    icon: "bi bi-file-earmark-bar-graph",
                    label: "Entregas",
                    onClick: this.onObjetivoClick.bind(this)
                },
                {
                    icon: "bi bi-pencil-square",
                    label: "Alterar",
                    onClick: this.onObjetivoEditClick.bind(this)
                },
                {
                    icon: "bi bi-trash",
                    label: "Excluir",
                    onClick: this.onObjetivoDeleteClick.bind(this)
                }
            ]
        };
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(PlanejamentoDaoService);
        this.objetivoDao = injector.get(PlanejamentoObjetivoDaoService);
        this.join = ['objetivos'];
        this.title = this.lex.translate("Objetivos") + ' ' + this.lex.translate('do Planejamento Institucional');
        this.form = this.fh.FormBuilder({
            planejamento_id: { default: null },
            todos: { default: false }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    async loadData(entity, form) {
        this.query = this.dao.query({ where: [["data_arquivamento", "==", null]], orderBy: [["data_inicio", "desc"]] });
        this.query.asPromise().then(planejamentos => {
            this.planejamentos = planejamentos.map(x => Object.assign({}, {
                key: x.id,
                value: x.nome,
                data: x
            }));
            this.cdRef.detectChanges();
            this.form.controls.planejamento_id.setValue(this.planejamentos.length ? this.planejamentos[0].key : null);
        });
    }
    objetivosPai(filhoId) {
        let items = [];
        let addItens = (list) => {
            for (let item of list) {
                if (item.id != filhoId) {
                    items.push(item);
                    addItens(this.objetivos.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia));
                }
            }
        };
        addItens(this.objetivos.filter(x => !x.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia));
        return items;
    }
    marcador(row) {
        let level = row._metadata?.level || 0;
        return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
    }
    objetivosEixo(eixoId) {
        let objetivos = this.planejamento?.objetivos?.filter(y => y.eixo_tematico_id == eixoId && !y.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia) || [];
        let recursivo = (list, level) => {
            for (let item of list) {
                item.objetivos = this.planejamento?.objetivos?.filter(y => y.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia) || [];
                item._metadata = Object.assign(item._metadata || {}, { level });
                recursivo(item.objetivos, level + 1);
            }
        };
        recursivo(objetivos, 0);
        return objetivos;
    }
    onPlanejamentoChange() {
        if (this.planejamentoInstitucional.selectedItem) {
            this.dao.getById(this.planejamentoInstitucional.selectedItem?.key, this.join).then(planejamento => {
                this.planejamento = planejamento;
                this.objetivos = this.planejamento.objetivos || [];
                this.eixos = this.query.extra?.eixos?.filter((x) => this.form?.controls.todos.value || this.planejamento?.objetivos?.find(y => y.eixo_tematico_id == x.id)).map((x) => Object.assign({}, {
                    eixo: x,
                    eixo_tematico_id: x.id,
                    objetivos: this.objetivosEixo(x.id)
                })) || [];
                this.cdRef.detectChanges();
            });
        }
    }
    onTodosChange() {
        this.onPlanejamentoChange();
    }
    onObjetivoClick(data) {
        let objetivo = data;
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id] });
    }
    onObjetivoAddClick(data) {
        let eixo = this.eixos.find(x => x.eixo.id == data.id);
        let objetivo = new PlanejamentoObjetivo({
            _status: "ADD",
            id: this.dao.generateUuid(),
            planejamento_id: this.planejamento?.id,
            eixo_tematico_id: data.eixo.id,
            eixo_tematico: data.eixo,
            sequencia: eixo?.objetivos.length ? eixo?.objetivos[0].sequencia : 0
        });
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: {
                planejamento: this.planejamento,
                objetivo: objetivo,
                objetivos: this.objetivosPai(objetivo.id)
            },
            modalClose: async (modalResult) => {
                if (modalResult)
                    this.objetivoDao.save(modalResult).then(objetivo => this.onPlanejamentoChange());
            }
        });
    }
    onObjetivoDeleteClick(data) {
        let objetivo = data;
        this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
            if (confirm)
                this.objetivoDao.delete(objetivo).then(result => this.onPlanejamentoChange());
        });
    }
    onObjetivoEditClick(data) {
        let objetivo = data;
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: { planejamento: this.planejamento, objetivo: objetivo }, modalClose: async (modalResult) => {
                if (modalResult)
                    this.objetivoDao?.save(modalResult).then(planejamento => this.onPlanejamentoChange());
            }
        });
    }
    /* Drag & Drop */
    onObjetivoDrop(event, dropped) {
        console.log("Drop", event);
        dropped.objetivos = dropped.objetivos || [];
        let objetivo = event.data;
        let index = typeof event.index === 'undefined' ? dropped.objetivos.length : event.index;
        let neighborhood = index ? (dropped.objetivos[index] || dropped.objetivos[index - 1] || undefined) : undefined;
        dropped.objetivos.splice(index, 0, objetivo);
        this.loading = true;
        this.objetivoDao?.update(objetivo.id, {
            eixo_tematico_id: dropped.eixo_tematico_id,
            objetivo_pai_id: dropped.id || null,
            sequencia: neighborhood?.sequencia || 0
        }).then(result => this.onPlanejamentoChange()).finally(() => this.loading = false);
    }
    onObjetivoDragEnd(event) {
        console.log("DragEnd", event);
    }
    onObjetivoDragged(item, dragged, effect) {
        console.log("Dragged", item, dragged.objetivos);
        dragged.objetivos = dragged.objetivos || [];
        dragged.objetivos.splice(dragged.objetivos.indexOf(item), 1);
    }
    onObjetivoDragStart(event) {
        console.log("DragStart", event);
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanejamentoMapaComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('planejamentoInstitucional', { static: false })
], PlanejamentoMapaComponent.prototype, "planejamentoInstitucional", void 0);
PlanejamentoMapaComponent = __decorate([
    Component({
        selector: 'planejamento-mapa',
        templateUrl: './planejamento-mapa.component.html',
        styleUrls: ['./planejamento-mapa.component.scss'],
        standalone: false
    })
], PlanejamentoMapaComponent);
export { PlanejamentoMapaComponent };
//# sourceMappingURL=planejamento-mapa.component.js.map