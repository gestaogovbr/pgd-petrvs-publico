import { Component, ElementRef, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GridComponent, GroupBy } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { FullRoute, RouteMetadata } from 'src/app/services/navigate.service';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { PageListBase } from '../../base/page-list-base';
import { CurriculumProfissionalDaoService } from 'src/app/dao/curriculum-profissional-dao.service';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';

@Component({
  selector: 'app-curriculum-pesquisa-list',
  templateUrl: './curriculum-pesquisa-list.component.html',
  styleUrls: ['./curriculum-pesquisa-list.component.scss']
})
export class CurriculumPesquisaListComponent extends PageListBase<CurriculumProfissional, CurriculumProfissionalDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public filter: FormGroup;
  
  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.filter = this.fh.FormBuilder({
      nome: { default: "" },
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
