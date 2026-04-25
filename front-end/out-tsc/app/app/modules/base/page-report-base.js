import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { PageBase } from './page-base';
let PageReportBase = class PageReportBase extends PageBase {
    //public pluginsGrafico?: Array<any>;
    constructor(injector, dType) {
        super(injector);
        this.injector = injector;
        this.buttons = [{
                label: "Gerar PDF",
                icon: "bi bi-clipboard-data",
                //onClick: this.onReport.bind(this) Conhecer o método writeToFile (util.service)
            }];
        this.mensagemCarregando = "Carregando dados do formulário...";
        this.rows = [];
        this.join = [];
        this.dao = injector.get(dType);
        this.calendar = injector.get(CalendarService);
        //Chart.plugins.register(ChartDataLabels);
    }
    ngAfterViewInit() {
        (async () => {
            this.loading = true;
            try {
                this.rows = await this.report(this.queryParams);
            }
            catch (erro) {
                this.error("Erro ao carregar relatório: " + erro);
            }
            finally {
                this.loading = false;
                this.cdRef.detectChanges();
            }
        })();
    }
    onCancel() {
        this.close();
    }
};
PageReportBase = __decorate([
    Injectable()
], PageReportBase);
export { PageReportBase };
//# sourceMappingURL=page-report-base.js.map