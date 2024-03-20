import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PageListBase } from '../../base/page-list-base';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { Curriculum } from 'src/app/models/curriculum.model';
import { CurriculumProfissional } from 'src/app/models/curriculum-profissional.model';
import { InputRadioComponent } from 'src/app/components/input/input-radio/input-radio.component';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-curriculum-pesquisa-list',
  templateUrl: './curriculum-pesquisa-list.component.html',
  styleUrls: ['./curriculum-pesquisa-list.component.scss']
})
export class CurriculumPesquisaListComponent extends PageListBase<Curriculum, CurriculumDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('radioInteresseRemocao', { static: false }) public radioInteresseRemocao?: InputSwitchComponent;
  @ViewChild('radioInteresseBNT', { static: false }) public radioInteresseBNT?: InputSwitchComponent;
  @ViewChild('nivelExtroversao', { static: false }) public nivelExtroversao?: InputRadioComponent;
  @ViewChild('nivelAgradabilidade', { static: false }) public nivelAgradabilidade?: InputRadioComponent;
  @ViewChild('nivelDisciplina', { static: false }) public nivelDisciplina?: InputRadioComponent;
  @ViewChild('nivelEstabilidade', { static: false }) public nivelEstabilidade?: InputRadioComponent;
  @ViewChild('nivelAbertura', { static: false }) public nivelAbertura?: InputRadioComponent;

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
  public itemsExtroversao: LookupItem[] = [];
  public itemsAgradabilidade: LookupItem[] = [];
  public itemsDisciplina: LookupItem[] = [];
  public itemsEstabilidade: LookupItem[] = [];
  public itemsAbertura: LookupItem[] = [];

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
      modalidade_pgd: { default: "" },
      remocao: { default: false },
      soft_id: { default: "" },
      extroversao: { default: false },
      nivelExtroversao: { default: "" },
      agradabilidade: { default: false },
      nivelAgradabilidade: { default: "" },
      disciplina: { default: false },
      nivelDisciplina: { default: "" },
      estabilidade: { default: false },
      nivelEstabilidade: { default: "" },
      abertura: { default: false },
      nivelAbertura: { default: "" },
    });
    this.orderBy = [['usuario.nome', 'asc']];
    this.join = ['curriculum_profissional.historicos_atividades_internas.capacidade_tecnica.area_tematica',
      'curriculum_profissional.historicos_atividades_externas.area_atividade_externa', 'curriculum_profissional.historicos_cursos_internos.curso',
      'curriculum_profissional.historicos_cursos_externos.area_atividade_externa', 'curriculum_profissional.historicos_docencias_internas.disciplina',
      'curriculum_profissional.historicos_docencias_externas.area_atividade_externa', 'curriculum_profissional.historicos_funcoes.funcao',
      'curriculum_profissional.historicos_funcoes.unidade', 'curriculum_profissional.historicos_lotacoes.unidade', 'usuario', 'cidade',
      'graduacoes', 'graduacoes.curso', 'graduacoes.curso.area_conhecimento', 'curriculum_profissional.grupo_especializado',
      'usuario.preenchimentos.questionario.perguntas.respostas'];
    this.itemsExtroversao = [
      { key: "1", value: "Introvertido" },
      { key: "2", value: "Neutro" },
      { key: "3", value: "Extrovertido" }
    ];
    this.itemsAgradabilidade = [
      { key: "1", value: "Objetivo" },
      { key: "2", value: "Neutro" },
      { key: "3", value: "Pessoas" }
    ];
    this.itemsDisciplina = [
      { key: "1", value: "Espontâneo" },
      { key: "2", value: "Neutro" },
      { key: "3", value: "Disciplinado" }
    ];
    this.itemsEstabilidade = [
      { key: "1", value: "Racional" },
      { key: "2", value: "Neutro" },
      { key: "3", value: "Emocional" }
    ];
    this.itemsAbertura = [
      { key: "1", value: "Presente" },
      { key: "2", value: "Neutro" },
      { key: "3", value: "Futuro" }
    ];
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
    if (form.interesse_pgd) {
      result.push(["interesse_pgd", "==", form.interesse_pgd, form.modalidade_pgd]);
    }
    if (!form.interesse_pgd) {
      result.push(["interesse_pgd", "==", false]);
    }
    if (form.interesse_bnt) {
      result.push(["interesse_bnt", "==", form.interesse_bnt]);
    }
    if (form.remocao) {
      result.push(["remocao", "==", form.remocao]);
    }
    if (form.soft_id?.length) {
      result.push(["soft_id", "==", form.soft_id]);
    }
    if (form.nivelExtroversao?.length) {
      result.push(["bigfive", "extroversao", "==", form.nivelExtroversao]);
    }
    if (form.nivelAgradabilidade?.length) {
      result.push(["bigfive", "agradabilidade", "==", form.nivelAgradabilidade]);
    }
    if (form.nivelDisciplina?.length) {
      result.push(["bigfive", "disciplina", "==", form.nivelDisciplina]);
    }
    if (form.nivelEstabilidade?.length) {
      result.push(["bigfive", "estabilidade", "==", form.nivelEstabilidade]);
    }
    if (form.nivelAbertura?.length) {
      result.push(["bigfive", "abertura", "==", form.nivelAbertura]);
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
    filter.controls.extroversao.setValue(false);
    filter.controls.agradabilidade.setValue(false);
    filter.controls.disciplina.setValue(false);
    filter.controls.estabilidade.setValue(false);
    filter.controls.abertura.setValue(false);
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

  public onChangeRadioBigFive(caracteristica: string) {
    switch (caracteristica) {
      case 'extroversao':
        this.nivelExtroversao?.setValue("");
        break;
      case 'agradabilidade':
        this.nivelAgradabilidade?.setValue("");
        break;
      case 'disciplina':
        this.nivelDisciplina?.setValue("");
        break;
      case 'estabilidade':
        this.nivelEstabilidade?.setValue("");
        break;
      case 'abertura':
        this.nivelAbertura?.setValue("");
        break;
    }
  }
}

