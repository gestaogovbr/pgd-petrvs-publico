import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CapacidadeDaoService } from 'src/app/dao/capacidade-dao.service';
import { Capacidade } from 'src/app/models/capacidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TipoCapacidadeDaoService } from 'src/app/dao/tipo-capacidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';

@Component({
  selector: 'app-capacidade-list',
  templateUrl: './capacidade-list.component.html',
  styleUrls: ['./capacidade-list.component.scss']
})
export class CapacidadeListComponent extends PageListBase<Capacidade, CapacidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public tipoCapacidadeDao: TipoCapacidadeDaoService;
  public perfilDao: PerfilDaoService;

  constructor(public injector: Injector) {
    super(injector, Capacidade, CapacidadeDaoService);
    this.join = ["tipo_capacidade", "perfil"];
    this.tipoCapacidadeDao = injector.get<TipoCapacidadeDaoService>(TipoCapacidadeDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);

    /* Inicializações */
    this.title = this.lex.noun("Capacidade",true);
    this.code = "MOD_TIPO_CAP";
    this.filter = this.fh.FormBuilder({
      descricao: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados do tipo de capacidade
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o tipo de capacidade
    if (this.auth.hasPermissionTo("MOD_TIPO_CAP_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.perfilDao.getById(this.urlParams!.get("perfil_id")!).then(perfil => {
      this.title = "Capacidades de " + perfil?.nome;
      this.cdRef.detectChanges();
    });
  }


  public filterClear(filter: FormGroup) {
    filter.controls.descricao.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.descricao?.length) {
      result.push(["perfil_id", "=", this.urlParams?.get("perfil_id")]);
    }

    return result;
  }
}

