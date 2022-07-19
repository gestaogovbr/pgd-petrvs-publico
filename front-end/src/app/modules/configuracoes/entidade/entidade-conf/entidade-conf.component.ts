import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Entidade, EntidadeNotificacoes } from 'src/app/models/entidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-entidade-conf',
  templateUrl: './entidade-conf.component.html',
  styleUrls: ['./entidade-conf.component.scss']
})
export class EntidadeConfComponent extends PageFormBase<Entidade, EntidadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;
  public formNomenclatura: FormGroup;
  public tipoModalidadeDao: TipoModalidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Entidade, EntidadeDaoService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.form = this.fh.FormBuilder({
      url_sei: {default: ""},
      tipo_modalidade_id: {default: null},
      notifica_demanda_distribuicao: {default: true},
      notifica_demanda_conclusao: {default: true},
      notifica_demanda_avaliacao: {default: true},
      notifica_demanda_modificacao: {default: true},
      notifica_demanda_comentario: {default: true},
      template_demanda_distribuicao: {default: ""},
      template_demanda_conclusao: {default: ""},
      template_demanda_avaliacao: {default: ""},
      template_demanda_modificacao: {default: ""},
      template_demanda_comentario: {default: ""},
      enviar_email: {default: true},
      enviar_whatsapp: {default: true},
      nomenclatura: {default: []},
      carga_horaria_padrao: {default: 8},
      forma_contagem_carga_horaria: {default: "DIA"}
    }, this.cdRef, this.validate);
    this.formNomenclatura = this.fh.FormBuilder({
      id: {default: ""},
      nome: {default: ""},
      singular: {default: ""},
      plural: {default: ""},
      feminino: {default: false}
    }, this.cdRef, this.validateNomenclatura);
    this.title = "Configurando entidade";
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
    //form.patchValue(this.util.fillForm(formValue, entity));
    let notificacoes = this.util.fill(new EntidadeNotificacoes(), entity.notificacoes);
    form.patchValue(this.util.fillForm(formValue, {...entity, ...{
      notifica_demanda_distribuicao: notificacoes?.notifica_demanda_distribuicao == undefined || notificacoes?.notifica_demanda_distribuicao,
      notifica_demanda_conclusao: notificacoes?.notifica_demanda_conclusao == undefined || notificacoes?.notifica_demanda_conclusao,
      notifica_demanda_avaliacao: notificacoes?.notifica_demanda_avaliacao == undefined || notificacoes?.notifica_demanda_avaliacao,
      notifica_demanda_modificacao: notificacoes?.notifica_demanda_modificacao == undefined || notificacoes?.notifica_demanda_modificacao,
      notifica_demanda_comentario: notificacoes?.notifica_demanda_comentario == undefined || notificacoes?.notifica_demanda_comentario,
      template_demanda_distribuicao: notificacoes?.template_demanda_distribuicao || "",
      template_demanda_conclusao: notificacoes?.template_demanda_conclusao || "",
      template_demanda_avaliacao: notificacoes?.template_demanda_avaliacao || "",
      template_demanda_modificacao: notificacoes?.template_demanda_modificacao || "",
      template_demanda_comentario: notificacoes?.template_demanda_comentario || "",
      enviar_email: entity.notificacoes?.enviar_email == undefined || entity.notificacoes?.enviar_email,
      enviar_whatsapp: entity.notificacoes?.enviar_whatsapp == undefined || entity.notificacoes?.enviar_whatsapp
    }}));
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getById(this.urlParams!.get("id")!))!;
    await this.loadData(this.entity, form);    
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let notificacoes = this.util.fillForm(new EntidadeNotificacoes(), this.form.value);
      let entidade = this.util.fill(new Entidade(), this.entity!);
      entidade = this.util.fillForm(entidade, this.form!.value);
      this.dao!.update(entidade.id, {
        url_sei: entidade.url_sei,
        tipo_modalidade_id: entidade.tipo_modalidade_id,
        nomenclatura: entidade.nomenclatura,
        notificacoes: notificacoes,
        carga_horaria_padrao: entidade.carga_horaria_padrao,
        forma_contagem_carga_horaria: entidade.forma_contagem_carga_horaria  
      }).then(saved => resolve(true)).catch(reject);
    });
  }

  public titleEdit = (entity: Entidade): string => {
    return "Configurando";
  }
}
