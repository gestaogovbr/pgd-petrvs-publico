import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { QueryOptions } from 'src/app/dao/query-options';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { Capacidade } from 'src/app/models/capacidade.model';
import { Perfil } from 'src/app/models/perfil.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { PerfilService } from '../perfil.service';
let PerfilFormComponent = class PerfilFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Perfil, PerfilDaoService);
        this.injector = injector;
        this.tiposCapacidades = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome', 'descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("Perfil") + ': ' + (entity?.nome || "");
        };
        this.tipoCapacidadeDao = injector.get(TipoCapacidadeDaoService);
        this.perfilService = injector.get(PerfilService);
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            capacidades: { default: [] },
            descricao: { default: "" },
            nivel: { default: "" },
            data_inicio: { default: "" },
            data_fim: { default: "" }
        }, this.cdRef, this.validate);
        this.join = ["capacidades.tipo_capacidade"];
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        this.entity = entity;
        var queryOptions = new QueryOptions({
            where: [["grupo_id", "==", null]],
            orderBy: [["codigo", "asc"]],
            join: ["filhos"]
        });
        await this.tipoCapacidadeDao.query(queryOptions).asPromise().then(tipo => {
            tipo.forEach(t => {
                this.perfilService.ordenarTiposCapacidade(t.filhos);
                this.tiposCapacidades.push(t);
            });
        });
        formValue = this.util.fillForm(formValue, entity);
        for (let tipoCapacidade of this.tiposCapacidades) {
            const capacidade = entity.capacidades?.find(x => (x.tipo_capacidade?.codigo == tipoCapacidade.codigo));
            tipoCapacidade._metadata = Object.assign(tipoCapacidade._metadata || {}, { habilitado: !!capacidade });
            //if (capacidade) console.log(capacidade.tipo_capacidade?.codigo)
            for (let tipoCapacidadeFilha of tipoCapacidade.filhos) {
                const capacidadeFilha = entity.capacidades?.find(x => (x.tipo_capacidade?.codigo == tipoCapacidadeFilha.codigo));
                tipoCapacidadeFilha._metadata = Object.assign(tipoCapacidadeFilha._metadata || {}, { habilitado: !!capacidadeFilha });
            }
        }
        form.patchValue(formValue);
    }
    onHabilitadoChange(row, habilitado) {
        let capacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == row.id);
        if (habilitado) {
            if (capacidade && capacidade._status == "DELETE")
                capacidade._status = undefined;
            if (!capacidade)
                this.entity.capacidades.push(new Capacidade({
                    tipo_capacidade_id: row.id,
                    perfil_id: this.entity.id,
                    _status: "ADD"
                }));
        }
        else {
            if (capacidade && !capacidade._status)
                capacidade._status = "DELETE";
            if (capacidade && capacidade._status == "ADD")
                this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == row.id), 1);
            for (let filho of row.filhos) {
                filho._metadata = Object.assign(filho._metadata || {}, { habilitado: false });
                let subCapacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == filho.id);
                if (subCapacidade && !subCapacidade._status)
                    subCapacidade._status = "DELETE";
                if (subCapacidade && subCapacidade._status == "ADD")
                    this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == filho.id), 1);
            }
        }
        this.refreshCapacidadesHabilitadas();
    }
    async refreshCapacidadesHabilitadas() {
        let formValue = Object.assign({}, this.form.value);
        formValue = this.util.fillForm(formValue, this.entity);
        this.form.patchValue(formValue);
        this.cdRef.detectChanges();
    }
    onHabilitadoChangeFilha(row, habilitado) {
        let capacidade = this.entity.capacidades?.find(x => x.tipo_capacidade_id == row.id);
        let pai = this.tiposCapacidades.find(x => x.id == row.grupo_id);
        if (habilitado) {
            if (!pai._metadata.habilitado) {
                pai._metadata = Object.assign(pai._metadata || {}, { habilitado: true });
                let capacidadePai = this.entity.capacidades?.find(x => x.tipo_capacidade_id == pai.id);
                if (capacidadePai && capacidadePai._status == "DELETE")
                    capacidadePai._status = undefined;
                if (!capacidadePai)
                    this.entity.capacidades.push(new Capacidade({
                        tipo_capacidade_id: pai.id,
                        perfil_id: this.entity.id,
                        _status: "ADD"
                    }));
            }
            if (capacidade && capacidade._status == "DELETE")
                capacidade._status = undefined;
            if (!capacidade)
                this.entity.capacidades.push(new Capacidade({
                    tipo_capacidade_id: row.id,
                    perfil_id: this.entity.id,
                    _status: "ADD"
                }));
        }
        else {
            if (capacidade && !capacidade._status)
                capacidade._status = "DELETE";
            if (capacidade && capacidade._status == "ADD")
                this.entity.capacidades.splice(this.entity.capacidades.findIndex(x => x.tipo_capacidade_id == row.id), 1);
        }
        this.refreshCapacidadesHabilitadas();
    }
    initializeData(form) {
        form.patchValue(new Perfil());
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            let perfil = this.util.fill(new Perfil(), this.entity);
            perfil = this.util.fillForm(perfil, this.form.value);
            perfil.capacidades = perfil.capacidades.filter(x => ["ADD", "DELETE"].includes(x._status || ""));
            resolve(perfil);
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PerfilFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], PerfilFormComponent.prototype, "gridPai", void 0);
PerfilFormComponent = __decorate([
    Component({
        selector: 'app-perfil-form',
        templateUrl: './perfil-form.component.html',
        styleUrls: ['./perfil-form.component.scss'],
        standalone: false
    })
], PerfilFormComponent);
export { PerfilFormComponent };
//# sourceMappingURL=perfil-form.component.js.map