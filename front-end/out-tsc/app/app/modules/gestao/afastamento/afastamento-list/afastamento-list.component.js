import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
let AfastamentoListComponent = class AfastamentoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Afastamento, AfastamentoDaoService);
        this.injector = injector;
        this.listagemInicial = true;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.usuario_id?.length && form.tipo_motivo_afastamento_id?.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
                result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
            }
            else if (form.usuario_id?.length) {
                result.push(["usuario_id", "==", form.usuario_id]);
            }
            else if (form.tipo_motivo_afastamento_id?.length) {
                result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
            }
            else if (this.dao?.validDateTime(form.data_inicio) && this.dao?.validDateTime(form.data_fim) && !this.listagemInicial) {
                result.push(this.dao?.intersectionWhere("data_inicio", "data_fim", this.util.startOfDay(form.data_inicio), this.util.startOfDay(form.data_fim)));
            }
            return result;
        };
        /* Inicializações */
        this.join = ["tipo_motivo_afastamento:id, nome", "usuario: id, nome"];
        this.tipoMotivoAfastamentoDao = injector.get(TipoMotivoAfastamentoDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.title = this.lex.translate("Ocorrências");
        this.code = "MOD_AFT";
        this.filter = this.fh.FormBuilder({
            observacoes: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            usuario_id: { default: "" },
            tipo_motivo_afastamento_id: { default: "" }
        });
        this.OPTION_INFORMACOES.onClick = (afastamento) => this.go.navigate({ route: ['gestao', 'afastamento', afastamento.id, 'consult'] }, { modal: true });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_AFT_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    filtro() {
        this.listagemInicial = false;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], AfastamentoListComponent.prototype, "grid", void 0);
AfastamentoListComponent = __decorate([
    Component({
        selector: 'app-afastamento-list',
        templateUrl: './afastamento-list.component.html',
        styleUrls: ['./afastamento-list.component.scss'],
        standalone: false
    })
], AfastamentoListComponent);
export { AfastamentoListComponent };
//# sourceMappingURL=afastamento-list.component.js.map