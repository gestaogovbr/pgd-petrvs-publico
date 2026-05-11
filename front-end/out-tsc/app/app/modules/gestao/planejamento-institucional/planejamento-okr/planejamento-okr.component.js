import { __decorate } from "tslib";
import { Component, ViewChild, } from '@angular/core';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { AtividadeService } from '../../atividade/atividade.service';
let PlanejamentoOkrComponent = class PlanejamentoOkrComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.planejamentos = [];
        this.objetivos = [];
        this.objetivo_entregas = [];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.dao = injector.get(PlanejamentoDaoService);
        this.objetivoDao = injector.get(PlanejamentoObjetivoDaoService);
        this.planoEntregaService =
            injector.get(PlanoEntregaService);
        this.atividadeDao = injector.get(AtividadeDaoService);
        this.atividadeService = injector.get(AtividadeService);
        this.join = ['objetivos_okr'];
        this.title =
            this.lex.translate('Objetivos') +
                ' ' +
                this.lex.translate('do Planejamento Institucional');
        this.form = this.fh.FormBuilder({
            planejamento_id: { default: null },
            todos: { default: false },
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    async loadData(entity, form) {
        this.query = this.dao.query({
            where: [['data_arquivamento', '==', null]],
            orderBy: [['data_inicio', 'desc']],
        });
        this.query.asPromise().then((planejamentos) => {
            this.planejamentos = planejamentos.map((x) => Object.assign({}, {
                key: x.id,
                value: x.nome,
                data: x,
            }));
            this.cdRef.detectChanges();
            this.form.controls.planejamento_id.setValue(this.planejamentos.length ? this.planejamentos[0].key : null);
        });
    }
    carregaEntregas(objetivoId) {
        this.objetivoDao
            ?.getById(objetivoId, [
            'objetivos_entrega.entrega.entrega',
            'objetivos_entrega.entrega.entregas_plano_trabalho',
            'objetivos_entrega.entrega.unidade:id,nome',
        ])
            .then((resultado) => {
            if (resultado && resultado.objetivos_entrega) {
                this.objetivo_entregas = resultado.objetivos_entrega;
                const entregasPorUnidade = {};
                this.objetivo_entregas.forEach((entrega) => {
                    const unidade = entrega.entrega?.unidade;
                    entrega._metadata = Object.assign(entrega._metadata || {}, { corBorda: this.util.getRandomColor() });
                    if (unidade) {
                        unidade._metadata = Object.assign(unidade._metadata || {}, { corBorda: this.util.getRandomColor() });
                        const unidadeId = unidade.id;
                        if (!entregasPorUnidade[unidadeId]) {
                            entregasPorUnidade[unidadeId] = { unidade, entregas: [] };
                        }
                        entregasPorUnidade[unidadeId].entregas.push(entrega);
                    }
                });
                const objetivo = this.objetivos.find((o) => o.id == objetivoId);
                if (objetivo) {
                    objetivo.unidadesComEntregas = Object.values(entregasPorUnidade);
                }
            }
        });
    }
    async carregaAtividades(entregasPlanoTrabalho, entrega, event) {
        const entregasPlanoTrabalhoIds = entregasPlanoTrabalho.map((e) => e.id);
        entrega.atividades = await this.atividadeDao
            .query({
            where: [['plano_trabalho_entrega_id', 'in', entregasPlanoTrabalhoIds]],
            join: ['usuario:id,nome'],
        })
            .asPromise();
        const divPai = event.target.closest('.entrega-geral');
        const divAtividades = divPai?.getElementsByClassName('atividades');
        if (divAtividades?.length) {
            divAtividades[0].setAttribute('class', 'atividades atividadesVisivel');
            if (!entrega.atividades.length) {
                divAtividades[0].innerHTML = `Essa entrega não tem ${this.lex.translate('Atividades')} cadastradas`;
            }
        }
        this.cdRef.detectChanges();
    }
    onPlanejamentoChange() {
        if (this.planejamentoInstitucional.selectedItem) {
            this.dao.getById(this.planejamentoInstitucional.selectedItem?.key, this.join).then((planejamento) => {
                this.planejamento = planejamento;
                this.objetivos = this.planejamento.objetivos_okr || [];
                this.objetivos.forEach(objetivo => {
                    objetivo._metadata = Object.assign(objetivo._metadata || {}, { corBorda: this.util.getRandomColor() });
                });
                this.cdRef.detectChanges();
            });
        }
    }
};
__decorate([
    ViewChild('planejamentoInstitucional', { static: false })
], PlanejamentoOkrComponent.prototype, "planejamentoInstitucional", void 0);
PlanejamentoOkrComponent = __decorate([
    Component({
        selector: 'planejamento-okr',
        templateUrl: './planejamento-okr.component.html',
        styleUrls: ['./planejamento-okr.component.scss'],
        standalone: false
    })
], PlanejamentoOkrComponent);
export { PlanejamentoOkrComponent };
//# sourceMappingURL=planejamento-okr.component.js.map