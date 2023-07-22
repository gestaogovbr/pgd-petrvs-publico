import { ChangeDetectorRef, Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento, DocumentoEspecie, HasDocumentos } from 'src/app/models/documento.model';
import { Template } from 'src/app/models/template.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { TemplateService } from '../templates/template.service';
import { DocumentoService } from './documento.service';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  //@Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: HasDocumentos | undefined) { super.entity = value; } get entity(): HasDocumentos | undefined { return super.entity; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() needSign: ((entity: HasDocumentos, documento: Documento) => boolean) = (e: HasDocumentos, d: Documento) => true;
  @Input() extraTags: ((entity: HasDocumentos, documento: Documento, metadata: any) => LookupItem[]) = (e: HasDocumentos, d: Documento, m: any) => [];
  @Input() especie: DocumentoEspecie = 'OUTRO';
  @Input() dataset?: TemplateDataset[];
  @Input() canEditTemplate: boolean = false;
  @Input() template?: Template;
  @Input() set datasource(value: any) {
    if(JSON.stringify(this._datasource) != this.JSON.stringify(value)) {
      this._datasource = value;
      if(!(this.grid?.editing as Documento)?.assinaturas?.length) this.form!.controls.datasource.setValue(value);
      this.cdRef.detectChanges();
    }
  }
  get datasource(): any {
    return this._datasource;
  }
  @Input() set editingId(value: string | undefined | null) {
    if(this._editingId != value) {
      this._editingId = value;
      if(value) {
        this.action = "edit";
        this.documentoId = value;
        this.loadData(this.entity!);
      }
    }
  }
  get editingId(): string | undefined | null {
    return this._editingId;
  }

  public get items(): Documento[] {
    if(!this.gridControl.value) this.gridControl.setValue({documentos: []});
    if(!this.gridControl.value.documentos) this.gridControl.value.documentos = [];
    return this.gridControl.value.documentos;
  }
  public documentoDao: DocumentoDaoService;
  public templateService: TemplateService;
  public documentoService: DocumentoService;
  public templateEdit?: string;
  public tituloDefault?: string;
  public documentoId?: string;

  private _editingId?: string | null;
  private _datasource?: any; 

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.templateService = injector.get<TemplateService>(TemplateService);
    this.documentoService = injector.get<DocumentoService>(DocumentoService);
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
      id: {default: ""},
      titulo: {default: ""},
      conteudo: {default: ""},
      dataset: {default: undefined},
      datasource: {default: undefined},
      template: {default: undefined},
      template_id: {default: undefined}
    }, this.cdRef, this.validate);
    this.join = ["documentos.assinaturas.usuario"];
  }

  public ngOnInit() {
    super.ngOnInit();
    this.needSign = this.metadata?.needSign || this.needSign;
    this.extraTags = this.metadata?.extraTags || this.extraTags;
    this.especie = this.urlParams?.has("especie") ? this.urlParams!.get("especie") : this.metadata?.especie || this.especie;
    this.action = this.urlParams?.has("action") ? this.urlParams!.get("action") || "" : "";
    this.documentoId = this.urlParams?.has("documentoId") ? this.urlParams!.get("documentoId") || undefined : undefined;
    this.dataset = this.metadata?.dataset || this.dataset;
    this.datasource = this.metadata?.datasource || this.datasource;
    this.template = this.metadata?.template || this.template;
    this.tituloDefault = this.metadata?.titulo_documento || this.tituloDefault;
    /* Obrigatório instanciar o DAO correto a depender da espécie */
    this.dao = ["TCR", "TERMO_ADESAO"].includes(this.especie) ? this.injector.get<PlanoDaoService>(PlanoDaoService) : undefined;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "titulo" && !control?.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    this.entity = entity as HasDocumentos;
    if(this.viewInit && !this.grid!.editing && !this.grid!.adding) {
      if(this.action == "new") this.grid!.onAddItem();
      if(this.action == "edit") this.grid!.onEditItem(this.grid!.selectById(this.documentoId || ""));
    }
  }

  public initializeData(form?: FormGroup) {
    this.entity = this.entity || { id: this.dao?.generateUuid(), documentos: [] } as HasDocumentos;
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    await this.grid?.confirm();
    return this.entity!;
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

  public get canEdit(): boolean {
    const selected: Documento | undefined = this.grid!.selected as Documento;
    return this.canEditTemplate && !selected?.assinaturas.length && !selected?.id_documento;
  }

  /*public gravarEdicao() {
    this.grid!.onSaveItem(this.selected!);
  }

  public cancelarEdicao() {
    this.grid!.onCancelItem();
  }*/
  
  public editEndDocumento(id?: string) {
    /* Garante que caso tenha editingId esteja sempre em edição * /
    if(this.editingId?.length && !this.grid?.editing && this.action == "edit") {
      this.grid!.onEditItem(this.grid!.selectById(this.editingId || ""));
    }*/
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;
    if(!this.isNoPersist && this.entity && this.needSign(this.entity, documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: this.documentoService.onDocumentoClick.bind(this) });
    return result;
  }

  /*public needSign(documento: Documento): boolean {
    const tipoModalidade = this.entity!.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
    const usuario = this.entity!.usuario!; // (this.usuario?.searchObj as Usuario);
    const unidade = this.entity!.unidade!; // (this.unidade?.searchObj as Unidade);
    const entidade = unidade?.entidade;
    const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
    let ids: string[] = [];
    if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
    if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
    if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario!.id);
  }*/

  public async signDocumento(documento: Documento) {
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

  public async addDocumento() {
    return new Documento({
      id: this.dao!.generateUuid(),
      entidade_id: this.auth.unidade?.entidade_id || null,
      especie: this.especie,
      _status: "ADD",
      titulo_documento: this.tituloDefault || "",
      dataset: this.dataset || null,
      datasource: this.datasource || null,
      template: this.metadata?.template.conteudo,
      template_id: this.metadata?.template.id,
      plano_id: ["TCR", "TERMO_ADESAO"].includes(this.especie) ? this.entity!.id : null
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

  public async loadDocumento(form: FormGroup, row: any) {
    const selected: Documento = row;
    this.form!.patchValue({
      id: selected?.id || "",
      titulo: selected?.titulo_documento || "",
      conteudo: selected?.conteudo || "",
      dataset: selected?.dataset,
      datasource: selected?.datasource,
      template: selected?.template,
      template_id: selected?.template_id
    });
    this.cdRef.detectChanges();
  }

  public async removeDocumento(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      if(this.isNoPersist) row._status = "DEL";
      else await this.dao!.delete(row);
      return true;
    } else {
      return false;
    }
  }

  public async saveDocumento(form: FormGroup, item: Documento) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      item.titulo_documento = form.controls.titulo.value;
      item.conteudo = form.controls.conteudo.value;
      item.dataset = this.templateService.prepareDatasetToSave(item.dataset || []);
      this.submitting = true;
      try {
        result = !this.isNoPersist ? await this.documentoDao.save(item) : item;
        form.controls.id.setValue(result.id);
        item.id = result.id;
      } catch (error: any) {
        this.error(error.message ? error.message : error);
      } finally {
        this.submitting = false;
      }
      this.cdRef.detectChanges();
    }
    return result;
  }

  /*public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }*/

}

