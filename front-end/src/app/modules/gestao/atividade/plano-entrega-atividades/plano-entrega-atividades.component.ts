import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PageBase } from 'src/app/modules/base/page-base';
import { Atividade, Checklist } from 'src/app/models/atividade.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Comentario } from 'src/app/models/comentario';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { AtividadeOptionsMetadata, AtividadeService } from '../../atividade/atividade.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { BadgeButton } from 'src/app/components/badge/badge.component';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';

@Component({
  selector: 'plano-entrega-atividades',
  templateUrl: './plano-entrega-atividades.component.html',
  styleUrls: ['./plano-entrega-atividades.component.scss']
})
export class PlanoEntregaAtividadesComponent extends PageBase {
  @ViewChild('gridAtividades', { static: false }) public gridAtividades?: GridComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;

  
  @Input() entregaId!: string;
  @Input() entrega!: any;
  @Input() set disabled(value: boolean) {
    if (this._disabled != value || this.atividadeOptionsMetadata.disabled !== value) {
      this._disabled = value;
      this.atividadeOptionsMetadata.disabled = value;
      this.cdRef.detectChanges();
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  public dao: AtividadeDaoService;
  public calendar: CalendarService;
  public unidadeDao: UnidadeDaoService;
  public atividadeService: AtividadeService;
  public atividades: any[] = [];
  public atividadeOptionsMetadata: AtividadeOptionsMetadata;
  public joinAtividade: string[] = ['demandante', 'tipo_atividade', 'comentarios', 'reacoes.usuario:id,nome,apelido'];
  public joinListagemAtividade: string[] = ["comentarios","reacoes","reacoes.usuario:id,nome,apelido", "comentarios.usuario:id,nome,apelido,email,url_foto",
                                          "tarefas.tipo_tarefa", "tarefas.comentarios.usuario:id,nome,apelido,email,url_foto"];
  
  public formAtividade: FormGroup;
  public formEdit: FormGroup;

  public etiquetas: LookupItem[] = [];
  public etiquetasAscendentes: LookupItem[] = [];
  public checklist?: Checklist[];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.atividadeService = injector.get<AtividadeService>(AtividadeService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.atividadeOptionsMetadata = {
      refreshId: this.atividadeRefreshId.bind(this),
      removeId: this.atividadeRemoveId.bind(this),
      refresh: this.refresh.bind(this)
    }
    this.formAtividade = this.fh.FormBuilder({
      descricao: { default: "" },
      etiquetas: { default: [] },
      checklist: { default: [] },
      comentarios: { default: [] },
      esforco: { default: 0 },
      tempo_planejado: { default: 0 },
      data_distribuicao: { default: new Date() },
      data_estipulada_entrega: { default: new Date() },
      data_inicio: { default: new Date() },
      data_entrega: { default: new Date() },
      //tipo_atividade_id: { default: null }
    }, this.cdRef, this.validateAtividade);
    this.formEdit = this.fh.FormBuilder({
      descricao: { default: "" },
      //tipo_atividade_id: { default: null },
      comentarios: { default: [] },
      progresso: { default: 0 },
      etiquetas: { default: [] },
      etiqueta: { default: null }
    });
  }

  ngOnInit() {
    this.entregaId= this.entrega.id;
    this.loadAtividades();
  }
  
  private _disabled: boolean = false;

  public async loadGrid(form: FormGroup, row: any) {
    this.formAtividade.patchValue(row);
    this.cdRef.detectChanges();
  }

  public async loadAtividades() {
    if (this.entregaId) {
      try {
        this.gridAtividades!.loading = true;
        const result = await this.dao.query({
          where: [["plano_entrega_entrega_id", "==", this.entregaId]],
          join: this.joinListagemAtividade
        }).asPromise();
        this.atividades = result || [];
        console.log('Atividades carregadas:', this.atividades.length, this.atividades);
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      } finally {
        this.gridAtividades!.loading = false;
      }
    }
  }
  
  public atividadeRefreshId(id: string, atividade?: Atividade) {
    this.atividades.forEach(atividade => {
      let foundIndex = this.atividades.findIndex(x => x.id == id);
      if (foundIndex >= 0) {
        if (atividade) {
          this.atividades[foundIndex] = atividade;
        } else {
          this.dao.getById(id, this.joinAtividade).then(atividade => { if (atividade) this.atividades[foundIndex] = atividade; });
        }
      }
    });
    this.cdRef.detectChanges();
  }

  public atividadeRemoveId(id: string) {
    let foundIndex = this.atividades.findIndex(x => x.id == id);
    if (foundIndex >= 0) this.atividades.splice(foundIndex, 1);
    this.cdRef.detectChanges();
  }
  
  public refresh() {
    // this.loadAtividades();
  }

  public validateAtividade = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if (['data_inicio', 'data_entrega'].includes(controlName) && !this.util.isDataValid(control.value)) {//'data_distribuicao', 'data_estipulada_entrega',
      result = "Inválido";
    } /*else if (controlName == 'data_estipulada_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
      result = "Menor que distribuição";
    }*/ else if (controlName == 'data_inicio' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
      result = "Menor que distribuição";
    } else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_distribuicao.value.getTime()) {
      result = "Menor que distribuição";
    } else if (controlName == 'data_entrega' && control.value.getTime() < this.formAtividade?.controls.data_inicio.value.getTime()) {
      result = "Menor que início";
    }
    return result;
  }

  public tempoAtividade(row: any) {
    let badge: BadgeButton[] = [
      { color: "light", hint: "Início", icon: "bi bi-file-earmark-play", label: this.dao.getDateTimeFormatted(row.data_inicio) },
    ];
    let badgeTratar = this.atividadeService.temposAtividade(row);
    badgeTratar = badgeTratar.filter(bad => bad.icon != "bi bi-file-earmark-plus" && bad.icon != "bi bi-calendar-check")
    badge.push(...badgeTratar);
    return badge;
  }

  public async onColumnAtividadeDescricaoEdit(row: any) {
    this.formAtividade.controls.descricao.setValue(row.descricao);
    //this.formEdit.controls.tipo_atividade_id.setValue(row.tipo_atividade_id);
    this.formAtividade.controls.comentarios.setValue(row.comentarios);
  }

  public async onColumnAtividadeDescricaoSave(row: any) {
    try {
      // this.atividadeService.comentarioAtividade(this.tipoAtividade?.selectedEntity, this.formAtividade!.controls.comentarios);
      const saved = await this.dao!.update(row.id, {
        descricao: this.formAtividade.controls.descricao.value,
        //tipo_atividade_id: this.formEdit.controls.tipo_atividade_id.value,
        comentarios: (this.formAtividade.controls.comentarios.value || []).filter((x: Comentario) => ["ADD", "EDIT", "DELETE"].includes(x._status || ""))
      });
      row.descricao = this.formAtividade.controls.descricao.value;
      //row.tipo_atividade_id = this.formEdit.controls.tipo_atividade_id.value;
      row.comentarios = this.formAtividade.controls.comentarios.value;
      return !!saved;
    } catch (error) {
      return false;
    }
  }

  public async onColumnProgressoEtiquetasChecklistEdit(row: any) {
    if (!this.etiquetasAscendentes.filter(e => e.data == row.unidade_id).length) {
      let ascendentes =  await this.carregaEtiquetasUnidadesAscendentesById(row);
      this.etiquetasAscendentes.push(...ascendentes);
    }
    this.formEdit.controls.progresso.setValue(row.progresso);
    this.formEdit.controls.etiquetas.setValue(row.etiquetas);
    this.formEdit.controls.etiqueta.setValue(null);
    this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row._metadata.unidade?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.etiquetasAscendentes.filter(x => x.data == row.unidade_id), (a, b) => a.key == b.key);
    this.checklist = this.util.clone(row.checklist);
  }

  public async onColumnProgressoEtiquetasChecklistSave(row: any) {   
    try {
      const saved = await this.dao!.update(row.id, {
        progresso: this.formEdit.controls.progresso.value,
        etiquetas: this.formEdit.controls.etiquetas.value,
        checklist: this.checklist
      });
      row.progresso = this.formEdit.controls.progresso.value;
      row.checklist = this.checklist;
      return !!saved;
    } catch (error) {
      return false;
    }
  }

  public async carregaEtiquetasUnidadesAscendentesById(row : any) {
    let unidade = await this.unidadeDao.getById(row.unidade_id);
    row._metadata = row._metadata ?? {};
    row._metadata.unidade = unidade ?? this.auth.unidade!;
    return this.carregaEtiquetasUnidadesAscendentes(row._metadata.unidade);
  }

  public async carregaEtiquetasUnidadesAscendentes(unidadeAtual: Unidade) {
    let etiquetasUnidades: LookupItem[] = [];
    unidadeAtual = unidadeAtual ? unidadeAtual : this.auth.unidade!;
    if(unidadeAtual.path){
      let path = unidadeAtual.path.split("/");
      let unidades = await this.unidadeDao.query({ where: [["id", "in", path]] }).asPromise();
      unidades.forEach(un => {
        etiquetasUnidades = this.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
      });
      etiquetasUnidades.forEach(e => e.data = unidadeAtual.id);
    }
    return etiquetasUnidades;
  }

  public onEtiquetaConfigClick() {
    this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario!.id], params: { etiquetas: true } }, {
      modal: true, modalClose: (modalResult) => {
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
        this.cdRef.detectChanges();
      }
    });
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    if (this.etiqueta && this.etiqueta.selectedItem) {
      const item = this.etiqueta.selectedItem;
      const key = item.key?.length ? item.key : this.util.textHash(item.value);
      if (this.util.validateLookupItem(this.formEdit.controls.etiquetas.value, key)) {
        result = {
          key: key,
          value: item.value,
          color: item.color,
          icon: item.icon
        };
        this.formEdit.controls.etiqueta.setValue(null);
      }
    }
    return result;
  };


  public podeEditar(row: any): boolean{
    return true;
  }

  /***************************************************************************************
  * Atividades 
  ****************************************************************************************/
  public async addAtividade(entrega: any) {
    // let planoTrabalho: PlanoTrabalho | undefined = entrega.plano_trabalho || this.entity!.plano_trabalho;
    // let unidade = await this.unidadeDao.getById(this.entrega.unidade_id);
    // let efemerides = this.calendar.calculaDataTempoUnidade(this.entity!.data_inicio, this.entity!.data_fim, planoTrabalho!.carga_horaria, unidade!, "ENTREGA");
    // const tempoPlanejado = this.calendar.horasUteis(this.entity!.data_inicio, this.entity!.data_fim, planoTrabalho!.carga_horaria, unidade!, "DISTRIBUICAO");
    // const dataInicio = this.util.maxDate(this.util.setTime(this.entity!.data_inicio, 0, 0, 0), planoTrabalho!.data_inicio);
    // const dataFim = this.util.minDate(this.util.setTime(this.entity!.data_fim, 23, 59, 59), planoTrabalho!.data_fim);
    let id = this.dao!.generateUuid();
    let atividade = new Atividade({
      id: id,
      // plano_trabalho: planoTrabalho,
      plano_trabalho_entrega: entrega,
      demandante: this.auth.usuario,
      usuario: this.auth.usuario,
      // unidade: this.unidade,
      // data_distribuicao: dataInicio,
      // carga_horaria: planoTrabalho!.carga_horaria,
      // data_estipulada_entrega: dataFim,
      // data_inicio: dataInicio,
      // data_entrega: dataFim,
      // tempo_planejado: tempoPlanejado,
      // tempo_despendido: efemerides?.tempoUtil || 0,
      status: 'CONCLUIDO',
      progresso: 100,
      plano_trabalho_id: this.entrega!.plano_trabalho_id,
      plano_trabalho_entrega_id: entrega.id,
      plano_trabalho_consolidacao_id: this.entrega!.id,
      demandante_id: this.auth.usuario!.id,
      usuario_id: this.auth.usuario!.id,
      unidade_id: this.entrega!.unidade_id,
      metadados: { // Simula os metadados enviados pelo servidor
        atrasado: false,
        tempo_despendido: 0,
        tempo_atraso: 0,
        pausado: false,
        iniciado: true,
        concluido: true,
        avaliado: false,
        arquivado: false,
        produtividade: 0,
        extra: undefined,
        _status: []
      },
      _status: 'temporario'
    });   
    return atividade
  }

  public async saveAtividade(form: FormGroup, row: any) {
    let result = undefined;
    this.gridAtividades!.error = "";
    this.formAtividade.markAllAsTouched();
    if (this.formAtividade!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      this.util.fillForm(row, this.formAtividade!.value);
      this.submitting = true;
      try {
        result = await this.dao?.save(row, this.joinAtividade, ['etiquetas', 'checklist', 'comentarios', 'pausas', 'tarefas']);
        this.atividadeRefreshId(row.id, result);
      } catch (error: any) {
        result = false;
        this.gridAtividades!.error = error.message || error;
      } finally {
        this.submitting = false;
      }
    }
    return result;
  }

  public async removeAtividade(atividades: Atividade[], row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
      try {
        let atividade = row as Atividade;
        await this.dao?.delete(atividade);
        atividades.splice(atividades.findIndex(x => x.id == atividade.id), 1);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

}