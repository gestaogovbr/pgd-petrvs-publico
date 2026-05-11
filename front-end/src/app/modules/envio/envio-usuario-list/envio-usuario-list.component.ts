import { Component, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnvioUsuarioDaoService } from 'src/app/dao/envio-usuario-dao.service';
import { QueryContext } from 'src/app/dao/query-context';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';

type EnvioUsuarioRow = Usuario & {
  data_agendamento_envio?: string | Date | null;
  data_tentativa_envio?: string | Date | null;
  data_conclusao_envio?: string | Date | null;
  data_envio_api_pgd?: string | Date | null;
  log_envio?: string | null;
};

@Component({
  selector: 'envio-usuario-list',
  templateUrl: './envio-usuario-list.component.html',
  styleUrls: ['./envio-usuario-list.component.scss'],
  standalone: false,
})
export class EnvioUsuarioListComponent extends PageListBase<Usuario, EnvioUsuarioDaoService> {
  public toolbarButtons: ToolbarButton[] = [];
  public rows: EnvioUsuarioRow[] = [];
  public isLoadingRows = false;

  constructor(public injector: Injector) {
    super(injector, Usuario, EnvioUsuarioDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Envios de Participantes');
    this.code = "MOD_ENVIO_USUARIO";
    this.filter = this.fh.FormBuilder({
      cpf: { default: '' },
      nome: { default: '' },
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

  public override onQueryResolve(rows: Usuario[] | null) {
    this.rows = rows || [];
  }

  protected override beforeQuery(): void {
    this.isLoadingRows = true;
  }

  protected override afterQuery(): void {
    this.isLoadingRows = false;
    super.afterQuery();
  }

  public get queryData(): QueryContext<Usuario> | undefined {
    return this.query;
  }

  public get hasRows(): boolean {
    return this.rows.length > 0;
  }

  public consultar(): void {
    this.query?.reload(this.queryOptions);
  }

  public limparFiltros(): void {
    this.filter?.reset({
      cpf: '',
      nome: '',
      status: null,
      agendamento_inicio: null,
      agendamento_fim: null,
      conclusao_inicio: null,
      conclusao_fim: null,
      envio_inicio: null,
      envio_fim: null,
    });
    this.consultar();
  }

  public paginaAnterior(): void {
    this.query?.priorPage();
  }

  public proximaPagina(): void {
    this.query?.nextPage();
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.cpf?.length) {
      result.push(["cpf", form.cpf.trim()]);
    }

    if (form.nome?.length) {
      result.push(["nome", form.nome.trim()]);
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

    if (form.status == 'Concluídos') {
      result.push(["isConcluido", true]);
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

  public hasTentativaBeforeAgendamento(row: Usuario): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataTentativaEnvio = (row as any)?.data_tentativa_envio;

    return !!dataAgendamento
      && !!dataTentativaEnvio
      && dataAgendamento > dataTentativaEnvio;
  }

  public hasConclusaoBeforeAgendamento(row: Usuario): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataConclusaoEnvio = (row as any)?.data_conclusao_envio;

    return !!dataAgendamento
      && !!dataConclusaoEnvio
      && dataAgendamento > dataConclusaoEnvio;
  }

  public hasEnvioBeforeAgendamento(row: Usuario): boolean {
    const dataAgendamento = (row as any)?.data_agendamento_envio;
    const dataEnvioApiPgd = (row as any)?.data_envio_api_pgd;

    return !!dataAgendamento
      && !!dataEnvioApiPgd
      && dataAgendamento > dataEnvioApiPgd;
  }
}
