
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Cidade } from 'src/app/models/cidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupService, LookupItem } from 'src/app/services/lookup.service';


@Component({
  selector: 'app-raiox-pessoal-form',
  templateUrl: './raiox-pessoal-form.component.html',
  styleUrls: ['./raiox-pessoal-form.component.scss']
})




export class RaioxPessoalFormComponent extends PageFormBase<Cidade, CidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public municipios: LookupItem[] = [];
  public areasGraduacao: LookupItem[] = [];
  //public graduacaoArea: LookupItem[] = [{ 'key': 'EXATAS', 'value': 'Exatas' }, { 'key': 'HUMANAS', 'value': 'Humanas' }, { 'key': 'BIOLOGIA', 'value': 'Biologica' }];//{'key':1,'value':'Exatas'},{'key':2,'value':'Humanas'},{'key':3,'value':'Biologica'}];
  public graduacaoCurso: LookupItem[] = [{ 'key': 'C_EXATAS', 'value': 'Curso de exatas 1' }, { 'key': "C_EXATAS", 'value': 'Curso de exatas 2' },
  { 'key': "C_HUMANAS", 'value': 'Curso de Humanas 1' }, { 'key':"C_HUMANAS", 'value': 'Curso de Humanas 2' },
  { 'key':"C_BIOLOGICAS", 'value': 'Curso de Biologicas 1' }, { 'key': "C_BIOLOGICAS", 'value': 'Curso de Biologicas 2' }];
  public cursos: LookupItem[] = [];

  public cidadeDao: CidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Cidade, CidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
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
      radioGraduacao: { default: false },
      radioPretendeGraduacao: { default: false },
      area: { default: "" },
      curso: { default: "" },
      graduacao: { default: [] },
      radioPosGraduacao: { default: false },
      radioPretendePosGraduacao: { default: false },
      areaPos: { default: "" },
      cursoPos: { default: "" },
      posgraduacao: { default: [] },
      radioMestrado: { default: false },
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
      posdoutorado: { default: [] },


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

  public loadData(entity: Cidade, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Cidade());
  }

  public saveData(form: IIndexable): Promise<Cidade> {
    return new Promise<Cidade>((resolve, reject) => {
      const cidade = this.util.fill(new Cidade(), this.entity!);
      resolve(this.util.fillForm(cidade, this.form!.value));
    });
  }

  public onEstadosChange() {
    console.log('onEstadosChange', this.form?.controls.estados)
    this.selecionaMunicipios(this.form?.controls.estados.value)

  }

  public selecionaMunicipios(uf: string) {
    //console.log(uf)
    this.dao?.query({ where: [['uf', '==', uf]], orderBy: [['nome', 'asc']] }).getAll().then((municipios) => {
      this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });

  }

  public getAllAreasGraduacao() {
    

  }

  


  public onAreaChange() {
    let area1 = this.form!.controls.area.value;
    //this.form!.controls.curso.setValue("");
    this.form!.controls.curso.reset("")
    this.cursos = this.graduacaoCurso
      .filter(x => x.key == area1);
    
  }

  public addItemIdioma(): LookupItem | undefined {
    let result = undefined;
    //console.log('addItemGraduacao',this.form!.value)
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
    //console.log('addItemGraduacao',this.form!.value)
    let res=this.form!.value
    console.log('addItemGraduacao',res.graduacao)
    const curso = this.graduacaoCurso.find(x => x.key == this.form!.controls.curso.value); //this.form!.controls.curso.value;
    const area = this.lookup.AREAS_GRADUACAO.find(x => x.key == this.form!.controls.area.value);
    const key = this.util.textHash((area?.key || "") + (curso?.key || ""));
    if (curso && area && this.util.validateLookupItem(this.form!.controls.graduacao.value, key)) {// && this.util.validateLookupItem(key,value)) {
      result = {
        key: key,
        value: area.value + ' - ' + curso.value,
        data: {
          area: area.key,
          curso: curso.key 
        }
      };
      
      this.form!.controls.area.setValue("");
      this.form!.controls.curso.setValue("");
    }
    return result;
  };

  public setValueradioPretendePosGraduacao(){
    this.form!.controls.radioPretendePosGraduacao.setValue(0);
    this.cdRef.detectChanges()
  }

}
