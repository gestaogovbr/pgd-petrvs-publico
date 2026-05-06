import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Reacao } from '../models/reacao';
let ReacaoService = class ReacaoService {
    constructor(util, auth, dao) {
        this.util = util;
        this.auth = auth;
        this.dao = dao;
    }
    reacaoUsuario(reacoes) {
        return reacoes ? reacoes.find(reacao => reacao.usuario_id == this.auth.usuario?.id) : undefined;
    }
    async criaReacao(reacao, coluna, id) {
        const reacaoObjeto = new Reacao({
            usuario_id: this.auth.usuario?.id,
            usuario: this.auth.usuario,
            tipo: reacao.key,
            atividade_id: coluna == "atividade_id" ? id : null,
            plano_entrega_entrega_id: coluna == "plano_entrega_entrega_id" ? id : null,
            plano_trabalho_entrega_id: coluna == "plano_trabalho_entrega_id" ? id : null,
        });
        const novaReacao = await this.dao.save(reacaoObjeto);
        if (novaReacao)
            novaReacao.usuario = this.auth.usuario;
        return novaReacao;
    }
    async atualizaReacao(novaReacao, reacao) {
        const reacaoAtualizada = await this.dao.update(reacao.id, { tipo: novaReacao.key });
        if (reacaoAtualizada)
            reacaoAtualizada.usuario = this.auth.usuario;
        return reacaoAtualizada;
    }
    async removeReacao(reacao) {
        return await this.dao.delete(reacao);
    }
};
ReacaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ReacaoService);
export { ReacaoService };
//# sourceMappingURL=reacao.service.js.map