import { __decorate, __param } from "tslib";
import { Component, forwardRef, HostBinding, Inject, Input, ViewChild } from '@angular/core';
import { SwimlaneComponent } from '../swimlane/swimlane.component';
let DockerComponent = class DockerComponent {
    get class() { return "kanban-docker" + (this.collapse ? " kanban-docker-collapsed" : "") + (this.marginRight ? " docker-margin-right" : ""); }
    ;
    set collapse(value) {
        if (value != this._collapse) {
            this._collapse = value;
            if (this.swimlane?.dockers) {
                this.swimlane.width = this.swimlaneWidth;
                this.swimlane.cdRef.detectChanges();
                //marginLeft = dockers.find(x => x.collapse) && this != dockers.get(0) ? "docker-margin-left " : "";
            }
            //this.class = "kanban-docker" + (this.collapse ? " kanban-docker-collapsed" : "");
        }
    }
    get collapse() {
        return this._collapse;
    }
    get marginLeft() {
        return (this.swimlane?.dockers || []).length > 1 && !!this.swimlane?.dockers?.find(x => x.collapse) && this != this.swimlane?.dockers?.get(0);
    }
    get marginRight() {
        return this.collapse && (this.swimlane?.dockers || []).length > 1 && this == this.swimlane?.dockers?.last;
    }
    set editing(value) {
        if (this._editing != value) {
            this._editing = value;
            this.kanban?.editingChange();
        }
    }
    get editing() {
        return this._editing;
    }
    set template(value) {
        if (this._template != value) {
            this._template = value;
        }
    }
    get template() {
        return this._template || this.kanban?.template;
    }
    set placeholderTemplate(value) {
        if (this._placeholderTemplate != value) {
            this._placeholderTemplate = value;
            this.cdRef.detectChanges();
        }
    }
    get placeholderTemplate() {
        return this._placeholderTemplate || this.kanban?.placeholderTemplate;
    }
    set kanban(value) {
        if (this._kanban != value) {
            this._kanban = value;
            this.cdRef.detectChanges();
        }
    }
    get kanban() {
        return this._kanban;
    }
    constructor(swimlane, cdRef, util, go, renderer) {
        this.swimlane = swimlane;
        this.cdRef = cdRef;
        this.util = util;
        this.go = go;
        this.renderer = renderer;
        this.title = "";
        this.cards = [];
        this.menu = [];
        this.labels = [];
        this.dropIf = (card) => true;
        this.emptyCardHeight = 65;
        this._editing = false;
        this._collapse = false;
    }
    ngOnInit() {
        if (this.editing) {
            (async () => {
                await this.onEditClick();
            })();
        }
    }
    ngAfterViewInit() {
        this.kanban?.editingChange();
        if (this.swimlane)
            this.swimlane.width = this.swimlaneWidth;
        this.swimlane?.cdRef.detectChanges();
        this.kanban?.cdRef.detectChanges();
    }
    get isEditable() {
        return this.editable != undefined;
    }
    get alone() {
        return true;
        return this.swimlane?.dockers?.length == 1;
    }
    buttonId(button) {
        return "button_" + this.util.md5((button.icon || "") + (button.hint || "") + (button.label || ""));
    }
    async onEditClick() {
        if (this.edit)
            await this.edit(this);
        this.editing = true;
        this.kanban?.cdRef.detectChanges();
    }
    onButtonClick(button) {
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            button.onClick(this, this.swimlane);
        }
    }
    async onSaveClick() {
        if (this.save && await this.save(this)) {
            this.editing = false;
            this.kanban?.cdRef.detectChanges();
        }
    }
    async onDeleteClick() {
        if (this.delete)
            await this.delete(this);
        this.editing = false;
        this.kanban?.cdRef.detectChanges();
    }
    async onCancelClick() {
        if (this.cancel)
            await this.cancel(this);
        this.editing = false;
        this.kanban?.cdRef.detectChanges();
    }
    onCollapseClick() {
        this.collapse = !this.collapse;
        this.kanban?.cdRef.detectChanges();
        if (this.toggle)
            this.toggle(this, this.collapse);
    }
    get swimlaneWidth() {
        const dockers = this.swimlane?.dockers;
        return screen.width > 575 && dockers?.find(x => x.collapse) ? "max-content" : "min-content";
        //? dockers.reduce((a, c) => a + (c.collapse ? 50 : c.offsetWidth), 0) +  ((dockers.length - 1) * 30) || 400 : "min-content";
    }
    get offsetWidth() {
        return this.docker?.nativeElement.offsetWidth || 400;
    }
    hasButtonItems(button) {
        return !!button.items || !!button.dynamicItems;
    }
    getButtonItems(optionButton, button) {
        return optionButton.className.includes("show") ? (button.dynamicItems && button.dynamicItems(this)) || button.items || [] : [];
    }
    onDragStart(event, card) {
        //console.log("onDragStart");
        this.kanban.dragItem = card;
        this.cdRef.detectChanges();
    }
    get disableDropIf() {
        return this.kanban?.editing || (!!this.kanban?.dragItem && !this.dropIf(this.kanban.dragItem));
    }
    getLabelStyle(label) {
        const bgColor = label.color || "#000000";
        const txtColor = this.util.contrastColor(bgColor);
        return `background-color: ${bgColor}; color: ${txtColor};`;
    }
    //  this.renderer.addClass( this.elementRef.nativeElement, this.dndDragoverClass );
    onDragged(item, list, effect) {
        //console.log("onDragged: " + effect);
        if (this.dragged) {
            this.dragged(item, list, effect);
        }
        else if (effect === "move") {
            const index = list.indexOf(item);
            list.splice(index, 1);
        }
    }
    onDragEnd(event) {
        //console.log("onDragEnd");
        this.kanban.dragItem = undefined;
        this.cdRef.detectChanges();
    }
    onDrop(event, list) {
        if (this.drop) {
            this.drop(event, list);
        }
        else if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
            let index = event.index;
            if (typeof index === "undefined") {
                index = list.length;
            }
            list.splice(index, 0, event.data);
        }
    }
};
__decorate([
    HostBinding('class')
], DockerComponent.prototype, "class", null);
__decorate([
    ViewChild('docker', { static: false })
], DockerComponent.prototype, "docker", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "title", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "key", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "cards", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "menu", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "labels", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "editable", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "color", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "colorStyle", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "icon", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "toggle", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "dragged", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "drop", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "dropIf", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "edit", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "save", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "cancel", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "delete", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "emptyCardHeight", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "editTemplate", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "titleTemplate", void 0);
__decorate([
    Input()
], DockerComponent.prototype, "collapse", null);
__decorate([
    Input()
], DockerComponent.prototype, "editing", null);
__decorate([
    Input()
], DockerComponent.prototype, "template", null);
__decorate([
    Input()
], DockerComponent.prototype, "placeholderTemplate", null);
DockerComponent = __decorate([
    Component({
        selector: 'docker',
        templateUrl: './docker.component.html',
        styleUrls: ['./docker.component.scss'],
        standalone: false
    }),
    __param(0, Inject(forwardRef(() => SwimlaneComponent)))
], DockerComponent);
export { DockerComponent };
//# sourceMappingURL=docker.component.js.map