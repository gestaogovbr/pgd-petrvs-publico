import { ChangeDetectorRef, ElementRef, Injectable, Injector } from "@angular/core";
import { UtilService } from "../services/util.service";
import { ToolbarButton } from "./toolbar/toolbar.component";

@Injectable()
export abstract class ComponentBase {
    /* Public properties */
    public isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    public cdRef: ChangeDetectorRef;
    public util: UtilService;
    public selfElement: ElementRef;
    public ID_GENERATOR_BASE: string;
    /* Protected get e set */
    protected _generatedId?: string;
  
    public generatedId(relativeId?: string | null): string {
        if(!this._generatedId) {
            this._generatedId = "ID_" + this.ID_GENERATOR_BASE + "_" + this.util.onlyAlphanumeric(relativeId?.length ? relativeId : this.util.md5());
            console.log(this._generatedId);
        }
        return this._generatedId;
    }

    public generatedButtonId(button: ToolbarButton, relativeId?: string) {
        return this.generatedId((button.label || button.hint || button.icon || "_button") + (relativeId || ""));
    }
    
    constructor(public injector: Injector) {
        this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
        this.selfElement = injector.get<ElementRef>(ElementRef);
        this.util = injector.get<UtilService>(UtilService);
        this.selfElement.nativeElement.component = this;
        this.ID_GENERATOR_BASE = injector.get<string>("ID_GENERATOR_BASE" as any);
    }
}