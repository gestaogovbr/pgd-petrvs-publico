import { ChangeDetectorRef, Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { AdesaoDaoService } from 'src/app/dao/adesao-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento, DocumentoEspecie, HasDocumentos } from 'src/app/models/documento.model';
import { Template } from 'src/app/models/template.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

//export type DocumentoEspecie = 'TERMO_ADESAO' | 'SEI' | 'TCR' | 'TCR_CANCELAMENTO' | 'OUTRO';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: HasDocumentos | undefined) { super.entity = value; } get entity(): HasDocumentos | undefined { return super.entity; }
  @Input() needSign: ((entity: HasDocumentos, documento: Documento) => boolean) = (e: HasDocumentos, d: Documento) => true;
  @Input() extraTags: ((entity: HasDocumentos, documento: Documento, metadata: any) => LookupItem[]) = (e: HasDocumentos, d: Documento, m: any) => [];
  @Input() especie: DocumentoEspecie = 'OUTRO';
  @Input() dataset?: TemplateDataset[];
  @Input() datasource?: any;
  @Input() template?: Template;

  public get items(): Documento[] {
    if(!this.gridControl.value) this.gridControl.setValue({documentos: []});
    if(!this.gridControl.value.documentos) this.gridControl.value.documentos = [];
    return this.gridControl.value.documentos;
  }
  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public datasourceEdit?: any;
  public templateEdit?: string;
  public selected?: Documento;
  public documentoId?: string;
  public editingButtons: ToolbarButton[] = [
    {
      label: "Gravar",
      hint: "Salvar o texto do documento",
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      disabled: () => !this.form!.valid,
      onClick: this.gravarEdicao.bind(this)
    },
    {
      label: "Cancelar",
      hint: "Descartar alterações",
      icon: "bi bi-dash-circle",
      color: "btn-outline-danger",
      onClick: this.cancelarEdicao.bind(this)
    } 
  ];

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
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
    this.join = ["documentos"];
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
    /* Obrigatório instanciar o DAO correto a depender da espécie */
    this.dao = this.especie == "TERMO_ADESAO" ? this.injector.get<PlanoDaoService>(PlanoDaoService) :
      ["TCR", "TCR_CANCELAMENTO"].includes(this.especie) ? this.injector.get<AdesaoDaoService>(AdesaoDaoService) : undefined;
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
    if(!this.grid!.editing && !this.grid!.adding) {
      if(this.action == "new") this.grid!.onAddItem();
      if(this.action == "edit") this.grid!.onEditItem(this.grid!.selectById(this.documentoId || ""));
    }
    //super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = this.entity || { id: this.dao?.generateUuid(), documentos: [] } as HasDocumentos;
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    await this.grid?.confirm();
    return this.entity!;
  }

  public onSelect(row: any) {
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
    this.cdRef.detectChanges();
  }

  public gravarEdicao() {
    this.grid!.onSaveItem(this.selected!);
  }

  public cancelarEdicao() {
    this.grid!.onCancelItem();
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(!this.isNoPersist && this.entity && this.needSign(this.entity, documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({title: "Termo de ciência e responsabilidade", modalWidth: 1000}, documento.conteudo || ""); }).bind(this) });

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

  public signDocumento(documento: Documento) {
    this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
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
    });
  }

  public async addDocumento() {
    const documento = new Documento();
    documento.id = this.dao!.generateUuid();
    documento.entidade_id = this.auth.unidade?.entidade_id || null;
    documento.especie = this.especie;
    documento._status = "ADD";

    
    if(this.especie == "TERMO_ADESAO") documento.plano_id = this.entity!.id;
    if(["TCR", "TCR_CANCELAMENTO"].includes(this.especie)) documento.programa_adesao_id = this.entity!.id;
    this.onSelect(documento);
    return documento;
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
    if(result.button.value) {

    }*/

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

  public async saveDocumento(form: FormGroup, item: Documento) {
    const entity = form.value;
    item.titulo_documento = form.controls.titulo.value;
    item.conteudo = form.controls.conteudo.value;
    const documento = await this.documentoDao.save(item);
    form.controls.id.setValue(documento.id);
    item.id = documento.id;
    return documento;
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

  /*public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }*/

}

