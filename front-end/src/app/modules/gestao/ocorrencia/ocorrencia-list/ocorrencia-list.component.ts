import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { OcorrenciaDaoService } from 'src/app/dao/ocorrencia-dao.service';
import { Ocorrencia } from 'src/app/models/ocorrencia.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';

@Component({
  selector: 'app-ocorrencia-list',
  templateUrl: './ocorrencia-list.component.html',
  styleUrls: ['./ocorrencia-list.component.scss']
})

export class OcorrenciaListComponent extends PageListBase<Ocorrencia, OcorrenciaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public usuarioDao: UsuarioDaoService;
  public listagemInicial: Boolean = true;

  constructor(public injector: Injector) {
    super(injector, Ocorrencia, OcorrenciaDaoService);
    /* Inicializações */
    this.join = ["plano_trabalho:id,numero,data_inicio,data_fim", "plano_trabalho.unidade:id,nome,sigla", "usuario:id,nome,url_foto"];
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.title = this.lex.translate("Ocorrências");
    this.code = "MOD_OCOR";
    this.filter = this.fh.FormBuilder({
      descricao: {default: ""},
      data_inicio: {default: undefined},
      data_fim: {default: undefined},
      usuario_id: {default: ""},
      plano_trabalho_id: {default: ""}
    });
    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_OCOR_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }

  public filtro() {
    this.listagemInicial = false;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(form.plano_trabalho_id?.length) {
      result.push(["plano_trabalho_id", "==", form.plano_trabalho_id]);
    } else if (form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
    } else if (form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.replace(" ", "%") + "%"]);
    } else if(this.dao?.validDateTime(form.data_inicio)) { 
      result.push(["data_fim", ">=", form.data_inicio]);
    } else if(this.dao?.validDateTime(form.data_fim)) { 
      result.push(["data_inicio", "<=", form.data_fim]);
    }
    return result;
  }
}

