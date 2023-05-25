
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
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
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { Curriculum } from 'src/app/models/currriculum.model';


@Component({
  selector: 'curriculum-pessoal-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})

export class CurriculumFormComponent extends PageFormBase<Curriculum, CurriculumDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(InputSearchComponent, { static: false }) public area?: InputSearchComponent;
  @ViewChild(InputSearchComponent, { static: false }) public areaPos?: InputSearchComponent;
  @ViewChild(InputSelectComponent, { static: false }) public estados?: InputSelectComponent;
  @ViewChild(InputSelectComponent, { static: false }) public titulo?: InputSelectComponent;


  public municipios: LookupItem[] = [];
  //public areasGraduacao: LookupItem[] = [];
  public cursos: LookupItem[] = [];
  public cursosPos : LookupItem[] = [];
  public cursosGradPos : LookupItem[] = [];
 // public grad : LookupItem[] = [];
  public opcoesEscolha : LookupItem[]=[   {'key': 1 , 'value': 'Pretendo Fazer'},{'key': 0 , 'value': 'Finalizado'}];
 
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
    
    this.form = this.fh.FormBuilder({
      id:{default:""},
      usuario_id:{default:""},
      cidade_id:{default:""},
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
      idiomasM: { default: [] },
      idiomas:{default:[]},
      ativo:{ default: true },
    }, this.cdRef, this.validate);
    
    this.formGraduacao = this.fh.FormBuilder({
      curriculum_id:{default:""},
      curso_id:{default:""},
      area: { default: "" },
      curso: { default: "" },
      graduacao: { default: [] },
      pretensao: { default: false },
      areaPos: { default: "" },
      cursoPos: { default: "" },
      titulo:{ default: "" },
      graduacaopos: { default: [] },
     
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
    console.log('FORMULARIOGRAD',this.formGraduacao!.value)
    console.log('FORMULARIO',this.form!.value)
    return new Promise<Curriculum>((resolve, reject) => {
     // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new Curriculum(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum=this.util.fillForm(curriculum, this.form!.value);
      curriculum.usuario_id=this.auth.usuario?.id;
      (this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element  => curriculum.idiomas.push(element.data));
     // let graduacoes = this.util.fill(new CurriculumGraduacao(),)
      resolve(curriculum);
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  public onEstadosChange() {
    //console.log('onEstadosChange', this.form?.controls.estados)
    this.selecionaMunicipios(this.estados!.value)

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
    
    const area = { 'key': this.formGraduacao!.controls.area.value, 'value': this.area?.selectedItem?.text };
    const curso= this.cursos.find(value => value.key == this.formGraduacao!.controls.curso.value)
    const status=this.opcoesEscolha.find(value => value.key == (this.formGraduacao!.controls.pretensao.value ? 1 : 0))//converte o value do switch
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (status?.key || ""));

    if (curso && area && status && this.util.validateLookupItem(this.formGraduacao!.controls.graduacao.value, key)) {
      
      result = {
        key: key,
        value: area.value + ' - ' + curso.value + ' - ' + status?.value,
        data: {
          area: area.key,
          curso: curso.key,
          status:status?.key
        }
      };
      console.log('FORMGRAD->',this.formGraduacao!.value)
      this.formGraduacao!.controls.area.setValue("");
      this.formGraduacao!.controls.curso.setValue("");
      this.formGraduacao!.controls.pretensao.setValue(false);
    }
    return result;
  };

  public addItemGraduacaoPos(): LookupItem | undefined {
    let result = undefined;
    
    /*this.cursoDao?.query({where: [['id', '==', this.formGraduacao!.controls.curso.value]]}).getAll().then((curso2)=>{
        curso = curso2.map(x => Object.assign({},{key: x.id, value: x.nome_curso}) as LookupItem);
        console.log('CURSO DENTRO->',curso)
    })*/

    const area = { 'key': this.formGraduacao!.controls.areaPos.value, 'value': this.areaPos?.selectedItem?.text};
    
    const curso= this.cursosGradPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    const status=this.opcoesEscolha.find(value => value.key == (this.formGraduacao!.controls.pretensao.value ? 1 : 0))//converte o value do switch
    const key = this.util.textHash((area.key || "") + (curso?.key || "") + (titulo?.key || "") + (status?.key || ""));
    console.log('AREA',area,'AREA',curso,'AREA',titulo,'AREA',status)
    if (curso && area && titulo && status && this.util.validateLookupItem(this.formGraduacao!.controls.graduacaopos.value, key)) {
      
      result = {
        key: key,
        value: area.value + ' - ' + curso.value + ' - ' + titulo?.value + ' - ' + status?.value,
        data: {
          area: area.key,
          curso: curso.key,
          titulo:titulo?.key,
          status:status?.key
        }
      };
      console.log('FORMULARIOGRAD',this.formGraduacao!.value)
      this.formGraduacao!.controls.areaPos.setValue("");
      this.formGraduacao!.controls.cursoPos.setValue("");
      this.formGraduacao!.controls.titulo.setValue("");
      this.formGraduacao!.controls.pretensao.setValue(false);
    }
    return result;
  };

  public onAreaGraducaoPosChange(){
    
    this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.area.value], ['titulo', 'like', 'GRAD%']]}).getAll().then((cursos2) => {
      this.cursos = cursos2.map(x => Object.assign({},{key: x.id, value: x.nome}) as LookupItem);
      this.cdRef.detectChanges();
    });
  }
  
  public onAreaPosGraduacaoChange(){
   
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    // this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value && 'titulo','==',titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC","GRAD_LIC","ESPECIAL","MESTRADO","DOUTORADO","POS_DOUTORADO"]]]}).getAll().then((cursos3) => {
    this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value],['titulo','==',titulo?.key],['titulo', 'in', ["GRAD_TEC", "GRAD_BAC","GRAD_LIC","ESPECIAL","MESTRADO","DOUTORADO","POS_DOUTORADO"]]]}).getAll().then((cursos3) => {
      this.cursosGradPos = cursos3.map(x => Object.assign({},{key: x.id, value: x.nome}) as LookupItem);
      this.cdRef.detectChanges();
    });
 
  }

  ngOnInit(): void {

    this.dao?.query({where: ['usuario_id', '==', this.auth.usuario?.id]}).getAll().then((user) => {
      console.log('USER',user.map(x=>x.id))
      if(!(user == null || user.length == 0 )){
        //console.log('VAZIO')
        const userID=(user.map(x=>x.id)).toString()
        //console.log('USERID',userID)          
        this.form?.controls.id.setValue(userID)//.toString())))
      }
    });

  
  }

  public onAddClick(){

  }
  
}
