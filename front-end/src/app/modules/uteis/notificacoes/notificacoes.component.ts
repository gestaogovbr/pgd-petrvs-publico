import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { Notificacao } from 'src/app/models/notificacao.model';
import { NotificacaoDaoService } from 'src/app/dao/notificacao-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { IIndexable } from 'src/app/models/base.model';
import { NotificacaoService } from './notificacao.service';

@Component({
  selector: 'notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent extends PageListBase<Notificacao, NotificacaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [
    {
      icon: "bi bi-check-all",
      label: "Lido",
      color: "btn-outline-success",
      hint: "Marcar todas as notificações como lido",
      onClick: this.onLidoClick.bind(this)
    }
  ];
  public notificacaoService: NotificacaoService;

  constructor(public injector: Injector) {
    super(injector, Notificacao, NotificacaoDaoService);
    this.notificacaoService = injector.get<NotificacaoService>(NotificacaoService);
    /* Inicializações */
    this.modalWidth = 700;
    this.join = ["destinatarios"];
    this.title = this.lex.translate('Notificações');
    this.filter = this.fh.FormBuilder({
      todas: {default: false},
      data_inicio: {default: undefined},
      data_fim: {default: undefined}
    });
  }

  public filterClear(filter: FormGroup) {
    filter.controls.todas.setValue(false);
    filter.controls.data_inicio.setValue(undefined);
    filter.controls.data_fim.setValue(undefined);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["usuario_id", "==", this.auth.usuario!.id]);
    if(form.todas) result.push(["todas", "==", true]);
    if(this.util.isDataValid(form.data_inicio)) result.push(["data_registro", ">=", form.data_inicio]);
    if(this.util.isDataValid(form.data_fim)) result.push(["data_registro", "<=", form.data_fim]);
    return result;
  }

  public onLidoClick() {
    let destinatariosIds = (this.grid?.items || []).reduce((a: string[], v: IIndexable) => {
      a.push(...(v as Notificacao).destinatarios.filter(x => !x.data_leitura).map(x => x.id));
      return a;
    }, []);
    this.dao!.marcarComoLido(destinatariosIds).then(qtd => {
      this.grid!.reloadFilter();
      this.notificacaoService.updateNaoLidas();
    });
  }

}

