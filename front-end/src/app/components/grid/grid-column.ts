import { TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DaoBaseService } from "src/app/dao/dao-base.service";
import { Base, IIndexable } from "src/app/models/base.model";
import { LookupItem } from "src/app/services/lookup.service";
import { ToolbarButton } from "../toolbar/toolbar.component";
import { ColumnAlign } from "./column/column.component";

export type ColumnType = "search" | "display" | "text" | "number" | "date" | "datetime" | "time" | "timer" | "radio" | "select" | "switch" | "options" | "expand";

export class GridColumn {
  public icon?: string;
  public hint?: string;
  public title: string = "";
  public titleHint?: string;
  public type: ColumnType = "display";
  public field: string = "";
  public dao?: DaoBaseService<Base>;
  public orderBy: string = "";
  public editable: boolean = false;
  public template?: TemplateRef<unknown>;
  public titleTemplate?: TemplateRef<unknown>;
  public editTemplate?: TemplateRef<unknown>;
  public expandTemplate?: TemplateRef<unknown>;
  public items: LookupItem[] = [];
  public onlyHours?: string; 
  public onlyDays?: string; 
  public buttons?: ToolbarButton[];
  public save?: (row: any) => Promise<boolean>;
  public edit?: (row: any) => Promise<void>;
  public dynamicButtons?: (row: any) => ToolbarButton[];
  public options?: ToolbarButton[];
  public dynamicOptions?: (row: any) => ToolbarButton[];
  public onEdit?: (row: any) => void;
  public onDelete?: (row: any) => void;
  public onChange?: (row: any, form: FormGroup) => void;
  public stepValue?: any;
  public editing: boolean = false;
  public upDownButtons?: string;
  public align: ColumnAlign = "none";
  public minWidth?: number = undefined;
  public maxWidth?: number = undefined;
  public width?: number = undefined;
  public cellClass?: string;

  public isType(type: ColumnType) {
    return (this.type + ":").startsWith(type + ":");
  }

  public inType(types: ColumnType[]) {
    return !!types.find(x => (this.type + ":").startsWith(x + ":"));
  }

  public isSubType(type: ColumnType) {
    return (":" + this.type).endsWith(":" + type);
  }

  public inSubType(types: ColumnType[]) {
    return !!types.find(x => (":" + this.type).endsWith(":" + x));
  }

  public get isColumnEditable(): boolean {
    return this.editable && !!this.save;
  }
};