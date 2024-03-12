import { Component, Injector, ViewChild } from '@angular/core';
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
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InputMultiselectComponent } from 'src/app/components/input/input-multiselect/input-multiselect.component';
import { CurriculumGraduacaoDaoService } from 'src/app/dao/curriculum-graduacao.service';
import { CurriculumIdioma } from 'src/app/models/curriculum-idioma.model';
import { InputNumberComponent } from 'src/app/components/input/input-number/input-number.component';
import { Curriculum } from 'src/app/models/curriculum.model';
import { CurriculumGraduacao } from 'src/app/models/curriculum-graduacao.model';

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
export class CurriculumFormComponent extends PageFormBase<Curriculum, CurriculumDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("quantidade_filhos", { static: false }) public quantidade_filhos?: InputNumberComponent;
  @ViewChild("area", { static: false }) public area_conhecimento?: InputSearchComponent;
  @ViewChild("estados", { static: false }) public estadosV?: InputSelectComponent;
  @ViewChild("curso", { static: false }) public curso?: InputSelectComponent;
  @ViewChild("idiomas", { static: false }) public idiomasM?: InputMultiselectComponent;
  @ViewChild('municipio', { static: false }) public municipioV?: InputSelectComponent;

  public municipios: LookupItem[] = [];
  public cursos: LookupItem[] = [];
  public cursosPos: LookupItem[] = [];
  public cursosGradPos: LookupItem[] = [];
  public opcoesEscolha: LookupItem[] = [{ 'key': 1, 'value': 'Pretendo Fazer' }, { 'key': 0, 'value': 'Finalizado' }];
  public cidadeDao: CidadeDaoService;
  public cursoDao?: CursoDaoService;
  public areaDao?: AreaConhecimentoDaoService;
  public curriculumGraduacaoDAO?: CurriculumGraduacaoDaoService;
  public formGraduacao?: FormGroup;
  public formIdiomaGrid?: FormGroup;
  public cursoWhere: any[] = [["id", "==", null]];
  public show: boolean = true;

  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
    this.join = ['graduacoes.curso.area_conhecimento'];
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService)
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService)
    this.curriculumGraduacaoDAO = injector.get<CurriculumGraduacaoDaoService>(CurriculumGraduacaoDaoService)
    this.form = this.fh.FormBuilder({
      id: { default: "" },
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
    if (['cidade_id', 'estados', 'apresentacao', 'telefone'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async loadData(entity: Curriculum, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    const curriculuns = await this.dao?.query({ where: [['usuario_id', '==', this.auth.usuario?.id]], join: this.join }).asPromise();
    let entity = curriculuns?.length ? curriculuns[0] : new Curriculum();//this.entity
    curriculuns?.length ? (this.id = curriculuns[0].id) : (this.id = "");
    const cidade = entity.cidade_id != '' ? await this.cidadeDao?.getById(entity.cidade_id) : null;
    let uf = this.lookup.getLookup(this.lookup.UF, cidade?.uf);
    this.form?.controls.estados.setValue(uf?.key);//cidade.uf));
    entity.quantidade_filhos > 0 ? this.form?.controls.filhos.setValue(true) : this.form?.controls.filhos.setValue(false);
    const municipio = this.lookup.UF.find(x => x.key == cidade?.uf);
    entity.idiomas.length > 0 ? this.form?.controls.radioFalaIdioma.setValue(true) : this.form?.controls.radioFalaIdioma.setValue(false);
    await this.loadData(entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Curriculum> {
    return new Promise<Curriculum>((resolve, reject) => {
      let curriculum = this.util.fill(new Curriculum(), this.entity!) as Curriculum;
      curriculum.id = this.id!;
      curriculum = this.util.fillForm(curriculum, this.form!.value);
      curriculum.usuario_id = this.auth.usuario!.id;
      curriculum.graduacoes = this.form!.controls.graduacoes.value.filter((x: CurriculumGraduacao) => x._status?.length);
      resolve(curriculum);
    });
  }

  public onEstadosChange() {
    this.show = false;
    const estados = this.form!.controls.estados.value;
    this.selecionaMunicipios(estados);
  }

  public selecionaMunicipios(uf: string) {
    this.cidadeDao?.query({ where: [['uf', '==', uf]], orderBy: [['nome', 'asc']] }).asPromise().then((municipios) => {
      this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
    });
    this.show = true;
  }

  public onAreaConhecimentoChange() {
    const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao!.controls.titulo.value);
    this.cursoWhere = [['area_id', '==', this.formGraduacao!.controls.area_conhecimento_id.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
    this.cdRef.detectChanges();
  }

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
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
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

  public saveGraduacao(form: FormGroup, row: any) {
    form?.markAllAsTouched();
    if (form?.valid) {
      let values = form.value;
      row.pretensao = values.pretensao;
      row.curso_id = values.curso_id;
      row.curso = this.curso?.selectedItem?.data;
      row.area_conhecimento = this.area_conhecimento?.selectedEntity
      row._status = row._status == "ADD" ? "ADD" : "EDIT";
      return row;
    }
    return undefined;
  }

  public async loadGraduacao(form: FormGroup, row: CurriculumGraduacao) {
    this.area_conhecimento?.setValue(row.curso?.area_id)
    this.formGraduacao!.controls.area_conhecimento_id.setValue(row.curso?.area_id);
    this.formGraduacao!.controls.pretensao.setValue(row.pretensao);
    this.formGraduacao!.controls.titulo.setValue(row.curso?.titulo);
    this.formGraduacao!.controls.curso_id.setValue(row.curso_id);
  }

  public async removeGraduacao(row: any) {
    if (await this.dialog.confirm("Excluir ?", "Deseja realmente excluir este registro?")) {
      row._status = "DELETE";
    }
    return undefined;
  }

  public qtdeFilhosOnChange() {
    if (this.form!.controls.quantidade_filhos?.value == "") {
      this.form!.controls.quantidade_filhos.setValue(0);
      this.form?.controls.filhos.setValue(false);
    }
  }

  public togglePopOver() { }
}
