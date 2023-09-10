import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ToolbarButton } from '../../toolbar/toolbar.component';
import { GridColumn } from '../grid-column';
import { GridComponent } from '../grid.component';
import { ComponentBase } from '../../component-base';

@Component({
  selector: 'column-options',
  templateUrl: './column-options.component.html',
  styleUrls: ['./column-options.component.scss']
})
export class ColumnOptionsComponent extends ComponentBase implements OnInit {
  @ViewChild('optionButton', {static: false}) optionButton?: ElementRef;
  @Output() calcWidthChange = new EventEmitter<number>();
  @Input()  calcWidth?: number;
  @Input() index: number = 0;
  @Input() column: GridColumn = new GridColumn();
  @Input() row: any = undefined;
  @Input() grid?: GridComponent;
  @Input() upDownButtons?: string;
  @Input() buttons: ToolbarButton[] = [];
  @Input() dynamicButtons?: (row: any, metadata?: any) => ToolbarButton[];
  @Input() options?: ToolbarButton[] = [];
  @Input() dynamicOptions?: (row: any, metadata?: any) => ToolbarButton[];

  public randomId = Math.round(Math.random() * 1000).toString();
  public go: NavigateService;

  private _allButtons?: ToolbarButton[] = undefined;
  private _allOptions?: ToolbarButton[] = undefined;

  constructor(public injector: Injector) {
    super(injector);
    this.go = injector.get<NavigateService>(NavigateService);
  }

  ngOnInit(): void {}

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
    return this.row["id"] == (this.grid?.editing || {id: undefined})["id"];
  }

  public get isUpDownButtons(): boolean {
    return this.upDownButtons != undefined;
  }

  public async onButtonClick(button: ToolbarButton) {
    if(button.route) {
      this.go.navigate(button.route, button.metadata);
    } else if(button.onClick) {
      await button.onClick(this.row, this.grid!.getMetadata(this.row), this.index);
    }
  }

  public recalcWith() {
    this.calcWidth = ((this._allButtons || []).length * 40) + (this._allOptions?.length ? 50 : 0) || undefined;
    this.calcWidthChange.emit(this.calcWidth);
  }

  public get allButtons(): ToolbarButton[] {
    if(!this._allButtons) {
      const dynamicButtons = this.dynamicButtons ? this.dynamicButtons(this.row, this.column.metadata) : [];
      this._allButtons = [...dynamicButtons, ...this.buttons];
      this.recalcWith();
    }
    return this._allButtons!;
  }

  public get allOptions(): ToolbarButton[] {
    if(!this._allOptions) {
      const dynamicOptions = this.dynamicOptions ? this.dynamicOptions(this.row, this.column.metadata) : [];
      this._allOptions = [...dynamicOptions, ...(this.options || [])];
      this.recalcWith();
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
