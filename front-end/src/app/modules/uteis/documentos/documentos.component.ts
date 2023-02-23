import { ChangeDetectorRef, Component, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

export type DocumentoEspecie = 'TERMO_ADESAO' | 'SEI' | 'TCR' | 'TCR_CANCELAMENTO' | 'OUTRO';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('addDocumentoTemplate', { static: false }) public addDocumentoTemplate?: TemplateRef<any>;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: HasDocumentos | undefined) { super.entity = value; } get entity(): HasDocumentos | undefined { return super.entity; }
  @Input() needSign: ((documento: Documento) => boolean) = (d: Documento) => true;
  @Input() extraTags: ((row: HasDocumentos, metadata: any) => LookupItem[]) = (row: HasDocumentos, metadata: any) => [];
  @Input() especie: DocumentoEspecie = 'OUTRO';
  @Input() dataset?: TemplateDataset[];
  @Input() datasource?: any;
  @Input() template?: string;
  @Input() template_id?: string;

  public get items(): Documento[] {
    if(!this.gridControl.value) this.gridControl.setValue({documentos: []});
    if(!this.gridControl.value.documentos) this.gridControl.value.documentos = [];
    return this.gridControl.value.documentos;
  }
  public editingButtons: ToolbarButton[] = [
    {
      label: "Gravar",
      hint: "Salvar o texto do documento",
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
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
  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public datasourceEdit?: any;
  public templateEdit?: string;
  public selected?: Documento;

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.form = this.fh.FormBuilder({
      titulo: {default: ""},
      conteudo: {default: ""}
    }, this.cdRef, this.validate);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.needSign = this.metadata?.needSign || this.needSign;
    this.extraTags = this.metadata?.extraTags || this.extraTags;
    this.especie = this.metadata?.especie || this.especie;
    this.dataset = this.metadata?.dataset || this.dataset;
    this.datasource = this.metadata?.datasource || this.datasource;
    this.template = this.metadata?.template || this.template;
    this.template_id = this.metadata?.template_id || this.template_id;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
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
  }

  public gravarEdicao() {

  }

  public cancelarEdicao() {

  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(!this.isNoPersist && this.needSign(documento)) {
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
    documento._status = "ADD";
    if(this.especie == "TERMO_ADESAO") documento.plano_id = this.entity!.id;
    if(["TCR", "TCR_CANCELAMENTO"].includes(this.especie)) documento.programa_adesao_id = this.entity!.id;
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
    return undefined;
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

  /*public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }*/

}

