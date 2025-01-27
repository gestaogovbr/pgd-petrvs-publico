import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ClienteDaoService } from 'src/app/dao/cliente-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'produto-filter',
  templateUrl: './produto-filter.component.html',
  styleUrls: ['./produto-filter.component.scss']
})
export class ProdutoFilterComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public clienteDao: ClienteDaoService;
  public enableStatus: boolean = true;

  constructor(public injector: Injector) {
    super(injector);
    this.lookup = injector.get<LookupService>(LookupService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.clienteDao = injector.get<ClienteDaoService>(ClienteDaoService);
    this.modalWidth = 500;
    this.form = this.fh.FormBuilder({
      id: { default: '' },
      nome: { default: '' },
      status: { default: '' },
      unidade_id: {default: ""},
      cliente_id: {default: ""},
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
    this.form?.controls.status.setValue(this.metadata.status)
    this.form?.controls.unidade_id.setValue(this.metadata.unidade_id)
    this.form?.controls.cliente_id.setValue(this.metadata.cliente_id)

    this.enableStatus = (this.metadata.enableStatus == undefined) ? true : this.metadata.enableStatus;
  }

  public async onSubmitClick() {
    this.loading = true;
    try {
      let response = {
        nome: this.form?.controls.nome.value,
        id: this.form?.controls.id.value,
        unidade_id: this.form?.controls.unidade_id.value,
        cliente_id: this.form?.controls.cliente_id.value,
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

