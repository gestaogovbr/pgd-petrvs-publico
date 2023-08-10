import { ChangeDetectorRef, ElementRef, Injectable, Injector } from "@angular/core";
import { IIndexable } from "../models/base.model";
import { UtilService } from "../services/util.service";
import { ToolbarButton } from "./toolbar/toolbar.component";

export type ComponentColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "none" | string;

@Injectable()
export abstract class ComponentBase {
    /* Public properties */
    public isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    public cdRef: ChangeDetectorRef;
    public viewInit: boolean = false;
    public util: UtilService;
    public selfElement: ElementRef;
    public ID_GENERATOR_BASE: string;
    /* Protected e get|set */
    protected _generatedId?: string;
    protected _bgColors: IIndexable = {
        primary: {class: "bg-primary ", hex: "#0d6efd"},
        secondary: {class: "bg-secondary ", hex: "#6c757d"},
        success: {class: "bg-success ", hex: "#198754"},
        danger: {class: "bg-danger ", hex: "#dc3545"},
        warning: {class: "bg-warning text-dark ", hex: "#212529"},
        info: {class: "bg-info text-dark ", hex: "#212529"},
        light: {class: "bg-light text-dark ", hex: "#f8f9fa"},
        dark: {class: "bg-dark ", hex: "#212529"},
        none: {class: "", hex: ""}
    }
    
    public getStyleBgColor(color: ComponentColor | undefined): string | undefined {
        if(!Object.keys(this._bgColors).includes(color || "")) {
          const bgColor = color || "#000000";
          const txtColor = this.util.contrastColor(bgColor);
          return `background-color: ${bgColor}; color: ${txtColor};`;
        }
        return undefined;
    }

    public getClassBgColor(color: ComponentColor | undefined) {
        return Object.keys(this._bgColors).includes(color || "") ? this._bgColors[color!].class : "";
    }

    public getClassButtonColor(color: ComponentColor | undefined) {
        return Object.keys(this._bgColors).includes(color || "") ? "btn-outline-" + color : color;
    }

    public getClassBorderColor(color: ComponentColor | undefined) {
        return Object.keys(this._bgColors).includes(color || "") ? "border-" + color : color;
    }

    public getHexColor(color: ComponentColor | undefined) {
        return Object.keys(this._bgColors).includes(color || "") ? this._bgColors[color!].hex : color;
    }

    public generatedId(relativeId?: string | null): string {
        if(!this._generatedId) {
            this._generatedId = "ID_" + this.ID_GENERATOR_BASE;
        }
        return this._generatedId + (relativeId?.length ? "_" + this.util.onlyAlphanumeric(relativeId) : ""); //this.util.md5()
    }

    public generatedButtonId(button: ToolbarButton, relativeId?: string) {
        return this.generatedId((button.id || button.label || button.hint || button.icon || "_button") + (relativeId || ""));
    }

    public detectChanges() {
        this.viewInit ? this.cdRef.detectChanges() : this.cdRef.markForCheck();
    }

    constructor(public injector: Injector) {
        this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
        this.selfElement = injector.get<ElementRef>(ElementRef);
        this.util = injector.get<UtilService>(UtilService);
        this.selfElement.nativeElement.component = this;
        this.ID_GENERATOR_BASE = injector.get<string>("ID_GENERATOR_BASE" as any);
    }

    ngAfterViewInit() {
        this.viewInit = true;
    }
}