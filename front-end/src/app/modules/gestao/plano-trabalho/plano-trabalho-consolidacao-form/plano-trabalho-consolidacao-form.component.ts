import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoTrabalhoConsolidacaoDaoService } from 'src/app/dao/plano-trabalho-consolidacao-dao.service';
import { PlanoTrabalhoConsolidacaoOcorrenciaDaoService } from 'src/app/dao/plano-trabalho-consolidacao-ocorrencia-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Atividade } from 'src/app/models/atividade.model';
import { PlanoTrabalhoConsolidacaoOcorrencia } from 'src/app/models/plano-trabalho-consolidacao-ocorrencia.model';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoService } from '../plano-trabalho.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';

export type ConsolidacaoEntrega = {
  id: string,
  entrega: PlanoTrabalhoEntrega,
  atividades: Atividade[]
};

@Component({
  selector: 'plano-trabalho-consolidacao-form',
  templateUrl: './plano-trabalho-consolidacao-form.component.html',
  styleUrls: ['./plano-trabalho-consolidacao-form.component.scss']
})
export class PlanoTrabalhoConsolidacaoFormComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('gridEntregas', { static: false }) public gridEntregas?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() planoTrabalho?: PlanoTrabalho;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: PlanoTrabalhoConsolidacao | undefined) { super.entity = value; } get entity(): PlanoTrabalhoConsolidacao | undefined { return super.entity; }

  public consolidacaoOcorrenciaDao: PlanoTrabalhoConsolidacaoOcorrenciaDaoService;
  public ocorrenciaDao: PlanoTrabalhoConsolidacaoOcorrenciaDaoService;
  public formAtividade: FormGroup;
  public formOcorrencia: FormGroup;
  public dao: PlanoTrabalhoConsolidacaoDaoService;
  public atividadeDao: AtividadeDaoService;
  public tipoAtividadeDao: TipoAtividadeDaoService;
  public planoTrabalhoService: PlanoTrabalhoService;
  public planoEntregaService: PlanoEntregaService;
  public itemsEntregas: ConsolidacaoEntrega[] = [];
  public itemsOcorrencias: PlanoTrabalhoConsolidacaoOcorrencia[] = [];
  public itemsAfastamentos: Afastamento[] = [];
  
  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<PlanoTrabalhoConsolidacaoDaoService>(PlanoTrabalhoConsolidacaoDaoService);
    this.consolidacaoOcorrenciaDao = injector.get<PlanoTrabalhoConsolidacaoOcorrenciaDaoService>(PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.ocorrenciaDao = injector.get<PlanoTrabalhoConsolidacaoOcorrenciaDaoService>(PlanoTrabalhoConsolidacaoOcorrenciaDaoService);
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.planoTrabalhoService = injector.get<PlanoTrabalhoService>(PlanoTrabalhoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.formAtividade = this.fh.FormBuilder({
      esforco: { default: 0 },
      realizado: { default: null },
      descricao: { default: "" },
      tipo_atividade: {default: null}
    }, this.cdRef, this.validateEntrega);
    this.formOcorrencia = this.fh.FormBuilder({
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      descricao: { default: "" }
    }, this.cdRef, this.validateOcorrencia);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    (async () => {
      await this.loadData(this.entity!, this.form);
    })();
  }

  public validateEntrega = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validateOcorrencia = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['descricao'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(['data_inicio', 'data_fim'].includes(controlName) && !this.util.isDataValid(control.value)) {
      result = "Inválido";
    } else if(controlName == 'data_fim' && control.value.getTime() < this.formOcorrencia?.controls.data_inicio.value.getTime()) {
        result = "Menor que início";
    } 
    return result;
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.gridEntregas!.loading = true;
    this.cdRef.detectChanges();
    try {
      let dados = await this.dao!.dadosConsolidacao(entity.id);
      this.itemsEntregas = dados.entregas.map(x => {
        return {
          id: x.id,
          entrega: x,
          atividades: dados.atividades.filter(y => y.plano_trabalho_entrega_id == x.id)
        };
      });
      this.itemsOcorrencias = dados.ocorrencias;
      this.itemsAfastamentos = dados.afastamentos;
    } finally {
      this.gridEntregas!.loading = false;
      this.cdRef.detectChanges();
    }
  }

  public get hasEsforco(): boolean {
    return !!this.planoTrabalho?.tipo_modalidade?.atividade_esforco;
  }
  
  public get hasRealizado(): boolean {
    return false;
  }
  
  /***************************************************************************************
  * Atividades 
  ****************************************************************************************/
  public async addAtividade(entrega: PlanoTrabalhoEntrega) {
    return new Atividade({
      id: this.dao!.generateUuid(),
      plano_trabalho_consolidacao_id: this.entity!.id,
      plano_trabalho_entrega_id: entrega.id
    });
  }

  public async loadAtividade(form: FormGroup, row: any) {
    this.formAtividade.patchValue({
      esforco: row.esforco,
      realizado: row.realizado,
      descricao: row.descricao
    });
    this.cdRef.detectChanges();
  }

  public async removeAtividade(atividades: Atividade[], row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
      try {
        let atividade = row as Atividade;
        await this.atividadeDao?.delete(atividade);
        atividades.splice(atividades.findIndex(x => x.id == atividade.id), 1);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  public async saveAtividade(form: FormGroup, row: any) {
    let result = undefined;
    this.formAtividade.markAllAsTouched();
    if (this.formAtividade!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.esforco = form.controls.esforco.value;
      row.realizado = form.controls.esforco.value;
      row.descricao = form.controls.descricao.value;
      result = await this.atividadeDao?.save(row);
    }
    return result;
  }

  public atividadeDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push(Object.assign({}, this.gridEntregas!.BUTTON_EDIT, {}));
    result.push(Object.assign({}, this.gridEntregas!.BUTTON_DELETE, {}));
    return result;
  }  

  /***************************************************************************************
  * Ocorrências 
  ****************************************************************************************/
  public async addOcorrencia() {
    return new PlanoTrabalhoConsolidacaoOcorrencia({
      plano_trabalho_consolidacao_id: this.entity!.id
    });
  }

  public async loadOcorrencia(form: FormGroup, row: any) {
    this.formAtividade.patchValue({
      data_inicio: row.data_inicio,
      data_fim: row.data_fim,
      descricao: row.descricao
    });
    this.cdRef.detectChanges();
  }

  public async removeOcorrencia(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir o item ?");
    if (confirm) {
      try {
        let ocorrencia = row as PlanoTrabalhoConsolidacaoOcorrencia;
        await this.consolidacaoOcorrenciaDao?.delete(ocorrencia);
        this.itemsOcorrencias.splice(this.itemsOcorrencias.findIndex(x => x.id == ocorrencia.id), 1);
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  public async saveOcorrencia(form: FormGroup, row: any) {
    let result = undefined;
    this.formOcorrencia.markAllAsTouched();
    if (this.formOcorrencia!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.data_inicio = form.controls.data_inicio.value;
      row.data_fim = form.controls.data_fim.value;
      row.descricao = form.controls.descricao.value;
      result = await this.consolidacaoOcorrenciaDao?.save(row);
    }
    return result;
  }

  public ocorrenciaDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    //result.push({ hint: "Adicionar filho", icon: "bi bi-plus-circle", onClick: this.addChildProcesso.bind(this) });
    return result;
  }  

  /***************************************************************************************
  * Ocorrências 
  ****************************************************************************************/
  public async addAfastamento() {
    this.go.navigate({route: ['cadastros', 'afastamento'], params: {usuarioId: this.entity!.plano_trabalho!.usuario_id}}, {
      filterSnapshot: undefined,
      querySnapshot: undefined,
      modalClose: (modalResult) => {
        if(modalResult) this.loadData(this.entity!, this.form);
      }
    });
  }
 
}
