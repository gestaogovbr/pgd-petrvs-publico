import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent} from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { Curriculum } from 'src/app/models/currriculum.model';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';

@Component({
  selector: 'app-curriculum-pesquisa-list',
  templateUrl: './curriculum-pesquisa-list.component.html',
  styleUrls: ['./curriculum-pesquisa-list.component.scss']
})
export class CurriculumPesquisaListComponent extends PageListBase<Curriculum, CurriculumDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('radioInteresseRemocao', { static: false }) public radioInteresseRemocao?: InputSwitchComponent;
  @ViewChild('radioInteresseBNT', { static: false }) public radioInteresseBNT?: InputSwitchComponent;

  public cidadeDao: CidadeDaoService;
  public areaDao: AreaConhecimentoDaoService;
  public cursoDao: CursoDaoService;
  public grupoDao: GrupoEspecializadoDaoService;
  public funcaoDao: FuncaoDaoService;
  public areaTematicaDao: AreaTematicaDaoService;
  public capacidadeTecnicaDao: CapacidadeTecnicaDaoService;
  public filter: FormGroup;
  public areaTematicaWhere: any[] = [['id', '==', null]];
  public cursoWhere: any[] = [['id', '==', null]];

  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
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
      grupo_especializado_id: { default: "" },
      funcao_id: { default: "" },
      area_tematica_id: { default: "" },
      capacidade_tecnica_id: { default: "" },
      interesse_bnt: { default: false },
      interesse_pgd: { default: "" },
      remocao: { default: false },
      soft_id: { default: "" },
      score: { default: 0 },
      comportamental: { default: "" },
      score_atributo: { default: 0 },      
    });
    this.orderBy = [['usuario.nome', 'asc']];
    this.join = ['profissional.historico_atividade_interna.capacidade_tecnica.area_tematica',
      'profissional.historico_atividade_externa.area_atividade_externa', 'profissional.historico_curso_interno.curso',
      'profissional.historico_curso_externo.area_atividade_externa', 'profissional.historico_docencia_interna.curso',
      'profissional.historico_docencia_externa.area_atividade_externa', 'profissional.historico_funcao.funcao',
      'profissional.historico_funcao.unidade', 'profissional.historico_lotacao.unidade', 'usuario', 'cidade',
      'graduacoes', 'graduacoes.curso', 'graduacoes.curso.area_conhecimento', 'profissional.grupo_especializado',
      'usuario.questionarios_respostas.questionario.perguntas.questionario_resposta_pergunta'];
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if (form.estado?.length && !form.cidade_id?.length) {
      result.push(["uf", "==", form.estado]);
    }
    if (form.cidade_id?.length) {
      result.push(["cidade_id", "==", form.cidade_id]);
    }
    if (form.estado_civil?.length) {
      result.push(["estado_civil", "==", form.estado_civil]);
    }
    if (form.filhos) {
      result.push(["filhos", "==", form.filhos]);
    }
    if (form.idioma?.length) {
      result.push(["idioma", "==", form.idioma]);
    }
    if (form.area_conhecimento_id?.length && !form.curso_id?.length) {
      result.push(["area_conhecimento_id", "==", form.area_conhecimento_id]);
    }
    if (form.curso_id?.length) {
      result.push(["curso_id", "==", form.curso_id]);
    }
    if (form.grupo_especializado_id?.length) {
      result.push(["grupo_especializado_id", "==", form.grupo_especializado_id]);
    }
    if (form.funcao_id?.length) {
      result.push(["funcao_id", "==", form.funcao_id]);
    }
    if (form.area_tematica_id?.length && !form.capacidade_tecnica_id?.length) {
      result.push(["area_tematica_id", "==", form.area_tematica_id]);
    }
    if (form.capacidade_tecnica_id?.length) {
      result.push(["capacidade_tecnica_id", "==", form.capacidade_tecnica_id]);
    }
    if (form.interesse_pgd?.length) {
      result.push(["interesse_pgd", "==", form.interesse_pgd]);
    }
    if (form.interesse_bnt) {
      result.push(["interesse_bnt", "==", form.interesse_bnt]);
    }
    if (form.remocao) {
      result.push(["remocao", "==", form.remocao]);
    }
    if (form.soft_id?.length && form.score > 0) {
      result.push(["soft_id", "==", form.soft_id, form.score]);
    }
    if (form.comportamental?.length && form.score_atributo > 0) {
      result.push(["comportamental", "==", form.comportamental, form.score_atributo]);
    }
    return result;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.estado.setValue(null);
    filter.controls.cidade_id.setValue(null);
    filter.controls.estado_civil.setValue(null);
    filter.controls.filhos.setValue(false);
    filter.controls.idioma.setValue(null);
    filter.controls.area_conhecimento_id.setValue(null);
    filter.controls.curso_id.setValue(null);
    filter.controls.grupo_especializado_id.setValue(null);
    filter.controls.funcao_id.setValue(null);
    filter.controls.area_tematica_id.setValue(null);
    filter.controls.capacidade_tecnica_id.setValue(null);
    filter.controls.interesse_pgd.setValue(null);
    filter.controls.interesse_bnt.setValue(false);
    filter.controls.remocao.setValue(false);
    filter.controls.soft_id.setValue(null);
    filter.controls.score.setValue(0);
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
}

