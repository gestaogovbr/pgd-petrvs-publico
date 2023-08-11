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
  @Input() arquivados: boolean = false;

  public dao?: PlanoTrabalhoDaoService;
  public planos: PlanoTrabalho[] = [];

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
      this.planos = dados.planos;
    } finally {
      this.accordion!.loading = false;
      this.cdRef.detectChanges();
    }
  }

}
