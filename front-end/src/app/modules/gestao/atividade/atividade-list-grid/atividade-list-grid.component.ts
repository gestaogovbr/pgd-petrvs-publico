import { Component, ElementRef, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { Atividade } from 'src/app/models/atividade.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { FullRoute, RouteMetadata } from 'src/app/services/navigate.service';
import { AtividadeListBase } from '../atividade-list-base';
import { BadgeButton } from 'src/app/components/badge/badge.component';

@Component({
  selector: 'atividade-list-grid',
  templateUrl: './atividade-list-grid.component.html',
  styleUrls: ['./atividade-list-grid.component.scss']
})
export class AtividadeListGridComponent extends AtividadeListBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('calendarEfemerides', { static: false }) public calendarEfemerides?: TemplateRef<any>;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('etiqueta', { static: false }) public etiqueta?: InputSelectComponent;
  @Input() snapshot?: ActivatedRouteSnapshot;
  @Input() fixedFilter?: any[];

  public static selectRoute?: FullRoute = { route: ["gestao", "atividade", "grid"] };
  public formEdit: FormGroup;

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
    this.modalWidth = 1100;
    this.filter = this.fh.FormBuilder({
      agrupar: { default: true },
      atribuidas_para_mim: { default: false },
      usuario_id: { default: null },
      numero: { default: "" },
      somente_unidade_atual: { default: false },
      unidades_subordinadas: { default: false },
      unidade_id: { default: null },
      numero_processo: { default: "" },
      status: { default: null },
      etiquetas: { default: [] },
      arquivadas: { default: false },
      tipo_atividade_id: { default: null },
      tipo_processo_id: { default: null },
      data_filtro: { default: null },
      data_inicio: { default: null },
      data_fim: { default: null }
    });
    this.formEdit = this.fh.FormBuilder({
      progresso: { default: 0 },
      etiquetas: { default: [] },
      etiqueta: { default: null }
    });
    this.groupBy = [{ field: "unidade.sigla", label: "Unidade" }];
  }

  public storeFilter = (filter?: FormGroup) => {
    const form = filter?.value;
    return {
      atribuidas_para_mim: form.atribuidas_para_mim,
      usuario_id: form.usuario_id,
      somente_unidade_atual: form.somente_unidade_atual,
      unidades_subordinadas: form.unidades_subordinadas,
      unidade_id: form.somente_unidade_atual ? null : form.unidade_id
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    if(this.metadata?.atribuidas_para_mim){
      this.filter?.controls.atribuidas_para_mim.setValue(true);
      this.filter?.controls.usuario_id.setValue(this.auth.usuario?.id);
    }

    if (this.fixedFilter) {
      const status = this.fixedFilter.find(x => x[0] == "status");
      if (status) this.filter?.controls.status.setValue(status[2]);
    }
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public onStatusClick(status: BadgeButton) {
    this.filter?.controls.status.setValue(status.data?.status);
    this.grid!.showFilter();
    this.grid!.reloadFilter();
  }

  public onEtiquetaClick(etiqueta: LookupItem) {
    let etiquetas = this.filter!.controls.etiquetas.value;
    etiquetas.push(etiqueta);
    this.filter?.controls.etiquetas.setValue(etiquetas);
    this.grid!.showFilter();
    this.grid!.reloadFilter();
  }

  public async onColumnProgressoEtiquetasChecklistEdit(row: any) {
    this.formEdit.controls.progresso.setValue(row.progresso);
    this.formEdit.controls.etiquetas.setValue(row.etiquetas);
    this.formEdit.controls.etiqueta.setValue(null);
    this.etiquetas = this.util.merge(row.atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key);
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

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = this.fixedFilter || [];
    let form: any = filter.value;

    /* Verifica se estiver marcado Atual e a Unidade for diferente da Lotacao da barra superior */
    if (form.somente_unidade_atual && form.unidade_id != this.auth.unidade?.id) {
      filter.controls.unidade_id.setValue(this.auth.unidade?.id);
      form.unidade_id = this.auth.unidade?.id;
    }
    /* Verifica se Minhas está selecionado e o usuário está diferente do logado (vazio) */
    if (form.atribuidas_para_mim && form.usuario_id != this.auth.usuario?.id) {
      filter.controls.usuario_id.setValue(this.auth.usuario?.id);
      form.usuario_id = this.auth.usuario?.id;
    }
    /* Filtros */
    if (form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
    }
    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }
    if (form.unidades_subordinadas) {
      result.push(["unidades_subordinadas", "==", true]);
    }
    if (form.etiquetas?.length) {
      result.push(["etiquetas", "in", form.etiquetas.map((x: LookupItem) => x.value)]);
    }
    if (form.numero_processo?.length) {
      result.push(["numero_processo", "==", form.numero_processo]);
    }
    if (form.numero?.length) {
      result.push(["numero", "==", form.numero]);
    }
    if (form.status?.length && !result.find(x => x[0] == "status")) {
      result.push(["status", "==", form.status]);
      if (form.status == "ARQUIVADO") this.filter!.controls.arquivadas.setValue(true);
    }
    if (!this.filter!.controls.arquivadas.value) {
      result.push(["data_arquivamento", "==", null]);
    }
    if (form.tipo_atividade_id?.length) {
      result.push(["tipo_atividade_id", "==", form.tipo_atividade_id]);
    }
    if (form.tipo_processo_id?.length) {
      result.push(["tipo_processo_id", "==", form.tipo_processo_id]);
    }
    if (form.data_filtro?.length) {
      const field = form.data_filtro == "DISTRIBUICAO" ? "data_distribuicao" : form.data_filtro == "PRAZO" ? "data_estipulada_entrega" : "data_entrega";
      if (form.data_inicio) {
        result.push([field, ">=", form.data_inicio]);
      }
      if (form.data_fim) {
        result.push([field, "<=", form.data_fim]);
      }
    }

    return result;
  }

  public filterClear(filter: FormGroup) {
    this.filter!.controls.atribuidas_para_mim.setValue(false);
    this.filter!.controls.usuario_id.setValue(null);
    this.filter!.controls.somente_unidade_atual.setValue(false);
    this.filter!.controls.unidades_subordinadas.setValue(false);
    this.filter!.controls.unidade_id.setValue(null);
    this.filter!.controls.numero_processo.setValue("");
    this.filter!.controls.atividade_id.setValue(null);
    this.filter!.controls.tipo_processo_id.setValue(null);
    this.filter!.controls.data_filtro.setValue(null);
    this.filter!.controls.data_inicio.setValue(null);
    this.filter!.controls.data_fim.setValue(null);
    if (!this.fixedFilter?.length || !this.fixedFilter.find(x => x[0] == "status")) this.filter!.controls.status.setValue(null);
    this.filter!.controls.etiquetas.setValue([]);
    super.filterClear(filter);
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

}

