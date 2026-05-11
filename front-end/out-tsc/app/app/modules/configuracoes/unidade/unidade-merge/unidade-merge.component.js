import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let UnidadeMergeComponent = class UnidadeMergeComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.toolbarButtons = [
            {
                icon: "bi bi-yin-yang",
                label: "Mesma sigla",
                hint: "Unificar todos que tenham a mesma sigla. Sendo a inativa considerada como origem.",
                onClick: this.onMesmaSiglaClick.bind(this)
            }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(UnidadeDaoService);
        this.form = this.fh.FormBuilder({
            exclui_origem: { default: false },
            origem_inativo: { default: true },
            unidade_origem_id: { default: "" },
            unidade_destino_id: { default: "" }
        }, this.cdRef, this.validate);
    }
    onMesmaSiglaClick() {
        this.loading = true;
        this.dao.mesmaSigla().then(unidades => {
            let destinos = [];
            destinos = unidades.reduce((acumulador, valor) => {
                if (!valor.data_inativacao && !acumulador.find(x => x.sigla == valor.sigla))
                    acumulador.push(valor);
                return acumulador;
            }, destinos);
            let destinosIds = destinos.map(x => x.id);
            let origens = unidades.filter(x => !destinosIds.includes(x.id) && !!x.data_inativacao);
            let origensIds = origens.map(x => x.id);
            this.items = [];
            for (let origem of origens) {
                let destino = destinos.find(x => x.sigla == origem.sigla);
                if (destino) {
                    this.items.push({
                        id: this.dao.generateUuid(),
                        unidade_origem_id: origem.id,
                        unidade_destino_id: destino.id,
                        unidade_origem: origem,
                        unidade_destino: destino
                    });
                }
            }
            /* Pegas as unidade que tem a Sigla repetida mas que não estão inativas */
            let error = [];
            for (let unidade of unidades) {
                if (!destinosIds.includes(unidade.id) && !origensIds.includes(unidade.id))
                    error.push(unidade.codigo + " - " + unidade.sigla + " - " + unidade.nome);
            }
            if (error.length)
                this.editableForm.error = (error.length == 1 ? "A unidade abaixo possui duplicidade de SIGLA, mas não está inativa:" : "As unidades abaixo possuem duplicidade de SIGLA, mas não estão inativas:") + "\n" + error.join("\n");
        }).finally(() => {
            this.loading = false;
        });
    }
    async addMerge() {
        return {
            id: this.dao.generateUuid(),
            unidade_origem_id: "",
            unidade_destino_id: "",
            unidade_origem: undefined,
            unidade_destino: undefined
        };
    }
    async loadMerge(form, row) {
        form.controls.unidade_origem_id.setValue(row.unidade_origem_id);
        form.controls.unidade_destino_id.setValue(row.unidade_destino_id);
    }
    async removeMerge(row) {
        return true;
    }
    async saveMerge(form, row) {
        let result = undefined;
        if (this.form.controls.unidade_origem_id.value?.length || this.form.controls.unidade_destino_id.value?.length) {
            row.unidade_origem_id = form.controls.unidade_origem_id.value;
            row.unidade_origem = this.unidadeOrigem?.selectedEntity || await this.dao?.getById(row.unidade_origem_id);
            row.unidade_destino_id = form.controls.unidade_destino_id.value;
            row.unidade_destino = this.unidadeDestino?.selectedEntity || await this.dao?.getById(row.unidade_destino_id);
            result = row;
        }
        return result;
    }
    onMerge() {
        let error = undefined;
        for (let row of this.items)
            error = error || (!row.unidade_origem_id?.length || !row.unidade_destino_id?.length ? "A origem e o destino precisam estar preenchidos em todos" : undefined);
        this.editableForm.error = error;
        if (!error?.length) {
            this.loading = true;
            this.dao.unificar(this.items.map(x => Object.assign({}, { unidade_origem_id: x.unidade_origem_id, unidade_destino_id: x.unidade_destino_id })), this.form.controls.exclui_origem.value).then(result => {
                if (result)
                    this.close();
            }).finally(() => {
                this.loading = false;
            });
        }
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], UnidadeMergeComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('unidadeOrigem', { static: false })
], UnidadeMergeComponent.prototype, "unidadeOrigem", void 0);
__decorate([
    ViewChild('unidadeDestino', { static: false })
], UnidadeMergeComponent.prototype, "unidadeDestino", void 0);
UnidadeMergeComponent = __decorate([
    Component({
        selector: 'app-unidade-merge',
        templateUrl: './unidade-merge.component.html',
        styleUrls: ['./unidade-merge.component.scss'],
        standalone: false
    })
], UnidadeMergeComponent);
export { UnidadeMergeComponent };
//# sourceMappingURL=unidade-merge.component.js.map