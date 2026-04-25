import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ReacaoService } from 'src/app/services/reacao.service';
let ReactionComponent = class ReactionComponent extends PageFrameBase {
    set entity(value) {
        if (this._entity != value) {
            this._entity = value;
        }
    }
    get entity() {
        return this._entity;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.origem = undefined;
        this.showEmojis = false;
        this.emojiList = [];
        this.reacoes = [];
        this.reacoesPorTipo = [];
        this.colunaRelacionada = '';
        this.reacaoService = injector.get(ReacaoService);
    }
    ngOnInit() {
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
    toggleShow(showOptions) {
        this.showEmojis = showOptions;
    }
    emojiPath(emoji) {
        return this.gb.baseURL + `assets/icons/reactions/${emoji}.svg`;
    }
    async react(reacao) {
        if (this.reacaoUsuario && this.reacaoUsuario.tipo == reacao.key) {
            await this.reacaoService.removeReacao(this.reacaoUsuario);
            this.reacoes = this.reacoes.filter((item) => item.id !== this.reacaoUsuario?.id);
            this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
            this.reacaoUsuario = undefined;
        }
        else if (this.reacaoUsuario && this.reacaoUsuario.tipo != reacao.key) {
            this.reacaoUsuario = await this.reacaoService.atualizaReacao(reacao, this.reacaoUsuario);
            const indiceDaReacaoAAtualizar = this.reacoes.findIndex(rea => rea.id === this.reacaoUsuario?.id);
            if (indiceDaReacaoAAtualizar !== -1) {
                this.reacoes[indiceDaReacaoAAtualizar] = this.reacaoUsuario;
            }
            this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
        }
        else {
            this.reacaoUsuario = await this.reacaoService.criaReacao(reacao, this.colunaRelacionada, this.entity?.id);
            this.reacoes.push(this.reacaoUsuario);
            this.reacoesPorTipo = this.separarReacoesPorTipo(this.reacoes);
        }
        this.cdRef.detectChanges();
    }
    getIconReacao() {
        return this.lookup.REACAO_TIPO.find((item) => item.key === this.reacaoUsuario?.tipo);
    }
    separarReacoesPorTipo(reacoes) {
        const reacoesPorTipo = [];
        reacoes.forEach((reacao) => {
            const tipoReacao = reacao.tipo;
            const tipoExistente = reacoesPorTipo.find((item) => item.tipo === tipoReacao);
            if (tipoExistente) {
                tipoExistente.reacoes.push(reacao);
            }
            else {
                reacoesPorTipo.push({ tipo: tipoReacao, reacoes: [reacao] });
            }
        });
        return reacoesPorTipo;
    }
};
__decorate([
    Input()
], ReactionComponent.prototype, "origem", void 0);
__decorate([
    Input()
], ReactionComponent.prototype, "entity", null);
ReactionComponent = __decorate([
    Component({
        selector: 'reaction',
        templateUrl: './reaction.component.html',
        styleUrls: ['./reaction.component.scss'],
        standalone: false
    })
], ReactionComponent);
export { ReactionComponent };
//# sourceMappingURL=reaction.component.js.map