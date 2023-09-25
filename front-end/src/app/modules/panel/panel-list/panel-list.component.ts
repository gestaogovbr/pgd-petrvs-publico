import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
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

  public toolbarButtons: ToolbarButton[] = [
    {
      icon: "bi bi-building",
      label: "Executar Migrations",
      onClick: this.executaMigrations.bind(this)
    },
    {
      icon: "bi bi-building",
      label: "Executar Seeders",
      onClick: this.executaSeeders.bind(this)
    }
  ];

  constructor(public injector: Injector, dao: TenantDaoService) {
    super(injector, Tenant, TenantDaoService);
    /* Inicializações */
    this.title = "Painel Petrvs";
    this.code = "PANEL";
    this.filter = this.fh.FormBuilder({});
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Executar Database", 
      onClick: this.databaseSeeder.bind(this)
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
      icon: "bi bi-list-check",
      label: "Executar Entidades",
      onClick: this.entidadesSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-list-check",
      label: "Executar Usuarios",
      onClick: this.usuariosSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Ver Logs",
      onClick: (tenant: Tenant) => this.go.navigate({route: ["panel","panel-list", tenant.id, "logs"]})
    });
   
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    return result;
  }

  public executaMigrations(row: any) {
    const self = this;
    this.dialog.confirm("Executar Migration?", "Deseja realmente executar as migrations?").then(confirm => {
      if (confirm) {
        this.dao!.migrations(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : error);
        });
      }
    });
  }
  public executaSeeders(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar as seeders?").then(confirm => {
      if (confirm) {
        this.dao!.seeders(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : error);
        });
      }
    });
  }


  public executaMigrationTenant(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar as migrations?").then(confirm => {
      if (confirm) {
        this.dao!.tiposCapacidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : error);
        });
      }
    });
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

  public usuariosSeeder(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao!.usuarioSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : error);
        });
      }
    });
  }

  public entidadesSeeder(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao!.entidadeSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : error);
        });
      }
    });
  }
  public databaseSeeder(row: any) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao!.entidadeSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : error);
        });
      }
    });
  }
}

