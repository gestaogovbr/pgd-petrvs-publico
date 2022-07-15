import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { TipoMotivoAfastamento } from 'src/app/models/tipo-motivo-afastamento.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-atividade-list',
  templateUrl: './atividade-list.component.html',
  styleUrls: ['./atividade-list.component.scss']
})
export class AtividadeListComponent extends PageListBase<Atividade, AtividadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public tipoAtividadeDao: TipoAtividadeDaoService;
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.join = ["tipo_atividade:id,nome", "unidade:id,sigla,nome"];
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);

    /* Inicializações */
    this.title = this.lex.noun("Atividade",true);
    this.code = "MOD_ATV";
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      unidade_id: {default: ""},
      vinculadas: {default: true},
      homologado: {default: ""},
      tipo_atividade_id: {default: null}
    });
    //this.orderBy = [['unidade.sigla', 'asc']];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;
    
    result.push({label: "Informações", icon: "bi bi-info-circle", onClick: (atividade: Atividade) => this.go.navigate({route: ['cadastros', 'atividade', atividade.id, 'consult']}, {modal: true})});  
    // Testa se o usuário possui permissão para homologar a atividade
    if(this.auth.hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM')) result.push(Object.assign({}, this.grid?.BUTTON_EDIT, {onClick: this.edit.bind(this)}));
    // Testa se o usuário possui permissão para exibir dados de atividade
    if (this.auth.hasPermissionTo("MOD_ATV_CONS")) result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this)});
    // Testa se o usuário possui permissão para excluir a atividade
    if (this.auth.hasPermissionTo("MOD_ATV_EXCL")) result.push({icon: "bi bi-trash", label: "Excluir", onClick: this.delete.bind(this)});
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let atividade: Atividade = row as Atividade;

    if(atividade.homologado || !this.auth.hasPermissionTo('MOD_ATV_EDT_OTR_OP_HOM')) {
      result.push(Object.assign({}, this.grid?.BUTTON_EDIT, {onClick: this.edit.bind(this)}));
    } else {
      result.push({hint: "Homologar", icon: "bi bi-hand-thumbs-up", onClick: this.homologar.bind(this) });
    }
    return result;
  }

  public homologar(doc: Atividade) {
    this.dialog.confirm("Homologar", "Deseja realmente homologar essa atividade?").then(response => {
      if(response) {
        this.loading = true;
        this.dao!.homologar(doc.id).then(response => {
            this.grid!.query!.refreshId(doc.id);
        }).finally(() => this.loading = false);
      }
    });
  }

  public ngOnInit() {
    super.ngOnInit();
    this.filter?.controls.vinculadas.setValue(this.selectable);
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.unidade_id.setValue("");
    filter.controls.homologado.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.replace(" ", "%") + "%"]);
    }
    if(form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }
    if(form.tipo_atividade_id?.length) {
      result.push(["tipo_atividade_id", "==", form.tipo_atividade_id]);
    }
    if(form.vinculadas) {
      result.push(["vinculadas", "==", true]);
    }
    if(form.homologado?.length) {
      result.push(["homologado", "==", form.homologado == "S"]);
    }

    return result;
  }

  public getReportComplexidade(row: Atividade): string {
    let result = "";
    row.complexidade.forEach(element => {
      result += element.grau + ": " + element.fator + ";\n";
    });
    return result;
  }

  public getReportEtiquetas(row: Atividade): string {
    let result = "";
    row.etiquetas_predefinidas.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

  public getReportChecklist(row: Atividade): string {
    let result = "";
    row.checklist_predefinidos.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

  public getReportParametrosAdotados(row: Atividade): string {
    let result = "";
    row.parametros_adotados.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

  public getReportEntregasEsperadas(row: Atividade): string {
    let result = "";
    row.entregas_esperadas.forEach(element => {
      result += element.value + ";\n";
    });
    return result;
  }

}

