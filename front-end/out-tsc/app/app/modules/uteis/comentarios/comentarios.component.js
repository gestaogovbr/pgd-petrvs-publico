import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { PageFrameBase } from '../../base/page-frame-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
let ComentariosComponent = class ComentariosComponent extends PageFrameBase {
    set control(value) {
        if (this._control != value) {
            this._control = value;
            if (value && this.comentario)
                value.setValue(this.comentario.orderComentarios(value.value || []));
        }
    }
    get control() {
        return this._control;
    }
    set entity(value) {
        if (this._entity != value) {
            this._entity = value;
            if (value && this.comentario)
                value.comentarios = this.comentario.orderComentarios(value.comentarios || []);
            this.fakeControl.setValue(value?.comentarios);
        }
    }
    get entity() {
        return this._entity;
    }
    set origem(value) {
        if (this._origem != value) {
            this._origem = value;
            const filter = ["PROJETO", "PROJETO_TAREFA"].includes(value || "") ? ["COMENTARIO", "GERENCIAL", "TECNICO"] : ["COMENTARIO", "TECNICO"];
            this.comentarioTipos = this.lookup.COMENTARIO_TIPO.filter(x => filter.includes(x.key));
        }
    }
    get origem() {
        return this._origem;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.comentarioTipos = [];
        this._origem = undefined;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "texto" && !control.value?.length) {
                result = "Não pode ser em branco";
            }
            return result;
        };
        this.addComentario = async () => {
            this.comentario.newComentario(this.gridControl, this.comentarios);
            return undefined;
        };
        this.comentario = injector.get(ComentarioService);
        this.form = this.fh.FormBuilder({});
        this.join = ["comentarios.usuario"];
        this.formComentarios = this.fh.FormBuilder({
            texto: { default: "" },
            tipo: { default: "COMENTARIO" },
            privacidade: { default: "PUBLICO" }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.urlParams?.has("origem")) {
            this.origem = this.urlParams.get("origem");
            this.comentario_id = this.queryParams?.comentario_id;
        }
        switch (this.origem) {
            case 'ATIVIDADE':
                this.dao = this.injector.get(AtividadeDaoService);
                break;
            case 'ATIVIDADE_TAREFA':
                this.dao = this.injector.get(AtividadeTarefaDaoService);
                break;
            case 'PLANO_ENTREGA_ENTREGA':
                this.dao = this.injector.get(PlanoEntregaEntregaDaoService);
                break;
        }
    }
    get isNoPersist() {
        return this.entity_id == "NOPERSIST";
    }
    get constrolOrItems() {
        return this.control || this.entity?.comentarios || [];
    }
    dynamicButtons(row) {
        let result = [];
        let comentario = row;
        if (comentario.usuario_id == this.auth.usuario?.id) {
            result.push({ icon: "bi bi-pencil-square", hint: "Alterar", color: "btn-outline-info", onClick: (comentario) => { this.grid.edit(comentario); } });
        }
        result.push({ hint: "Responder", color: "btn-outline-success", icon: "bi bi-reply", onClick: (comentario) => { this.comentario.newComentario(this.gridControl, this.comentarios, comentario); } });
        return result;
    }
    async saveComentario(form, item) {
        const entity = form.value;
        Object.assign(this.comentarios.editing, entity);
        return undefined;
    }
    async loadComentario(form, row) {
        this.formComentarios.controls.texto.setValue(row.texto);
        this.formComentarios.controls.tipo.setValue(row.tipo);
        this.formComentarios.controls.privacidade.setValue(row.privacidade);
    }
    confirm() {
        this.comentarios?.confirm();
    }
    loadData(entity, form) {
        const comentario = this.comentario_id?.length ? (this.gridControl.value || []).find((x) => x.id == this.comentario_id) : undefined;
        this.comentario.newComentario(this.gridControl, this.comentarios, comentario);
        this.cdRef.detectChanges();
        this.texto.focus();
    }
    async saveData() {
        this.confirm();
        return { comentarios: this.gridControl.value };
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], ComentariosComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('texto', { static: false })
], ComentariosComponent.prototype, "texto", void 0);
__decorate([
    ViewChild('comentarios', { static: false })
], ComentariosComponent.prototype, "comentarios", void 0);
__decorate([
    Input()
], ComentariosComponent.prototype, "control", null);
__decorate([
    Input()
], ComentariosComponent.prototype, "entity", null);
__decorate([
    Input()
], ComentariosComponent.prototype, "origem", null);
ComentariosComponent = __decorate([
    Component({
        selector: 'comentarios',
        templateUrl: './comentarios.component.html',
        styleUrls: ['./comentarios.component.scss'],
        standalone: false
    })
], ComentariosComponent);
export { ComentariosComponent };
//# sourceMappingURL=comentarios.component.js.map