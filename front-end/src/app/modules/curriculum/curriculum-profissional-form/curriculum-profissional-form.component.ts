import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { Curriculum } from 'src/app/models/currriculum.model';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CentroTreinamentoDaoService } from 'src/app/dao/centro-treinamento-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-especializado-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { controllers } from 'chart.js';
import { InputRadioComponent } from 'src/app/components/input/input-radio/input-radio.component';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';
import { CurriculumProfissionalDaoService } from 'src/app/dao/curriculum-profissional-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { Funcao } from 'src/app/models/funcao.model';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { CargoDaoService } from 'src/app/dao/cargo-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { AreaTematicaDaoService } from 'src/app/dao/area-tematica-dao.service';
import { AreaTematica } from 'src/app/models/area-tematica.model';
import { AreaAtividadeExternaDaoService } from 'src/app/dao/area-atividade-externa-dao.service';
import { AreaAtividadeExterna } from 'src/app/models/area-atividade-externa.model';
import { MateriaDaoService } from 'src/app/dao/materia-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { AreaConhecimento } from 'src/app/models/area-conhecimento.model';
import { HistoricoAtividadeInternaCurriculum } from 'src/app/models/historico-atividade-interna-currriculum.model';
import { HistoricoLotacaoCurriculum } from 'src/app/models/historico-lotacao-currriculum.model';
import { HistoricoFuncaoCurriculum } from 'src/app/models/historico-funcao-currriculum.model';
import { HistoricoAtividadeExternaCurriculum } from 'src/app/models/historico-atividade-externa-currriculum.model';
import { HistoricoDocenciaExternaCurriculum } from 'src/app/models/historico-docencia-externa-currriculum.model';
import { HistoricoDocenciaInternaCurriculum } from 'src/app/models/historico-docencia-interna-currriculum.model';
import { HistoricoCursoInternoCurriculum } from 'src/app/models/historico-curso-interno-currriculum.model';
import { HistoricoCursoExternoCurriculumDaoService } from 'src/app/dao/historico-curso-externo-curriculum-dao.service';
import { HistoricoCursoExternoCurriculum } from 'src/app/models/historico-curso-externo-currriculum.model';
import { CapacidadeTecnicaDaoService } from 'src/app/dao/capacidade-tecnica-dao.service';

@Component({
  selector: 'curriculum-profissional-form',
  templateUrl: './curriculum-profissional-form.component.html',
  styleUrls: ['./curriculum-profissional-form.component.scss']
})
export class CurriculumProfissionalFormComponent extends PageFormBase<CurriculumProfissional, CurriculumProfissionalDaoService> {
  
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('radioDocenciaExterna', { static: false }) public radioDocenciaExterna?: InputSwitchComponent;
  @ViewChild('radioDocenciaInterna', { static: false }) public radioDocenciaInterna?: InputSwitchComponent;
  @ViewChild('radioCursosInternos', { static: false }) public radioCursosInternos?: InputSwitchComponent;
  @ViewChild('radioCursosExternos', { static: false }) public radioCursosExternos?: InputSwitchComponent;
  @ViewChild('radioInteresseBNT', { static: false }) public radioInteresseBNT?: InputSwitchComponent;
  @ViewChild('radioProgramaGestao', { static: false }) public radioProgramaGestao?: InputSwitchComponent;
  @ViewChild('radioInteresseProgramaGestao', { static: false }) public radioInteresseProgramaGestao?: InputSwitchComponent;
  @ViewChild('radioInteresseRemocao', { static: false }) public radioInteresseRemocao?: InputSwitchComponent;
  @ViewChild('radioViajemNacional', { static: false }) public radioViajemNacional?: InputSwitchComponent;
  @ViewChild('radioViajemInternacional', { static: false }) public radioViajemInternacional?: InputSwitchComponent;
  @ViewChild('escolhaRadioProgramaGestao', { static: false }) public escolhaRadioProgramaGestao?: InputRadioComponent;
  @ViewChild('escolhaInteresseProgramaGestao', { static: false }) public escolhaInteresseProgramaGestao?: InputRadioComponent;
  @ViewChild('funcao', { static: false }) public funcao?: InputSelectComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('lotacaoAtual', { static: false }) public lotacaoAtual?: InputSearchComponent;
  @ViewChild('gruposEspecializados', { static: false }) public gruposEspecializados?: InputSelectComponent;
  @ViewChild('centroTreinamento', { static: false }) public centroTreinamento?: InputSelectComponent;
  @ViewChild('cargos', { static: false }) public cargos?: InputSearchComponent;
  @ViewChild('selecionaLotacao', { static: false }) public selecionaLotacao?: InputSearchComponent;
  @ViewChild('areaAtividadeExterna', { static: false }) public areaAtividadeExterna?: InputSearchComponent;
  @ViewChild('areaAtividadeExternaDocencia', { static: false }) public areaAtividadeExternaDocencia?: InputSearchComponent;
  @ViewChild('areaCursoInterno', { static: false }) public areaCursoInterno?: InputSearchComponent;
  @ViewChild('areaCursoExterno', { static: false }) public areaCursoExterno?: InputSearchComponent;
  @ViewChild('cursoDocenciaInterna', { static: false }) public cursoDocenciaInterna?: InputSearchComponent;
  @ViewChild('historicoCursoInterno', { static: false }) public historicoCursoInterno?: InputSelectComponent;
  @ViewChild('areaHistoricoCursoExterno', { static: false }) public areaHistoricoCursoExterno?: InputSearchComponent;
  @ViewChild('areaAtividadeInterna', { static: false }) public areaAtividadeInterna?: InputSearchComponent;
  @ViewChild('selectDocenciaInterna', { static: false }) public selectDocenciaInterna?: InputSelectComponent;
  @ViewChild('selectCursosInternos', { static: false }) public selectCursosInternos?: InputSelectComponent;
  @ViewChild('areaTematica', { static: false }) public areaTematica?: InputSearchComponent;
  @ViewChild('capacidadeTecnica', { static: false }) public capacidadeTecnica?: InputSelectComponent;
  
   
  public testeLookup: LookupItem[] = [{ 'key': 'key 1', 'value': 'value 1' }];
  public opcoesEscolha: LookupItem[] = [{ 'key': 1, 'value': 'Feito' }, { 'key': 0, 'value': 'Pretendo Fazer' }];
  public anos: LookupItem[] = [];
  public unidadesItems: LookupItem[] = [];
  public funcoesItems: LookupItem[] = [];
  public gruposItems: LookupItem[] = [];
  public centroTreinamentoItems: LookupItem[] = [];
  public cargosItems: LookupItem[] = [];
  public usuarioUnidade: LookupItem[] = [];
  public especifiqueHabilidades: LookupItem[] = [];
  public disciplinasItens: LookupItem[] = [];
  public disciplinasItens2: LookupItem[] = [];
  public cursosItens: LookupItem[] = [];
  public curriculumDao: CurriculumDaoService;
  public areaConhecimentoDao: AreaConhecimentoDaoService;
  public userDao: UsuarioDaoService;
  public lotacaoDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public funcaoDao: FuncaoDaoService;
  public centroTreinamentoDao: CentroTreinamentoDaoService;
  public grupoDao: GrupoEspecializadoDaoService;
  public cargoDao: CargoDaoService;
  public areaTematicaDao : AreaTematicaDaoService;
  public areaAtividadeExternaDao : AreaAtividadeExternaDaoService;
  public materiaDao : MateriaDaoService;
  public cursoDao : CursoDaoService;
  public areaExternaDao : AreaAtividadeExternaDaoService;
  public capacidadeTecnicaDao : CapacidadeTecnicaDaoService;
  public lookupService: LookupService;
  public unidadesArray?:any;
  public formHistoricoFuncaoGrid : FormGroup;
  public formHistoricoLotacaoGrid : FormGroup;
  public formHistoricoAtividadeExternaGrid : FormGroup;
  public formHistoricoAtividadeInternaGrid : FormGroup;
  public formHistoricoDocenciaExternaGrid : FormGroup;
  public formHistoricoDocenciaInternaGrid : FormGroup;
  public formHistoricoCursoExternoGrid : FormGroup;
  public formHistoricoCursoInternoGrid : FormGroup;
  public materiaWhere: any[] = [["id", "==", null]];
  public areaTematicaWhere: any[] = [["id", "==", null]];

  public curriculumID: string = "";
    
  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.join = ['historico_atividade_interna.capacidade_tecnica','historico_atividade_externa','historico_curso_interno.curso','historico_curso_externo','historico_docencia_interna',
    'historico_docencia_externa','historico_funcao','historico_lotacao.unidade', 'curriculum'];
    this.curriculumDao = injector.get<CurriculumDaoService>(CurriculumDaoService);
    this.userDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.lotacaoDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.centroTreinamentoDao = injector.get<CentroTreinamentoDaoService>(CentroTreinamentoDaoService);
    this.funcaoDao = injector.get<FuncaoDaoService>(FuncaoDaoService);
    this.grupoDao = injector.get<GrupoEspecializadoDaoService>(GrupoEspecializadoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.cargoDao = injector.get<CargoDaoService>(CargoDaoService);
    this.areaTematicaDao = injector.get<AreaTematicaDaoService>(AreaTematicaDaoService);
    this.areaAtividadeExternaDao = injector.get<AreaAtividadeExternaDaoService>(AreaAtividadeExternaDaoService);
    this.materiaDao = injector.get<MateriaDaoService>(MateriaDaoService);
    this.areaConhecimentoDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.areaExternaDao = injector.get<AreaAtividadeExternaDaoService>(AreaAtividadeExternaDaoService);
    this.capacidadeTecnicaDao = injector.get<CapacidadeTecnicaDaoService>(CapacidadeTecnicaDaoService);
    this.lookupService = injector.get<LookupService>(LookupService);
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
      
      inputEspecifiqueHabilidade: { default:"" },
      
      especifique_habilidades: { default: [] },
      historicoFuncao: { default: [] },
      historicoLotacao: { default: [] },
      historicoAtividadeExterna: { default: [] },
      historicoAtividadeInterna: { default: [] },
      historicoDocenciaExterna: { default: [] },
      historicoDocenciaInterna: { default: [] },
      historicoCursoInterno: { default: [] },
      historicoCursoExterno: { default: [] },
      
      ano_ingresso: { default: false },
      telefone: { default: "" },
      lotacao_atual: { default: "" },
      selecionaLotacao: { default: "" },
      viagem_nacional: { default: false },
      viagem_internacional: { default: false },
      interesse_bnt: { default: false },
      remocao: { default: false },
      pgd_inserido: { default : "" },
      pgd_interesse: { default : "" },
      escolhaInteresseProgramaGestao: { default: "" },
      escolhaRadioProgramaGestao: { default: "" },

      centro_treinamento_id: { default: "" },
      cargo_id: { default: "" },
      grupo_especializado_id: { default: "" },
   
      
    }, this.cdRef, this.validate);

  
    this.formHistoricoFuncaoGrid = this.fh.FormBuilder({
      funcao_id: { default: "" },
    }, this.cdRef, this.validate);
    
    this.formHistoricoLotacaoGrid = this.fh.FormBuilder({
      unidade_id: { default: "" },
    }, this.cdRef, this.validate);

    this.formHistoricoAtividadeExternaGrid = this.fh.FormBuilder({
      area_atividade_externa_id: { default: "" },
    }, this.cdRef, this.validate);

    this.formHistoricoAtividadeInternaGrid = this.fh.FormBuilder({
      areaAtividadeInterna: { default:"" },
      inputAtividadeInterna: { default:"" },
      area_tematica_id: { default: "" },
      capacidade_tecnica_id: { default: "" },
      atividade_desempenhada: { default: ""}
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
  
  ngOnInit(): void {
      for (let i = 1980; i <= (new Date()).getFullYear(); i++) {
        this.anos.push(Object.assign({}, { key: i, value: (i.toString()) }));
      }
      
      const userUnidade = this.auth.unidade;
      console.log('userUnidade',userUnidade)

      //this.cursoDao?.query({ where: [['nome', '==', 'Curso Institucional']]}).g().then((municipios) => {
       // this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      //});
 
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    return result;
  }

  public async loadData(entity: CurriculumProfissional, form: FormGroup) {
    let lookups = await this.curriculumDao.lookupsCurriculum();
    this.unidadesItems = lookups.unidades;
    this.funcoesItems = lookups.funcoes;
    this.gruposItems = lookups.grupos;
    this.centroTreinamentoItems = lookups.ct;
    this.cargosItems = lookups.cargos;
    this.lotacaoAtual!.loadSearch(this.auth.lotacao);
    //let institucional_id = await this.cursoDao.idInstitucional();
    this.materiaDao?.query({ where: [[]], orderBy: [['nome', 'asc']] }).getAll().then((materias) => {
      this.disciplinasItens2 = materias.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });  
    this.cursoDao?.query({ where: [['titulo', '==', 'INSTITUCIONAL']], orderBy: [['nome', 'asc']] }).getAll().then((materias) => {
        this.cursosItens = materias.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });
  }

  public async initializeData(form: FormGroup) {
    return await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<CurriculumProfissional> {
    
    const curriculuns = await this.curriculumDao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id] }).asPromise();
        
    return new Promise<CurriculumProfissional>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculumProfissional = this.util.fill(new CurriculumProfissional(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculumProfissional = this.util.fillForm(curriculumProfissional, this.form!.value);
      curriculumProfissional.curriculum_id = curriculuns[0].id;
      curriculumProfissional.viagem_nacional = (this.form?.controls.viagem_nacional.value ? 1 : 0);
      curriculumProfissional.viagem_internacional = (this.form?.controls.viagem_internacional.value ? 1 : 0);
      curriculumProfissional.interesse_bnt = (this.form?.controls.interesse_bnt.value ? 1 : 0);
      curriculumProfissional.remocao = (this.form?.controls.remocao.value ? 1 : 0);
      //curriculumProfissional.usuario_id = this.auth.usuario?.id;
      curriculumProfissional.historicoAtividadeInterna = this.form!.controls.historicoAtividadeInterna.value.filter((x: HistoricoAtividadeInternaCurriculum) => x._status?.length);
      curriculumProfissional.historicoAtividadeExterna = this.form!.controls.historicoAtividadeExterna.value.filter((x: HistoricoAtividadeExternaCurriculum) => x._status?.length);
      curriculumProfissional.historicoCursoInterno = this.form!.controls.historicoCursoInterno.value.filter((x: HistoricoCursoInternoCurriculum) => x._status?.length);
      curriculumProfissional.historicoCursoExterno = this.form!.controls.historicoCursoExterno.value.filter((x: HistoricoCursoExternoCurriculum) => x._status?.length);
      curriculumProfissional.historicoDocenciaInterna = this.form!.controls.historicoDocenciaInterna.value.filter((x: HistoricoDocenciaInternaCurriculum) => x._status?.length);
      curriculumProfissional.historicoDocenciaExterna = this.form!.controls.historicoDocenciaExterna.value.filter((x: HistoricoDocenciaExternaCurriculum) => x._status?.length);
      curriculumProfissional.historicoFuncao = this.form!.controls.historicoFuncao.value.filter((x: HistoricoFuncaoCurriculum) => x._status?.length);
      curriculumProfissional.historicoLotacao = this.form!.controls.historicoLotacao.value.filter((x: HistoricoLotacaoCurriculum) => x._status?.length);
   
      //(this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => curriculumProfissional.idiomas.push(element.data));
      resolve(curriculumProfissional);  
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
    
  };

  /*public onAreaConhecimentoChange() {
    this.cursoDao?.query({ where: [['area_id', '==', this.formCursoInterno!.controls.areaCursoInterno.value]] }).getAll().then((cursos2) => {
      this.disciplinasItens = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });
  }*/

  public onChangeEscolhePG(){
    this.escolhaRadioProgramaGestao?.setValue("");
  }


  public onChangeEscolheInteressePG(){
    this.escolhaInteresseProgramaGestao?.setValue("");
  }

  public onAddClick() { }

  async ngOnInitit(){

    const curriculuns = await this.dao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id], join: this.join }).asPromise();
    
    if(curriculuns?.length){
      let entity = curriculuns![0];
    }else{
      this.dialog.confirm("Preencher dados pessoais", "É necessário preencher dados pessoais");
    }
    
    this.lotacaoAtual?.setValue(this.auth.unidade?.id)

  }

  //GRID FUNCAO

  public async addHistoricoFuncao() { 
    return new HistoricoFuncaoCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoFuncao(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      console.log('ROW',row)
      let values = form.value;
      /*row.pretensao = values.pretensao;
      row.curso_id = values.curso_id;*/
      row.funcao = this.funcao?.selectedItem?.data;
      row.funcao_id = values.funcao_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoFuncao(form: FormGroup, row: HistoricoFuncaoCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    //this.area?.setValue(row.curso?.area_id)
    this.formHistoricoFuncaoGrid!.controls.funcao_id.setValue(row.funcao?.id);
   
  }
  
  public async removeHistoricoFuncao(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }


//GRID LOTACAO
   public async addHistoricoLotacao() { 
    return new HistoricoLotacaoCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoLotacao(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     // row.unidade = this.unidade!.loadSearch(row.unidade_id);
      row.unidade = this.unidade!.selectedItem;
      row.unidade_id = values.unidade_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoLotacao(form: FormGroup, row: HistoricoLotacaoCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoLotacaoGrid!.controls.unidade_id.setValue(row.unidade_id);
  }
  
  public async removeHistoricoLotacao(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  // GRID ATIVIDADE EXTERNA

  public async addHistoricoAtividadeExterna() { 
    return new HistoricoAtividadeExternaCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoAtividadeExterna(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.areaAtividadeExterna = this.areaAtividadeExterna!.selectedItem;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoAtividadeExterna(form: FormGroup, row: HistoricoAtividadeExternaCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoAtividadeExternaGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
  }
  
  public async removeHistoricoAtividadeExterna(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  // GRID ATIVIDADE Interna

  public async addHistoricoAtividadeInterna() { 
    return new HistoricoAtividadeInternaCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoAtividadeInterna(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.areaTematica = this.areaTematica!.selectedItem;
      row.area_tematica_id = values.area_tematica_id;
      row.capacidadeTecnica = this.capacidadeTecnica?.selectedItem;
      row.capacidade_tecnica_id = values.capacidade_tecnica_id;
      row.atividade_desempenhada = values.atividade_desempenhada;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoAtividadeInterna(form: FormGroup, row: HistoricoAtividadeInternaCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoAtividadeInternaGrid!.controls.area_tematica_id.setValue(row.area_tematica_id);
    this.formHistoricoAtividadeInternaGrid!.controls.capacidade_tecnica_id.setValue(row.capacidade_tecnica_id);
    this.formHistoricoAtividadeInternaGrid!.controls.atividade_desempenhada.setValue(row.atividade_desempenhada);
  }
  
  public async removeHistoricoAtividadeInterna(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  // GRID Docencia Externa

  public async addHistoricoDocenciaExterna() { 
    return new HistoricoDocenciaExternaCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoDocenciaExterna(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.areaAtividadeExternaDocencia = this.areaAtividadeExternaDocencia!.selectedItem;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoDocenciaExterna(form: FormGroup, row: HistoricoDocenciaExternaCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoDocenciaExternaGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id );
    
  }
  
  public async removeHistoricoDocenciaExterna(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  // GRID Docencia Interna

  public async addHistoricoDocenciaInterna() { 
    return new HistoricoDocenciaInternaCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoDocenciaInterna(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.cursoDocenciaInterna = this.cursoDocenciaInterna?.selectedItem;
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
     
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoDocenciaInterna(form: FormGroup, row: HistoricoDocenciaInternaCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoDocenciaInternaGrid!.controls.curso_id.setValue(row.curso_id);
    
  }
  
  public async removeHistoricoDocenciaInterna(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  public addItemHabilidades(): LookupItem | undefined {
    let result = undefined;
    const habilidades = this.form!.controls.inputEspecifiqueHabilidade.value;
    const key = this.util.textHash(habilidades);
    const especifiqueHabilidades = { 'key' : key , 'value' : habilidades };
    
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
    return new HistoricoCursoInternoCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoCursoInterno(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.historicoCursoInterno = this.historicoCursoInterno!.selectedItem;
      row.curso_id = values.curso_id;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoCursoInterno(form: FormGroup, row: HistoricoCursoInternoCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoCursoInternoGrid!.controls.curso_id.setValue(row.curso_id);
    this.formHistoricoCursoInternoGrid!.controls.pretensao.setValue(row.pretensao);
    
  }
  
  public async removeHistoricoCursoInterno(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

   // GRID Curso Externo

   public async addHistoricoCursoExterno() { 
    return new HistoricoCursoExternoCurriculum({
      _status: "ADD"
      
    }) as IIndexable;
  }
  
  public saveHistoricoCursoExterno(form: FormGroup, row: any){ 
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      console.log('VALUES',values)
      console.log('ROW',row)
     /*row.unidade = this.unidade!.loadSearch(row.unidade_id);*/
      row.areaHistoricoCursoExterno = this.areaHistoricoCursoExterno!.selectedItem;
      row.area_atividade_externa_id = values.area_atividade_externa_id;
      row.nome = values.nome;
      row.pretensao = values.pretensao;
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }
  
  public async loadHistoricoCursoExterno(form: FormGroup, row: HistoricoCursoExternoCurriculum){
    
    //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
    /*this.area?.setValue(row.curso?.area_id)*/
    this.formHistoricoCursoExternoGrid!.controls.area_atividade_externa_id.setValue(row.area_atividade_externa_id);
    this.formHistoricoCursoExternoGrid!.controls.pretensao.setValue(row.pretensao);
    this.formHistoricoCursoExternoGrid!.controls.nome.setValue(row.nome);
  }
  
  public async removeHistoricoCursoExterno(row: any){ 
    if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
      
    }
    return undefined;
  }

  public onAreaAtividadeInternaChange(){
    this.areaTematicaWhere = [['area_tematica_id', '==', this.formHistoricoAtividadeInternaGrid!.controls.area_tematica_id.value]];
    this.cdRef.detectChanges();
  }


}

/* public addItemFuncao(): LookupItem | undefined {
    let result = undefined;
    let res = this.form!.value;
    console.log('addItemFuncao', res);
    const funcao = this.funcao?.selectedItem;
    const key = this.util.textHash(funcao!.key);
    console.log('addItemFuncao', ' - ', funcao,'-', key);
    if (funcao && this.util.validateLookupItem(this.form!.controls.historicoFuncao.value, key)) {// && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: funcao.value,
        data: { 
            _status: "ADD",
        }
      };
      this.form!.controls.funcao_id.setValue("");
    
    }
    return result;
  };

  public addItemLotacao(): LookupItem | undefined {
    let result = undefined;
    //this.funcoesItems = lotacao!.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    const lotacao = this.selecionaLotacao?.selectedEntity as Unidade;
    const key = lotacao?.id; 

    if (lotacao && this.util.validateLookupItem(this.form!.controls.historicoLotacao.value, key)) {// && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: lotacao.sigla + " - " + lotacao.nome,
        data: { 
          _status: "ADD",
        }
      };
      this.form!.controls.selecionaLotacao.setValue("");
    }
    return result;
  };

    
  public addItemAtividadeExterna(): LookupItem | undefined {
    let result = undefined;
    const area = this.areaAtividadeExterna?.selectedEntity as AreaTematica;
    const key = area?.id; 

    if (area && this.util.validateLookupItem(this.formAtividadeExterna!.controls.historicoAtividadeExterna.value, key)) {
      result = {
        key: key,
        value: area.nome,
        data: { 
          _status: "ADD",
        }
      };
      this.formAtividadeExterna!.controls.selectAreaAtividadeExterna.setValue("");
    }
    return result;
  };


  public addItemAtividadeInterna(): LookupItem | undefined {
    let result = undefined;
    //this.funcoesItems = lotacao!.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    const area = this.areaAtividadeInterna?.selectedEntity as AreaTematica;
    const atividade = this.formAtividadeInterna.controls.inputAtividadeInterna.value;
    const key = this.util.textHash(atividade);

    if (atividade && this.util.validateLookupItem(this.formAtividadeInterna!.controls.historicoAtividadeInterna.value, key)) {// && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: area.nome + " - " + atividade,
        data: { 
          _status: "ADD",
        }
      };
      this.formAtividadeInterna!.controls.inputAtividadeInterna.setValue("");
      this.formAtividadeInterna!.controls.areaAtividadeInterna.setValue("");
    }
    return result;
  };

  public addItemDocenciaExterna(): LookupItem | undefined {
    let result = undefined;
    const docencia = this.formDocenciaExterna!.controls.inputDocenciaFora.value;
    const key = this.util.textHash(docencia);
    const docencias = { 'key' : key , 'value' : docencia };
    
    if (docencias && this.util.validateLookupItem(this.formDocenciaExterna!.controls.historicoDocenciaExterna.value, key)) {
      result = {
        key: key,
        value: docencia,
        data: { 
          _status: "ADD",
        }
      };
      this.formDocenciaExterna!.controls.inputDocenciaExterna.setValue("");
    }
    return result;
  };

  public addItemDocenciaInterna(): LookupItem | undefined {
    let result = undefined;
    const docencia = this.selectDocenciaInterna?.selectedItem;
    console.log('DOCENCIA',docencia)
    const key = this.formDocenciaInterna!.controls.selectDocenciaInterna.value;
    const docencias = { 'key' : docencia?.key , 'value' : docencia?.value };
    
    if (docencias && this.util.validateLookupItem(this.formDocenciaInterna!.controls.historicoDocenciaInterna.value, key)) {
      result = {
        key: docencia!.key,
        value: docencia!.value,
        data: { 
          _status: "ADD",
        }
      };
      this.formDocenciaInterna!.controls.selectDocenciaInterna.setValue("");
    }
    return result;
  };

 

  public addItemCursoExterno(): LookupItem | undefined {
    let result = undefined;
    const areaCurso = this.areaCursoExterno?.selectedEntity as AreaAtividadeExterna;
    const curso = this.formCursoExterno.controls.inputCursosExternos.value;
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formCursoExterno!.controls.radioCursosExternos.value ? 1 : 0));//converte o value do switch
    const key = this.util.textHash(curso);
    
    if (areaCurso && curso && pretensao && this.util.validateLookupItem(this.formCursoExterno!.controls.historicoCursoExterno.value,key)) {
      result = {
        key: key,
        value: areaCurso.nome + ' - ' + curso + ' - ' + pretensao.value,
        data: {
          area: areaCurso.id,
          curso: curso,
          pretensao: pretensao.key,
          _status: "ADD",
        }
      };
      this.formCursoExterno!.controls.areaCursoExterno.setValue("");
      this.formCursoExterno!.controls.inputCursosExternos.setValue("");
    }
    return result;
  };

  public addItemCursoInterno(): LookupItem | undefined {
    let result = undefined;
    const areaCurso = this.areaCursoInterno?.selectedEntity as AreaConhecimento;
    const curso = this.selectCursosInternos?.selectedItem;
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formCursoInterno!.controls.radioCursosInternos.value ? 1 : 0));//converte o value do switch
    const key = curso?.key;
    
    if (areaCurso && curso && pretensao && this.util.validateLookupItem(this.formCursoInterno!.controls.historicoCursoInterno.value,key)) {
      result = {
        key: key,
        value: areaCurso.nome + ' - ' + curso.value + ' - ' + pretensao.value,
        data: {
          area: areaCurso.id,
          curso: curso.key,
          pretensao: pretensao.key,
          _status: "ADD",
        }
      };
      this.formCursoInterno!.controls.areaCursoInterno.setValue("");
      this.formCursoInterno!.controls.selectCursosInternos.setValue("");
    }
    return result;
  };*/