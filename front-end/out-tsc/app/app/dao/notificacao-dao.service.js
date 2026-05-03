import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
let NotificacaoDaoService = class NotificacaoDaoService extends DaoBaseService {
    constructor(injector) {
        super("Notificacao", injector);
        this.injector = injector;
    }
    naoLidas() {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/nao-lidas', {}).subscribe(response => {
                resolve(response?.nao_lidas || 0);
            }, error => reject(error));
        });
    }
    marcarComoLido(destinatariosIds) {
        return new Promise((resolve, reject) => {
            this.server.post('api/' + this.collection + '/marcar-como-lido', { 'destinatarios_ids': destinatariosIds }).subscribe(response => {
                resolve(response?.marcadas_como_lido || 0);
            }, error => reject(error));
        });
    }
};
NotificacaoDaoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NotificacaoDaoService);
export { NotificacaoDaoService };
//# sourceMappingURL=notificacao-dao.service.js.map