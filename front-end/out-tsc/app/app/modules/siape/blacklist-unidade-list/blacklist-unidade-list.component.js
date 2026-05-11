import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { SiapeBlacklistUnidade } from 'src/app/models/siape-blacklist-unidade.model';
import { SiapeBlacklistUnidadeDaoService } from 'src/app/dao/siape-blacklist-unidade-dao.service';
let BlacklistUnidadeListComponent = class BlacklistUnidadeListComponent extends PageListBase {
    constructor(injector) {
        super(injector, SiapeBlacklistUnidade, SiapeBlacklistUnidadeDaoService);
        this.injector = injector;
        this.toolbarButtons = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.codigo?.length) {
                result.push(['codigo', 'like', '%' + form.codigo.trim().replace(' ', '%') + '%']);
            }
            if (form.inativado !== null) {
                result.push(['inativado', '==', form.inativado]);
            }
            return result;
        };
        /* Inicializações */
        this.title = this.lex.translate('Unidades indisponíveis');
        this.code = 'MOD_SIAPE_BLACKLIST_UNIDADE';
        this.filter = this.fh.FormBuilder({
            codigo: { default: '' },
            inativado: { default: null }
        });
        this.addOption(this.OPTION_EXCLUIR, 'MOD_SIAPE_BLACKLIST_UND_EXCL');
        this.options.push({
            icon: 'bi bi-trash',
            label: 'Remover',
            hint: 'Remover da lista',
            color: 'btn-outline-danger',
            onClick: (row) => this.removerUnidade(row.codigo)
        });
    }
    async removerUnidade(codigo) {
        try {
            const sucesso = await this.dao?.removerUnidade(codigo);
            if (sucesso) {
                this.dialog?.alert('Sucesso', 'Unidade removida da blacklist com sucesso!');
                if (this.grid?.query) {
                    this.grid.query.refresh();
                }
            }
            else {
                this.dialog?.alert('Erro', 'Falha ao remover unidade da blacklist.');
            }
        }
        catch (error) {
            this.dialog?.alert('Erro', 'Erro ao remover unidade da blacklist.');
        }
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], BlacklistUnidadeListComponent.prototype, "grid", void 0);
BlacklistUnidadeListComponent = __decorate([
    Component({
        selector: 'app-blacklist-unidade-list',
        templateUrl: './blacklist-unidade-list.component.html',
        styleUrls: ['./blacklist-unidade-list.component.scss'],
        standalone: false
    })
], BlacklistUnidadeListComponent);
export { BlacklistUnidadeListComponent };
//# sourceMappingURL=blacklist-unidade-list.component.js.map