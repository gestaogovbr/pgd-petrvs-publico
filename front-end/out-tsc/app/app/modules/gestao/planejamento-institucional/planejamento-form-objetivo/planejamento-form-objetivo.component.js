import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EixoTematicoDaoService } from 'src/app/dao/eixo-tematico-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NavigateResult } from 'src/app/services/navigate.service';
let PlanejamentoFormObjetivoComponent = class PlanejamentoFormObjetivoComponent extends PageFormBase {
    constructor(injector) {
        super(injector, PlanejamentoObjetivo, PlanejamentoObjetivoDaoService);
        this.injector = injector;
        this.objetivos = [];
        this.objetivos_superiores = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'fundamentacao'].indexOf(controlName) >= 0 && !control.value?.length)
                result = "Obrigatório";
            if (['eixo_tematico_id'].indexOf(controlName) >= 0 && !control.value?.length)
                result = "Obrigatório";
            return result;
        };
        this.formValidation = (form) => {
            let result = null;
            return result;
        };
        this.planejamentoDao = injector.get(PlanejamentoDaoService);
        this.eixoTematicoDao = injector.get(EixoTematicoDaoService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            fundamentacao: { default: "" },
            planejamento_id: { default: null },
            planejamento_superior_nome: { default: "" },
            eixo_tematico_id: { default: null },
            objetivo_superior_id: { default: null },
            objetivo_pai_id: { default: null },
            integra_okr: { default: true },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.title = entity._status == 'ADD' ? 'Inclusão de Objetivo' : 'Editando objetivo...';
        this.planejamento = this.metadata?.planejamento;
        if (this.metadata?.planejamento_superior)
            this.planejamento.planejamento_superior = this.metadata.planejamento_superior;
        this.form?.controls.planejamento_superior_nome.setValue(this.planejamento?.planejamento_superior?.nome || '');
        const objetivosSuperioresRaw = this.planejamento?.planejamento_superior?.objetivos || [];
        const objetivosRaw = this.metadata?.objetivos || [];
        let objetivosOrdenados = this.ordenarObjetivos(objetivosRaw);
        let objetivosSuperioresOrdenados = this.ordenarObjetivos(objetivosSuperioresRaw);
        objetivosOrdenados = this.filtrarObjetivos(objetivosOrdenados, entity.id);
        this.objetivos = this.montarListaObjetivos(objetivosOrdenados);
        this.objetivos_superiores = this.montarListaObjetivos(objetivosSuperioresOrdenados);
        (async () => {
            await this.eixoTematico?.loadSearch(entity.eixo_tematico || entity.eixo_tematico_id);
        })();
    }
    filtrarObjetivos(objetivos, entityId) {
        if (!entityId)
            return objetivos;
        const index = objetivos.findIndex(x => x.id === entityId);
        if (index >= 0) {
            const nivelRemover = objetivos[index]._nivel;
            let count = 1;
            while (index + count < objetivos.length) {
                const nextNivel = objetivos[index + count]._nivel;
                if (nextNivel > nivelRemover) {
                    count++;
                }
                else {
                    break;
                }
            }
            objetivos.splice(index, count);
        }
        return objetivos;
    }
    montarListaObjetivos(objetivos) {
        return objetivos.map(x => {
            const nivel = x._nivel || 0;
            const prefixo = nivel > 0 ? '\u00A0\u00A0'.repeat(nivel) + '↳ ' : '';
            return {
                key: x.id,
                value: prefixo + x.nome,
                data: x
            };
        });
    }
    ordenarObjetivos(objetivos) {
        const ids = new Set(objetivos.map(o => o.id));
        const buildTree = (paiId = null, nivel = 0) => {
            const children = objetivos
                .filter(p => {
                if (paiId === null) {
                    return !p.objetivo_pai_id || !ids.has(p.objetivo_pai_id);
                }
                return p.objetivo_pai_id === paiId;
            })
                .sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0));
            return children.flatMap(p => {
                p._nivel = nivel;
                return [p, ...buildTree(p.id, nivel + 1)];
            });
        };
        return buildTree(null);
    }
    async initializeData(form) {
        this.entity = this.metadata?.objetivo;
        await this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise(async (resolve, reject) => {
            const objetivo = Object.assign({ eixo_tematico: this.eixoTematico?.selectedItem?.entity }, this.entity);
            resolve(new NavigateResult(this.util.fillForm(objetivo, this.form.value)));
        });
    }
    isPlanejamentoUNEX() {
        return this.planejamento?.unidade_id != null;
    }
    onObjetivoPaiChange(row) {
        const objetivoPai = this.form.controls.objetivo_pai_id.value;
        const eixoTematicoId = this.objetivos.find(x => x.key === objetivoPai)?.data.eixo_tematico_id;
        if (eixoTematicoId)
            this.form.controls.eixo_tematico_id.setValue(eixoTematicoId);
        this.cdRef.detectChanges();
    }
    onObjetivoSuperiorChange(row) {
        let idEixoTematicoObjetivoSuperior = this.objetivos_superiores.find(x => x.key === this.form?.controls.objetivo_superior_id.value)?.data.eixo_tematico_id;
        if (!this.form.controls.eixo_tematico_id.value)
            this.form.controls.eixo_tematico_id.setValue(idEixoTematicoObjetivoSuperior);
        this.cdRef.detectChanges();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanejamentoFormObjetivoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('planejamentoSuperiorNome', { static: false })
], PlanejamentoFormObjetivoComponent.prototype, "planejamentoSuperiorNome", void 0);
__decorate([
    ViewChild('eixoTematico', { static: false })
], PlanejamentoFormObjetivoComponent.prototype, "eixoTematico", void 0);
PlanejamentoFormObjetivoComponent = __decorate([
    Component({
        selector: 'app-planejamento-form-objetivo',
        templateUrl: './planejamento-form-objetivo.component.html',
        styleUrls: ['./planejamento-form-objetivo.component.scss'],
        standalone: false
    })
], PlanejamentoFormObjetivoComponent);
export { PlanejamentoFormObjetivoComponent };
//# sourceMappingURL=planejamento-form-objetivo.component.js.map