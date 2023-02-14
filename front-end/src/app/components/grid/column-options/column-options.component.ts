import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'column-options',
  templateUrl: './column-options.component.html',
  styleUrls: ['./column-options.component.scss']
})
export class ColumnOptionsComponent implements OnInit {
  @ViewChild('optionButton', {static: false}) optionButton?: ElementRef;
  @Input() index: number = 0;
  @Input() column: GridColumn = new GridColumn();
  @Input() row: any = undefined;
  @Input() grid?: GridComponent;
  @Input() upDownButtons?: string;
  @Input() buttons: ToolbarButton[] = [];
  @Input() dynamicButtons?: (row: any) => ToolbarButton[];
  @Input() options?: ToolbarButton[] = [];
  @Input() dynamicOptions?: (row: any) => ToolbarButton[];

  public randomId = Math.round(Math.random() * 1000).toString();

  private _allButtons?: ToolbarButton[] = undefined;
  private _allOptions?: ToolbarButton[] = undefined;

  constructor(
    public go: NavigateService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  public onMoveClick(up: boolean) {
    const list = this.grid!.items;
    const index = list?.findIndex(x => x.id == this.row.id);
    if(index >= 0){
      const buffer = list[index];
      if(up && index > 0) {
        list[index] = list[index-1];
        list[index-1] = buffer;
      } else if(!up && index < list.length-1){
        list[index] = list[index+1];
        list[index+1] = buffer;
      }
      this.grid!.items = list;
    }
  }

  public get isRowEditing(): boolean {
    return this.row["id"] == (this.grid?.editing || [])["id"];
  }

  public get isUpDownButtons(): boolean {
    return this.upDownButtons != undefined;
  }

  public onButtonClick(button: ToolbarButton) {
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      button.onClick(this.row);
    }
  }

  public get allButtons(): ToolbarButton[] {
    if(!this._allButtons) {
      const dynamicButtons = this.dynamicButtons ? this.dynamicButtons(this.row) : [];
      this._allButtons = [...dynamicButtons, ...this.buttons];
    }
    return this._allButtons!;
  }

  public get allOptions(): ToolbarButton[] {
    if(!this._allOptions) {
      const dynamicOptions = this.dynamicOptions ? this.dynamicOptions(this.row) : [];
      this._allOptions = [...dynamicOptions, ...(this.options || [])];
    }
    return this._allOptions!;
  }

  onOptionsClick() {
    this.cdRef.detectChanges();
  }

  public onSaveClick() {
    this.grid!.onSaveItem(this.row);
  }

  public get optionsList(): ToolbarButton[] {
    return this.optionButton?.nativeElement.className.includes("show") ? this.allOptions : [];
  }

  public onCancelClick() {
    this.grid!.onCancelItem();
  }
}
