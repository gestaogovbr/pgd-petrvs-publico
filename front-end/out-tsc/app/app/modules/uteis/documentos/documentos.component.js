import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { Documento } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { TemplateService } from '../templates/template.service';
import { DocumentoService } from './documento.service';
let DocumentosComponent = class DocumentosComponent extends PageFrameBase {
    //@Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set datasource(value) {
        if (JSON.stringify(this._datasource) != this.JSON.stringify(value)) {
            this._datasource = value;
            if (!this.grid?.editing?.assinaturas?.length)
                this.form.controls.datasource.setValue(value);
            this.cdRef.detectChanges();
        }
    }
    get datasource() {
        return this._datasource;
    }
    set editingId(value) {
        if (this._editingId != value) {
            this._editingId = value;
            if (value) {
                this.action = "edit";
                this.documentoId = value;
                this.loadData(this.entity);
            }
        }
    }
    get editingId() {
        return this._editingId;
    }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue({ documentos: [] });
        if (!this.gridControl.value.documentos)
            this.gridControl.value.documentos = [];
        return this.gridControl.value.documentos;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.needSign = (e, d) => true;
        this.extraTags = (e, d, m) => [];
        this.especie = 'OUTRO';
        this.disabled = false;
        this.blocked = false;
        this.canEditTemplate = false;
        this.validate = (control, controlName) => {
            let result = null;
            if (controlName == "titulo" && !control?.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        /* Inicializações */
        this.cdRef = injector.get(ChangeDetectorRef);
        this.documentoDao = injector.get(DocumentoDaoService);
        this.templateService = injector.get(TemplateService);
        this.documentoService = injector.get(DocumentoService);
        this.modalWidth = 1200;
        this.form = this.fh.FormBuilder({
            id: { default: "" },
            tipo: { default: "HTML" },
            titulo: { default: "" },
            conteudo: { default: "" },
            link: { default: null },
            dataset: { default: undefined },
            datasource: { default: undefined },
            template: { default: undefined },
            template_id: { default: undefined }
        }, this.cdRef, this.validate);
        this.join = ["documentos.assinaturas.usuario"];
    }
    ngOnInit() {
        super.ngOnInit();
        this.needSign = this.metadata?.needSign || this.needSign;
        this.extraTags = this.metadata?.extraTags || this.extraTags;
        this.especie = this.urlParams?.has("especie") ? this.urlParams.get("especie") : this.metadata?.especie || this.especie;
        this.action = this.urlParams?.has("action") ? this.urlParams.get("action") || "" : this.action;
        this.documentoId = this.urlParams?.has("documentoId") ? this.urlParams.get("documentoId") || undefined : this.documentoId;
        this.dataset = this.metadata?.dataset || this.dataset;
        this.datasource = this.metadata?.datasource || this.datasource;
        this.template = this.metadata?.template || this.template;
        this.tituloDefault = this.metadata?.titulo || this.tituloDefault;
        /* Obrigatório instanciar o DAO correto a depender da espécie */
        this.dao = ["TCR"].includes(this.especie) ? this.injector.get(PlanoTrabalhoDaoService) : undefined;
    }
    loadData(entity, form) {
        this.entity = entity;
        if (this.viewInit && !this.grid.editing && !this.grid.adding) {
            if (this.action == "new")
                this.grid.onAddItem();
            if (this.action == "edit")
                this.grid.onEditItem(this.grid.selectById(this.documentoId || ""));
        }
    }
    initializeData(form) {
        this.entity = this.entity || { id: this.dao?.generateUuid(), documentos: [], documento_id: null };
        this.loadData(this.entity, this.form);
    }
    async saveData(form) {
        await this.grid?.confirm();
        return this.entity;
    }
    /*public onSelect(row: any) {
      this.selected = row as Documento;
      this.form!.patchValue({
        id: this.selected?.id || "",
        titulo: this.selected?.titulo_documento || "",
        conteudo: this.selected?.conteudo || "",
        dataset: this.selected?.dataset,
        datasource: this.selected?.datasource,
        template: this.selected?.template,
        template_id: this.selected?.template_id
      });
      /*this.templateEdit = this.canEdit ? this.selected?.template || undefined : undefined;* /
      this.cdRef.detectChanges();
    }*/
    get canEdit() {
        const selected = this.grid?.selected;
        return this.canEditTemplate && !selected?.assinaturas?.length && selected?.tipo != "LINK";
    }
    /*public gravarEdicao() {
      this.grid!.onSaveItem(this.selected!);
    }
  
    public cancelarEdicao() {
      this.grid!.onCancelItem();
    }*/
    editEndDocumento(id) {
        /* Garante que caso tenha editingId esteja sempre em edição * /
        if(this.editingId?.length && !this.grid?.editing && this.action == "edit") {
          this.grid!.onEditItem(this.grid!.selectById(this.editingId || ""));
        }*/
    }
    documentoDynamicButtons(row) {
        let result = [];
        let documento = row;
        if (!this.isNoPersist && this.entity && this.needSign(this.entity, documento)) {
            result.push({ hint: "Assinar", icon: "bi bi-pen", color: "secondary", onClick: this.signDocumento.bind(this) });
        }
        //result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: this.documentoService.onDocumentoClick.bind(this.documentoService.onDocumentoClick) });
        return result;
    }
    async signDocumento(documento) {
        await this.documentoService.sign([documento]);
        this.cdRef.detectChanges();
        /*this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
          if(response) {
            this.loading = true;
            this.documentoDao.assinar([documento.id]).then(response => {
              if(response?.length) {
                let documentos = (this.form!.controls.documentos.value || []) as Documento[];
                let found = documentos.find(x => x.id == documento?.id);
                if(found) found.assinaturas = response[0].assinaturas;
                this.form!.controls.documentos.setValue(documentos);
                this.grid?.reset();
              }
            }).finally(() => this.loading = false);
          }
        });*/
    }
    async addDocumento() {
        return new Documento({
            id: this.dao.generateUuid(),
            entidade_id: this.auth.unidade?.entidade_id || null,
            tipo: "HTML",
            especie: this.especie,
            link: null,
            _status: "ADD",
            titulo: this.tituloDefault || "",
            dataset: this.dataset || null,
            datasource: this.datasource || null,
            template: this.metadata?.template.conteudo,
            template_id: this.metadata?.template.id,
            plano_trabalho_id: ["TCR"].includes(this.especie) ? this.entity.id : null
        });
        //this.onSelect(documento);
        //return documento;
        /*let result = await this.dialog.template({ title: "Edição de documento", modalWidth: 700 }, this.addDocumentoTemplate!, [
          {
            label: "Salvar",
            color: "btn btn-outline-success",
            value: true
          }, {
            label: "Cancelar",
            color: "btn btn-outline-danger",
            value: false
          }
        ]).asPromise();
        if(result.button.value) {}*/
        /*this.go.navigate({route: ['gestao', 'adesao', 'termo']}, {metadata: {documento: documento, adesao: this.entity}, modalClose: (modalResult) => {
            if(modalResult) {
              (async () => {
                let documentos = (this.form!.controls.documentos.value || []) as Documento[];
                if(this.isTermos) {
                  this.clearErros();
                  this.dialog.showSppinerOverlay("Salvando dados do formulário");
                  try {
                    modalResult = await this.documentoDao.save(Object.assign(new Documento(), {
                      especie: "TCR",
                      conteudo: modalResult?.termo,
                      metadados: {atividades_termo_adesao: modalResult.atividades_termo_adesao},
                      programa_adesao_id: this.entity!.id,
                      status: "GERADO"
                    }), ["assinaturas.usuario:id,nome,apelido"]);
                  } catch (error: any) {
                    this.error(error.message ? error.message : error);
                    modalResult = undefined;
                  } finally {
                    this.dialog.closeSppinerOverlay();
                  }
                }
                if(modalResult) {
                  documentos.push(modalResult);
                  this.form!.controls.documentos.setValue(documentos);
                  this.dialog.showSppinerOverlay("Recarregando dados do plano");
                  await this.initializeData(this.form!);
                  this.dialog.closeSppinerOverlay();
                }
                this.cdRef.detectChanges();
              })();
            }
          }});*/
    }
    async loadDocumento(form, row) {
        const selected = row;
        this.form.patchValue({
            id: selected?.id || "",
            tipo: selected?.tipo || "HTML",
            titulo: selected?.titulo || "",
            conteudo: selected?.conteudo || "",
            link: selected?.link,
            dataset: selected?.dataset,
            datasource: selected?.datasource,
            template: selected?.template,
            template_id: selected?.template_id
        });
        this.cdRef.detectChanges();
    }
    async removeDocumento(row) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            if (this.isNoPersist)
                row._status = "DEL";
            else
                await this.dao.delete(row);
            return true;
        }
        else {
            return false;
        }
    }
    async saveDocumento(form, item) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (this.form.valid) {
            item.titulo = form.controls.titulo.value;
            item.conteudo = form.controls.conteudo.value;
            item.dataset = this.templateService.prepareDatasetToSave(item.dataset || []);
            this.submitting = true;
            try {
                result = !this.isNoPersist ? await this.documentoDao.save(item) : item;
                form.controls.id.setValue(result.id);
                item.id = result.id;
            }
            catch (error) {
                this.error(error.message ? error.message : error);
            }
            finally {
                this.submitting = false;
            }
            this.cdRef.detectChanges();
        }
        return result;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], DocumentosComponent.prototype, "grid", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "entity", null);
__decorate([
    Input()
], DocumentosComponent.prototype, "noPersist", null);
__decorate([
    Input()
], DocumentosComponent.prototype, "needSign", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "extraTags", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "especie", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "dataset", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "blocked", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "canEditTemplate", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "template", void 0);
__decorate([
    Input()
], DocumentosComponent.prototype, "datasource", null);
__decorate([
    Input()
], DocumentosComponent.prototype, "editingId", null);
DocumentosComponent = __decorate([
    Component({
        selector: 'documentos',
        templateUrl: './documentos.component.html',
        styleUrls: ['./documentos.component.scss'],
        standalone: false
    })
], DocumentosComponent);
export { DocumentosComponent };
//# sourceMappingURL=documentos.component.js.map