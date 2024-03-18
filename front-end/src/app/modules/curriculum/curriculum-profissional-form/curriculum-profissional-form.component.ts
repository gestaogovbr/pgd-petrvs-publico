import { Component, Injector, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CentroTreinamentoDaoService } from 'src/app/dao/centro-treinamento-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { InputRadioComponent } from 'src/app/components/input/input-radio/input-radio.component';
import { CurriculumProfissionalDaoService } from 'src/app/dao/curriculum-profissional-dao.service';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { CargoDaoService } from 'src/app/dao/cargo-dao.service';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';
import { AreaAtividadeExternaDaoService } from 'src/app/dao/area-atividade-externa-dao.service';
import { DisciplinaDaoService } from 'src/app/dao/disciplina-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { HistoricoAtividadeInterna } from 'src/app/models/historico-atividade-interna.model';
import { HistoricoAtividadeExterna } from 'src/app/models/historico-atividade-externa.model';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';
import { CurriculumProfissional } from 'src/app/models/curriculum-profissional.model';
import { HistoricoFuncao } from 'src/app/models/historico-funcao.model';
import { HistoricoLotacao } from 'src/app/models/historico-lotacao.model';
import { HistoricoDocenciaExterna } from 'src/app/models/historico-docencia-externa.model';
import { HistoricoDocenciaInterna } from 'src/app/models/historico-docencia-interna.model';
import { HistoricoCursoInterno } from 'src/app/models/historico-curso-interno.model';
import { HistoricoCursoExterno } from 'src/app/models/historico-curso-externo.model';

@Component({
  selector: 'curriculum-profissional-form',
  templateUrl: './curriculum-profissional-form.component.html',
  styleUrls: ['./curriculum-profissional-form.component.scss']
})

export class CurriculumProfissionalFormComponent extends PageFormBase<CurriculumProfissional, CurriculumProfissionalDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('escolhaProgramaGestao', { static: false }) public escolhaProgramaGestao?: InputRadioComponent;
  @ViewChild('escolhaInteresseProgramaGestao', { static: false }) public escolhaInteresseProgramaGestao?: InputRadioComponent;
  @ViewChild('funcao', { static: false }) public funcao?: InputSelectComponent;
  @ViewChild('anos', { static: false }) public anos?: InputSelectComponent;
  @ViewChild('capacidadeTecnica', { static: false }) public capacidadeTecnica?: InputSelectComponent;
  @ViewChild('cursoDocenciaInterna', { static: false }) public cursoDocenciaInterna?: InputSelectComponent;
  @ViewChild('cursoInterno', { static: false }) public cursoInterno?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('unidadeChefia', { static: false }) public unidadeChefia?: InputSearchComponent;
  @ViewChild('areaAtividadeExterna', { static: false }) public areaAtividadeExterna?: InputSearchComponent;
  @ViewChild('areaAtividadeExternaDocencia', { static: false }) public areaAtividadeExternaDocencia?: InputSearchComponent;
  @ViewChild('areaHistoricoCursoExterno', { static: false }) public areaHistoricoCursoExterno?: InputSearchComponent;
  @ViewChild('areaTematica', { static: false }) public areaTematica?: InputSearchComponent;

  public especifiqueHabilidades: LookupItem[] = [];
  public cursosItens: LookupItem[] = [];
  public curriculumDao: CurriculumDaoService;
  public unidadeDao: UnidadeDaoService;
  public funcaoDao: FuncaoDaoService;
  public centroTreinamentoDao: CentroTreinamentoDaoService;
  public grupoDao: GrupoEspecializadoDaoService;
  public cargoDao: CargoDaoService;
  public areaTematicaDao: AreaTematicaDaoService;
  public areaAtividadeExternaDao: AreaAtividadeExternaDaoService;
  public disciplinaDao: DisciplinaDaoService;
  public cursoDao: CursoDaoService;
  public capacidadeTecnicaDao: CapacidadeTecnicaDaoService;
  public formHistoricoFuncaoGrid: FormGroup;
  public formHistoricoLotacaoGrid: FormGroup;
  public formHistoricoAtividadeExternaGrid: FormGroup;
  public formHistoricoAtividadeInternaGrid: FormGroup;
  public formHistoricoDocenciaExternaGrid: FormGroup;
  public formHistoricoDocenciaInternaGrid: FormGroup;
  public formHistoricoCursoExternoGrid: FormGroup;
  public formHistoricoCursoInternoGrid: FormGroup;
  public areaTematicaWhere: any[] = [["id", "==", null]];

  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.join = ['historicos_atividades_internas.capacidade_tecnica.area_tematica', 'historicos_atividades_externas.area_atividade_externa', 'historicos_cursos_internos.curso', 'historicos_cursos_externos.area_atividade_externa', 'historicos_docencias_internas.curso',
      'historicos_docencias_externas.area_atividade_externa', 'historicos_funcoes.funcao', 'historicos_funcoes.unidade', 'historicos_lotacoes.unidade', 'curriculum'];
    this.curriculumDao = injector.get<CurriculumDaoService>(CurriculumDaoService);
    this.centroTreinamentoDao = injector.get<CentroTreinamentoDaoService>(CentroTreinamentoDaoService);
    this.funcaoDao = injector.get<FuncaoDaoService>(FuncaoDaoService);
    this.grupoDao = injector.get<GrupoEspecializadoDaoService>(GrupoEspecializadoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.cargoDao = injector.get<CargoDaoService>(CargoDaoService);
    this.areaTematicaDao = injector.get<AreaTematicaDaoService>(AreaTematicaDaoService);
    this.areaAtividadeExternaDao = injector.get<AreaAtividadeExternaDaoService>(AreaAtividadeExternaDaoService);
    this.disciplinaDao = injector.get<DisciplinaDaoService>(DisciplinaDaoService);
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.capacidadeTecnicaDao = injector.get<CapacidadeTecnicaDaoService>(CapacidadeTecnicaDaoService);
    this.form = this.fh.FormBuilder({
      radioProgramaGestao: { default: false },
      radioInteresseProgramaGestao: { default: false },
      radioInteresseBNT: { default: false },
      radioInteresseRemocao: { default: false },
      radioViajemNacional: { default: false },
      radioViajemInternacional: { default: false },
      radioAtividadeExterna: { default: false },
      radioAtividadeInterna: { default: false },
      radioDocenciaExterna: { default: false },
      radioDocenciaInterna: { default: false },
      radioCursoExterno: { default: false },
      escolhaInteresseProgramaGestao: { default: "" },
      escolhaRadioProgramaGestao: { default: "" },
      inputEspecifiqueHabilidade: { default: "" },
      especifique_habilidades: { default: [] },
      historicos_funcoes: { default: [] },
      historicos_lotacoes: { default: [] },
      historicos_atividades_externas: { default: [] },
      historicos_atividades_internas: { default: [] },
      historicos_docencias_externas: { default: [] },
      historicos_docencias_internas: { default: [] },
      historicos_cursos_internos: { default: [] },
      historicos_cursos_externos: { default: [] },
      ano_ingresso: { default: [] },
      telefone: { default: "" },
      lotacao_atual: { default: "" },
      selecionaLotacao: { default: "" },
      viagem_nacional: { default: 0 },
      viagem_internacional: { default: 0 },
      interesse_bnt: { default: 0 },
      remocao: { default: 0 },
      pgd_inserido: { default: "" },
      pgd_interesse: { default: "" },
      centro_treinamento_id: { default: null },
      cargo_id: { default: "" },
      grupo_especializado_id: { default: null },
    }, this.cdRef, this.validate);
    this.formHistoricoFuncaoGrid = this.fh.FormBuilder({
      funcao_id: { default: "" },
      unidade_id: { default: "" },
    }, this.cdRef, this.validate);
    this.formHistoricoLotacaoGrid = this.fh.FormBuilder({
      unidade_id: { default: "" },
    }, this.cdRef, this.validate);
    this.formHistoricoAtividadeExternaGrid = this.fh.FormBuilder({
      area_atividade_externa_id: { default: "" },
    }, this.cdRef, this.validate);
    this.formHistoricoAtividadeInternaGrid = this.fh.FormBuilder({
      area_tematica_id: { default: "" },
      capacidade_tecnica_id: { default: "" },
      atividade_desempenhada: { default: "" }
    }, this.cdRef, this.validate);
    this.formHistoricoDocenciaExternaGrid = this.fh.FormBuilder({
      area_atividade_externa_id: { default: "" },
    }, this.cdRef, this.validate);
    this.formHistoricoDocenciaInternaGrid = this.fh.FormBuilder({
      curso_id: { default: "" },
    }, this.cdRef, this.validate);
    this.formHistoricoCursoInternoGrid = this.fh.FormBuilder({
      radioPretensaoHistoricoCursoInterno: { default: false },
      curso_id: { default: "" },
      pretensao: { default: 0 },
    }, this.cdRef, this.validate);
    this.formHistoricoCursoExternoGrid = this.fh.FormBuilder({
      area_atividade_externa_id: { default: "" },
      pretensao: { default: 0 },
      nome: { default: "" },
    }, this.cdRef, this.validate);
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    let self = this;
    await this.curriculumDao?.query({ where: [['usuario_id', '==', this.auth.usuario?.id]] }).getAll().then(async (curriculunsPessoais) => {
      if (curriculunsPessoais.length) {
        await Promise.all([
          this.dao?.query({ where: [['curriculum_id', '==', curriculunsPessoais[0].id]], join: this.join }).asPromise(),
          this.cursoDao?.query({ where: [['titulo', '==', 'INSTITUCIONAL']], orderBy: [['nome', 'asc']] }).getAll()
        ]).then(result => {
          self.entity = result[0]?.length ? result[0][0] : new CurriculumProfissional({ lotacao_atual: this.auth.unidade?.id, curriculum_id: curriculunsPessoais[0].id });
          self.cursosItens = result[1].map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
        });
        self.initializeData(this.form!);
      } else {
        await this.dialog.confirm("Preencher dados pessoais", "É necessário preencher dados pessoais");
        self.close();
        self.go.navigate({ route: ['raiox', 'pessoal'] });
      }
    });
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['cargo_id', 'ano_ingresso'].indexOf(controlName) >= 0 && !control.value) {
      result = "Obrigatório";
    }
    return result;
  }

  public async loadData(entity: CurriculumProfissional, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup) {
    if (this.entity) {
      for (let i = 1980; i <= (new Date()).getFullYear(); i++) {
        this.anos?.items.push(Object.assign({}, { key: i, value: (i.toString()) }));
      }
      this.form?.controls.radioAtividadeInterna.setValue(!!this.entity.historicos_atividades_internas.length);
      this.form?.controls.radioAtividadeExterna.setValue(!!this.entity.historicos_atividades_externas.length);
      this.form?.controls.radioDocenciaInterna.setValue(!!this.entity.historicos_docencias_internas.length);
      this.form?.controls.radioDocenciaExterna.setValue(!!this.entity.historicos_docencias_externas.length);
      if (!!this.entity.pgd_interesse.length) {
        this.form?.controls.radioInteresseProgramaGestao.setValue(true);
        this.escolhaInteresseProgramaGestao?.setValue(this.lookup.getLookup(this.lookup.PG_PRF, this.entity.pgd_interesse)?.key)
      } else {
        this.form?.controls.radioInteresseBNT.setValue(false);
      }
      if (!!this.entity.pgd_inserido.length) {
        this.form?.controls.radioProgramaGestao.setValue(true);
        this.escolhaProgramaGestao?.setValue(this.lookup.getLookup(this.lookup.PG_PRF, this.entity.pgd_inserido)?.key)
      } else {
        this.form?.controls.radioProgramaGestao.setValue(false);
      }
      this.loadData(this.entity, this.form!);
    }
  }

  public async saveData(form: IIndexable): Promise<CurriculumProfissional> {
    return new Promise<CurriculumProfissional>((resolve, reject) => {
      let curriculumProfissional = this.util.fill(new CurriculumProfissional(), this.entity!);
      curriculumProfissional = this.util.fillForm(curriculumProfissional, this.form!.value);
      /*       curriculumProfissional.viagem_nacional = (this.form?.controls.viagem_nacional.value ? 1 : 0);
            curriculumProfissional.viagem_internacional = (this.form?.controls.viagem_internacional.value ? 1 : 0); */
      /*       curriculumProfissional.interesse_bnt = (this.form?.controls.interesse_bnt.value ? 1 : 0);
            curriculumProfissional.remocao = (this.form?.controls.remocao.value ? 1 : 0); */
      curriculumProfissional.historicos_atividades_internas = this.form!.controls.historicos_atividades_internas.value.filter((x: HistoricoAtividadeInterna) => x._status?.length);
      curriculumProfissional.historicos_atividades_externas = this.form!.controls.historicos_atividades_externas.value.filter((x: HistoricoAtividadeExterna) => x._status?.length);
      curriculumProfissional.historicos_cursos_internos = this.form!.controls.historicos_cursos_internos.value.filter((x: HistoricoCursoInterno) => x._status?.length);
      curriculumProfissional.historicos_cursos_externos = this.form!.controls.historicos_cursos_externos.value.filter((x: HistoricoCursoExterno) => x._status?.length);
      curriculumProfissional.historicos_docencias_internas = this.form!.controls.historicos_docencias_internas.value.filter((x: HistoricoDocenciaInterna) => x._status?.length);
      curriculumProfissional.historicos_docencias_externas = this.form!.controls.historicos_docencias_externas.value.filter((x: HistoricoDocenciaExterna) => x._status?.length);
      curriculumProfissional.historicos_funcoes = this.form!.controls.historicos_funcoes.value.filter((x: HistoricoFuncao) => x._status?.length);
      curriculumProfissional.historicos_lotacoes = this.form!.controls.historicos_lotacoes.value.filter((x: HistoricoLotacao) => x._status?.length);
      resolve(curriculumProfissional);
    });
  };

  public onChangeEscolhePG() {
    this.escolhaProgramaGestao?.setValue("");
  }

  public onChangeEscolheInteressePG() {
    this.escolhaInteresseProgramaGestao?.setValue("");
  }

  public onAddClick() { }

  //GRID FUNCAO

  public async addHistoricoFuncao() {
    return new HistoricoFuncao({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoFuncao(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.funcao = this.funcao?.selectedItem?.data;
      row.unidade = this.unidadeChefia?.selectedEntity;
      row.unidade_id = values.unidade_id;
      row.funcao_id = values.funcao_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoFuncao(form: FormGroup, row: HistoricoFuncao) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, row));
    console.log('loadHistoricoFuncao: ', row);
    /*     this.formHistoricoFuncaoGrid!.controls.funcao_id.setValue(row.funcao_id);
        this.formHistoricoFuncaoGrid!.controls.unidade_id.setValue(row.unidade_id); */
  }

  public async removeHistoricoFuncao(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  //GRID LOTACAO

  public async addHistoricoLotacao() {
    return new HistoricoLotacao({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoLotacao(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.unidade = this.unidade!.selectedEntity;
      row.unidade_id = values.unidade_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoLotacao(form: FormGroup, row: HistoricoLotacao) {
    this.formHistoricoLotacaoGrid!.controls.unidade_id.setValue(row.unidade_id);
  }

  public async removeHistoricoLotacao(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  // GRID ATIVIDADE EXTERNA

  public async addHistoricoAtividadeExterna() {
    return new HistoricoAtividadeExterna({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoAtividadeExterna(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.area_atividade_externa = this.areaAtividadeExterna?.selectedEntity;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoAtividadeExterna(form: FormGroup, row: HistoricoAtividadeExterna) {
    this.formHistoricoAtividadeExternaGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
  }

  public async removeHistoricoAtividadeExterna(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  // GRID ATIVIDADE Interna

  public async addHistoricoAtividadeInterna() {
    return new HistoricoAtividadeInterna({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoAtividadeInterna(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.area_tematica = this.areaTematica?.selectedEntity;
      row.area_tematica_id = values.area_tematica_id;
      row.capacidade_tecnica = this.capacidadeTecnica?.selectedItem?.data;
      row.capacidade_tecnica_id = values.capacidade_tecnica_id;
      row.atividade_desempenhada = values.atividade_desempenhada;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoAtividadeInterna(form: FormGroup, row: HistoricoAtividadeInterna) {
    this.formHistoricoAtividadeInternaGrid!.controls.area_tematica_id.setValue(row.capacidade_tecnica?.area_tematica_id);
    this.formHistoricoAtividadeInternaGrid!.controls.capacidade_tecnica_id.setValue(row.capacidade_tecnica_id);
    this.formHistoricoAtividadeInternaGrid!.controls.atividade_desempenhada.setValue(row.atividade_desempenhada);
  }

  public async removeHistoricoAtividadeInterna(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  // GRID Docencia Externa

  public async addHistoricoDocenciaExterna() {
    return new HistoricoDocenciaExterna({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoDocenciaExterna(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.area_atividade_externa = this.areaAtividadeExternaDocencia!.selectedEntity;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoDocenciaExterna(form: FormGroup, row: HistoricoDocenciaExterna) {
    this.formHistoricoDocenciaExternaGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
  }

  public async removeHistoricoDocenciaExterna(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  // GRID Docencia Interna

  public async addHistoricoDocenciaInterna() {
    return new HistoricoDocenciaInterna({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoDocenciaInterna(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.curso = this.cursoDocenciaInterna?.selectedItem?.data;
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoDocenciaInterna(form: FormGroup, row: HistoricoDocenciaInterna) {
    this.formHistoricoDocenciaInternaGrid!.controls.curso_id.setValue(row.curso_id);
  }

  public async removeHistoricoDocenciaInterna(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  public addItemHabilidades(): LookupItem | undefined {
    let result = undefined;
    const habilidades = this.form!.controls.inputEspecifiqueHabilidade.value;
    const key = this.util.textHash(habilidades);
    const especifiqueHabilidades = { 'key': key, 'value': habilidades };
    if (especifiqueHabilidades && this.util.validateLookupItem(this.form!.controls.especifique_habilidades.value, key)) {
      result = {
        key: key,
        value: habilidades,
        data: {
          _status: "ADD",
        }
      };
      this.form!.controls.inputEspecifiqueHabilidade.setValue("");
    }
    return result;
  };

  // GRID Curso Interno

  public async addHistoricoCursoInterno() {
    return new HistoricoCursoInterno({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoCursoInterno(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.curso = this.cursoInterno?.selectedItem
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoCursoInterno(form: FormGroup, row: HistoricoCursoInterno) {
    this.formHistoricoCursoInternoGrid!.controls.curso_id.setValue(row.curso_id);
    this.formHistoricoCursoInternoGrid!.controls.pretensao.setValue(row.pretensao);
  }

  public async removeHistoricoCursoInterno(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  // GRID Curso Externo

  public async addHistoricoCursoExterno() {
    return new HistoricoCursoExterno({
      _status: "ADD"
    }) as IIndexable;
  }

  public saveHistoricoCursoExterno(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.area_atividade_externa = this.areaHistoricoCursoExterno?.selectedEntity;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row.nome = values.nome;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadHistoricoCursoExterno(form: FormGroup, row: HistoricoCursoExterno) {
    this.formHistoricoCursoExternoGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
    this.formHistoricoCursoExternoGrid!.controls.pretensao.setValue(row.pretensao);
    this.formHistoricoCursoExternoGrid!.controls.nome.setValue(row.nome);
  }

  public async removeHistoricoCursoExterno(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  public onAreaAtividadeInternaChange() {
    this.areaTematicaWhere = [['area_tematica_id', '==', this.formHistoricoAtividadeInternaGrid!.controls.area_tematica_id.value]];
    this.cdRef.detectChanges();
  }

  public labelRadio(radio: InputSwitchComponent) {
    return radio.value ? 'Sim' : 'Não';
  }

}
