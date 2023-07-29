import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputWorkloadComponent, UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { TemplateDaoService } from 'src/app/dao/template-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Entidade } from 'src/app/models/entidade.model';
import { Expediente } from 'src/app/models/expediente.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
import { NotificacoesConfigComponent } from 'src/app/modules/uteis/notificacoes/notificacoes-config/notificacoes-config.component';

@Component({
  selector: 'app-entidade-conf',
  templateUrl: './entidade-conf.component.html',
  styleUrls: ['./entidade-conf.component.scss']
})
export class EntidadeConfComponent extends PageFormBase<Entidade, EntidadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('cargaHoraria', {static: false}) public cargaHoraria?: InputWorkloadComponent;
  @ViewChild('notificacoes', {static: false}) public notificacoes?: NotificacoesConfigComponent;

  public form: FormGroup;
  public formNomenclatura: FormGroup;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public templateDao: TemplateDaoService;
  public notificacao: NotificacaoService;

  constructor(public injector: Injector) {
    super(injector, Entidade, EntidadeDaoService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.templateDao = injector.get<TemplateDaoService>(TemplateDaoService);
    this.notificacao = injector.get<NotificacaoService>(NotificacaoService);
    this.modalWidth = 1200;
    this.join = ["notificacoes_templates"];
    this.form = this.fh.FormBuilder({
      url_sei: {default: ""},
      tipo_modalidade_id: {default: null},
      notificacoes: {default: []},
      nomenclatura: {default: []},
      expediente: {default: new Expediente()},
      carga_horaria_padrao: {default: 8},
      forma_contagem_carga_horaria: {default: "DIA"},
      api_public_key: {default: ""}
    }, this.cdRef, this.validate);
    this.formNomenclatura = this.fh.FormBuilder({
      id: {default: ""},
      nome: {default: ""},
      singular: {default: ""},
      plural: {default: ""},
      feminino: {default: false}
    }, this.cdRef, this.validateNomenclatura);
    this.title = "Configurando " + this.lex.translate("Entidade");
  }

  public validateNomenclatura = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["singular", "plural"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório"
    }

    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['carga_horaria_padrao'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    }

    return result;
  }
  
  public onApiKeyClick(event: Event) {
    this.dao?.generateApiKey(this.entity!.id).then(api_public_key => {
      this.form.controls.api_public_key.setValue(api_public_key);
    }).catch(error => {
      this.error(error.message ? error.message : error);
    })
  }

  public onSingularChange(row: any, form: FormGroup) {
    form.controls.singular.setValue(form.controls.singular.value.toLowerCase());
    this.cdRef.detectChanges();
  }

  public onPluralChange(row: any, form: FormGroup) {
    form.controls.plural.setValue(form.controls.plural.value.toLowerCase());
    this.cdRef.detectChanges();
  }

  public onFormaContagemCargaHorariaChange(unit: UnitWorkload) {
    this.form!.controls.forma_contagem_carga_horaria.setValue(unit == "day" ? "DIA" : unit == "week" ? "SEMANA" : "MES");
  }

  public get formaContagemCargaHoraria(): UnitWorkload {
    const forma = this.form?.controls.forma_contagem_carga_horaria?.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }

  public async loadData(entity: Entidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    let nomenclatura = entity.nomenclatura || [];
    Object.entries(this.lex.defaults).forEach(([key, value]) => {
      if(!nomenclatura.find(x => x.nome == key)) {
        nomenclatura.push({
          id: key,
          nome: key,
          singular: value.single,
          plural: value.plural,
          feminino: value.female
        });
      }
    });
    entity.nomenclatura = nomenclatura;
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    await this.loadData(this.entity, form);    
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.notificacoes?.saveData();
      let entidade = this.util.fill(new Entidade(), this.entity!);
      entidade = this.util.fillForm(entidade, this.form!.value);
      this.dao!.update(entidade.id, {
        url_sei: entidade.url_sei,
        tipo_modalidade_id: entidade.tipo_modalidade_id,
        nomenclatura: entidade.nomenclatura,
        notificacoes: entidade.notificacoes,
        expediente: entidade.expediente,
        carga_horaria_padrao: entidade.carga_horaria_padrao,
        forma_contagem_carga_horaria: entidade.forma_contagem_carga_horaria  
      }).then(saved => resolve(true)).catch(reject);
    });
  }

  public titleEdit = (entity: Entidade): string => {
    return "Configurando " + this.lex.translate("Entidade") + ': ' + (entity?.sigla || "");
  }
}
