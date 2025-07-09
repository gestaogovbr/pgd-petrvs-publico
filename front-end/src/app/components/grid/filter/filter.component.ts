import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { QueryContext } from 'src/app/dao/query-context';
import { QueryOptions } from 'src/app/dao/query-options';
import { Base } from 'src/app/models/base.model';
import { IFormGroupHelper } from 'src/app/services/form-helper.service';
import { ComponentBase } from '../../component-base';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    {
      provide: FormGroupDirective,
      useFactory: (self: FilterComponent) => {
        return self.formDirective!;
      },
      deps: [FilterComponent]
    }
  ]
})
export class FilterComponent extends ComponentBase implements OnInit {
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  @Output() filterClear = new EventEmitter<void>();
  @Input() form?: FormGroup;
  @Input() filter?: (filter: FormGroup) => void;
  @Input() submit?: (filter: FormGroup) => QueryOptions | undefined | void;
  @Input() clear?: (filter: FormGroup) => void;
  @Input() where?: (filter: FormGroup) => any[];
  @Input() collapseChange?: (filter: FormGroup) => void;
  @Input() visible: boolean = true;
  @Input() deleted: boolean = false;
  @Input() deletedLabel: string = 'Mostrar os deletados';
  @Input() noButtons?: string;
  @Input() collapsed: boolean = true;
  @Input() hasExportExcel: boolean = false;
  @Input() grid?: GridComponent;
  @Input() query?: QueryContext<Base>;
  @Input() queryOptions?: QueryOptions;
  @Input() hidden?: string;
  @Input() exportExcel?: (filter: FormGroup) => undefined | void;

  public deletedControl: FormControl = new FormControl(false);

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public getId(relativeId?: string): string {
    return this.grid?.getId(relativeId) || this.generatedId(relativeId);
  }

  public get isHidden(): boolean {
    return this.hidden != undefined; 
  }

  public get isNoButtons(): boolean {
    return this.noButtons !== undefined;
  }

  public toggle() {
    this.collapsed = !this.collapsed;
    if(this.collapseChange) this.collapseChange(this.form!);
  }

  public onDeletedChange(event: Event) {
    this.onButtonFilterClick();
  }

  public onButtonClearClick() {
    this.filterClear.emit();
    if(this.form) {
      if(this.clear) {
        this.clear(this.form);
      } else {
        this.form.reset((this.form as unknown as IFormGroupHelper).initialState);
      }
      this.onButtonFilterClick();
    }
  }

  public onButtonFilterClick() {
    if(this.filter) {
      this.filter(this.form!);
    } else {
      let queryOptions = this.submit ? this.submit(this.form!) : undefined;
      queryOptions = queryOptions || this.grid?.queryOptions || this.queryOptions || {};
      //if(this.deletedControl.value) queryOptions.deleted = true;
      queryOptions.deleted = this.deletedControl.value ? true : false;
      (this.grid?.query || this.query!).reload(queryOptions);
    }
  }

  public onButtonExcelClick() {
    if (this.hasExportExcel && this.exportExcel) {
      this.exportExcel(this.form!);
    }
  }
}
