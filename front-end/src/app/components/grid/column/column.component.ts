import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { ColumnType } from '../grid-column';

export type ColumnAlign = "none" | "center" | "left" | "right"; 

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
  @Input() editable: boolean = true;
  @Input() template?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() editTemplate?: TemplateRef<unknown>;
  @Input() expandTemplate?: TemplateRef<unknown>;
  @Input() items?: LookupItem[];
  @Input() onlyHours?: string;
  @Input() onlyDays?: string;
  @Input() buttons?: ToolbarButton[];
  @Input() dynamicButtons?: (row: any) => ToolbarButton[];
  @Input() options?: ToolbarButton[];
  @Input() save?: (row: any) => Promise<boolean>;
  @Input() edit?: (row: any) => Promise<void>;
  @Input() dynamicOptions?: (row: any) => ToolbarButton[];
  @Input() onEdit?: (row: any) => void;
  @Input() onDelete?: (row: any) => void;
  @Input() onChange?: (row: any, form: FormGroup) => void;
  @Input() upDownButtons?: string;
  @Input() stepValue?: any;
  @Input() align: ColumnAlign = "none";
  @Input() minWidth?: number = undefined;
  @Input() maxWidth?: number = undefined;
  @Input() width?: number = undefined;
  @Input() cellClass?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
