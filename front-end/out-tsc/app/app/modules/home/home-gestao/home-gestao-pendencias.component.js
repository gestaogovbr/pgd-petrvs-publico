import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { PageBase } from '../../base/page-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
let HomeGestaoPendenciasComponent = class HomeGestaoPendenciasComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.registrosExecucao = [];
        this.planosEntregaAvaliacao = [];
        this.planosTrabalhoAssinatura = [];
        this.entregasPlanoEntregaExecucao = [];
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.lookup = injector.get(LookupService);
        this.lex = injector.get(LexicalService);
        this.gb = injector.get(GlobalsService);
        this.auth = injector.get(AuthService);
        this.go = injector.get(NavigateService);
        this.title = 'Pendências da unidade';
        this.modalWidth = 900;
    }
    async ngOnInit() {
        super.ngOnInit();
        const pendenciasChefe = this.metadata?.pendenciasChefe;
        if (pendenciasChefe) {
            this.applyPendenciasChefe(pendenciasChefe);
            return;
        }
        await this.loadPendenciasChefe();
    }
    async loadPendenciasChefe() {
        const res = await this.usuarioDao.getPendenciasChefe();
        const pendenciasChefe = res?.pendencias || {};
        this.applyPendenciasChefe(pendenciasChefe);
    }
    applyPendenciasChefe(pendenciasChefe) {
        this.registrosExecucao = pendenciasChefe.registrosExecucao || [];
        this.planosTrabalhoAssinatura = pendenciasChefe.planosTrabalhoAssinatura || [];
        this.planosEntregaAvaliacao = pendenciasChefe.planosEntregaAvaliacao || [];
        this.entregasPlanoEntregaExecucao = pendenciasChefe.entregasPlanoEntregaExecucao || [];
    }
    formatDate(date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    }
    trackById(_, item) { return item?.id; }
    abrirPlanosTrabalho(numero) {
        let rota = this.go.navigate({
            route: ['gestao', 'plano-trabalho'],
            params: {
                filter: {
                    numero: numero,
                    meus_planos: false,
                    unidade_id: null
                }
            }
        });
        rota.then(success => {
            if (success)
                this.fecharModal();
        });
    }
    abrirPlanosEntregas(nome) {
        let rota = this.go.navigate({
            route: ['execucao', 'plano-entrega'],
            params: {
                execucao: true,
                filter: {
                    nome: nome,
                    unidade_id: null,
                    meus_planos: false
                }
            }
        });
        rota.then(success => {
            if (success)
                this.fecharModal();
        });
    }
    abrirAvaliacaoPlanoEntrega(planoEntrega) {
        let rota = this.go.navigate({
            route: ['gestao', 'plano-entrega'],
            params: {
                avaliacao: true,
                filter: {
                    meus_planos: false,
                    nome: planoEntrega.nome,
                    unidade_id: null
                }
            }
        });
        rota.then(success => {
            if (success)
                this.fecharModal();
        });
    }
    abrirConsolidacoes(usuario_id, unidade_id, numero) {
        let rota = this.go.navigate({
            route: ['avaliacao', 'plano-trabalho', 'consolidacao', 'avaliacao'],
            params: {
                filter: {
                    usuario_id: usuario_id,
                    unidade_id: unidade_id,
                    incluir_arquivados: true,
                    numero: numero
                }
            }
        });
        rota.then(success => {
            if (success)
                this.fecharModal();
        });
    }
    fecharModal() {
        this.dialog.close();
    }
};
HomeGestaoPendenciasComponent = __decorate([
    Component({
        selector: 'app-home-gestao-pendencias',
        templateUrl: './home-gestao-pendencias.component.html',
        styleUrls: ['./home-gestao-pendencias.component.scss'],
        standalone: false
    })
], HomeGestaoPendenciasComponent);
export { HomeGestaoPendenciasComponent };
//# sourceMappingURL=home-gestao-pendencias.component.js.map