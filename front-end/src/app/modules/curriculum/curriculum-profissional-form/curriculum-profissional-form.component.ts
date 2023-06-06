import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { Curriculum } from 'src/app/models/currriculum.model';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { FuncaoDaoService } from 'src/app/dao/funcao-dao.service';
import { CentroTreinamentoDaoService } from 'src/app/dao/centro-treinamento-dao.service';
import { GrupoEspecializadoDaoService } from 'src/app/dao/grupo-epecializado-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'curriculum-profissional-form',
  templateUrl: './curriculum-profissional-form.component.html',
  styleUrls: ['./curriculum-profissional-form.component.scss']
})
export class CurriculumProfissionalFormComponent extends PageFormBase<Curriculum, CurriculumDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('radioDocenciaFora', { static: false }) public radioDocenciaFora?: InputSwitchComponent;
  @ViewChild('radioDocenciaPRF', { static: false }) public radioDocenciaPRF?: InputSwitchComponent;
  @ViewChild('radioCursos', { static: false }) public radioCursos?: InputSwitchComponent;
  @ViewChild('radioCursosFora', { static: false }) public radioCursosFora?: InputSwitchComponent;
  @ViewChild('radioInteresseBNT', { static: false }) public radioInteresseBNT?: InputSwitchComponent;
  @ViewChild('radioPG', { static: false }) public radioPG?: InputSwitchComponent;
  @ViewChild('radioInteressePG', { static: false }) public radioInteressePG?: InputSwitchComponent;
  @ViewChild('radioInteresseRemove', { static: false }) public radioInteresseRemove?: InputSwitchComponent;
  
  public testeLookup: LookupItem[] = [{ 'key': 'key 1', 'value': 'value 1' }];
  public anos: LookupItem[] = [];
  public ct: LookupItem[] = [];
  public cargo: LookupItem[] = [];
  public funcao: LookupItem[] = [];
  public grupo: LookupItem[] = [];
  public unidade: LookupItem[] = [];
  public funcaoDao?: FuncaoDaoService;
  public ctDao?: CentroTreinamentoDaoService;
  public grupoDao?: GrupoEspecializadoDaoService;
  public unidadeDao?: UnidadeDaoService;
 
  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
    this.funcaoDao = injector.get<FuncaoDaoService>(FuncaoDaoService)
    this.ctDao = injector.get<CentroTreinamentoDaoService>(CentroTreinamentoDaoService)
    this.grupoDao = injector.get<GrupoEspecializadoDaoService>(GrupoEspecializadoDaoService)
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService)
    this.form = this.fh.FormBuilder({
      radioDocenciaFora: { default: false },
      radioDocenciaPRF: { default: false },
      radioCursos: { default: false },
      radioPretendoCursos: { default: false },
      radioCursosFora: { default: false },
      radioPretendoCursosFora: { default: false },
      radioPG: { default: false },
      radioInteressePG: { default: false },
      radioInteresseBNT: { default: false },
      radioInteresseRemove: { default: false },
      ano_ingresso: { default: false },
      centro_treinamento: { default: false },
      cargo: { default: false },
      funcoes: { default: [] },
      lotacoes: { default: [] },
      funcoesOcupadas: { default: "" },
      selectLotacao: { default: "" },
      lotacaoAtual: { default: "" },
      grupo: { default: "" },
     

    }, this.cdRef, this.validate)

  }

  ngOnInit(): void {
    for (let i = 1980; i <= (new Date()).getFullYear(); i++) {
      this.anos.push(Object.assign({}, { key: i, value: (i.toString()) }));
    }

    /*this.unidadeDao?.query().getAll().then((unity) => {
      console.log('UNIDADES',unity)
      this.unidade = unity.map(x => Object.assign({}, { key: x.codigo, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
      console.log('UNIDADES',this.unidade)
    });*/

  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    return result;
  }

  public loadData(entity: Curriculum, form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }
  public initializeData(form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }

  public saveData(form: IIndexable): Promise<Curriculum> {
    return new Promise<Curriculum>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let curriculum = this.util.fill(new Curriculum(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      curriculum = this.util.fillForm(curriculum, this.form!.value);
      curriculum.usuario_id = this.auth.usuario?.id;
      (this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => curriculum.idiomas.push(element.data));
      resolve(curriculum);
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  };

  public addItemFuncao(): LookupItem | undefined {
    return
  }

  public onAddClick() { }

 
}
