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
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-curriculum-pesquisa-list',
  templateUrl: './curriculum-pesquisa-list.component.html',
  styleUrls: ['./curriculum-pesquisa-list.component.scss']
})
export class CurriculumPesquisaListComponent extends PageListBase<CurriculumProfissional, CurriculumProfissionalDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild("estados", { static: false }) public estado?: InputSelectComponent;
  @ViewChild('municipio', { static: false }) public municipio?: InputSelectComponent;

  public cidadeDao: CidadeDaoService;
  public filter: FormGroup;

  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.title = "Caça Talentos - Raio X"
    this.filter = this.fh.FormBuilder({
      estado: { default: "" },
      cidade: { default: "" },
    });
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso', 'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso',
    'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao', 'historico_funcao.unidade', 'historico_lotacao.unidade', 'curriculum', 'curriculum.usuario', 'curriculum.cidade'];
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = this.fixedFilter || [];
    let form: any = filter.value;
    return result;
  }

  public filterClear(filter: FormGroup) {

  }

  public onGridLoad(rows?: any[]) {

    this.cdRef.detectChanges();
  }

  public getRow(row: any) {
    console.log(row, "TOWSS");
  }
}

