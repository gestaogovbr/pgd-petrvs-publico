import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { Programa } from 'src/app/models/programa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ProgramaService } from 'src/app/services/programa.service';
let ProgramaListComponent = class ProgramaListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Programa, ProgramaDaoService);
        this.injector = injector;
        this.vigentesUnidadeExecutora = false;
        this.todosUnidadeExecutora = false;
        this.filterWhere = (filter) => {
            const result = [];
            const form = filter.value;
            const unidadeId = this.auth.unidade?.id;
            if (unidadeId) {
                if (this.vigentesUnidadeExecutora) {
                    result.push(['vigentesUnidadeExecutora', '==', unidadeId]);
                }
                else if (this.todosUnidadeExecutora || !this.auth.hasPermissionTo("MOD_PRGT_VER_TODOS")) {
                    result.push(['todosUnidadeExecutora', '==', unidadeId]);
                }
            }
            if (form.nome?.length) {
                result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
            }
            return result;
        };
        this.concluir = (programa) => {
            this.dialog.confirm("Concluir?", "Ao encerrar este regramento, todos os planos de entregas e planos de trabalho serão automaticamente concluídos. Além disso, todos os agentes públicos serão automaticamente desligados do PGD. Você confirma?").then(confirm => {
                if (confirm) {
                    this.dao.concluir(programa).then(() => {
                        (this.grid?.query || this.query).refreshId(programa.id);
                        this.dialog.topAlert("Regramento concluído com sucesso!", 5000);
                    }).catch((error) => this.dialog.alert("Erro", "Erro ao concluir: " + (error?.message ? error?.message : error)));
                }
            });
        };
        this.programaService = injector.get(ProgramaService);
        /* Inicializações */
        this.title = this.lex.translate("Programas de Gestão");
        this.code = "MOD_PRGT";
        this.join = ["unidade:id, nome"];
        this.filter = this.fh.FormBuilder({
            nome: { default: "" },
        });
        this.addOption(this.OPTION_INFORMACOES);
        this.addOption(this.OPTION_EXCLUIR, "MOD_PRGT_EXCL");
        this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
        this.BOTAO_CONCLUIR = { label: "Concluir", icon: "bi bi-journal-check", onClick: this.concluir.bind(this) };
    }
    dynamicButtons(row) {
        let result = [];
        if (this.auth.hasPermissionTo("MOD_PRGT_CONCL") && this.programaService.programaVigente(row)) {
            //result.push(this.BOTAO_CONCLUIR);
        }
        return result;
    }
    ngOnInit() {
        super.ngOnInit();
        this.vigentesUnidadeExecutora = this.metadata?.vigentesUnidadeExecutora;
        this.todosUnidadeExecutora = this.metadata?.todosUnidadeExecutora;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], ProgramaListComponent.prototype, "grid", void 0);
ProgramaListComponent = __decorate([
    Component({
        selector: 'app-programa-list',
        templateUrl: './programa-list.component.html',
        styleUrls: ['./programa-list.component.scss'],
        standalone: false
    })
], ProgramaListComponent);
export { ProgramaListComponent };
//# sourceMappingURL=programa-list.component.js.map