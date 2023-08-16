import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';

@Component({
  selector: 'app-afastamento-list',
  templateUrl: './afastamento-list.component.html',
  styleUrls: ['./afastamento-list.component.scss']
})

export class AfastamentoListComponent extends PageListBase<Afastamento, AfastamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public tipoMotivoAfastamentoDao: TipoMotivoAfastamentoDaoService;
  public usuarioDao: UsuarioDaoService;
  public listagemInicial: Boolean = true;

  constructor(public injector: Injector) {
    super(injector, Afastamento, AfastamentoDaoService);

    this.join = ["tipo_motivo_afastamento:id, nome", "usuario: id, nome"];
    this.tipoMotivoAfastamentoDao = injector.get<TipoMotivoAfastamentoDaoService>(TipoMotivoAfastamentoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);

    /* Inicializações */
    this.title = this.lex.translate("Afastamentos");
    this.code = "MOD_AFT";
    this.filter = this.fh.FormBuilder({
      observacoes: {default: ""},
      data_inicio: {default: new Date()},
      data_fim: {default: new Date()},
      usuario_id: {default: ""},
      tipo_motivo_afastamento_id: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do afastamento
    if (this.auth.hasPermissionTo("MOD_AFT_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o afastamento
    if (this.auth.hasPermissionTo("MOD_AFT_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  /*public filterClear(filter: FormGroup) {
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.usuario_id.setValue("");
    filter.controls.tipo_motivo_afastamento_id.setValue("");
    super.filterClear(filter);
  }*/

  public filtro(){
    this.listagemInicial = false;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(form.usuario_id?.length && form.tipo_motivo_afastamento_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
      result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
    } else if(form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
    } else if(form.tipo_motivo_afastamento_id?.length) {
      result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
    } else if(this.dao?.validDateTime(form.data_inicio) && this.dao?.validDateTime(form.data_fim) && !this.listagemInicial) {
      result.push(this.dao?.intersectionWhere("data_inicio", "data_fim", this.util.startOfDay(form.data_inicio), this.util.startOfDay(form.data_fim)));
    }
    return result;
  }
}

