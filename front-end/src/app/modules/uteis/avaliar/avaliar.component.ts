import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { InputMultitoggleComponent } from 'src/app/components/input/input-multitoggle/input-multitoggle.component';
import { Avaliacao, HasAvaliacao } from 'src/app/models/avaliacao.model';
import { AvaliarNotaInputComponent } from './avaliar-nota-input/avaliar-nota-input.component';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { Programa } from 'src/app/models/programa.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PlanoEntregaService } from '../../gestao/plano-entrega/plano-entrega.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';

export type OrigemAvaliacao = "PLANO_ENTREGA" | "CONSOLIDACAO";

@Component({
  selector: 'avaliar',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.scss']
})
export class AvaliarComponent extends PageFormBase<Avaliacao, AvaliacaoDaoService> implements OnInit {
  @ViewChild('notaInput', { static: false }) public notaInput?: AvaliarNotaInputComponent;
  @ViewChild('justificativas', { static: false }) public justificativas?: InputMultitoggleComponent;
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public planoTrabalhoEntregaDao: PlanoTrabalhoEntregaDaoService;
  public consolidacaoDao: PlanoTrabalhoConsolidacaoDaoService;
  public consolidacao?: PlanoTrabalhoConsolidacao;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public planoEntregaDao: PlanoEntregaDaoService;
  public planoEntrega?: PlanoEntrega;
  public tipoAvaliacaoDao: TipoAvaliacaoDaoService;
  public planoEntregaService: PlanoEntregaService;
  public programa?: Programa;
  public usuario?: Usuario;
  public recurso: boolean = false;
  public tipoAvaliacao?: TipoAvaliacao; 
  public tiposJustificativas: LookupItem[] = [];
  public form: FormGroup;
  public entregas: (PlanoEntregaEntrega | PlanoTrabalhoEntrega)[] = [];
  public checklist: LookupItem[] = [];
  public origem?: OrigemAvaliacao;
  public avaliacoes: Avaliacao[] = [];
  public modalWidth: number = 900;
  public joinConsolidacao: string[] = [];
  public joinPlanoEntrega: string[] = [];
  public joinPlanoEntregaEntrega: string[] = ['entrega', 'objetivos.objetivo', 'processos.processo', 'unidade', 'comentarios.usuario:id,nome,apelido',];
  public joinPlanoTrabalhoEntrega: string[] = ['entrega', 'planoEntregaEntrega:id,descricao,plano_entrega_id,entrega_id', 'planoEntregaEntrega.entrega:id,nome,tipo_indicador'];

  constructor(public injector: Injector) {
    super(injector, Avaliacao, AvaliacaoDaoService);
    this.planoTrabalhoEntregaDao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    this.tipoAvaliacaoDao = injector.get<TipoAvaliacaoDaoService>(TipoAvaliacaoDaoService); 
    this.consolidacaoDao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.join = ["avaliador", "entregas-checklist"];
    this.form = this.fh.FormBuilder({
      nota: {default: null},
      recurso: {default: ""},
      justificativas: {default: []},
      justificativa: {default: ""},
      arquivar: {default: true},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(this.recurso) {
      if(controlName == 'recurso' && !control.value?.length) {
        result = "Obrigatório";
      }
    } else {
      if(controlName == "nota" && ([null, undefined].includes(control.value) || !this.nota)) {
        result = "Obrigatório";
      }
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    const values = form!.value;
    if(!this.recurso) {
      if(this.nota?.justifica && !values.justificativa?.length && !values.justificativas?.length) {
        return "Para a nota seleciona será necessário ao menos uma justificativa.";
      }
    }
    return undefined;
  }

  public async loadData(entity: Avaliacao, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    this.consolidacao = this.urlParams?.has("consolidacaoId") || this.metadata?.consolidacao ? this.metadata?.consolidacao || await this.consolidacaoDao.getById(this.urlParams!.get("consolidacaoId")!, this.joinConsolidacao) : undefined;
    this.planoEntrega = this.urlParams?.has("planoEntregaId") || this.metadata?.planoEntrega ? this.metadata?.planoEntrega || await this.planoEntregaDao.getById(this.urlParams!.get("planoEntregaId")!, this.joinPlanoEntrega) : undefined;
    this.avaliacoes = await this.dao!.query({where: this.consolidacao ? [["plano_trabalho_consolidacao_id", "==", this.consolidacao.id]] : [["plano_entrega_id", "==", this.planoEntrega?.id]], join: this.join, orderBy: [["data_avaliacao", "desc"]]}).asPromise();
    this.entity = this.avaliacoes.find(x => x.id == ((this.consolidacao || this.planoEntrega) as HasAvaliacao)?.avaliacao_id) || this.entity;
    this.programa = this.metadata?.programa || this.consolidacao?.plano_trabalho?.programa || this.planoEntrega?.programa;
    this.origem = !!this.consolidacao ? "CONSOLIDACAO" : "PLANO_ENTREGA";
    this.tipoAvaliacao = this.isConsolidacao ? this.programa?.tipo_avaliacao_plano_trabalho : this.programa?.tipo_avaliacao_plano_entrega;
    this.checklist = (this.isConsolidacao ? this.programa!.checklist_avaliacao_entregas_plano_trabalho : this.programa!.checklist_avaliacao_entregas_plano_entrega) || [];
    this.recurso = !!this.metadata?.recurso;
    this.entregas = this.metadata?.entregas || (this.isConsolidacao ? 
      await this.planoTrabalhoEntregaDao.query({where: [["plano_trabalho_id", "==", this.consolidacao!.plano_trabalho_id]], join: this.joinPlanoTrabalhoEntrega}).asPromise() : 
      await this.planoEntregaEntregaDao.query({where: [["plano_entrega_id", "==", this.planoEntrega!.id]], join: this.joinPlanoEntregaEntrega}).asPromise());
    this.usuario = this.consolidacao?.plano_trabalho?.usuario;
    formValue = this.util.fillForm(formValue, this.entity);
    this.form.controls.nota.setValue(formValue.nota);
    this.onNotaChange(new Event('change'));
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    this.entity = new Avaliacao();
    await this.loadData(this.entity, form);
  }

  public get nota(): TipoAvaliacaoNota | undefined {
    return this.notaInput?.nota;
  }

  public get labelNota(): string {
    return 'Como foi a entrega ' + (this.isConsolidacao ? 'de ' + this.util.apelidoOuNome(this.usuario) : 'da ' + this.planoEntrega?.unidade?.sigla) + '?';
  }

  public get styleButtonNota(): string {
    const rgb = this.util.colorHexToRGB(this.nota?.cor || "#000000");
    return "background-color: rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.2);";
  }

  public get isConsolidacao(): boolean {
    return this.origem == 'CONSOLIDACAO';
  }

  public get isPlanoEntrega(): boolean {
    return this.origem == 'PLANO_ENTREGA';
  }

  public onNotaChange(event: Event) {
    this.tiposJustificativas = this.nota?.justificativas?.map(x => {
      return {
        key: x.tipo_justificativa_id,
        value: x.tipo_justificativa!.nome || ""
      }
    }) || [];
  }

  public async saveData(form: IIndexable) {
    if(this.recurso) {
      await this.dao!.recorrer(this.consolidacao!.avaliacao!, form.recurso);
      return new NavigateResult(this.consolidacao!.avaliacao);
    } else {
      //let justificativasIds: string[] = (form.justificativas as LookupItem[]).map(x => x.key);
      this.entity!.id = ""; /* Todo save da avaliação é uma nova avaliação (Exceto o recurso) */
      this.entity!.data_avaliacao = this.auth.hora;
      this.entity!.nota = form.nota;
      this.entity!.justificativa = form.justificativa;
      this.entity!.justificativas = form.justificativas;
      this.entity!.avaliador_id = this.auth.usuario!.id;
      this.entity!.plano_entrega_id = this.planoEntrega?.id || null;
      this.entity!.plano_trabalho_consolidacao_id = this.consolidacao?.id || null;
      this.entity!.tipo_avaliacao_id = this.tipoAvaliacao!.id;
      /* Atualiza os checklist das entregas */
      if(this.checklist.length) {
        /* TODO */
      }
      return new NavigateResult(await this.dao!.save(this.entity!, this.join));
    }
  }
}