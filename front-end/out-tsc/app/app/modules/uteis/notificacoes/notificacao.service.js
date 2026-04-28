import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let NotificacaoService = class NotificacaoService {
    constructor(auth, dialog, notificacaoService, notificacaoDao, go) {
        this.auth = auth;
        this.dialog = dialog;
        this.notificacaoService = notificacaoService;
        this.notificacaoDao = notificacaoDao;
        this.go = go;
        this.naoLidas = 0;
    }
    updateNaoLidas() {
        if (this.auth.usuario)
            this.naoLidas = this.auth.usuario.notificacoes_destinatario?.length || 0;
    }
    heartbeat() {
        this.updateNaoLidas();
        if (!this.intervalId)
            this.intervalId = setInterval(this.updateNaoLidas.bind(this), 60 * 1000);
    }
    details(data) {
        const template = data.entity;
        this.dialog.html({ title: "Pre-visualização do documento", modalWidth: 1000 }, template.conteudo, []);
    }
    dataset(codigo) {
        return [];
    }
    titulo(codigo) {
        return "";
    }
    hint(codigo) {
        return ""; //"Variáveis disponíveis:\n{{demanda_numero}}\n{{demanda_responsavel}}";
    }
};
NotificacaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NotificacaoService);
export { NotificacaoService };
//# sourceMappingURL=notificacao.service.js.map