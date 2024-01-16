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
  @ViewChild('unidades', { static: false }) public unidades?: InputSearchComponent;
  @ViewChild('lotacaoAtual', { static: false }) public lotacaoAtual?: InputSearchComponent;
  @ViewChild('gruposEspecializados', { static: false }) public gruposEspecializados?: InputSelectComponent;
  @ViewChild('centroTreinamento', { static: false }) public centroTreinamento?: InputSelectComponent;
  @ViewChild('cargos', { static: false }) public cargos?: InputSearchComponent;
  @ViewChild('selecionaLotacao', { static: false }) public selecionaLotacao?: InputSearchComponent;
  @ViewChild('selectAreaAtividadeExterna', { static: false }) public selectAreaAtividadeExterna?: InputSearchComponent;
  @ViewChild('areaCursoInterno', { static: false }) public areaCursoInterno?: InputSearchComponent;
  @ViewChild('areaCursoExterno', { static: false }) public areaCursoExterno?: InputSearchComponent;
  @ViewChild('areaAtividadeInterna', { static: false }) public areaAtividadeInterna?: InputSearchComponent;
  @ViewChild('selectDocenciaInterna', { static: false }) public selectDocenciaInterna?: InputSelectComponent;
  @ViewChild('selectCursosInternos', { static: false }) public selectCursosInternos?: InputSelectComponent;
 
   
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
  public lookupService: LookupService;
  public unidadesArray?:any;
  public formAtividadeExterna : FormGroup;
  public formAtividadeInterna : FormGroup;
  public formDocenciaExterna : FormGroup;
  public formDocenciaInterna : FormGroup;
  public formCursoExterno : FormGroup;
  public formCursoInterno : FormGroup;
  public materiaWhere: any[] = [["id", "==", null]];
  
  constructor(public injector: Injector) {
    super(injector, CurriculumProfissional, CurriculumProfissionalDaoService);
    this.join = ['historico_atividade_interna','historicoAtividadeExterna','historicoCursoInterno','historicoCursoExterno','historicoDocenciaInterna',
    'historicoDocenciaExterna','historicoFuncao','historicoLotacao', 'curriculum'];
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
    this.lookupService = injector.get<LookupService>(LookupService);
    this.form = this.fh.FormBuilder({
      radioProgramaGestao: { default: false },
      radioInteresseProgramaGestao: { default: false },
      radioInteresseBNT: { default: false },
      radioInteresseRemocao: { default: false },
      radioViajemNacional: { default: false },
      radioViajemInternacional: { default: false },
      ano_ingresso: { default: false },
      telefone: { default: "" },
      lotacao_atual: { default: "" },

      centro_treinamento_id: { default: false },
      cargo_id: { default: "" },
      funcao_id: { default: "" },
      grupo_especializado_id: { default: "" },
      lotacao_id: { default: "" },

      especifique_habilidades: { default: [] },
      historicoFuncao: { default: [] },
      historicoLotacao: { default: [] },
      
      inputEspecifiqueHabilidade: { default:"" },
      selecionaLotacao: { default: "" },
      
      escolhaInteresseProgramaGestao: { default: "" },
      escolhaRadioProgramaGestao: { default: "" },      
    }, this.cdRef, this.validate);

    this.formAtividadeExterna = this.fh.FormBuilder({
      radioAtividadeExterna: { default: false },
      historicoAtividadeExterna: { default: [] },
      selectAreaAtividadeExterna: { default:"" },
    }, this.cdRef, this.validate);

    this.formAtividadeInterna = this.fh.FormBuilder({
      radioAtividadeInterna: { default: false },
      historicoAtividadeInterna: { default: [] },
      areaAtividadeInterna: { default:"" },
      inputAtividadeInterna: { default:"" },
    }, this.cdRef, this.validate);

    this.formDocenciaExterna = this.fh.FormBuilder({
      radioDocenciaExterna: { default: false },
      docenciaExterna: { default: [] },
      inputDocenciaExterna: { default:"" },
      
    }, this.cdRef, this.validate);

    this.formDocenciaInterna = this.fh.FormBuilder({
      radioDocenciaInterna: { default: false },
      historicoDocenciaInterna: { default: [] },
      selectDocenciaInterna: { default:"" },
    }, this.cdRef, this.validate);

    this.formCursoInterno = this.fh.FormBuilder({
      radioCursosInternos: { default: false },
      historicoCursoInterno: { default: [] },
      areaCursoInterno: { default:"" },
      selectCursosInternos: { default:"" },
    }, this.cdRef, this.validate);

    this.formCursoExterno = this.fh.FormBuilder({
      radioCursosExternos: { default: false },
      historicoCursoExterno: { default: [] },
      areaCursoExterno: { default:"" },
      inputCursosExternos: { default:"" },
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
    
    return new Promise<CurriculumProfissional>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculumProfissional = this.util.fill(new CurriculumProfissional(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculumProfissional = this.util.fillForm(curriculumProfissional, this.form!.value);
      curriculumProfissional.id = curriculumProfissional.curriculum.id;
      curriculumProfissional.usuario_id = this.auth.usuario?.id;
      curriculumProfissional.historicoAtividadeInterna = this.form!.controls.historicoAtividadeInterna.value.filter((x: HistoricoAtividadeInternaCurriculum) => x._status?.length);
      //(this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => curriculumProfissional.idiomas.push(element.data));
      resolve(curriculumProfissional);  
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
    
  };

  public addItemFuncao(): LookupItem | undefined {
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

  public addItemAtividadeExterna(): LookupItem | undefined {
    let result = undefined;
    const area = this.selectAreaAtividadeExterna?.selectedEntity as AreaTematica;
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

  public onAreaConhecimentoChange() {
    this.cursoDao?.query({ where: [['area_id', '==', this.formCursoInterno!.controls.areaCursoInterno.value]] }).getAll().then((cursos2) => {
      this.disciplinasItens = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });
  }

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
  };



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


  }

}
