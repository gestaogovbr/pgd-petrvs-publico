import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { EnvioPlanoTrabalhoDaoService } from 'src/app/dao/envio-plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
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
      result.push(["numero", form.numero.trim()]);
    }


    if (form.unidade_id?.length) {
      result.push(["unidade_id", form.unidade_id]);
    }

    if (form.status == 'Não agendados') {
      result.push(["isNaoAgendado", true]);
    }

    if (form.status == 'Agendados') {
      result.push(["isAgendado", true]);
    }

    if (form.status == 'Enviados') {
      result.push(["isEnviado", true]);
    }

    if (form.status == 'Não enviados') {
      result.push(["isNaoEnviado", true]);
    }

    if (form.status == 'Pendentes') {
      result.push(["isPendente", true]);
    }

    if (form.status == 'Com falha') {
      result.push(["isFalha", true]);
    }

    if (form.agendamento_inicio) {
      result.push(["data_agendamento_envio_gte", form.agendamento_inicio.toISOString().slice(0, 10)]);
    }

    if (form.agendamento_fim) {
      result.push(["data_agendamento_envio_lte", form.agendamento_fim.toISOString().slice(0, 10)]);
    }

    if (form.conclusao_inicio) {
      result.push(["data_conclusao_envio_gte", form.conclusao_inicio.toISOString().slice(0, 10)]);
    }

    if (form.conclusao_fim) {
      result.push(["data_conclusao_envio_lte", form.conclusao_fim.toISOString().slice(0, 10)]);
    }

    if (form.envio_inicio) {
      result.push(["data_envio_api_pgd_gte", form.envio_inicio.toISOString().slice(0, 10)]);
    }

    if (form.envio_fim) {
      result.push(["data_envio_api_pgd_lte", form.envio_fim.toISOString().slice(0, 10)]);
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
