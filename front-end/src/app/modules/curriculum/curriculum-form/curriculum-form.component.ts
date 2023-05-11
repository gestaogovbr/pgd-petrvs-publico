
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { Cidade } from 'src/app/models/cidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { Curriculum } from 'src/app/models/currriculum.model';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';

@Component({
  selector: 'curriculum-pessoal-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})




export class CurriculumFormComponent extends PageFormBase<Curriculum, CurriculumDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(InputSearchComponent, { static: false }) public area?: InputSearchComponent;
  @ViewChild(InputSearchComponent, { static: false }) public areaPos?: InputSearchComponent;

  public municipios: LookupItem[] = [];
  public areasGraduacao: LookupItem[] = [];
  //public graduacaoArea: LookupItem[] = [{ 'key': 'EXATAS', 'value': 'Exatas' }, { 'key': 'HUMANAS', 'value': 'Humanas' }, { 'key': 'BIOLOGIA', 'value': 'Biologica' }];//{'key':1,'value':'Exatas'},{'key':2,'value':'Humanas'},{'key':3,'value':'Biologica'}];
  public graduacaoCurso: LookupItem[] = [{ 'key': 'C_EXATAS', 'value': 'Curso de exatas 1' }, { 'key': "C_EXATAS", 'value': 'Curso de exatas 2' },
  { 'key': "C_HUMANAS", 'value': 'Curso de Humanas 1' }, { 'key':"C_HUMANAS", 'value': 'Curso de Humanas 2' },
  { 'key':"C_BIOLOGICAS", 'value': 'Curso de Biologicas 1' }, { 'key': "C_BIOLOGICAS", 'value': 'Curso de Biologicas 2' }];
  public cursos: LookupItem[] = [];
  public cursosPos : LookupItem[] = [];
  public grad : LookupItem[] = [];
  
 
  public cidadeDao: CidadeDaoService;
  public cursoDao?: CursoDaoService;
  public areaDao?: AreaConhecimentoDaoService;
  public formGraduacao?: FormGroup;

  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
    //super(injector,Curso, CursoDaoService)
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService)
            
    console.log(this.areaDao)
    
    this.form = this.fh.FormBuilder({
      apresentese: { default: "" },
      estados: { default: "" },
      municipios: { default: "" },
      telefone: { default: "" },
      estadoCivil: { default: "" },
      radioFilhos: { default: false },
      qtsFilhos: { default: 0 },
      radioFalaIdioma: { default: false },
      idioma: { default: "" },
      idiomaFala: { default: "" },
      idiomaEscrita: { default: "" },
      idiomaEntendimento: { default: "" },
      idiomasM: { default: [] },
    }, this.cdRef, this.validate);
    
    this.formGraduacao = this.fh.FormBuilder({
      radioGraduacao: { default: false },
      radioPretendeGraduacao: { default: false},
      area: { default: "" },
      curso: { default: "" },
      graduacao: { default: [] },
      radioPosGraduacao: { default: false },
      radioPretendePosGraduacao: { default: false },
      areaPos: { default: "" },
      cursoPos: { default: "" },
      titulo:{ default: "" },
      posgraduacao: { default: [] },
      /*radioMestrado: { default: false },
      radioPretendeMestrado: { default: false },
      areaMestrado: { default: "" },
      cursoMestrado: { default: "" },
      mestrado: { default: [] },
      radioDoutorado: { default: false },
      radioPretendeDoutorado: { default: false },
      areaDoutorado: { default: "" },
      cursoDoutorado: { default: "" },
      doutorado: { default: [] },
      radioPosDoutorado: { default: false },
      radioPretendePosDoutorado: { default: false },
      areaPosDoutorado: { default: "" },
      cursoPosDoutorado: { default: "" },
      posdoutorado: { default: [] },*/

    }, this.cdRef, this.validate)

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

  public loadData(entity: Curriculum, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Curriculum());
  }

  public saveData(form: IIndexable): Promise<Curriculum> {

    return new Promise<Curriculum>((resolve, reject) => {
      const curriculum = this.util.fill(new Curriculum(), this.entity!);
      resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  public onEstadosChange() {
    console.log('onEstadosChange', this.form?.controls.estados)
    this.selecionaMunicipios(this.form?.controls.estados.value)

  }

  public selecionaMunicipios(uf: string) {
    //console.log(uf)
    this.cidadeDao?.query({ where: [['uf', '==', uf]], orderBy: [['nome', 'asc']] }).getAll().then((municipios) => {
      this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });

  }


  public addItemIdioma(): LookupItem | undefined {
    let result = undefined;
    //console.log('addItemGraduacao',this.formGraduacao!.value)
    let res=this.form!.value
    console.log('addItemIdioma',res)
    const idioma =this.lookup.IDIOMAS.find(x => x.key == this.form!.controls.idioma.value)
   
    const escrita = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaEscrita.value)//this.form!.controls.idiomaEscrita.value;
    const fala = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaFala.value)//this.form!.controls.idiomaFala.value;
    const entende= this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form!.controls.idiomaEntendimento.value)//idiomaFalathis.form!.controls.idiomaEntendimento.value;
    const key =this.util.textHash(idioma?.key);
    console.log('addItemIdioma',' - ',idioma,' - ',escrita,' - ',fala,' - ',entende,' - ',key)
    if (idioma && escrita && fala && entende && this.util.validateLookupItem(this.form!.controls.idiomasM.value,key)) {// && this.util.validateLookupItem(key,value)) {
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

  public addItemGraduacao(): LookupItem | undefined {
    let result = undefined;
    
    /*this.cursoDao?.query({where: [['id', '==', this.formGraduacao!.controls.curso.value]]}).getAll().then((curso2)=>{
        curso = curso2.map(x => Object.assign({},{key: x.id, value: x.nome_curso}) as LookupItem);
        console.log('CURSO DENTRO->',curso)
    })*/

    const area = { 'key': this.formGraduacao!.controls.curso.value, 'value': this.area?.selectedItem?.text };
    console.log('AREA->',area)
    const curso= this.cursos.find(value => value.key == this.formGraduacao!.controls.curso.value)
    const key = this.util.textHash((area.key || "") + (curso?.key || ""));

    if (curso && area && this.util.validateLookupItem(this.formGraduacao!.controls.graduacao.value, key)) {
      
      result = {
        key: key,
        value: area.value + ' - ' + curso.value,
        data: {
          area: area.key,
          curso: curso.key//.key 
        }
      };
      
      this.formGraduacao!.controls.area.setValue("");
      this.formGraduacao!.controls.curso.setValue("");
    }
    return result;
  };

  public addItemPosGraduacao(): LookupItem | undefined {
    let result = undefined;
    
    /*this.cursoDao?.query({where: [['id', '==', this.formGraduacao!.controls.curso.value]]}).getAll().then((curso2)=>{
        curso = curso2.map(x => Object.assign({},{key: x.id, value: x.nome_curso}) as LookupItem);
        console.log('CURSO DENTRO->',curso)
    })*/

    const area = { 'key': this.formGraduacao!.controls.areaPos.value, 'value': this.areaPos?.selectedItem?.text };
    const curso= this.cursosPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
    const titulo = this.lookup.POS_GRADUACOES.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || ""));
   
    if (curso && area && this.util.validateLookupItem(this.formGraduacao!.controls.posgraduacao.value, key)) {
      
      result = {
        key: key,
        value: area.value + ' - ' + curso.value + ' - ' + titulo?.value,
        data: {
          area: area.key,
          curso: curso.key,
          titulo:titulo?.key
        }
      };
      
      this.formGraduacao!.controls.areaPos.setValue("");
      this.formGraduacao!.controls.cursoPos.setValue("");
      this.formGraduacao!.controls.titulo.setValue("");
    }
    return result;
  };

  /*public setValueradioPretendePosGraduacao(){
    this.formGraduacao!.controls.radioPretendePosGraduacao.setValue(0);
    this.cdRef.detectChanges()
  }*/

  public onAreaGraducaoChange(){
    
    this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.area.value], ['titulo', 'like', 'GRAD%']]}).getAll().then((cursos2) => {
      console.log('CURSOS2->',cursos2)
      this.cursos = cursos2.map(x => Object.assign({},{key: x.id, value: x.nome}) as LookupItem);
      //console.log('onAreaGraducaoChange->',this.cursos2)
      this.cdRef.detectChanges();
    });
  }
  
  public onAreaPosGraducaoChange(){
    
    this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value], ['titulo', 'in', ["ESPECIAL", "MESTRADO","DOUTORADO","POS_DOUTORADO"]]]}).getAll().then((cursos3) => {
      console.log('CURSOSPOS2->',cursos3)
      this.cursosPos = cursos3.map(x => Object.assign({},{key: x.id, value: x.nome}) as LookupItem);
      //console.log('onAreaGraducaoChange->',this.cursos2)
      this.cdRef.detectChanges();
    });
 
  }
}
