import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
import { NavigateResult } from 'src/app/services/navigate.service';
let PlanoTrabalhoFormTermoComponent = class PlanoTrabalhoFormTermoComponent extends PageFormBase {
    constructor(injector) {
        super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "tipo_documento_id" && !control?.value?.length && this.form?.controls?.numero_processo?.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.formValidation = (form) => {
            if (!this.tipoDocumento?.selectedEntity && form?.controls.tipo_documento_id.value?.length) {
                return "Aguarde o carregamento do tipo de documento";
            }
            return undefined;
        };
        this.titleEdit = (entity) => {
            return "Editando " + this.lex.translate("TCR") + ' ' + this.lex.translate("do Plano de Trabalho") + ': ' + (entity?.usuario?.nome || "");
        };
        this.join = ["unidade", "usuario", "programa.template_tcr", "documento", "documentos", "atividades.atividade"];
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.programaDao = injector.get(ProgramaDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.tipoDocumentoDao = injector.get(TipoDocumentoDaoService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
        this.documentoDao = injector.get(DocumentoDaoService);
        this.form = this.fh.FormBuilder({
            carga_horaria: { default: "" },
            tempo_total: { default: "" },
            tempo_proporcional: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            programa_id: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            documento_id: { default: "" },
            documentos: { default: [] },
            tipo_documento_id: { default: "" },
            numero_processo: { default: "" },
            vinculadas: { default: true },
            modalidade_pgd: { default: null },
            forma_contagem_carga_horaria: { default: "DIA" }
        }, this.cdRef, this.validate);
    }
    onVinculadasChange(event) {
        this.cdRef.detectChanges();
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        formValue = this.util.fillForm(formValue, entity);
        await Promise.all([
            this.unidade.loadSearch(entity.unidade || entity.unidade_id),
            this.usuario.loadSearch(entity.usuario || entity.usuario_id),
            this.programa.loadSearch(entity.programa || entity.programa_id)
        ]);
        formValue.data_inicio = this.auth.hora;
        form.patchValue(formValue);
    }
    async initializeData(form) {
        this.entity = (await this.dao.getById(this.metadata.plano_trabalho.id, this.join));
        await this.loadData(this.entity, form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            //if(this.processo) {
            resolve(new NavigateResult(Object.assign(this.form.value, {
                /* TODO Gerar documento do TCR
                termo: this.termo!.conteudo,
                atividades_termo_adesao: this.termo!.atividades.map((x: { nome: string; }) => this.util.removeAcentos(x.nome.toLowerCase())),*/
                codigo_tipo_documento: this.tipoDocumento?.selectedEntity?.codigo
            })));
            /*} else {
              const documento = Object.assign(new Documento(), {
                especie: "TERMO_ADESAO",
                conteudo: this.termo!.conteudo,
                plano_id: this.entity!.id,
                status: "GERADO"
              });
              this.documentoDao.save(documento).then(doc => resolve(undefined)).catch(reject);
            }*/
        });
    }
    get formaContagemCargaHoraria() {
        const forma = this.form?.controls.forma_contagem_carga_horaria?.value || "DIA";
        return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoTrabalhoFormTermoComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], PlanoTrabalhoFormTermoComponent.prototype, "usuario", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], PlanoTrabalhoFormTermoComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('programa', { static: false })
], PlanoTrabalhoFormTermoComponent.prototype, "programa", void 0);
__decorate([
    ViewChild('tipoDocumento', { static: false })
], PlanoTrabalhoFormTermoComponent.prototype, "tipoDocumento", void 0);
PlanoTrabalhoFormTermoComponent = __decorate([
    Component({
        selector: 'plano-trabalho-form-termo',
        templateUrl: './plano-trabalho-form-termo.component.html',
        styleUrls: ['./plano-trabalho-form-termo.component.scss'],
        standalone: false
    })
], PlanoTrabalhoFormTermoComponent);
export { PlanoTrabalhoFormTermoComponent };
//# sourceMappingURL=plano-trabalho-form-termo.component.js.map