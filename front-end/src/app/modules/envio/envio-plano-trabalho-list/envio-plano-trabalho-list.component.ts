import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EnvioPlanoTrabalhoDaoService } from 'src/app/dao/envio-plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { addDays } from 'date-fns';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'envio-plano-trabalho-list',
  templateUrl: './envio-plano-trabalho-list.component.html',
  styleUrls: ['./envio-plano-trabalho-list.component.scss'],
  standalone: false
})
export class EnvioPlanoTrabalhoListComponent extends PageListBase<PlanoTrabalho, EnvioPlanoTrabalhoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, PlanoTrabalho, EnvioPlanoTrabalhoDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Envios de Planos de Trabalho');
    this.code = "MOD_ENVIO_PT";
    this.join = ["unidade:id,sigla", "programa:id,nome"];
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.filter = this.fh.FormBuilder({
      numero: { default: '' },
      unidade_id: { default: null },
      status: { default: null },
      agendamento_inicio: { default: null },
      agendamento_fim: { default: null },
      conclusao_inicio: { default: null },
      conclusao_fim: { default: null },
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


    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
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
      result.push(["envio_com_falha", "==", 1]);
    }

    if (form.agendamento_inicio) {
      result.push(["data_agendamento_envio", ">=", form.agendamento_inicio.toISOString().slice(0, 10)]);
    }

    if (form.agendamento_fim) {
      result.push(["data_agendamento_envio", "<", addDays(form.agendamento_fim, 1).toISOString().slice(0, 10)]);
    }

    if (form.conclusao_inicio) {
      result.push(["data_conclusao_envio", ">=", form.conclusao_inicio.toISOString().slice(0, 10)]);
    }

    if (form.conclusao_fim) {
      result.push(["data_conclusao_envio", "<", addDays(form.conclusao_fim, 1).toISOString().slice(0, 10)]);
    }

    if (form.envio_inicio) {
      result.push(["data_envio_api_pgd", ">=", form.envio_inicio.toISOString().slice(0, 10)]);
    }

    if (form.envio_fim) {
      result.push(["data_envio_api_pgd", "<", addDays(form.envio_fim, 1).toISOString().slice(0, 10)]);
    }

    return result;
  }

  public hasTentativaBeforeAgendamento(row: PlanoTrabalho): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataTentativaEnvio = (row as any)?.data_tentativa_envio;

    return !!dataAgendamento
      && !!dataTentativaEnvio
      && dataAgendamento > dataTentativaEnvio;
  }

  public hasConclusaoBeforeAgendamento(row: PlanoTrabalho): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataConclusaoEnvio = (row as any)?.data_conclusao_envio;

    return !!dataAgendamento
      && !!dataConclusaoEnvio
      && dataAgendamento > dataConclusaoEnvio;
  }

  public hasEnvioBeforeAgendamento(row: PlanoTrabalho): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataEnvioApiPgd = (row as any)?.data_envio_api_pgd;

    return !!dataAgendamento
      && !!dataEnvioApiPgd
      && dataAgendamento > dataEnvioApiPgd;
  }
}