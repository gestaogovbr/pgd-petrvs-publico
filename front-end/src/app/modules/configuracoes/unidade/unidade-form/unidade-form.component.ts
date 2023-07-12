import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TemplateDataset } from 'src/app/components/input/input-editor/input-editor.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Expediente } from 'src/app/models/expediente.model';
import { UnidadeOrigemAtividade } from 'src/app/models/unidade-origem-atividade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
import { NotificacoesConfigComponent } from 'src/app/modules/uteis/notificacoes/notificacoes-config/notificacoes-config.component';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrls: ['./unidade-form.component.scss']
})

export class UnidadeFormComponent extends PageFormBase<Unidade, UnidadeDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  //@ViewChild('pai', { static: false }) public pai?: InputSearchComponent;
  @ViewChild('unidade_pai', { static: false }) public unidadePai?: InputSearchComponent;
  @ViewChild('cidade', { static: false }) public cidade?: InputSearchComponent;
  @ViewChild('gestor', { static: false }) public gestor?: InputSearchComponent;
  @ViewChild('gestorSubstituto', { static: false }) public gestorSubstituto?: InputSearchComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;
  @ViewChild('unidade_origem_atividade', { static: false }) public unidadeOrigemAtividade?: InputSearchComponent;
  @ViewChild('notificacoes', { static: false }) public notificacoes?: NotificacoesConfigComponent;

  public form: FormGroup;
  public formUnidadesOrigemAtividades: FormGroup;
  public entidadeDao: EntidadeDaoService;
  public cidadeDao: CidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public planoDao: PlanoDaoService;
  public notificacao: NotificacaoService;
  public planoDataset: TemplateDataset[];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoDao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.notificacao = injector.get<NotificacaoService>(NotificacaoService);
    this.modalWidth = 1200;
    this.planoDataset = this.planoDao.dataset();
    this.form = this.fh.FormBuilder({
      codigo: {default: ""},
      sigla: {default: ""},
      nome: {default: ""},
      path: {default: ""},
      cidade_id: {default: ""},
      uf: {default: ""},
      atividades_arquivamento_automatico: {default: 1},
      avaliacao_hierarquica: {default: 0},
      atividades_avaliacao_automatico: {default: 0},
      planos_prazo_comparecimento: {default: ""},
      planos_tipo_prazo_comparecimento: {default: ""},
      horario_trabalho_inicio: {default: "00:00"},
      horario_trabalho_fim: {default: "23:59"},
      horario_trabalho_intervalo: {default: "00:00"},
      distribuicao_forma_contagem_prazos: {default: "DIAS_UTEIS"},
      entrega_forma_contagem_prazos: {default: "HORAS_UTEIS"},
      notificacoes: {default: {}},
      autoedicao_subordinadas: {default: 0},
      etiquetas: {default: []},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      unidade_id: {default: ""},
      entidade_id: {default: ""},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      expediente24: {default: true},
      unidades_origem_atividades: {default: []},
      gestor_id: {default: null},
      gestor_substituto_id: {default: null},
      /*notifica_demanda_distribuicao: {default: true},
      notifica_demanda_conclusao: {default: true},
      notifica_demanda_avaliacao: {default: true},
      notifica_demanda_modificacao: {default: true},
      notifica_demanda_comentario: {default: true},
      template_demanda_distribuicao: {default: ""},
      template_demanda_conclusao: {default: ""},
      template_demanda_avaliacao: {default: ""},
      template_demanda_modificacao: {default: ""},
      template_demanda_comentario: {default: ""},
      enviar_petrvs: {default: true},
      enviar_email: {default: true},
      enviar_whatsapp: {default: true},*/
      expediente: {default: null},
      usar_expediente_entidade: {default: true},
      texto_complementar_plano: {default: ""}
    }, this.cdRef, this.validate);
    this.formUnidadesOrigemAtividades = this.fh.FormBuilder({
      unidade_origem_atividade_id: {default: ""}
    }, this.cdRef, this.validateUnidadesOrigemAtividades);
    this.join =  ["cidade", "entidade", "unidades_origem_atividades.unidade_origem_atividade", "gestor", "gestor_substituto", "notificacoes_templates"];
  }

  public validateUnidadesOrigemAtividades = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == 'unidade_origem_atividade_id' && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['codigo', 'sigla', 'nome', 'cidade_id', 'entidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(['planos_prazo_comparecimento'].indexOf(controlName) >= 0 && !control.value) {
    result = "Não pode ser zero.";
    }
    return result;
  }

  public get is24hrs(): string | undefined {
    return this.form?.controls.expediente24.value ? "" : undefined;
  }

  public onExpediente24Change(event: Event) {
    if(this.form.controls.expediente24.value) {
      this.form.controls.horario_trabalho_inicio.setValue("00:00");
      this.form.controls.horario_trabalho_fim.setValue("24:00");
    }
  }

  public onUsarExpedienteEntidadeChange() {
    this.form.controls.expediente.setValue(this.form.controls.usar_expediente_entidade.value ? null : this.form.controls.expediente.value || new Expediente());
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
      this.unidadePai!.loadSearch(entity.unidade || entity.unidade_id),
      this.cidade!.loadSearch(entity.cidade || entity.cidade_id),
      this.gestor!.loadSearch(entity.gestor || entity.gestor_id),
      this.gestorSubstituto!.loadSearch(entity.gestor_substituto || entity.gestor_substituto_id),
      this.entidade!.loadSearch(entity.entidade || entity.entidade_id)/*,
      this.unidadeOrigemAtividade!.loadSearch(entity.unidades_origem_atividades)*/
    ]);
    this.form.patchValue(this.util.fillForm(formValue, {...entity, ...{
      expediente24: entity.horario_trabalho_fim.startsWith("24:00")
      /*notifica_demanda_distribuicao: entity.notificacoes?.notifica_demanda_distribuicao == undefined || entity.notificacoes?.notifica_demanda_distribuicao,
      notifica_demanda_conclusao: entity.notificacoes?.notifica_demanda_conclusao == undefined || entity.notificacoes?.notifica_demanda_conclusao,
      notifica_demanda_avaliacao: entity.notificacoes?.notifica_demanda_avaliacao == undefined || entity.notificacoes?.notifica_demanda_avaliacao,
      notifica_demanda_modificacao: entity.notificacoes?.notifica_demanda_modificacao == undefined || entity.notificacoes?.notifica_demanda_modificacao,
      notifica_demanda_comentario: entity.notificacoes?.notifica_demanda_comentario == undefined || entity.notificacoes?.notifica_demanda_comentario,
      template_demanda_distribuicao: entity.notificacoes?.template_demanda_distribuicao || "",
      template_demanda_conclusao: entity.notificacoes?.template_demanda_conclusao || "",
      template_demanda_avaliacao: entity.notificacoes?.template_demanda_avaliacao || "",
      template_demanda_modificacao: entity.notificacoes?.template_demanda_modificacao || "",
      template_demanda_comentario: entity.notificacoes?.template_demanda_comentario || "",
      enviar_email: entity.notificacoes?.enviar_email == undefined || entity.notificacoes?.enviar_email,
      enviar_whatsapp: entity.notificacoes?.enviar_whatsapp == undefined || entity.notificacoes?.enviar_whatsapp*/
    }}));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Unidade();
    this.loadData(this.entity, form);
  }

  public async addUnidadesOrigemAtividades() {
    return Object.assign(new UnidadeOrigemAtividade(), {unidade_id: this.entity?.id}) as IIndexable;
  }

  public async loadUnidadesOrigemAtividades(form: FormGroup, row: any) {
    form.controls.unidade_origem_atividade_id.setValue(row.unidade_origem_atividade_id);
  }

  public async removeUnidadesOrigemAtividades(row: any) {
    return true;
  }

  public async saveUnidadesOrigemAtividades(form: FormGroup, row: any) {
    row.unidade_origem_atividade_id = form.controls.unidade_origem_atividade_id.value;
    row.unidade_origem_atividade = await this.dao?.getById(row.unidade_origem_atividade_id)!;
    return row;
  }

  public saveData(form: IIndexable): Promise<Unidade> {
    return new Promise<Unidade>((resolve, reject) => {
      this.notificacoes!.saveData();
      let unidade: Unidade = this.util.fill(new Unidade(), this.entity!);
      unidade = this.util.fillForm(unidade, this.form!.value);
      unidade.horario_trabalho_fim = this.form!.controls.expediente24.value ? "24:00" : unidade.horario_trabalho_fim;
      unidade.notificacoes = this.entity!.notificacoes;
      unidade.notificacoes_templates = this.entity!.notificacoes_templates;
      /*unidade.notificacoes.notifica_demanda_distribuicao = form.notifica_demanda_distribuicao;
      unidade.notificacoes.notifica_demanda_conclusao = form.notifica_demanda_conclusao;
      unidade.notificacoes.notifica_demanda_avaliacao = form.notifica_demanda_avaliacao;
      unidade.notificacoes.notifica_demanda_modificacao = form.notifica_demanda_modificacao;
      unidade.notificacoes.notifica_demanda_comentario = form.notifica_demanda_comentario;
      unidade.notificacoes.template_demanda_distribuicao = form.template_demanda_distribuicao;
      unidade.notificacoes.template_demanda_conclusao = form.template_demanda_conclusao;
      unidade.notificacoes.template_demanda_avaliacao = form.template_demanda_avaliacao;
      unidade.notificacoes.template_demanda_modificacao = form.template_demanda_modificacao;
      unidade.notificacoes.template_demanda_comentario = form.template_demanda_comentario;
      unidade.notificacoes.enviar_email = form.enviar_email;
      unidade.notificacoes.enviar_whatsapp = form.enviar_whatsapp;*/
      /* Remove os ids gerados para os novos unidades_origem_atividades, será gerado pelo servidor como UUID */
      unidade.unidades_origem_atividades.forEach(origem => {
        origem.id = origem.id.includes("-") ? origem.id : "";
      });
      /* O pai vai ser resolvido do lado do servidor
      if(!this.form.controls.unidade_id.value?.length) { //Então, selecionou o Pai.
        unidade.unidade_id = (this.pai?.searchObj as Unidade).id;
        unidade.codigoPai = (this.pai?.searchObj as Unidade).codigo;
        if(!(this.pai?.searchObj as Unidade).path.length) {//Então, o pai não tem Path (não tem Pai do Pai)
          unidade.path = "/"+(this.pai?.searchObj as Unidade).id+"/";
        }
        else{//O Pai tem um Pai, já vai vir algo do tipo '/dadasd-dasdas-dasdas/'
          unidade.path = (this.pai?.searchObj as Unidade).path+(this.pai?.searchObj as Unidade).id+"/";
        }
      }*/
      resolve(unidade);
    });
  }

  public titleEdit = (entity: Unidade): string => {
    return "Editando " + (entity?.sigla || "") + ' - ' + (entity?.nome || "");
  }

}
