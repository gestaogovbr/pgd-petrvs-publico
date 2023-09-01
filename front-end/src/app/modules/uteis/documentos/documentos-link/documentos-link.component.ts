import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { SeiKeys } from 'src/app/listeners/procedimento-trabalhar/procedimento-trabalhar.component';
import { Documento, DocumentoLink } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'documento-link',
  templateUrl: './documentos-link.component.html',
  styleUrls: ['./documentos-link.component.scss']
})
export class DocumentosLinkComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('numeroProcesso', { static: false }) public numeroProcesso?: InputButtonComponent;
  @ViewChild('numeroDocumento', { static: false }) public numeroDocumento?: InputButtonComponent;
  @ViewChild('tipoProcesso', { static: false }) public tipoProcesso?: InputSearchComponent;
  @ViewChild('tipoDocumento', { static: false }) public tipoDocumento?: InputSearchComponent;
  @Input() set documento(value: Documento) {
    if(this._entity != value) {
      this._entity = value;
      this.loadData(value);
    }
  }
  get documento(): Documento {
    this.loadEntity(this.form!.value);
    return this._entity;
  } 
  @Input() set sei(value: SeiKeys | undefined) {
    if(this._sei != value) {
      this._sei = value;
      if(value) {
        this.form?.controls.id_processo.setValue(value.id_processo || 0);
        this.form?.controls.numero_processo.setValue(value.numero_processo || "");
        this.form?.controls.id_documento.setValue(value.id_documento || 0);
        this.form?.controls.numero_documento.setValue(value.numero_documento || "");
        if(value.numero_documento) {
          this.onNumeroDocumentoClick(new Event('click'));
        } else if(value.numero_processo) {
          this.onNumeroProcessoClick(new Event('click'));
        }
      }
    }
  }
  get sei(): SeiKeys | undefined {
    return this._sei;
  }

  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;

  private _sei?: SeiKeys;

  constructor(public injector: Injector) {
    super(injector);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this._entity = new Documento();
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);
    this.form = this.fh.FormBuilder({
      tipo: {default: "URL"},
      url: {default: ""},
      id_processo: {default: 0},
      numero_processo: {default: ""},
      id_documento: {default: 0,},
      numero_documento: {default: ""},
      tipo_processo_id: {default: null},
      tipo_documento_id: {default: null},
      titulo_documento: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public loadData(entity: Documento) {
    if(entity) entity.tipo = "LINK";
    this.form!.patchValue(entity?.link || {});
  }

  public loadEntity(data: any) {
    this.util.fillForm(this._entity!.link, data);
  }

  public get isSei(): boolean {
    return this._entity?.tipo == "SEI";
  }

  public isEmpty(): boolean {
    let link = this.form!.value as DocumentoLink;
    return !this.form!.valid || (link.tipo == "URL" && !link.url?.length) || (link.tipo == "SEI" && (!link.numero_processo?.length || !link.numero_processo?.length));
  }

  public async onNumeroDocumentoClick(event: Event) {
    const numeroDocumento = this.form?.controls.numero_documento?.value;
    if(numeroDocumento?.length) {
      this.numeroDocumento!.loading = true;
      try {
        let dados = await this.allPages.getDadosDocumento(numeroDocumento);
        if(dados) {
          let tipo_processo_id = null;
          let tipo_documento_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          if(dados.documento?.tipo_documento) {
            const tipo_documento = await this.tipoDocumentoDao.query({where: [["nome", "=", dados.documento?.tipo_documento]]}).asPromise();
            if(tipo_documento[0]) {
              this.tipoDocumento?.loadSearch(tipo_documento[0]);
              tipo_documento_id = tipo_documento[0].id;
            }
          }
          Object.assign(this._entity.link, {
            id_processo: dados.processo?.id_processo,
            numero_processo: dados.processo?.numero_processo,
            id_documento: dados.documento?.id_documento,
            numero_documento: dados.documento?.numero_documento,
            tipo_processo_id: tipo_processo_id,
            tipo_documento_requisicao_id: tipo_documento_id,
            titulo_documento: dados.documento?.titulo_documento
          });
          this.loadData(this._entity);
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente incluir diretamente pelo botão 'Incluir atividade' acessando o documento no Sei!")
      } finally {
        this.numeroDocumento!.loading = false;
      }
    }
  }

  public async onNumeroProcessoClick(event: Event) {
    const processoRequisicao = this.form?.controls.numero_processo?.value;
    if(processoRequisicao?.length) {
      this.numeroProcesso!.loading = true;
      try {
        let dados = await this.allPages.getDadosProcesso(processoRequisicao);
        if(dados) {
          let tipo_processo_id = null;
          if(dados.processo?.tipo_processo) {
            const tipo_processo = await this.tipoProcessoDao.query({where: [["codigo", "=", dados.processo?.tipo_processo]]}).asPromise();
            if(tipo_processo[0]) {
              this.tipoProcesso?.loadSearch(tipo_processo[0]);
              tipo_processo_id = tipo_processo[0].id;
            }
          }
          Object.assign(this._entity.link, {
            id_processo: dados.processo?.id_processo,
            numero_processo: dados.processo?.numero_processo,
            id_documento: 0,
            numero_documento: "",
            tipo_processo_id: tipo_processo_id,
            tipo_documento_requisicao_id: null,
            titulo_documento: ""
          });
          this.loadData(this._entity);
        } else {
          throw new Error("Processo não encontrado");
        }
      } catch (error) {
        this.dialog.alert("Error", "Impossível encontrar o processo informado. Tente incluir diretamente pelo botão 'Incluir atividade' acessando o processo no Sei!")
      } finally {
        this.numeroProcesso!.loading = false;
      }
    }
  }

}

