import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'solucao-filtro',
  templateUrl: './solucao-filtro.component.html',
  styleUrls: ['./solucao-filtro.component.scss']
})
export class SolucaoFiltroComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public usuarioDao: UsuarioDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.lookup = injector.get<LookupService>(LookupService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.modalWidth = 500;
    this.form = this.fh.FormBuilder({
      id: { default: '' },
      usuario_id: { default: null },
      nome: { default: '' },
      status: { default: '' }
    }, this.cdRef);

   
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.snapshot = this.snapshot || this.modalRoute || this.route.snapshot;
    this.urlParams = this.snapshot.paramMap;
    this.queryParams = this.go.decodeParam(this.snapshot.queryParams);
    this.metadata = this.go.getMetadata(this.snapshot.queryParams.idroute);
    this.form?.controls.nome.setValue(this.metadata.nome)
    this.form?.controls.id.setValue(this.metadata.id)
    this.form?.controls.usuario_id.setValue(this.metadata.usuario_id)
    this.form?.controls.status.setValue(this.metadata.status)
  }


  public async onSubmitClick() {
    this.loading = true;
    try {
      let response = {
        nome: this.form?.controls.nome.value,
        id: this.form?.controls.id.value,
        usuario_id: this.form?.controls.usuario_id.value,
        status: this.form?.controls.status.value
      };

      this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
      this.close();
    } catch (error: any) {
      this.error(error?.message || error?.error || error || "Erro desconhecido");
    } finally {
      this.loading = false;
    }
  }

}

