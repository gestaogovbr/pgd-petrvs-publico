import { __decorate } from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
let HomeGestaoComponent = class HomeGestaoComponent {
    constructor(injector) {
        this.totalPendenciasChefe = 0;
        this.pendenciasLoaded = false;
        this.pendenciasChefe = {};
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.lookup = injector.get(LookupService);
        this.lex = injector.get(LexicalService);
        this.gb = injector.get(GlobalsService);
        this.auth = injector.get(AuthService);
        this.go = injector.get(NavigateService);
        this.cdRef = injector.get(ChangeDetectorRef);
    }
    ngOnInit() {
        this.loadPendenciasChefe();
    }
    async loadPendenciasChefe() {
        try {
            const res = await this.usuarioDao.getPendenciasChefe();
            this.pendenciasChefe = res?.pendencias || {};
            this.totalPendenciasChefe = ((this.pendenciasChefe.entregasPlanoEntregaExecucao || []).length)
                + ((this.pendenciasChefe.planosEntregaAvaliacao || []).length)
                + ((this.pendenciasChefe.planosTrabalhoAssinatura || []).length)
                + ((this.pendenciasChefe.registrosExecucao || []).length);
        }
        finally {
            this.pendenciasChefe = this.pendenciasChefe || {};
            this.pendenciasLoaded = true;
            this.cdRef.detectChanges();
        }
    }
    formatDate(date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    }
    abrirPendenciasModal() {
        this.go.navigate({ route: ['home', 'gestao', 'pendencias'] }, { modal: true, metadata: { pendenciasChefe: this.pendenciasChefe } });
    }
};
HomeGestaoComponent = __decorate([
    Component({
        selector: 'app-home-gestao',
        templateUrl: './home-gestao.component.html',
        styleUrls: ['./home-gestao.component.scss'],
        standalone: false
    })
], HomeGestaoComponent);
export { HomeGestaoComponent };
//# sourceMappingURL=home-gestao.component.js.map