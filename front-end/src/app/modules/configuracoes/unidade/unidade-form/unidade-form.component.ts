import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteAtribuicaoDaoService } from 'src/app/dao/unidade-integrante-atribuicao-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
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
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;
  @ViewChild('notificacoes', { static: false }) public notificacoes?: NotificacoesConfigComponent;
  @ViewChild('instituidora', { static: false }) public instituidora?: InputSwitchComponent;

  public form: FormGroup;
  public formGestor: FormGroup;
  public entidadeDao: EntidadeDaoService;
  public cidadeDao: CidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public integranteDao: UnidadeIntegranteDaoService;
  public integranteAtribuicaoDao: UnidadeIntegranteAtribuicaoDaoService;
  public notificacao: NotificacaoService;
  public planoDataset: TemplateDataset[];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.integranteAtribuicaoDao = injector.get<UnidadeIntegranteAtribuicaoDaoService>(UnidadeIntegranteAtribuicaoDaoService);
    this.notificacao = injector.get<NotificacaoService>(NotificacaoService);
    this.modalWidth = 1200;
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.form = this.fh.FormBuilder({
      codigo: {default: ""},
      sigla: {default: ""},
      nome: {default: ""},
      path: {default: ""},
      cidade_id: {default: ""},
      uf: {default: ""},
      instituidora: {default: 0},
      atividades_arquivamento_automatico: {default: 1},
      distribuicao_forma_contagem_prazos: {default: "DIAS_UTEIS"},
      entrega_forma_contagem_prazos: {default: "HORAS_UTEIS"},
      notificacoes: {default: {}},
      etiquetas: {default: []},
      unidade_pai_id: {default: ""},
      entidade_id: {default: this.auth.unidade?.entidade_id},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      expediente24: {default: true},
      expediente: {default: null},
      usar_expediente_entidade: {default: false},
      texto_complementar_plano: {default: ""}
    }, this.cdRef, this.validate);
    this.formGestor = this.fh.FormBuilder({
      gestor_id: {default: ""},
      gestor_substituto_id: {default: ""}
    }, this.cdRef);
    this.join =  ["cidade", "entidade", "gestor.usuario:id,nome", "gestor_substituto.usuario:id,nome", "notificacoes_templates", "gestor.gestor:id", "gestor_substituto.gestor_substituto:id"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['codigo', 'sigla', 'nome', 'cidade_id', 'entidade_id','unidade_pai_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public get is24hrs(): string | undefined {
    return this.form?.controls.expediente24.value ? "" : undefined;
  }

  public onUsarExpedienteEntidadeChange() {
    this.form.controls.expediente.setValue( this.form.controls.usar_expediente_entidade.value ? null : this.form.controls.expediente.value || new Expediente());
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.etiqueta_texto.value,
        color: this.form.controls.etiqueta_cor.value,
        icon: this.form.controls.etiqueta_icone.value
      };
      this.form.controls.etiqueta_texto.setValue("");
      this.form.controls.etiqueta_icone.setValue(null);
      this.form.controls.etiqueta_cor.setValue(null);
    }
    return result;
  };

  public async loadData(entity: Unidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.unidadePai!.loadSearch(entity.unidade_pai || entity.unidade_pai_id),
      this.cidade!.loadSearch(entity.cidade || entity.cidade_id),
      this.gestor!.loadSearch(entity?.gestor?.usuario || entity.gestor?.usuario!.id),
      this.gestorSubstituto!.loadSearch(entity?.gestor_substituto?.usuario || entity.gestor_substituto?.usuario!.id),
      this.entidade!.loadSearch(entity.entidade || entity.entidade_id)
    ]);
    entity.etiquetas = entity.etiquetas || [];
    this.form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Unidade({ entidade_id: this.auth.unidade?.entidade_id, entidade: this.auth.unidade?.entidade });
    this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.notificacoes!.saveData();
      let unidade: Unidade = this.util.fill(new Unidade(), this.entity!);
      unidade = this.util.fillForm(unidade, this.form!.value);
      unidade.notificacoes = this.entity!.notificacoes;
      let salvarGestor = !!this.formGestor!.controls.gestor_id?.value && (!this.entity?.gestor?.id.length || (!!this.entity?.gestor?.id.length && this.entity?.gestor?.usuario?.id != this.formGestor!.controls.gestor_id?.value));
      let salvarGestorSubstituto = !!this.formGestor!.controls.gestor_substituto_id?.value && (!this.entity?.gestor_substituto?.id.length || (!!this.entity?.gestor_substituto?.id.length && this.entity?.gestor_substituto?.usuario?.id != this.formGestor!.controls.gestor_substituto_id?.value));
      let salvarGestorDelegado = !!this.formGestor!.controls.gestor_delegado_id?.value && (!this.entity?.gestor_delegado?.id.length || (!!this.entity?.gestor_delegado?.id.length && this.entity?.gestor_delegado?.usuario?.id != this.formGestor!.controls.gestor_delegado_id?.value));
      let apagarGestor = !this.formGestor!.controls.gestor_id?.value && !!this.entity?.gestor?.id.length;
      let apagarGestorSubstituto = !this.formGestor!.controls.gestor_substituto_id?.value && !!this.entity?.gestor_substituto?.id.length;
      let apagarGestorDelegado = !this.formGestor!.controls.gestor_delegado_id?.value && !!this.entity?.gestor_delegado?.id.length;
      this.dao?.save(unidade, ["gestor.gestor:id","gestor_substituto.gestor_substituto:id","gestor_delegado.gestor_delegado:id"]).then(async unidade => {
        this.entity = unidade;
        if(salvarGestor) await this.integranteDao.saveIntegrante([{'unidade_id': this.entity.id, 'usuario_id': this.formGestor!.controls.gestor_id!.value, 'atribuicoes': ["GESTOR"]}]);
        if(salvarGestorSubstituto) await this.integranteDao.saveIntegrante([{'unidade_id': this.entity.id, 'usuario_id': this.formGestor!.controls.gestor_substituto_id!.value, 'atribuicoes': ["GESTOR_SUBSTITUTO"]}]);
        if(salvarGestorDelegado) await this.integranteDao.saveIntegrante([{'unidade_id': this.entity.id, 'usuario_id': this.formGestor!.controls.gestor_delegado_id!.value, 'atribuicoes': ["GESTOR_DELEGADO"]}]);
        if(apagarGestor) await this.integranteAtribuicaoDao.delete(this.entity?.gestor!.gestor!.id);
        if(apagarGestorSubstituto) await this.integranteAtribuicaoDao.delete(this.entity?.gestor_substituto!.gestor_substituto!.id);
        if(apagarGestorDelegado) await this.integranteAtribuicaoDao.delete(this.entity?.gestor_delegado!.gestor_delegado!.id);
        resolve(true);
      });
    });
  }

  public titleEdit = (entity: Unidade): string => {
    return "Editando " + this.lex.translate("Unidade") + ': ' + (entity?.sigla || "");
  }

}
