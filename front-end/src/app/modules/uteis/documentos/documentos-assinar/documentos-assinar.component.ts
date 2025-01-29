import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { IIndexable } from 'src/app/models/base.model';
import { Cidade } from 'src/app/models/cidade.model';
import { Documento } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-assinar',
  templateUrl: './documentos-assinar.component.html',
  styleUrls: ['./documentos-assinar.component.scss']
})
export class DocumentosAssinarComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public documentoDao: DocumentoDaoService;
  public textoConfirmar: string = "confirmo";
  public documentos: Documento[] = [];
  public TIPO_ASSINATURA: LookupItem[] = [
    {key: "ELETRONICA", value: "Assinatura Eletrônica"},
    {key: "DIGITAL", value: "Assinatura Digital"}
  ];

  isProcessandoClique = false;


  constructor(public injector: Injector) {
    super(injector);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.modalWidth = 450;
    this.form = this.fh.FormBuilder({
      tipo: {default: "ELETRONICA"},
      confirmacao: {default: ""},
      certificado_id: {default: null}
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.documentos = this.metadata?.documentos;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(this.form?.controls.tipo.value == "ELETRONICA" && controlName == "confirmacao" && control.value.toLowerCase() != this.textoConfirmar.toLowerCase()) {
      result = "Valor deverá ser " + this.textoConfirmar;
    } else if(this.form?.controls.tipo.value == "DIGITAL" && controlName == "certificado_id" && !control.value?.length) {
      result = "Obrigatório selecionar um certificado"
    }
    return result;
  }

  public async onAssinarClick() {
    if (this.isProcessandoClique) return;
    this.isProcessandoClique = true;
    this.dialog.showSppinerOverlay("Assinando . . .");
    try {
      let response = await this.documentoDao.assinar(this.documentos.map(x => x.id));
      response?.forEach(atualizado => {
        const documento = this.documentos.find(x => x.id == atualizado.id);
        if(documento) documento.assinaturas = atualizado.assinaturas;
      });
      this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
      this.close();      
    } catch (error: any) {
      this.error(error?.error.message || error?.message || error || "Erro desconhecido");
    } finally {
      this.dialog.closeSppinerOverlay();
      this.isProcessandoClique = false;
    }
  }

}

