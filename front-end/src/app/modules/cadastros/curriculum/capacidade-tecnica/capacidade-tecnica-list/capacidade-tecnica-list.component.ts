import { Component, Injector, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CapacidadeTecnica } from 'src/app/models/capacidade-tecnica.model';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';

@Component({
  selector: 'capacidade-tecnica-list',
  templateUrl: './capacidade-tecnica-list.component.html',
  styleUrls: ['./capacidade-tecnica-list.component.scss']
})
export class CapacidadeTecnicaListComponent extends PageListBase<CapacidadeTecnica, CapacidadeTecnicaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
  constructor(public injector: Injector) {
    super(injector, CapacidadeTecnica, CapacidadeTecnicaDaoService);
       /* Inicializações */
    this.title = this.lex.translate("Capacidades Técnicas");
    this.code = "MOD_RX";
    this.join = ["area_tematica:id,nome"];
    this.orderBy = [['nome','asc']];
    //console.log('JOIN-->',this.join)
  
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      area_tematica_id:{default: ""},
      ativo: {default: ""},
     });
    // Testa se o usuário possui permissão para exibir dados de CapacidadeTecnicas
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o CapacidadeTecnica
    if (this.auth.hasPermissionTo("MOD_RX_VIS_DPE")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }

   

  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.area_tematica_id.setValue("");

    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if(form.area_tematica_id?.length) {
      result.push(["id", "like", "%" + form.area_tematica_id.trim().replace(" ", "%") + "%"]);
    }

  
    return result;
  }

 
}


