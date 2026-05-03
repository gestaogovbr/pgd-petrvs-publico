import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
let PlanejamentoListObjetivoComponent = class PlanejamentoListObjetivoComponent extends PageFrameBase {
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set disabled(value) { if (this._disabled != value)
        this._disabled = value; }
    get disabled() { return this._disabled; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new Planejamento());
        if (!this.gridControl.value.objetivos)
            this.gridControl.value.objetivos = [];
        return this.gridControl.value.objetivos;
    }
    get toolbarButtons() {
        return [
            {
                label: "Adicionar Objetivo",
                icon: "bi bi-plus",
                onClick: () => this.addObjetivo(),
                color: "btn-primary"
            }
        ];
    }
    getEixoHeaderTextColor(bgColor) {
        return this.util.contrastColor(bgColor || '#e0e0e0');
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.minHeight = 350;
        this.options = [];
        this._disabled = false;
        this.eixos = [];
        this.treeNodes = [];
        this.groupedRoots = [];
        this.expandedIds = new Set();
        this.dao = injector.get(PlanejamentoDaoService);
        this.objetivoDao = injector.get(PlanejamentoObjetivoDaoService);
        this.eixoDao = injector.get(EixoTematicoDaoService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            fundamentacao: { default: "" },
            planejamento_id: { default: null },
            eixo_tematico_id: { default: null },
            objetivo_superior_id: { default: null }
        }, this.cdRef);
        this.OPTION_INFORMACOES.onClick = (objetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true, metadata: { objetivos: this.items, objetivo: objetivo } });
        this.OPTION_EXCLUIR.onClick = (objetivo) => { this.removeObjetivo(objetivo); };
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, 'MOD_PLAN_INST_EXCL');
    }
    ngOnInit() {
        super.ngOnInit();
        this.entity = this.metadata?.entity || this.entity;
        this.carregaEixos();
        this.buildTree();
    }
    ngOnChanges() {
        this.buildTree();
    }
    buildTree() {
        const items = this.items;
        if (!items)
            return;
        // Reset children arrays
        items.forEach(i => i.objetivos = []);
        // Map for easy access
        const map = new Map();
        items.forEach(i => map.set(i.id, i));
        // Build hierarchy
        const roots = [];
        items.forEach(item => {
            if (item.objetivo_pai_id && map.has(item.objetivo_pai_id)) {
                const parent = map.get(item.objetivo_pai_id);
                parent.objetivos.push(item);
            }
            else {
                roots.push(item);
            }
        });
        // Sort by sequencia
        const sortBySequencia = (a, b) => (a.sequencia || 0) - (b.sequencia || 0);
        roots.sort(sortBySequencia);
        items.forEach(i => i.objetivos?.sort(sortBySequencia));
        this.treeNodes = roots;
        // Group by Eixo
        const groups = new Map();
        const nullKey = "null";
        roots.forEach(root => {
            const key = root.eixo_tematico_id || nullKey;
            if (!groups.has(key))
                groups.set(key, []);
            groups.get(key).push(root);
        });
        this.groupedRoots = Array.from(groups.entries()).map(([key, value]) => {
            const eixo = key === nullKey ? undefined : this.eixos.find(x => x.id === key);
            return {
                id: key,
                eixo: eixo,
                objetivos: value
            };
        });
        // Sort groups: Eixos first (by name), then "Sem Eixo"
        this.groupedRoots.sort((a, b) => {
            if (a.id === nullKey)
                return 1;
            if (b.id === nullKey)
                return -1;
            return (a.eixo?.nome || "").localeCompare(b.eixo?.nome || "");
        });
        this.cdRef.detectChanges();
    }
    async drop(event) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            const movedItem = event.container.data[event.currentIndex];
            const newParentId = event.container.id;
            if (newParentId.startsWith("axis-")) {
                movedItem.objetivo_pai_id = null;
                const axisId = newParentId.replace("axis-", "");
                movedItem.eixo_tematico_id = axisId === "null" ? null : axisId;
            }
            else {
                movedItem.objetivo_pai_id = newParentId;
                // Inherit axis from parent
                const parent = this.items.find(x => x.id === newParentId);
                if (parent)
                    movedItem.eixo_tematico_id = parent.eixo_tematico_id;
            }
        }
        this.updateSequences(event.previousContainer.data);
        if (event.previousContainer !== event.container) {
            this.updateSequences(event.container.data);
        }
        // Persistir ordenação
        if (!this.isNoPersist) {
            const itensParaSalvar = [];
            if (event.previousContainer !== event.container) {
                itensParaSalvar.push(...event.previousContainer.data);
            }
            itensParaSalvar.push(...event.container.data);
            try {
                const results = await this.objetivoDao.ordenar(itensParaSalvar);
                // O backend retorna todos os objetivos atualizados
                if (results) {
                    // Atualizar os itens na grade com os dados retornados
                    // Precisamos instanciar para garantir que sejam objetos do tipo PlanejamentoObjetivo
                    this.gridControl.value.objetivos = results.map((x) => new PlanejamentoObjetivo(x));
                    this.buildTree();
                }
            }
            catch (error) {
                this.error(error?.error || error?.message || error);
                // Em caso de erro, recarregar a lista original para desfazer as mudanças visuais
                // Como não temos um método simples de "refresh" aqui sem recarregar tudo, talvez apenas o erro baste por enquanto
            }
        }
    }
    updateSequences(list) {
        list.forEach((item, index) => {
            item.sequencia = index + 1;
        });
    }
    toggle(node) {
        if (this.expandedIds.has(node.id)) {
            this.expandedIds.delete(node.id);
        }
        else {
            this.expandedIds.add(node.id);
        }
    }
    isExpanded(node) {
        return this.expandedIds.has(node.id);
    }
    dynamicButtons(row) {
        let result = [];
        if (this.auth.hasPermissionTo('MOD_PLAN_INST_EDT') && !this.disabled) {
            result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (objetivo) => { this.editObjetivo(objetivo); } });
        }
        result.push({ hint: "Entregas", icon: "bi bi-file-earmark-bar-graph", color: "btn-outline-success", onClick: (objetivo) => this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id] }, { modal: true }) });
        return result;
    }
    marcador(row) {
        let level = row._metadata?.level || 0;
        return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
    }
    async addObjetivo() {
        let objetivo = new PlanejamentoObjetivo({
            _status: "ADD",
            id: this.dao.generateUuid(),
            planejamento_id: this.entity?.id
        });
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: {
                planejamento: this.entity,
                objetivo: objetivo,
                objetivos: this.objetivosPai(objetivo.id)
            },
            modalClose: async (modalResult) => {
                if (modalResult) {
                    try {
                        this.carregaEixos();
                        // Auto-sequencia
                        if (!modalResult.sequencia) {
                            const siblings = this.items.filter(x => x.objetivo_pai_id == modalResult.objetivo_pai_id);
                            const maxSeq = siblings.reduce((max, curr) => Math.max(max, curr.sequencia || 0), 0);
                            modalResult.sequencia = maxSeq + 1;
                        }
                        if (this.isNoPersist) {
                            this.items.push(modalResult);
                        }
                        else {
                            this.items.push(await this.objetivoDao.save(modalResult));
                        }
                        this.buildTree();
                    }
                    catch (error) {
                        this.error(error?.error || error?.message || error);
                    }
                }
                ;
            }
        });
    }
    objetivosPai(filhoId) {
        let items = [];
        let addItens = (list) => {
            for (let item of list) {
                if (item.id != filhoId) {
                    items.push(item);
                    addItens(this.items.filter(x => x.objetivo_pai_id == item.id).sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0)));
                }
            }
        };
        addItens(this.items.filter(x => !x.objetivo_pai_id).sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0)));
        return items;
    }
    async editObjetivo(objetivo) {
        objetivo._status = objetivo._status == "ADD" ? "ADD" : "EDIT";
        let index = this.items.indexOf(objetivo);
        this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
            metadata: {
                planejamento: this.entity,
                objetivo: objetivo,
                objetivos: this.objetivosPai(objetivo.id)
            },
            modalClose: async (modalResult) => {
                if (modalResult) {
                    // Preservar filhos existentes na estrutura em memória
                    const oldItem = this.items[index];
                    if (oldItem && oldItem.objetivos) {
                        modalResult.objetivos = oldItem.objetivos;
                    }
                    if (!this.isNoPersist) {
                        const savedItem = await this.objetivoDao?.save(modalResult);
                        // Atualiza o item na lista com o retorno do servidor (incluindo updated_at atualizado)
                        if (savedItem) {
                            this.items[index] = savedItem;
                        }
                        else {
                            this.items[index] = modalResult;
                        }
                    }
                    else {
                        this.items[index] = modalResult;
                    }
                    this.carregaEixos();
                    this.buildTree();
                }
                ;
            }
        });
    }
    async removeObjetivo(objetivo) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            let index = this.items.indexOf(objetivo);
            if (this.isNoPersist) {
                objetivo._status = "DELETE";
            }
            else {
                await this.objetivoDao.delete(objetivo);
                this.items.splice(index, 1);
            }
            ;
            this.buildTree();
            return true;
        }
        else {
            return false;
        }
    }
    getEixo(id) {
        return this.eixos?.find(x => x.id == id);
    }
    carregaEixos() {
        this.eixoDao?.query().getAll().then(eixos => {
            this.eixos = eixos;
            this.buildTree();
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanejamentoListObjetivoComponent.prototype, "editableForm", void 0);
__decorate([
    Input()
], PlanejamentoListObjetivoComponent.prototype, "planejamento_superior_id", void 0);
__decorate([
    Input()
], PlanejamentoListObjetivoComponent.prototype, "control", null);
__decorate([
    Input()
], PlanejamentoListObjetivoComponent.prototype, "entity", null);
__decorate([
    Input()
], PlanejamentoListObjetivoComponent.prototype, "disabled", null);
__decorate([
    Input()
], PlanejamentoListObjetivoComponent.prototype, "noPersist", null);
PlanejamentoListObjetivoComponent = __decorate([
    Component({
        selector: 'planejamento-list-objetivo',
        templateUrl: './planejamento-list-objetivo.component.html',
        styleUrls: ['./planejamento-list-objetivo.component.scss'],
        standalone: false
    })
], PlanejamentoListObjetivoComponent);
export { PlanejamentoListObjetivoComponent };
//# sourceMappingURL=planejamento-list-objetivo.component.js.map