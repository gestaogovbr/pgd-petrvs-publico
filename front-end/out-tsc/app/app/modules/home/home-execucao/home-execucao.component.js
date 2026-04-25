import { __decorate } from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { DialogService } from 'src/app/services/dialog.service';
import * as moment from 'moment';
let HomeExecucaoComponent = class HomeExecucaoComponent {
    constructor(injector) {
        this.pendenciasConsolidacao = [];
        this.pendenciasConsolidacaoAgrupadas = [];
        this.inconsistenciasConsolidacao = [];
        this.loadingPendencias = false;
        this.loadingInconsistencias = false;
        this.lex = injector.get(LexicalService);
        this.gb = injector.get(GlobalsService);
        this.auth = injector.get(AuthService);
        this.consolidacaoDao = injector.get(PlanoTrabalhoConsolidacaoDaoService);
        this.go = injector.get(NavigateService);
        this.dialog = injector.get(DialogService);
        this.cdr = injector.get(ChangeDetectorRef);
    }
    ngOnInit() {
        this.loadPendenciasConsolidacao();
        this.loadInconsistenciasConsolidacao();
    }
    async loadPendenciasConsolidacao() {
        this.loadingPendencias = true;
        try {
            this.pendenciasConsolidacao = await this.consolidacaoDao.pendenciasUsuario();
            this.pendenciasConsolidacaoAgrupadas = this.agruparPendenciasPorPlano(this.pendenciasConsolidacao);
            this.cdr.detectChanges();
        }
        catch (error) {
            console.error('Erro ao carregar pendências de consolidação:', error);
        }
        finally {
            this.loadingPendencias = false;
            this.cdr.detectChanges();
        }
    }
    async loadInconsistenciasConsolidacao() {
        this.loadingInconsistencias = true;
        try {
            this.inconsistenciasConsolidacao = await this.consolidacaoDao.inconsistencias(this.auth.usuario?.id);
            this.cdr.detectChanges();
        }
        catch (error) {
            console.error('Erro ao carregar inconsistências de consolidação:', error);
        }
        finally {
            this.loadingInconsistencias = false;
            this.cdr.detectChanges();
        }
    }
    abrirConsolidacao() {
        this.go.navigate({ route: ['gestao', 'plano-trabalho', 'consolidacao'] });
    }
    abrirDetalhesInconsistencia(inconsistencia) {
        let detalhesHtml = `
      <p><strong>Plano de Trabalho:</strong> ${inconsistencia.plano_trabalho.numero}</p>
      <p><strong>Período:</strong> ${moment(inconsistencia.data_inicio).format('DD/MM/YYYY')} - ${moment(inconsistencia.data_fim).format('DD/MM/YYYY')}</p>
      <p><strong>Status:</strong> ${inconsistencia.status}</p>
      <p><strong>Entregas sem Atividade:</strong> ${inconsistencia.entregas_sem_atividade.length}</p>
      <ul>
        ${inconsistencia.entregas_sem_atividade.map((entrega) => `<li>${entrega.descricao}</li>`).join('')}
      </ul>
    `;
        this.dialog.html({ title: "Detalhes da Inconsistência", modalWidth: 600 }, detalhesHtml);
    }
    agruparPendenciasPorPlano(pendencias) {
        const map = new Map();
        for (const p of pendencias || []) {
            const plano = p?.plano_trabalho;
            const key = plano?.id || plano?.numero;
            if (!key) {
                continue;
            }
            let grupo = map.get(key);
            if (!grupo) {
                grupo = { plano_trabalho: plano, pendencias: [] };
                map.set(key, grupo);
            }
            grupo.pendencias.push(p);
        }
        return Array.from(map.values());
    }
};
HomeExecucaoComponent = __decorate([
    Component({
        selector: 'app-home-execucao',
        templateUrl: './home-execucao.component.html',
        styleUrls: ['./home-execucao.component.scss'],
        standalone: false
    })
], HomeExecucaoComponent);
export { HomeExecucaoComponent };
//# sourceMappingURL=home-execucao.component.js.map