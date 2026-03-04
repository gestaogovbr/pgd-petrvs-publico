import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { addDays } from 'date-fns';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';

@Component({
  selector: 'envio-usuario-list',
  templateUrl: './envio-usuario-list.component.html',
  styleUrls: ['./envio-usuario-list.component.scss'],
  standalone: false,
})
export class EnvioUsuarioListComponent extends PageListBase<Usuario, UsuarioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    /* Inicializações */
    this.title = this.lex.translate('Envios de Participantes');
    this.code = "MOD_ENVIO_USUARIO";
    this.fields = [
      "matricula",
      "nome",
      "cpf",
      "updated_at",
      "data_envio_api_pgd",
      "data_agendamento_envio",
      "data_tentativa_envio",
      "log_envio"
    ];
    this.filter = this.fh.FormBuilder({
      cpf: { default: '' },
      nome: { default: null },
      status: { default: null },
      envio_inicio: { default: null },
      envio_fim: { default: null },
    });
    this.orderBy = [['data_agendamento_envio', 'desc']];
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.cpf?.length) {
      result.push(["cpf", "like", "%" + form.cpf.trim().replace(" ", "%") + "%"]);
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