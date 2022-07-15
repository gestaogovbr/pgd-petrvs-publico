import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { QueryContext } from 'src/app/dao/query-context';
import { QueryOptions } from 'src/app/dao/query-options';
import { Base } from 'src/app/models/base.model';
import { IFormGroupHelper } from 'src/app/services/form-helper.service';
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
export class FilterComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective;
  @Output() filterClear = new EventEmitter<void>();
  @Input() form?: FormGroup;
  @Input() submit?: (filter: FormGroup) => QueryOptions | undefined | void;
  @Input() clear?: (filter: FormGroup) => void;
  @Input() where?: (filter: FormGroup) => any[];
  @Input() collapseChange?: (filter: FormGroup) => void;
  @Input() collapsed: boolean = true;
  @Input() grid?: GridComponent;
  @Input() query?: QueryContext<Base>;
  @Input() queryOptions?: QueryOptions;
  @Input() hidden?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public get isHidden(): boolean {
    return this.hidden != undefined;
  }

  public toggle() {
    this.collapsed = !this.collapsed;
    if(this.collapseChange) this.collapseChange(this.form!);
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
    let queryOptions = this.submit ? this.submit(this.form!) : undefined;
    (this.grid?.query || this.query!).reload(queryOptions || this.grid?.queryOptions || this.queryOptions);
  }
}
