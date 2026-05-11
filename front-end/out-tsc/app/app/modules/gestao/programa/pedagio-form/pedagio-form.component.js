import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import moment from "moment";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { Usuario } from "src/app/models/usuario.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
let PedagioFormComponent = class PedagioFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.OPTIONS = this.lookup.INDISPONIBILIDADE_TIPOS;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.formValidation = (form) => {
            let result = null;
            if (this.form?.controls.data_final_pedagio.value &&
                this.form?.controls.data_inicial_pedagio.value) {
                if (moment(this.form?.controls.data_final_pedagio.value).isBefore(moment(this.form?.controls.data_inicial_pedagio.value))) {
                    result = "Data de início não pode ser maior que a data de fim.";
                }
                // opção == 1 data fim deve ser maior ou igual 365 dias
                if (this.form?.controls.tipo_pedagio.value == "1") {
                    if (moment(this.form?.controls.data_final_pedagio.value).diff(moment(this.form?.controls.data_inicial_pedagio.value), "days") < 364) {
                        result = "Data de fim deve ser maior que 365 dias.";
                    }
                }
                // opção == 2 data fim deve ser maior ou igual 180 dias
                if (this.form?.controls.tipo_pedagio.value == "2") {
                    if (moment(this.form?.controls.data_final_pedagio.value).diff(moment(this.form?.controls.data_inicial_pedagio.value), "days") < 179) {
                        result = "Data de fim deve ser maior que 180 dias.";
                    }
                }
            }
            return result;
        };
        this.form = this.fh.FormBuilder({
            tipo_pedagio: { default: "" },
            data_inicial_pedagio: { default: "" },
            data_final_pedagio: { default: "" },
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        this.entity = this.metadata?.usuario || entity;
        this.form = form;
        this.form.controls.data_inicial_pedagio.setValue(moment(this.entity?.data_inicial_pedagio).toDate());
        this.form.controls.data_final_pedagio.setValue(moment(this.entity?.data_final_pedagio).toDate());
        this.form.controls.tipo_pedagio.setValue(this.entity?.tipo_pedagio);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            const usuario = this.util.fill(new Usuario(), this.entity);
            resolve(this.util.fillForm(usuario, this.form.value));
        });
    }
    initializeData(form) {
        this.entity = new Usuario();
        this.loadData(this.entity, form);
    }
    async atualizaPedagio() {
        this.submitting = true;
        let result = undefined;
        const data = {
            usuario_id: this.entity?.id,
            data_inicial_pedagio: this.form?.controls.data_inicial_pedagio.value,
            data_final_pedagio: this.form?.controls.data_final_pedagio.value,
            tipo_pedagio: this.form?.controls.tipo_pedagio.value,
        };
        try {
            result = await this.dao?.atualizaPedagio(data);
            this.dialog.alert('Sucesso', 'Teletrabalho indisponível para o período');
            this.go.setModalResult(this.modalRoute?.queryParams?.idroute, result);
            this.close();
        }
        catch (error) {
            // this.dialog.alert("Erro ao atualizar pedagio!", error);
            throw error;
        }
        finally {
            this.submitting = false;
        }
        return result;
    }
    updateDates(event) {
        const opcao = event.target.value;
        this.updateDateFields(opcao, moment().startOf("day"));
    }
    onDataInicioChange(event) {
        const opcao = this.form?.controls.tipo_pedagio.value;
        const dataInicial = moment(event.target.value);
        if (!dataInicial.isValid()) {
            this.form?.controls.data_final_pedagio.setValue(null);
            return;
        }
        this.updateDateFields(opcao, dataInicial);
    }
    updateDateFields(opcao, dataInicial) {
        this.form?.controls.data_inicial_pedagio.setValue(dataInicial.toDate());
        const diasAdicionais = opcao === "1" ? 365 : opcao === "2" ? 180 : 0;
        if (diasAdicionais > 0) {
            this.form?.controls.data_final_pedagio.setValue(dataInicial.add(diasAdicionais, "days").toDate());
        }
    }
    onDataFimChange(event) { }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PedagioFormComponent.prototype, "editableForm", void 0);
PedagioFormComponent = __decorate([
    Component({
        selector: "app-pedagio-form",
        templateUrl: "./pedagio-form.component.html",
        styleUrls: ["./pedagio-form.component.scss"],
        standalone: false
    })
], PedagioFormComponent);
export { PedagioFormComponent };
//# sourceMappingURL=pedagio-form.component.js.map