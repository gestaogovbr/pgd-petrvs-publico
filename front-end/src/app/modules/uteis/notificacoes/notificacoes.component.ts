import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { Notificacao } from 'src/app/models/notificacao.model';
import { NotificacaoDaoService } from 'src/app/dao/notificacao-dao.service';

@Component({
  selector: 'notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent extends PageListBase<Notificacao, NotificacaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, Notificacao, NotificacaoDaoService);
    /* Inicializações */
    this.modalWidth = 700;
    this.join = ["destinatarios"];
    this.title = this.lex.noun('Notificação', true);
    this.filter = this.fh.FormBuilder({
      todas: {default: false},
      inicio: {default: undefined},
      fim: {default: undefined}
    });
  }

  public filterClear(filter: FormGroup) {
    filter.controls.todas.setValue(false);
    filter.controls.inicio.setValue(undefined);
    filter.controls.fim.setValue(undefined);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    result.push(["usuario_id", "==", this.auth.usuario!.id]);
    if(form.todas) result.push(["todas", "==", true]);
    if(this.util.isDataValid(form.inicio)) result.push(["data_registro", ">=", form.inicio]);
    if(this.util.isDataValid(form.fim)) result.push(["data_registro", "<=", form.fim]);
    return result;
  }
}

