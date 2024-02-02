import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { Documento } from 'src/app/models/documento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'documentos-preview',
  templateUrl: './documentos-preview.component.html',
  styleUrls: ['./documentos-preview.component.scss']
})
export class DocumentosPreviewComponent extends PageFrameBase {
  @Input() documentoId?: string;
  @Input() documento?: Documento;

  public documentoSalvo: boolean = false;

  public documentoDao: DocumentoDaoService;
  public buttons: ToolbarButton[] = [
    { icon: "bi bi-floppy", hint: "Salvar documento", color: "btn-outline-info border-0", onClick: () => this.salvarParaUsuario(), id: 'salvarDocumento' },
    { icon: "bi bi-printer", hint: "Imprimir", color: "btn-outline-secondary border-0", onClick: () => this.imprimir() },
    { icon: "bi bi-envelope-at", hint: "Enviar E-mail", color: "btn-outline-warning border-0" },
    { icon: "bi bi-file-earmark-pdf", hint: "Exportar PDF", color: "btn-outline-danger border-0", onClick: () => this.geraPDF() },
    { icon: "bi bi-whatsapp", hint: "Enviar WhatsApp", color: "btn-outline-success border-0" },
    { img: "assets/images/sei_icon.png", hint: "Enviar SEI", color: "btn-outline-primary border-0" }
  ];

  constructor(public injector: Injector) {
    super(injector);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.modalWidth = 1000;
    this.form = this.fh.FormBuilder({
      conteudo: {default: ""}
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    (async () => {
      this.loading = true;
      try {
        this.documentoId = this.documentoId || this.metadata?.documentoId || this.urlParams?.get("documentoId");
        this.documento = this.documento || this.metadata?.documento || await this.dao!.getById(this.documentoId!);
        if(this.documento?.assinaturas?.length){
          let assinaturas = "<div style='display:block; '><br><hr><h5>Assinatura(s):</h5>";
          this.documento?.assinaturas.forEach(assinatura => {
            assinaturas += `<div class='mb-2'><p class="m-0"><b>${assinatura.usuario?.nome}</b></p><small>${this.util.getDateTimeFormatted(assinatura.data_assinatura)}<br>${assinatura.assinatura}</small></div>`;
          });
          assinaturas += "</div>";

          if(!this.documento.conteudo?.includes(assinaturas)) this.documento.conteudo = this.documento.conteudo?.concat(assinaturas) || null;

        }
        
        
        this.cdRef.detectChanges();
      } finally {
        this.loading = false;
      }      
    })();    
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  salvarParaUsuario(){
    if(this.documento){
      this.documentoDao.update(this.documento.id, {usuario_id: this.auth.usuario?.id}).then(doc => {
        this.documentoSalvo = true;
        const botaoSalvar = this.buttons.find(b => b.id == 'salvarDocumento')
        if(botaoSalvar) botaoSalvar.disabled = true;
      });
    }
  }

  geraPDF(){
    if(this.documento){
      this.documentoDao.gerarPDF(this.documento.id).then(res => {
        
      })
    }
  }

  imprimir() {
    window.print();
  }

}

