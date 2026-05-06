import { __decorate } from "tslib";
import { ChangeDetectorRef, ElementRef, Injectable } from "@angular/core";
import { UtilService } from "../services/util.service";
let ComponentBase = class ComponentBase {
    getStyleBgColor(color) {
        if (!Object.keys(this._bgColors).includes(color || "")) {
            const bgColor = color || "#000000";
            const txtColor = this.util.contrastColor(bgColor);
            return `background-color: ${bgColor}; color: ${txtColor};`;
        }
        return undefined;
    }
    getClassBgColor(color) {
        return Object.keys(this._bgColors).includes(color || "") ? this._bgColors[color].class : "";
    }
    getClassButtonColor(color) {
        return Object.keys(this._bgColors).includes(color || "") ? "btn-outline-" + color : color;
    }
    getClassBorderColor(color) {
        return Object.keys(this._bgColors).includes(color || "") ? "border-" + color : color;
    }
    getHexColor(color) {
        return Object.keys(this._bgColors).includes(color || "") ? this._bgColors[color].hex : color;
    }
    generatedId(relativeId) {
        let relative = this.relativeId || relativeId;
        if (!this._generatedId) {
            this._generatedId = "ID_" + this.ID_GENERATOR_BASE;
        }
        return this._generatedId + (relative?.length ? "_" + this.util.onlyAlphanumeric(relative) : ""); //this.util.md5()
    }
    generatedButtonId(button, relativeId) {
        return this.generatedId((button.id || button.label || button.hint || button.icon || "_button") + (relativeId || ""));
    }
    detectChanges() {
        this.viewInit ? this.cdRef.detectChanges() : this.cdRef.markForCheck();
    }
    constructor(injector) {
        this.injector = injector;
        /* Public properties */
        this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        this.viewInit = false;
        this._bgColors = {
            primary: { class: "bg-primary ", hex: "#0d6efd" },
            secondary: { class: "bg-secondary ", hex: "#6c757d" },
            success: { class: "bg-success ", hex: "#198754" },
            danger: { class: "bg-danger ", hex: "#dc3545" },
            warning: { class: "bg-warning text-dark ", hex: "#212529" },
            info: { class: "bg-info text-dark ", hex: "#212529" },
            light: { class: "bg-light text-dark ", hex: "#f8f9fa" },
            dark: { class: "bg-dark ", hex: "#212529" },
            none: { class: "", hex: "" }
        };
        this.cdRef = injector.get(ChangeDetectorRef);
        this.selfElement = injector.get(ElementRef);
        this.util = injector.get(UtilService);
        this.selfElement.nativeElement.component = this;
        this.ID_GENERATOR_BASE = injector.get("ID_GENERATOR_BASE");
    }
    ngAfterViewInit() {
        this.viewInit = true;
    }
    focus() { }
};
ComponentBase = __decorate([
    Injectable()
], ComponentBase);
export { ComponentBase };
//# sourceMappingURL=component-base.js.map