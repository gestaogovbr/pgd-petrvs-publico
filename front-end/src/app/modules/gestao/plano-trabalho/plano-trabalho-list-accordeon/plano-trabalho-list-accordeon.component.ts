import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'plano-trabalho-list-accordeon',
  templateUrl: './plano-trabalho-list-accordeon.component.html',
  styleUrls: ['./plano-trabalho-list-accordeon.component.scss']
})
export class PlanoTrabalhoListAccordeonComponent extends PageFrameBase {
  @ViewChild('accordion', { static: false }) public accordion?: AccordionComponent;
  @Input() usuarioId?: string;
  @Input() set arquivados(value: boolean) {
    if(this._arquivados != value) {
      this._arquivados = value;
      if(this.viewInit) this.loadData(this.entity!, this.form);
    }
  }
  get arquivados(): boolean {
    return this._arquivados;
  }

  public selectedIndex: number = -1;
  public dao?: PlanoTrabalhoDaoService;
  public planos: PlanoTrabalho[] = [];

  private _arquivados: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.loadData(this.entity!, this.form);
    })();
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.accordion!.loading = true;
    try {
      let dados = await this.dao!.getByUsuario(this.usuarioId!, this.arquivados);
      let agora = (new Date()).getTime();
      this.planos = dados.planos;
      for(var i = 0; i < this.planos.length; i++) {
        if(this.util.asDate(this.planos[i].data_inicio)!.getTime() <= agora && agora <= this.util.asDate(this.planos[i].data_fim)!.getTime() && ["ATIVO", "CONCLUIDO"].includes(this.planos[i].status)) {
          this.selectedIndex = i;
        }
      }
    } finally {
      this.accordion!.loading = false;
      this.cdRef.detectChanges();
    }
  }

}
