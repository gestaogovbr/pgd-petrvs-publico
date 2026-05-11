import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(auth, utils, usuarioDao, unidadeDao, atividadeDao, injector, lex, go, gb) {
        this.auth = auth;
        this.utils = utils;
        this.usuarioDao = usuarioDao;
        this.unidadeDao = unidadeDao;
        this.atividadeDao = atividadeDao;
        this.injector = injector;
        this.lex = lex;
        this.go = go;
        this.gb = gb;
    }
    ngOnInit() {
    }
    async ngAfterViewInit() {
    }
    mensagemSaudacao() {
        const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
        const apelido = this.auth.usuario?.apelido;
        const mail = this.auth.usuario?.email;
        return hora < 1200 ? "Bom dia, " + apelido : hora < 1800 ? "Boa tarde, " + apelido : "Boa noite, " + apelido;
    }
    emailUsuario() {
        const mail = this.auth.usuario?.email;
        return mail;
    }
    tokenGAPI() {
        this.auth.googleApi.getAccessToken().then(res => {
            const sei = res || '';
        });
    }
    getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
        standalone: false
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map