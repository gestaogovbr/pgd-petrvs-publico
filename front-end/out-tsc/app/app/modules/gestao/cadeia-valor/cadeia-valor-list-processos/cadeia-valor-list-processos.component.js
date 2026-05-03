import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let CadeiaValorListProcessosComponent = class CadeiaValorListProcessosComponent extends PageFrameBase {
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue(new CadeiaValor());
        if (!this.gridControl.value.processos)
            this.gridControl.value.processos = [];
        const sorted = this.sortProcessos(this.gridControl.value.processos);
        return sorted;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.draggedProcesso = null;
        this.dropTarget = null;
        this.dropPosition = null;
        this.editingId = null;
        this.dao = injector.get(CadeiaValorDaoService);
        this.processosDao = injector.get(CadeiaValorProcessoDaoService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" }
        }, this.cdRef);
    }
    loadData(entity, form) {
        this.cdRef.detectChanges();
    }
    sortProcessos(processos) {
        const buildTree = (paiId = null) => {
            return processos
                .filter(p => p.processo_pai_id === paiId)
                .sort((a, b) => a.sequencia - b.sequencia)
                .flatMap(p => [p, ...buildTree(p.id)]);
        };
        return buildTree();
    }
    getNivel(processo) {
        let nivel = '';
        let paiId = processo.processo_pai_id;
        while (paiId) {
            const pai = this.items.find(x => x.id === paiId);
            nivel = (pai?.sequencia || '') + '.' + nivel;
            paiId = pai?.processo_pai_id || null;
        }
        return nivel + processo.sequencia;
    }
    getIndent(processo) {
        return this.getNivel(processo).split('.').length - 1;
    }
    async addProcesso() {
        const processo = new CadeiaValorProcesso({
            id: this.dao.generateUuid(),
            cadeia_valor_id: this.entity?.id,
            sequencia: this.items.filter(x => !x.processo_pai_id).length + 1,
            nome: ""
        });
        this.gridControl.value.processos.push(processo);
        this.editingId = processo.id;
        this.cdRef.detectChanges();
        this.scrollToProcesso(processo);
    }
    async addChildProcesso(pai) {
        if (!pai.nome?.trim()) {
            await this.dialog.alert("Atenção", "Preencha o nome do processo pai antes de adicionar um filho.");
            return;
        }
        await this.saveProcesso(pai);
        const processo = new CadeiaValorProcesso({
            id: this.dao.generateUuid(),
            cadeia_valor_id: this.entity?.id,
            processo_pai_id: pai.id,
            sequencia: this.items.filter(x => x.processo_pai_id === pai.id).length + 1,
            nome: ""
        });
        this.gridControl.value.processos.push(processo);
        this.editingId = processo.id;
        this.cdRef.detectChanges();
        this.scrollToProcesso(processo);
    }
    scrollToProcesso(processo) {
        setTimeout(() => {
            const element = document.getElementById('processo-' + processo.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = element.querySelector('input');
                if (input)
                    input.focus();
            }
        }, 100);
    }
    async saveProcesso(processo) {
        if (!processo.nome?.trim()) {
            await this.dialog.alert("Atenção", "Nome é obrigatório");
            return;
        }
        if (!this.isNoPersist && this.processosDao) {
            const saved = await this.processosDao.save(processo);
            processo.id = saved.id;
        }
        this.editingId = null;
        this.cdRef.detectChanges();
    }
    cancelEdit() {
        const processos = this.gridControl.value.processos;
        const index = processos.findIndex((x) => x.id === this.editingId);
        if (index >= 0) {
            const processo = processos[index];
            if (!processo.nome || !processo.nome.length) {
                processos.splice(index, 1);
            }
        }
        this.editingId = null;
        this.cdRef.detectChanges();
    }
    async removeProcesso(processo) {
        const confirm = await this.dialog.confirm("Excluir?", "Deseja realmente excluir o processo e seus filhos?");
        if (!confirm)
            return;
        const processos = this.gridControl.value.processos;
        if (!this.isNoPersist && this.processosDao) {
            await this.processosDao.delete(processo);
            const result = await this.processosDao.query({ where: [["cadeia_valor_id", "==", this.entity.id]] }).asPromise();
            this.gridControl.value.processos = result;
        }
        else {
            const toRemove = [processo];
            let i = 0;
            while (i < toRemove.length) {
                const filhos = processos.filter((x) => x.processo_pai_id === toRemove[i].id);
                toRemove.push(...filhos);
                i++;
            }
            for (const p of toRemove.reverse()) {
                const idx = processos.indexOf(p);
                if (idx > -1)
                    processos.splice(idx, 1);
            }
            this.gridControl.value.processos = [...processos];
        }
        this.cdRef.detectChanges();
    }
    onDragStart(event, processo) {
        this.draggedProcesso = processo;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', processo.id);
    }
    onDragOver(event, processoAlvo) {
        if (!this.draggedProcesso)
            return;
        event.preventDefault();
        if (this.draggedProcesso.id === processoAlvo.id)
            return;
        if (this.isDescendant(processoAlvo, this.draggedProcesso))
            return;
        const rect = event.target.getBoundingClientRect();
        const y = event.clientY - rect.top;
        const height = rect.height;
        if (y < height * 0.33) {
            this.dropPosition = 'before';
        }
        else if (y > height * 0.66) {
            this.dropPosition = 'after';
        }
        else {
            this.dropPosition = 'child';
        }
        this.dropTarget = processoAlvo;
        event.dataTransfer.dropEffect = 'move';
    }
    async onDrop(event, processoAlvo) {
        event.preventDefault();
        if (!this.draggedProcesso || !this.dropPosition)
            return;
        if (this.draggedProcesso.id === processoAlvo.id)
            return;
        if (this.isDescendant(processoAlvo, this.draggedProcesso))
            return;
        const processos = this.gridControl.value.processos;
        const draggedItem = processos.find((p) => p.id === this.draggedProcesso.id);
        if (!draggedItem)
            return;
        const oldPaiId = draggedItem.processo_pai_id;
        if (this.dropPosition === 'child') {
            draggedItem.processo_pai_id = processoAlvo.id;
        }
        else {
            draggedItem.processo_pai_id = processoAlvo.processo_pai_id;
            const irmaos = processos.filter((x) => x.processo_pai_id === processoAlvo.processo_pai_id && x.id !== draggedItem.id);
            const targetSequencia = processoAlvo.sequencia;
            if (this.dropPosition === 'before') {
                draggedItem.sequencia = targetSequencia - 0.5;
            }
            else {
                draggedItem.sequencia = targetSequencia + 0.5;
            }
            irmaos.push(draggedItem);
            irmaos.sort((a, b) => a.sequencia - b.sequencia);
            irmaos.forEach((p, idx) => p.sequencia = idx + 1);
        }
        if (oldPaiId !== draggedItem.processo_pai_id) {
            const irmaosAntigos = processos.filter((x) => x.processo_pai_id === oldPaiId);
            irmaosAntigos.forEach((p, idx) => p.sequencia = idx + 1);
        }
        const irmaosFilhos = processos.filter((x) => x.processo_pai_id === draggedItem.id);
        irmaosFilhos.forEach((p, idx) => p.sequencia = idx + 1);
        if (!this.isNoPersist && this.processosDao) {
            const processosParaOrdenar = processos.map((p) => ({
                id: p.id,
                sequencia: p.sequencia,
                processo_pai_id: p.processo_pai_id
            }));
            const result = await this.processosDao.ordenar(processosParaOrdenar);
            this.gridControl.value.processos = result;
        }
        this.onDragEnd();
        this.cdRef.detectChanges();
    }
    onDragEnd() {
        this.draggedProcesso = null;
        this.dropTarget = null;
        this.dropPosition = null;
    }
    isDescendant(processo, ancestral) {
        let paiId = processo.processo_pai_id;
        while (paiId) {
            if (paiId === ancestral.id)
                return true;
            const pai = this.items.find(x => x.id === paiId);
            paiId = pai?.processo_pai_id || null;
        }
        return false;
    }
};
__decorate([
    Input()
], CadeiaValorListProcessosComponent.prototype, "noPersist", null);
__decorate([
    Input()
], CadeiaValorListProcessosComponent.prototype, "control", null);
__decorate([
    Input()
], CadeiaValorListProcessosComponent.prototype, "entity", null);
CadeiaValorListProcessosComponent = __decorate([
    Component({
        selector: 'cadeia-valor-list-processos',
        templateUrl: './cadeia-valor-list-processos.component.html',
        styleUrls: ['./cadeia-valor-list-processos.component.scss'],
        standalone: false
    })
], CadeiaValorListProcessosComponent);
export { CadeiaValorListProcessosComponent };
//# sourceMappingURL=cadeia-valor-list-processos.component.js.map