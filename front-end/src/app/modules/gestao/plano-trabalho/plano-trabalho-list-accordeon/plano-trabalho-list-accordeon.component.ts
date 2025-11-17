import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccordionComponent } from 'src/app/components/accordion/accordion.component';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
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
      let self = this;
      this.planos = dados.planos;
      for(var i = 0; i < this.planos.length; i++) {
        if(this.util.asTimestamp(this.planos[i].data_inicio) <= agora && agora <= this.util.asTimestamp(this.planos[i].data_fim) && ["ATIVO", "CONCLUIDO"].includes(this.planos[i].status)) {
          this.selectedIndex = i;
        }
        this.planos[i].accordionDisabled = ['AGUARDANDO_ASSINATURA', 'INCLUIDO'].includes(this.planos[i].status);
      }
    } finally {
      this.accordion!.loading = false;
      this.cdRef.detectChanges();
    }
  }

  public getPlanoBadges(plano: PlanoTrabalho): BadgeButton[] {
    let result: BadgeButton[] = [];
    let concluidos = plano.consolidacoes.filter(x => x.status == "CONCLUIDO");
    let avaliados = plano.consolidacoes.filter(x => x.status == "AVALIADO");
    if(concluidos.length) {
      const concluido = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "CONCLUIDO");
      result.push({
        icon: concluido?.icon,
        label: concluido?.value,
        color: concluido?.color,
        textValue: concluidos.length.toString()
      });
    }
    if(avaliados.length) {
      const avaliado = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "AVALIADO");
      result.push({
        icon: avaliado?.icon,
        label: avaliado?.value,
        color: avaliado?.color,
        textValue: avaliados.length.toString()
      });
    }
    if(JSON.stringify(plano._metadata?.badges) != this.JSON.stringify(result)) {
      plano._metadata = Object.assign(plano._metadata || {}, { badges: result });
    }
    return plano._metadata.badges;
  }

  protected planoTrabalhoStatus(planoTrabalho: PlanoTrabalho) {
    if(planoTrabalho.status === "ATIVO" &&
      !planoTrabalho.consolidacoes.find((consolidacao : PlanoTrabalhoConsolidacao) => consolidacao.status !== "CONCLUIDO")) {
      return "CONCLUIDO";
    }

    return planoTrabalho.status;
  }
}
