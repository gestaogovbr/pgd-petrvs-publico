import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ComentarioService } from 'src/app/services/comentario.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
let ComentariosWidgetComponent = class ComentariosWidgetComponent {
    set entity(value) {
        if (this._entity != value) {
            this._entity = value;
            if (value && this.comentario)
                value.comentarios = this.comentario.orderComentarios(value.comentarios || []);
        }
    }
    get entity() {
        return this._entity;
    }
    constructor(injector) {
        this.injector = injector;
        this.selectable = false;
        //@Input() dao?: DaoBaseService<Base>;
        this.noPersist = undefined;
        this.origem = undefined;
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this._entity = undefined;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.fh = injector.get(FormHelperService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.go = injector.get(NavigateService);
        this.util = injector.get(UtilService);
        this.lookup = injector.get(LookupService);
        this.comentario = injector.get(ComentarioService);
        this.form = this.fh.FormBuilder({
            comentarios: { default: [] }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
    }
    get isNoPersist() {
        return this.noPersist != undefined;
    }
    comentarioClick(element) {
        const value = element.getAttribute("data-expanded");
        element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }
    addComentarioClick(event, entity, comentario_id) {
        event?.stopPropagation();
        this.go.navigate({ route: ['uteis', 'comentarios', this.origem, this.isNoPersist ? 'NOPERSIST' : entity.id, 'new'], params: { comentario_id } }, { modal: true, metadata: { entity }, modalClose: modalResult => {
                if (modalResult) {
                    if (this.save)
                        this.save(modalResult);
                    if (!this.isNoPersist)
                        (this.grid?.query || this.query)?.refreshId(entity.id);
                }
            } });
    }
};
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "noPersist", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "origem", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "save", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "grid", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "query", void 0);
__decorate([
    Input()
], ComentariosWidgetComponent.prototype, "entity", null);
ComentariosWidgetComponent = __decorate([
    Component({
        selector: 'comentarios-widget',
        templateUrl: './comentarios-widget.component.html',
        styleUrls: ['./comentarios-widget.component.scss'],
        standalone: false
    })
], ComentariosWidgetComponent);
export { ComentariosWidgetComponent };
//# sourceMappingURL=comentarios-widget.component.js.map