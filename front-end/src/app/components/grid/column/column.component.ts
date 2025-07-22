import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { ColumnType } from '../grid-column';

export type ColumnAlign = "none" | "center" | "left" | "right";
export type ColumnVerticalAlign = "bottom" | "top" | "middle";

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() title: string = "";
  @Input() titleHint?: string;
  @Input() type: ColumnType = "display";
  @Input() field: string = "";
  @Input() dao?: DaoBaseService<Base>;
  @Input() orderBy: string = "";
  @Input() editable: boolean | ((row: any) => boolean) = false;
  @Input() template?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() editTemplate?: TemplateRef<unknown>;
  @Input() columnEditTemplate?: TemplateRef<unknown>;
  @Input() expandTemplate?: TemplateRef<unknown>;
  @Input() items?: LookupItem[];
  @Input() onlyHours?: string;
  @Input() onlyDays?: string;
  @Input() buttons?: ToolbarButton[];
  @Input() dynamicButtons?: (row: any, metadata?: any) => ToolbarButton[];
  @Input() options?: ToolbarButton[];
  @Input() save?: (row: any) => Promise<boolean>;
  @Input() edit?: (row: any) => Promise<void>;
  @Input() canEdit?: (row: any) => boolean;
  @Input() dynamicOptions?: (row: any, metadata?: any) => ToolbarButton[];
  @Input() onEdit?: (row: any) => void;
  @Input() onDelete?: (row: any) => void;
  @Input() onChange?: (row: any, form: FormGroup) => void;
  @Input() upDownButtons?: string;
  @Input() stepValue?: any;
  @Input() align: ColumnAlign = "none";
  @Input() verticalAlign: ColumnVerticalAlign = "bottom";
  @Input() minWidth?: number = undefined;
  @Input() maxWidth?: number = undefined;
  @Input() width?: number = undefined;
  @Input() cellClass?: string;
  @Input() always?: string;
  @Input() metadata?: any;
  @Input() style: { [key: string]: string } = {};

  constructor() { }

  ngOnInit(): void {
  }

}
