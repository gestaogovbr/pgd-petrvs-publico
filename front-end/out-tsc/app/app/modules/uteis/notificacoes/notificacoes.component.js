import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { Notificacao } from 'src/app/models/notificacao.model';
import { NotificacaoDaoService } from 'src/app/dao/notificacao-dao.service';
import { NotificacaoService } from './notificacao.service';
let NotificacoesComponent = class NotificacoesComponent extends PageListBase {
    constructor(injector) {
        super(injector, Notificacao, NotificacaoDaoService);
        this.injector = injector;
        this.toolbarButtons = [
            {
                icon: "bi bi-check-all",
                label: "Lido",
                color: "btn-outline-success",
                hint: "Marcar todas as notificações como lido",
                onClick: this.onLidoClick.bind(this)
            }
        ];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["usuario_id", "==", this.auth.usuario.id]);
            if (form.todas)
                result.push(["todas", "==", true]);
            if (this.util.isDataValid(form.data_inicio))
                result.push(["data_registro", ">=", form.data_inicio]);
            if (this.util.isDataValid(form.data_fim))
                result.push(["data_registro", "<=", form.data_fim]);
            return result;
        };
        this.notificacaoService = injector.get(NotificacaoService);
        /* Inicializações */
        this.modalWidth = 700;
        this.join = ["destinatarios"];
        this.title = this.lex.translate('Notificações');
        this.filter = this.fh.FormBuilder({
            todas: { default: false },
            data_inicio: { default: undefined },
            data_fim: { default: undefined }
        });
    }
    filterClear(filter) {
        filter.controls.todas.setValue(false);
        filter.controls.data_inicio.setValue(undefined);
        filter.controls.data_fim.setValue(undefined);
        super.filterClear(filter);
    }
    onLidoClick() {
        let destinatariosIds = (this.grid?.items || []).reduce((a, v) => {
            a.push(...v.destinatarios.filter(x => !x.data_leitura).map(x => x.id));
            return a;
        }, []);
        this.dao.marcarComoLido(destinatariosIds).then(qtd => {
            this.grid.reloadFilter();
            if (this.auth.usuario)
                this.auth.usuario.notificacoes_destinatario = [];
            this.notificacaoService.updateNaoLidas();
        });
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], NotificacoesComponent.prototype, "grid", void 0);
NotificacoesComponent = __decorate([
    Component({
        selector: 'notificacoes',
        templateUrl: './notificacoes.component.html',
        styleUrls: ['./notificacoes.component.scss'],
        standalone: false
    })
], NotificacoesComponent);
export { NotificacoesComponent };
//# sourceMappingURL=notificacoes.component.js.map