

import { Component, Injector, OnChanges, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { Curriculum } from 'src/app/models/currriculum.model';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { InputMultiselectComponent } from 'src/app/components/input/input-multiselect/input-multiselect.component';
import { CurriculumGraduacaoDaoService } from 'src/app/dao/curriculum-graduacao.service';
import { data } from 'jquery';
import { CurriculumGraduacao } from 'src/app/models/currriculum-graduacao.model';
import { UNKNOWN_ERROR_CODE } from '@angular/compiler-cli';
import { CurriculumIdioma } from 'src/app/models/curriculum-idioma.model';
import { forEachChild } from 'typescript';
import { TreeDragDropService } from 'primeng/api';
import { Indexable } from 'chartjs-plugin-datalabels/types/options';
import { InputNumberComponent } from 'src/app/components/input/input-number/input-number.component';

@Component({
  selector: 'curriculum-pessoal-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class CurriculumFormComponent extends PageFormBase<Curriculum, CurriculumDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("quantidade_filhos", { static: false }) public quantidade_filhos?: InputNumberComponent;
  @ViewChild("area", { static: false }) public area?: InputSearchComponent;
  @ViewChild("estados", { static: false }) public estadosV?: InputSelectComponent;
  //@ViewChild(InputSelectComponent, { static: false }) public titulo?: InputSelectComponent;
  @ViewChild("curso", { static: false }) public curso?: InputSelectComponent;
  @ViewChild("idiomas", { static: false }) public idiomasM?: InputMultiselectComponent;
  @ViewChild('municipio', { static: false }) public municipioV?: InputSelectComponent;
  
  public municipios: LookupItem[] = [];
  //public areasGraduacao: LookupItem[] = [];
  public cursos: LookupItem[] = [];
  public cursosPos: LookupItem[] = [];
  public cursosGradPos: LookupItem[] = [];
  // public grad : LookupItem[] = [];
  public opcoesEscolha: LookupItem[] = [{ 'key': 1, 'value': 'Pretendo Fazer' }, { 'key': 0, 'value': 'Finalizado' }];

  public cidadeDao: CidadeDaoService;
  public cursoDao?: CursoDaoService;
  public areaDao?: AreaConhecimentoDaoService;
  public curriculumGraduacaoDAO?: CurriculumGraduacaoDaoService;
  public formGraduacao?: FormGroup;
  public formIdiomaGrid?: FormGroup;
  public cursoWhere: any[] = [["id", "==", null]];
  public show : boolean =  true;

  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
    this.join = ['graduacoes.curso.area_conhecimento'];
    //super(injector,Curso, CursoDaoService)
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService)
    this.curriculumGraduacaoDAO = injector.get<CurriculumGraduacaoDaoService>(CurriculumGraduacaoDaoService)
     
    this.form = this.fh.FormBuilder({
        id : { default: "" },
        cidade_id: { default: "" },
        apresentacao: { default: "" },
        estados: { default: "" },
        telefone: { default: "" },
        estado_civil: { default: "" },
        filhos: { default: false },
        quantidade_filhos: { default: 0 },
        radioFalaIdioma: { default: false },
        idiomas: { default: [] },
        ativo: { default: true },
        graduacoes: { default: [] },
      }, this.cdRef, this.validate);
      this.formGraduacao = this.fh.FormBuilder({
        curso_id: { default: "" },
        area_conhecimento_id: { default: "" },
        pretensao: { default: 0 },
        titulo: { default: "" },
      }, this.cdRef, this.validate);
      this.formIdiomaGrid = this.fh.FormBuilder({
        idioma: { default: "" },
        idiomaFala: { default: "" },
        idiomaEscrita: { default: "" },
        idiomaEntendimento: { default: "" },
      }, this.cdRef, this.validate);
    }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    /*if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    }*/
    return result;
  }

  public async loadData(entity: Curriculum, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    const curriculuns = await this.dao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id], join: this.join }).asPromise();
    let entity = curriculuns?.length ? curriculuns[0] : new Curriculum();//this.entity
    curriculuns?.length ? (this.id = curriculuns[0].id) : (this.id = "");
    const cidade = entity.cidade_id != '' ? await this.cidadeDao?.getById(entity.cidade_id) : null;
    console.log('CIDADE',cidade)
    //this.form?.controls.estados.setValue(this.lookup.UF.find(x => x.key == 'AM'));//cidade.uf));
    let uf = this.lookup.getLookup(this.lookup.UF, cidade?.uf);
    this.form?.controls.estados.setValue(uf?.key);//cidade.uf));
    entity.quantidade_filhos > 0 ? this.form?.controls.filhos.setValue(true) : this.form?.controls.filhos.setValue(false);
    const municipio = this.lookup.UF.find(x => x.key == cidade?.uf);
    entity.idiomas.length > 0 ? this.form?.controls.radioFalaIdioma.setValue(true) : this.form?.controls.radioFalaIdioma.setValue(false);
    await this.loadData(entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Curriculum> {
    //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
    //console.log('FORMULARIO', this.form!.value)
    return new Promise<Curriculum>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      
      let curriculum = this.util.fill(new Curriculum(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum.id = this.id!;
     // curriculum.quantidade_filhos == "" ? (curriculum.quantidade_filhos = 0) : (curriculum.quantidade_filhos = 2);
          curriculum = this.util.fillForm(curriculum, this.form!.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      curriculum.cidade_id = "86297f92-d919-e12f-476d-6aff99c46809";
      //curriculum.graduacoes = this.formGraduacao!.controls.graduacoes.value.map((x: any) => Object.assign({},{curso_id:x.data.curso , pretensao:x.data.pretensao}));
      curriculum.graduacoes = this.form!.controls.graduacoes.value.filter((x: CurriculumGraduacao) => x._status?.length);
      
      resolve(curriculum);

    });
  }

  public onEstadosChange() {
    //console.log('onEstadosChange', this.form?.controls.estados)
    //const estados = this.estadosV!.value;
    this.show = false;
    const estados = this.form!.controls.estados.value;
    this.selecionaMunicipios(estados);
    //this.municipioV?.disabled;
  }

  public selecionaMunicipios(uf: string) {
    //console.log(uf)
    this.cidadeDao?.query({ where: [['uf', '==', uf]], orderBy: [['nome', 'asc']] }).getAll().then((municipios) => {
      this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });
    this.show = true;
  }


  public onAreaConhecimentoChange() {
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    this.cursoWhere = [['area_id', '==', this.formGraduacao!.controls.area_conhecimento_id.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
    this.cdRef.detectChanges();
   
  }

/**
 * Método chamado no salvamento de um integrante da unidade, seja este componente persistente ou não.
 * @param form 
 * @param row 
 * @returns 
 */

public async addIdiomas() {
  return new CurriculumIdioma() as IIndexable;
}

public async loadIdiomas(form: FormGroup, row: CurriculumIdioma) {
  this.formIdiomaGrid!.controls.idioma.setValue(row.idioma);
  this.formIdiomaGrid!.controls.idiomaFala.setValue(row.idiomaFala);
  this.formIdiomaGrid!.controls.idiomaEscrita.setValue(row.idiomaEscrita);
  this.formIdiomaGrid!.controls.idiomaEntendimento.setValue(row.idiomaEntendimento);
}

public async removeIdiomas(row: any) {
  if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
    return true;
  }
  return undefined;
}

public async saveIdiomas(form: FormGroup, row: any) {
  form?.markAllAsTouched();
  if (form?.valid) {
    let values = form.value;
    row.idioma = values.idioma;
    row.idiomaFala = values.idiomaFala;
    row.idiomaEscrita = values.idiomaEscrita;
    row.idiomaEntendimento = values.idiomaEntendimento;
    return row;
  }
  return undefined;
}

public async addGraduacao() { 
  return new CurriculumGraduacao({
    _status: "ADD"
  }) as IIndexable;
}

public saveGraduacao(form: FormGroup, row: any){ 
  form?.markAllAsTouched();
  if (form?.valid) {
    let values = form.value;
    row.pretensao = values.pretensao;
    row.curso_id = values.curso_id;
    row.curso = this.curso?.selectedItem?.data;
    row._status = row._status == "ADD" ? "ADD" : "EDIT";
    return row;
  }
  return undefined;
}

public async loadGraduacao(form: FormGroup, row: CurriculumGraduacao){
  
  //this.area?.loadSearch(row.curso?.area_conhecimento || row.curso?.area_id);
  this.area?.setValue(row.curso?.area_id)
  this.formGraduacao!.controls.area_conhecimento_id.setValue(row.curso?.area_id);
  this.formGraduacao!.controls.pretensao.setValue(row.pretensao);
  this.formGraduacao!.controls.titulo.setValue(row.curso?.titulo);
  this.formGraduacao!.controls.curso_id.setValue(row.curso_id);
 
}

public async removeGraduacao(row: any){ 
  if(await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
    row._status = "DEL";
    return true;
  }
  return undefined;
}

public qtdeFilhosOnChange(){
   if(this.form!.controls.quantidade_filhos?.value == ""){
      this.form!.controls.quantidade_filhos.setValue(0);
      this.form?.controls.filhos.setValue(false);
   }
}



  /*ngOnInit(): void {
    super.ngOnInit();
    /*this.action = "edit";
    this.id = this.auth.usuario?.id;* /
    /*this.dao?.query({ where: ['usuario_id', '==', this.auth.usuario?.id] }).getAll().then((user) => {
      //console.log('USER', user.map(x => x.id))
      if (!(user == null || user.length == 0)) {
        //console.log('VAZIO')
        const userID = (user.map(x => x.id)).toString()
        //console.log('USERID',userID)          
        this.form?.controls.id.setValue(userID)//.toString())))
      }
    });* /
  }*/
  

public togglePopOver() {}

  /*get stateName() {
    return this.show ? 'show' : 'hide'
  }


  public togglePopOver() {
    
    const pop = document.getElementById('divPop');
    //console.log(pop?.hidden)
    if (pop?.hidden){
      pop!.hidden=false;

    }else{
      pop!.hidden=true;
    }
    this.show = !this.show;
  }
    */
  
/*

  public addItemIdioma(): LookupItem | undefined {
    let result = undefined;
    let res = this.form!.value
    //console.log('addItemIdioma', res)
    const idioma = this.lookup.IDIOMAS.find(x => x.key == this.form!.controls.idioma.value)
    const escrita = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaEscrita.value);
    const fala = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaFala.value);
    const entende = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaEntendimento.value);
    const key = idioma?.key != "" ? this.util.textHash(idioma?.key) : null;
   // console.log('addItemIdioma', ' - ', idioma, ' - ', escrita, ' - ', fala, ' - ', entende, ' - ', key)
    if (idioma && escrita && fala && entende && this.util.validateLookupItem(this.form!.controls.idiomas.value, key)) {
      result = {
        key: key,
        value: idioma.value + ' - ' + escrita.value + ' - ' + fala.value + ' - ' + entende.value,
        data: {
          idioma: idioma.key,
          escrita: escrita.key,
          fala: fala.key,
          entende: entende.key
        }
      };
      this.form!.controls.idioma.setValue("");
      this.form!.controls.idiomaFala.setValue("");
      this.form!.controls.idiomaEscrita.setValue("");
      this.form!.controls.idiomaEntendimento.setValue("");
    }
    
    return result;
  };

  public addItemGraduacaoPos(): LookupItem | undefined {
    let result = undefined;
    const area = { 'key': this.formGraduacao!.controls.areaPos.value, 'value': this.area?.selectedItem?.text };
    const curso = this.curso!.selectedItem;//this.cursosGradPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    const pretensao = this.opcoesEscolha.find(value => value.key == (this.formGraduacao!.controls.pretensao.value ? 1 : 0));//converte o value do switch
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || ""));// + (pretensao?.key || ""));
    //console.log('AREA', area, 'AREA', curso, 'AREA', titulo, 'AREA', pretensao)
    if (curso && area && titulo && pretensao && this.util.validateLookupItem(this.formGraduacao!.controls.graduacaopos.value, key)) {
      result = {
        key: key,
        value: area.value + ' - ' + curso.value + ' - ' + titulo?.value + ' - ' + pretensao?.value,
        data: {
          id: this.dao?.generateUuid(),
          area: area.key,
          curso: curso.key,
          titulo: titulo?.key,
          pretensao: pretensao?.key,
          _status: "ADD"
        }
      };
      //console.log('FORMULARIOGRAD', this.formGraduacao!.value)
      this.formGraduacao!.controls.areaPos.setValue("");
      this.formGraduacao!.controls.cursoPos.setValue("");
      this.formGraduacao!.controls.titulo.setValue("");
      this.formGraduacao!.controls.pretensao.setValue(false);
    }
    
    return result;
  };

  public onAreaGraducaoPosChange() {
    this.cursoDao?.query({ where: [['area_curso_id', '==', this.formGraduacao!.controls.area_conhecimento.value], ['titulo', 'like', 'GRAD%']] }).getAll().then((cursos2) => {
      this.cursos = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });
  }*/
  

  /*public montaGraduacaoPos(cursoId : CurriculumGraduacao []){
    let result = undefined;
    let gard: any[] = [];
    cursoId.forEach(async curso1 => {
      const graduacao = await this.cursoDao?.getById(curso1.id, ['areaConhecimento','tipoCurso']);
      const area = { 'key': graduacao?.area_id, 'value': graduacao?.area_conhecimento?.nome };
      const curso = { 'key': graduacao?.id, 'value': graduacao?.nome } as LookupItem;
      const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == graduacao?.titulo);
      const pretensao = this.opcoesEscolha.find(value => value.key == curso1.pretensao);
      const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || ""));
      result = {
        key: key,
        value: area.value + ' - ' + curso!.value + ' - ' + titulo?.value + ' - ' + pretensao?.value,
        data: {
          id: this.dao?.generateUuid(),
          area: area.key,
          curso: curso!.key,
          titulo: titulo?.key,
          pretensao: pretensao?.key,
          _status: "EDIT"
        }
      };
     gard.push(result)
    });
    console.log('Gard', gard)
    //this.formGraduacao?.controls.graduacaopos.setValue(gard)
    return gard; 
  };*/

     
    /*this.form = this.fh.FormBuilder({
      id: { default: "" },
      usuario_id: { default: "" },
      cidade_id: { default: "" },
      apresentacao: { default: "" },
      estados: { default: "" },
      telefone: { default: "" },
      estado_civil: { default: "" },
      filhos: { default: false },
      quantidade_filhos: { default: 0 },
      radioFalaIdioma: { default: false },
      idioma: { default: "" },
      idiomaFala: { default: "" },
      idiomaEscrita: { default: "" },
      idiomaEntendimento: { default: "" },
      idiomas: { default: [] },
      ativo: { default: true },
      graduacoes: { default: [] },
    }, this.cdRef, this.validate);
    this.formGraduacao = this.fh.FormBuilder({
      curriculum_id: { default: "" },
      curso_id: { default: "" },
      area_conhecimento_id: { default: "" },
      curso: { default: "" },
      graduacao: { default: [] },
      pretensao: { default: 0 },
      areaPos: { default: "" },
      cursoPos: { default: "" },
      titulo: { default: "" },
      graduacaopos: { default: [] },
    }, this.cdRef, this.validate);
    this.formIdiomaGrid = this.fh.FormBuilder({
      idioma: { default: "" },
      idiomaFala: { default: "" },
      idiomaEscrita: { default: "" },
      idiomaEntendimento: { default: "" },
      idiomas: { default: [] },
    }, this.cdRef, this.validate);
  }*/

}