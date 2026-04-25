import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let UnidadeListMapComponent = class UnidadeListMapComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.data = [];
        this.unidadeDao = injector.get(UnidadeDaoService);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.carregaUnidades();
    }
    async carregaUnidades() {
        let minhaUnidadeId = this.auth.usuario?.lotacao?.unidade_id;
        let todasUnidades = await this.unidadeDao.hierarquiaUnidades(minhaUnidadeId);
        // Encontra as raízes (unidades sem pai ou cujo pai não está na lista)
        let idsNaLista = new Set(todasUnidades.map(u => u.id));
        let raizes = todasUnidades.filter(u => !u.unidade_pai_id || !idsNaLista.has(u.unidade_pai_id));
        this.data = raizes.map(raiz => this.montaNoRecursivo(raiz, todasUnidades, minhaUnidadeId));
        this.cdRef.detectChanges();
    }
    montaNoRecursivo(unidade, lista, minhaUnidadeId) {
        let filhos = lista.filter(x => x.unidade_pai_id === unidade.id);
        // Expande se for a unidade do usuário ou um de seus ancestrais
        let expanded = false;
        if (minhaUnidadeId) {
            expanded = this.isAncestral(unidade.id, minhaUnidadeId, lista) || unidade.id === minhaUnidadeId;
        }
        return {
            type: 'unidade',
            label: unidade.sigla,
            expanded: expanded,
            styleClass: minhaUnidadeId === unidade.id ? 'text-bg-primary' : '',
            data: {
                unidade: unidade,
                hint: unidade.nome
            },
            children: filhos.map(f => this.montaNoRecursivo(f, lista, minhaUnidadeId))
        };
    }
    isAncestral(possivelAncestralId, unidadeAlvoId, lista) {
        let atual = lista.find(x => x.id === unidadeAlvoId);
        while (atual && atual.unidade_pai_id) {
            if (atual.unidade_pai_id === possivelAncestralId)
                return true;
            atual = lista.find(x => x.id === atual.unidade_pai_id);
        }
        return false;
    }
    toggle(event, node) {
        event.stopPropagation();
        node.expanded = !node.expanded;
    }
};
UnidadeListMapComponent = __decorate([
    Component({
        selector: 'unidade-mapa',
        templateUrl: './unidade-list-map.component.html',
        styleUrls: ['./unidade-list-map.component.scss'],
        standalone: false
    })
], UnidadeListMapComponent);
export { UnidadeListMapComponent };
//# sourceMappingURL=unidade-list-map.component.js.map