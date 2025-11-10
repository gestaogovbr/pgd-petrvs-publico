import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Expediente } from 'src/app/models/expediente.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
import { NotificacoesConfigComponent } from 'src/app/modules/uteis/notificacoes/notificacoes-config/notificacoes-config.component';
import { TemplateDataset } from 'src/app/modules/uteis/templates/template.service';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrls: ['./unidade-form.component.scss']
})

export class UnidadeFormComponent extends PageFormBase<Unidade, UnidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidade_pai', { static: false }) public unidadePai?: InputSearchComponent;
  @ViewChild('cidade', { static: false }) public cidade?: InputSearchComponent;
  @ViewChild('gestor', { static: false }) public gestor?: InputSearchComponent;
  @ViewChild('gestorSubstituto', { static: false }) public gestorSubstituto?: InputSearchComponent;
  @ViewChild('gestorDelegado', { static: false }) public gestorDelegado?: InputSearchComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;
  @ViewChild('notificacoes', { static: false }) public notificacoes?: NotificacoesConfigComponent;

  public entidadeDao: EntidadeDaoService;
  public cidadeDao: CidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public notificacao: NotificacaoService;
  public planoDataset: TemplateDataset[];
  public unidadeRaiz: boolean = false;
  public informal: boolean = true;

  public get informalIsDisabled() {
    //return this.action != 'new' ? 'true' : undefined;
    return 'true';
  }

  public get instituidoraIsDisabled() {
    return !this.auth.hasPermissionTo('MOD_UND_INST') ? 'true' : undefined;
  }

  public get executoraIsDisabled() {
    return !this.auth.hasPermissionTo('MOD_UND_INST') ? 'true' : undefined;
  }

  public get codigoIsDisabled() {
    return !this.informal && this.action == 'new' ? undefined : 'true';
  }

  public get unidadePaiIsDisabled() {
    return this.unidadeRaiz || (!this.informal && this.action == 'edit') ? 'true' : undefined
  }

  public get isDisabled() {
    return !this.informal && this.action == 'edit' ? 'true' : undefined;
  }

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.notificacao = injector.get<NotificacaoService>(NotificacaoService);
    this.modalWidth = 1200;
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.form = this.fh.FormBuilder({
      codigo: { default: "" },
      sigla: { default: "" },
      nome: { default: "" },
      path: { default: "" },
      cidade_id: { default: "" },
      uf: { default: "" },
      instituidora: { default: false },
      executora: { default: true },
      informal: { default: true },
      atividades_arquivamento_automatico: { default: 0 },
      distribuicao_forma_contagem_prazos: { default: "DIAS_UTEIS" },
      entrega_forma_contagem_prazos: { default: "HORAS_UTEIS" },
      notificacoes: { default: {} },
      etiquetas: { default: [] },
      unidade_pai_id: { default: "" },
      entidade_id: { default: this.auth.unidade?.entidade_id },
      etiqueta_texto: { default: "" },
      etiqueta_icone: { default: null },
      etiqueta_cor: { default: null },
      expediente24: { default: true },
      expediente: { default: null },
      usar_expediente_unidade: { default: false },
      texto_complementar_plano: { default: "" },
    }, this.cdRef, this.validate);
    this.join = ["cidade", "entidade", "unidade_pai", "gestor.usuario:id,nome", "gestores_substitutos.usuario:id,nome", "gestores_delegados.usuario:id,nome", "notificacoes_templates", "gestor.gestor:id", "gestores_substitutos.gestor_substituto:id", "gestores_delegados.gestor_delegado:id"];
  }

  public async loadData(entity: Unidade, form: FormGroup) {
    this.informal = !!entity.informal;
    this.cdRef.detectChanges();
    let formValue = Object.assign({}, form.value);
    entity.etiquetas = entity.etiquetas || [];
    this.form!.patchValue(this.util.fillForm(formValue, entity));
    await Promise.all([
      this.unidadePai!.loadSearch(entity.unidade_pai || entity.unidade_pai_id),
      this.cidade!.loadSearch(entity.cidade || entity.cidade_id),
      this.entidade!.loadSearch(entity.entidade || entity.entidade_id)
    ]);
    this.form!.controls.informal.setValue(entity.informal);
    this.unidadeRaiz = this.action == 'edit' && !entity.unidade_pai_id;
    this.form!.controls.usar_expediente_unidade.setValue(entity.expediente ? true : false);
    this.fh.revalidate(this.form!);
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Unidade({
      entidade_id: this.auth.unidade?.entidade_id,
      entidade: this.auth.unidade?.entidade,
      informal: 1
    });
    this.loadData(this.entity, form);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (controlName == 'unidade_pai_id' && !control.value?.length && !this.unidadeRaiz) {
      result = "Obrigatório";
    }
    if (controlName == 'codigo' && !this.form?.controls.informal.value && !parseInt(control.value)) {
      result = "Obrigatório";
    }
    return result;
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if (value?.length && this.util.validateLookupItem(this.form!.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.etiqueta_texto.value,
        color: this.form!.controls.etiqueta_cor.value,
        icon: this.form!.controls.etiqueta_icone.value
      };
      this.form!.controls.etiqueta_texto.setValue("");
      this.form!.controls.etiqueta_icone.setValue(null);
      this.form!.controls.etiqueta_cor.setValue(null);
    }
    return result;
  };

  public saveData(form: IIndexable): Promise<Unidade> {
    return new Promise<Unidade>(async (resolve, reject) => {
      // this.notificacoes!.saveData();
      let unidade: Unidade = this.util.fill(new Unidade(), this.entity!);
      unidade = this.util.fillForm(unidade, this.form!.value);
      // unidade.notificacoes = this.entity!.notificacoes;
      // unidade.notificacoes_templates = this.entity!.notificacoes_templates;
      if (!this.form!.controls.usar_expediente_unidade) unidade.expediente = null;
      resolve(unidade);
    });
  }

  public titleEdit = (entity: Unidade): string => {
    return "Editando " + this.lex.translate("Unidade") + ': ' + (entity?.sigla || "");
  }

  public onInformalChange(event: Event) {
    this.informal = this.form!.controls.informal.value;
    this.form!.controls.codigo.setValue("");
    this.form!.controls.instituidora.setValue(false);
    this.form!.controls.codigo.updateValueAndValidity();
  }

  public onUsarExpedienteEntidadeChange() {
    this.form!.controls.expediente.setValue(this.form!.controls.usar_expediente_unidade.value ? this.form!.controls.expediente.value || new Expediente() : null);
  }

}
