import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { addDays } from 'date-fns';

@Component({
  selector: 'envio-plano-trabalho-list',
  templateUrl: './envio-plano-trabalho-list.component.html',
  styleUrls: ['./envio-plano-trabalho-list.component.scss']
})
export class EnvioPlanoTrabalhoListComponent extends PageListBase<PlanoTrabalho, PlanoTrabalhoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalho, PlanoTrabalhoDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Envios de Planos de Trabalho');
    this.code = "MOD_ENVIO_PT";
    this.join = ["unidade:id,sigla", "programa:id,nome"];
    this.filter = this.fh.FormBuilder({
      numero: { default: '' },
      nome: { default: '' },
      unidadeId: { default: null },
      status: { default: null },
      envio_inicio: { default: null },
      envio_fim: { default: null },
    });
    this.orderBy = [['data_agendamento_envio', 'desc']];
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.numero?.length) {
      result.push(["numero", "like", "%" + form.numero.trim().replace(" ", "%") + "%"]);
    }

    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if (form.status == 'Não agendados') {
      result.push(["data_agendamento_envio", "==", null]);
    }

    if (form.status == 'Agendados') {
      result.push(["data_agendamento_envio", "!=", null]);
    }

    if (form.status == 'Enviados') {
      result.push(["data_envio_api_pgd", "!=", null]);
    }

    if (form.status == 'Não enviados') {
      result.push(["data_envio_api_pgd", "==", null]);
    }

    if (form.status == 'Pendentes') {
      result.push(["envios_pendentes", "==", 1]);
    }

    if (form.status == 'Com falha') {
      result.push(["log_envio", "!=", null]);
    }

    if (form.envio_inicio) {
      result.push(["data_envio_api_pgd", ">=", form.envio_inicio.toISOString().slice(0,10)]);
    }

    if (form.envio_fim) {
      result.push(["data_envio_api_pgd", "<", addDays(form.envio_fim, 1).toISOString().slice(0,10)]);
    }

    return result;
  }
}