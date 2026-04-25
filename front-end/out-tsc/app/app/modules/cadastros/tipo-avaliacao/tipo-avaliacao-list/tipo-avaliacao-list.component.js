import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TipoAvaliacaoListComponent = class TipoAvaliacaoListComponent extends PageListBase {
    constructor(injector) {
        super(injector, TipoAvaliacao, TipoAvaliacaoDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate("Tipos de Avaliação");
        this.code = "MOD_TIPO_AVAL";
        this.filter = this.fh.FormBuilder({
            nome: { default: "" }
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_TIPO_AVAL_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    }
    getNotasText(notas) {
        return notas.map(x => x.nota).join(", ");
    }
    notasOrdenadas(row) {
        let notasOrdenadas = row.notas;
        notasOrdenadas.sort((a, b) => a.sequencia - b.sequencia);
        row.notas = notasOrdenadas;
        return row;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TipoAvaliacaoListComponent.prototype, "grid", void 0);
TipoAvaliacaoListComponent = __decorate([
    Component({
        selector: 'app-tipo-avaliacao-list',
        templateUrl: './tipo-avaliacao-list.component.html',
        styleUrls: ['./tipo-avaliacao-list.component.scss'],
        standalone: false
    })
], TipoAvaliacaoListComponent);
export { TipoAvaliacaoListComponent };
//# sourceMappingURL=tipo-avaliacao-list.component.js.map