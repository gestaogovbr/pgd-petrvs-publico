import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
// import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('gridDocumentos', { static: false }) public gridDocumentos?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  // @Input() set entity(value: HasDocumentos | undefined) { super.entity = value; } get entity(): HasDocumentos | undefined { return super.entity; }

/*
   <documentos [control]="documentos" noPersist></...>

   rota: adesao/documentos/AdesaoDao/15151-5675675-7645456
*/

  public get items(): Documento[] {
    if(!this.gridControl.value) this.gridControl.setValue({documentos: []});
    if(!this.gridControl.value.documentos) this.gridControl.value.documentos = [];
    return this.gridControl.value.documentos;
  }

  public documentoDao: DocumentoDaoService;


  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      descricao: {default: ""},
      cor: {default: ""},
      inicio: {default: null},
      termino: {default: null}, 
    }, this.cdRef, this.validate);
  }

  public get isTermos(): boolean {
    return this.action == "termos";
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Documento();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    await this.grid?.confirm();
    return this.entity!;
  }

  public get randomColor(): string {
    return this.lookup.CORES[this.items.length % this.lookup.CORES.length].color;
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(this.isTermos && this.needSign(documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({title: "Termo de ciência e responsabilidade", modalWidth: 1000}, documento.conteudo || ""); }).bind(this) });

    return result;
  }

  public needSign(documento: Documento): boolean {
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
  }

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
            this.gridDocumentos?.reset();
          }
        }).finally(() => this.loading = false);
      }
    });
  }


  public async addDocumento() {
    const documento = new Documento();
    documento.id = this.dao!.generateUuid();
    documento.plano_id = this.entity!.id;
    documento._status = "ADD";
    this.go.navigate({route: ['gestao', 'adesao', 'termo']}, {metadata: {documento: documento, adesao: this.entity}, modalClose: (modalResult) => {
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
      }});
    return undefined;
  }

  public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }

}

