import { Inject, Injectable, Injector, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { DialogService } from "../services/dialog.service";
import { GlobalsService } from "../services/globals.service";
import { LexicalService } from "../services/lexical.service";
import { NavigateService } from "../services/navigate.service";

export type Execution = {
    id: number,
    timeout: any,
    resolve: any,
    reject: any
};

export type Details = {
    id?: number,
    type: string,
    source?: string,
    funct?: any,
    params?: any,
    error?: any,
    result: any
}

@Injectable()
export abstract class ListenerBase implements OnInit {
    public auth: AuthService;
    public go: NavigateService;
    public gb: GlobalsService;
    public lex: LexicalService;
    public dialog: DialogService;
    public init: boolean = false;
    public autoId: number = 0;
    public timeout: number = 60 * 1000;
    public initCallback?: () => void;
    public executions: Execution[] = [];

    public constructor(public injector: Injector, @Inject("inherited") public eventName: string) {
        this.auth = injector.get<AuthService>(AuthService);    
        this.go = injector.get<NavigateService>(NavigateService);    
        this.gb = injector.get<GlobalsService>(GlobalsService);
        this.lex = injector.get<LexicalService>(LexicalService);
        this.dialog = injector.get<DialogService>(DialogService);    
    }    

    ngOnInit() {
        if(this.gb.isExtension){
            /* Listener */
            document.addEventListener(this.eventName + ":angular", async (event: any) => {
                const detail: Details = event.detail || {type: "unknow"};
                detail.source = detail.source || "extension";
                switch (detail.type) {
                    case "return":
                    case "error":
                        const index = this.executions.findIndex(x => x.id == detail.id);
                        if(index >= 0) {
                            const exec = this.executions[index];
                            clearTimeout(exec.timeout);
                            if(detail.error) {
                                exec.reject(detail.error);
                            } else {
                                exec.resolve(detail.result);
                            }
                            this.executions.splice(index, 1);
                        }
                        break;
                    case "call": 
                        try {
                            const result = await (this as any)[detail.funct!](...detail.params);
                            const sendDetail = {
                                id: detail.id,
                                type: "return",
                                source: "angular",
                                result: result
                            };
                            document.dispatchEvent(new CustomEvent(this.eventName + ":" + detail.source, {'detail': sendDetail}));
                        } catch (error) {
                            const sendDetail = {
                                id: detail.id,
                                source: "angular",
                                type: "error",
                                error: error || {message: "unknow"}
                            };
                            document.dispatchEvent(new CustomEvent(this.eventName + ":" + detail.source, {'detail': sendDetail}));
                        }
                        break;
                    case "init":
                        if(!this.init) {
                            this.init = true;
                            if(this.initCallback) this.initCallback();
                            /* Reenvia a mensagem de init do módulo */
                            document.dispatchEvent(new CustomEvent(this.eventName + ":extension", {'detail': {type: "init", source: "angular"}}));
                        }
                        break;
                }
            });
            /* Envia a mensagem de init do módulo */
            document.dispatchEvent(new CustomEvent(this.eventName + ":extension", {'detail': {type: "init", source: "angular"}}));
        }
    }

    public execute<T>(funct: string, params: any[], destination = "extension") {
        return new Promise<T>((resolve, reject) => {
            const timeout = setTimeout(() => {
                const index = this.executions.findIndex(x => x.id == detail.id);
                if(index >= 0) {
                    this.executions.splice(index, 1);
                    reject({message: "timeout"});
                }
            }, this.timeout);
            const detail = {
                id: this.autoId++,
                type: "call",
                funct: funct,
                source: "angular",
                params: params,
            };
            this.executions.push({
                id: detail.id,
                timeout: timeout,
                resolve: resolve,
                reject: reject
            });
            document.dispatchEvent(new CustomEvent(this.eventName + ":" + destination, {'detail': detail}));
        });
    }    
}
