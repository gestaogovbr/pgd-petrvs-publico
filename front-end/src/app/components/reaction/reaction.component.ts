import { Component, Injector, Input, OnInit } from '@angular/core';
import {
  HasReacoes,
  Reacao,
  ReacaoOrigem,
  ReacaoPorTipo,
} from 'src/app/models/reacao';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { ReacaoService } from 'src/app/services/reacao.service';

@Component({
  selector: 'reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss'],
})
export class ReactionComponent extends PageFrameBase implements OnInit {
  @Input() origem: ReacaoOrigem = undefined;
  @Input() set entity(value: HasReacoes | undefined) {
    if (this._entity != value) {
      this._entity = value;
    }
  }
  get entity(): HasReacoes | undefined {
    return this._entity;
  }

  public reacaoService: ReacaoService;
  showEmojis = false;
  emojiList: LookupItem[] = [];
  reacaoUsuario!: Reacao | undefined;
  reacoes: Reacao[] = [];
  reacoesPorTipo: ReacaoPorTipo[] = [];
  colunaRelacionada: string = '';

  constructor(public injector: Injector) {
    super(injector);
    this.reacaoService = injector.get<ReacaoService>(ReacaoService);
  }

  ngOnInit(): void {
    this.emojiList = this.lookup.REACAO_TIPO;
    this.reacaoUsuario = this.entity
      ? this.reacaoService.reacaoUsuario(this.entity?.reacoes)
      : undefined;
    this.reacoes = this.entity ? this.entity.reacoes : [];
    this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);

    switch (this.origem) {
      case 'ATIVIDADE':
        this.colunaRelacionada = 'atividade_id';
        break;
      case 'PLANO_ENTREGA_ENTREGA':
        this.colunaRelacionada = 'plano_entrega_entrega_id';
        break;
      case 'PLANO_TRABALHO_ENTREGA':
        this.colunaRelacionada = 'plano_trabalho_entrega_id';
        break;
    }
  }

  toggleShow(showOptions: boolean) {
    this.showEmojis = showOptions;
  }

  emojiPath(emoji: string) {
    return this.gb.baseURL + `assets/icons/reactions/${emoji}.svg`;
  }

  async react(reacao: LookupItem) {
    if (this.reacaoUsuario && this.reacaoUsuario.tipo == reacao.key) {
      await this.reacaoService.removeReacao(this.reacaoUsuario);
      this.reacoes = this.reacoes.filter((item) => item.id !== this.reacaoUsuario?.id);
      this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
      this.reacaoUsuario = undefined;
    } else if (this.reacaoUsuario && this.reacaoUsuario.tipo != reacao.key) {
      this.reacaoUsuario = await this.reacaoService.atualizaReacao(reacao, this.reacaoUsuario);
      const indiceDaReacaoAAtualizar = this.reacoes.findIndex(rea => rea.id === this.reacaoUsuario?.id);
      if (indiceDaReacaoAAtualizar !== -1) {
        this.reacoes[indiceDaReacaoAAtualizar] = this.reacaoUsuario;
      }
      this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
    } else {
      this.reacaoUsuario = await this.reacaoService.criaReacao(reacao, this.colunaRelacionada, this.entity?.id!);      
      this.reacoes.push(this.reacaoUsuario);
      this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
    }
    this.cdRef.detectChanges();
  }

  getIconReacao() {
    return this.lookup.REACAO_TIPO.find((item) => item.key === this.reacaoUsuario?.tipo);
  }

  separarReacoesPorTipo(reacoes: Reacao[]): ReacaoPorTipo[] {
    const reacoesPorTipo: ReacaoPorTipo[] = [];
    reacoes.forEach((reacao) => {
      const tipoReacao = reacao.tipo;
      const tipoExistente = reacoesPorTipo.find((item) => item.tipo === tipoReacao);
      if (tipoExistente) {
        tipoExistente.reacoes.push(reacao);
      } else {
        reacoesPorTipo.push({ tipo: tipoReacao, reacoes: [reacao] });
      }
    });
    return reacoesPorTipo;
  }
}
