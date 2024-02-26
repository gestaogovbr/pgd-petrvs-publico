import { Component, ElementRef, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent, GroupBy } from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { CurriculumProfissionalDaoService } from 'src/app/dao/curriculum-profissional-dao.service';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-curriculum-pesquisa-list',
  templateUrl: './curriculum-pesquisa-list.component.html',
  styleUrls: ['./curriculum-pesquisa-list.component.scss']
})
export class CurriculumPesquisaListComponent extends PageListBase<CurriculumProfissional, CurriculumProfissionalDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public cidadeDao: CidadeDaoService;
  public areaDao: AreaConhecimentoDaoService;
  public cursoDao: CursoDaoService;
  public grupoDao: GrupoEspecializadoDaoService;
  public funcaoDao: FuncaoDaoService;
  public areaTematicaDao: AreaTematicaDaoService;
  public capacidadeTecnicaDao: CapacidadeTecnicaDaoService;
  public filter: FormGroup;
  public areaTematicaWhere: any[] = [["id", "==", null]];
  public cursoWhere: any[] = [["id", "==", null]];

  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService);
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.grupoDao = injector.get<GrupoEspecializadoDaoService>(GrupoEspecializadoDaoService);
    this.funcaoDao = injector.get<FuncaoDaoService>(FuncaoDaoService);
    this.capacidadeTecnicaDao = injector.get<CapacidadeTecnicaDaoService>(CapacidadeTecnicaDaoService);
    this.areaTematicaDao = injector.get<AreaTematicaDaoService>(AreaTematicaDaoService);
    this.filter = this.fh.FormBuilder({
      estado: { default: "" },
      cidade_id: { default: "" },
      estado_civil: { default: "" },
      filhos: { default: false },
      idioma: { default: "" },
      area_conhecimento_id: { default: "" },
      curso_id: { default: "" },
      titulo_id: { default: "" },
      grupo_especializado_id: { default: "" },
      funcao_id: { default: "" },
      area_tematica_id: { default: "" },
      capacidade_tecnica_id: { default: "" },
    });
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso',
      'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso', 'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao',
      'historico_funcao.unidade', 'historico_lotacao.unidade', 'curriculum', 'curriculum.usuario', 'curriculum.cidade', 'curriculum.graduacoes',
      'curriculum.graduacoes.curso', 'curriculum.graduacoes.curso.area_conhecimento', 'grupo_especializado'];
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if (form.estado?.length) {
      result.push(["uf", "==", form.estado]);
    }
    if (form.cidade?.length) {
      result.push(["cidade_id", "==", form.cidade_id]);
    }
    if (form.estado_civil?.length) {
      result.push(["estado_civil", "==", form.estado_civil]);
    }
    if (form.filhos?.length) {
      result.push(["filhos", "==", form.filhos]);
    }
    if (form.idioma?.length) {
      result.push(["idioma", "==", form.idioma]);
    }
    if (form.area_conhecimento_id?.length) {
      result.push(["area_conhecimento_id", "==", form.area_conhecimento_id]);
    }
    if (form.curso_id?.length) {
      result.push(["curso_id", "==", form.curso_id]);
    }
    if (form.titulo_id?.length) {
      result.push(["titulo_id", "==", form.titulo_id]);
    }
    if (form.grupo_especializado_id?.length) {
      result.push(["grupo_especializado_id", "==", form.grupo_especializado_id]);
    }
    if (form.funcao_id?.length) {
      result.push(["funcao_id", "==", form.funcao_id]);
    }
    if (form.area_tematica_id?.length) {
      result.push(["area_tematica_id", "==", form.area_tematica_id]);
    }
    if (form.capacidade_tecnica_id?.length) {
      result.push(["capacidade_tecnica_id", "==", form.capacidade_tecnica_id]);
    }
    return result;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.estado.setValue("");
    filter.controls.cidade.setValue("");
    filter.controls.estado_civil.setValue("");
    filter.controls.filhos.setValue(false);
    filter.controls.idioma.setValue("");
    filter.controls.area_conhecimento_id.setValue("");
    filter.controls.curso_id.setValue("");
    filter.controls.titulo_id.setValue("");
    filter.controls.grupo_especializado_id.setValue("");
    filter.controls.funcao_id.setValue("");
    filter.controls.area_tematica_id.setValue("");
    filter.controls.capacidade_tecnica_id.setValue("");
    super.filterClear(filter);
  }

  public onGridLoad(rows?: any[]) {
    this.cdRef.detectChanges();
  }

  public onAreaTematicaChange() {
    this.areaTematicaWhere = [['area_tematica_id', '==', this.filter!.controls.area_tematica_id.value]];
    this.cdRef.detectChanges();
  }

  public onAreaConhecimentoChange() {
    this.cursoWhere = [['area_id', '==', this.filter!.controls.area_conhecimento_id.value]];
    this.cdRef.detectChanges();
  }

  public onTituloChange() {
    let titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.filter!.controls.titulo_id.value);
    this.cursoWhere = [['area_id', '==', this.filter!.controls.area_conhecimento_id.value], ['titulo', '==', titulo?.key]];
    this.cdRef.detectChanges();
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    const btns = [];
    btns.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhesCurriculum.bind(this) });
    return btns;
  }

  public showDetalhesCurriculum(curriculum: CurriculumProfissional) {
    this.go.navigate({ route: ['raiox', 'detalhe-pesquisa'] }, {
      metadata: {
        curriculum: curriculum
      }
    });
  }

  public async showCurriculumDetalhes2(row: any) {
    console.log(row)
    this.go.navigate({ route: ['raiox', 'detalhe-pesquisa'] }, { modal: true, metadata: { curriculum: row } });
  }

}

