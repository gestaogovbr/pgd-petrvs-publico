import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
import { Tenant } from 'src/app/models/tenant.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent extends PageListBase<Tenant, TenantDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector, dao: TenantDaoService) {
    super(injector, Tenant, TenantDaoService);
    /* Inicializações */
    this.title = "Panel Petrvs";
    this.code = "PANEL";
    this.filter = this.fh.FormBuilder({});
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-building",
      label: "Executar Cidades",
      onClick: this.cidadeSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-list-check",
      label: "Executar Tipos Capacidades",
      onClick: this.tipoCapacidadeSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
   
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    return result;
  }

  public tipoCapacidadeSeeder(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao!.tiposCapacidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public cidadeSeeder(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar a seeder de cidades?").then(confirm => {
      if (confirm) {
        this.dao!.cidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : error);
        });
      }
    });
  }
}

