import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { QueryContext } from 'src/app/dao/query-context';
import { IIndexable } from 'src/app/models/base.model';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

export type EixoPlanejamento = {
  id?: string,
  eixo: EixoTematico,
  eixo_tematico_id: string,
  objetivos: PlanejamentoObjetivo[]
}

@Component({
  selector: 'planejamento-mapa',
  templateUrl: './planejamento-mapa.component.html',
  styleUrls: ['./planejamento-mapa.component.scss']
})
export class PlanejamentoMapaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('planejamentoInstitucional', { static: false }) public planejamentoInstitucional?: InputSelectComponent;

  public canEdit: boolean = true;
  public planejamentos: LookupItem[] = [];
  public planejamento?: Planejamento;
  public eixos: EixoPlanejamento[] = [];
  public query?: QueryContext<Planejamento>;
  public objetivoDao?: PlanejamentoObjetivoDaoService;
  public objetivos: PlanejamentoObjetivo[] = [];
  public subObjetivosMenu: ToolbarButton = {
    icon: "bi bi-three-dots-vertical",
    color: "transparent-black p-1 py-0",
    items: [
      {
        icon: "bi bi-file-earmark-bar-graph",
        label: "Entregas",
        onClick: this.onObjetivoClick.bind(this)
      },
      {
        icon: "bi bi-pencil-square",
        label: "Alterar",
        onClick: this.onObjetivoEditClick.bind(this) 
      },
      {
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.onObjetivoDeleteClick.bind(this)
      }
    ]
  };

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.objetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.join = ['objetivos'];
    this.title = "Objetivos do " + this.lex.translate('planejamento Institucional', true);
    this.form = this.fh.FormBuilder({
      planejamento_id: {default: null},
      todos: {default: false}
    }, this.cdRef, this.validate);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.query = this.dao!.query({ where: [["data_arquivamento", "==", null]], orderBy: [["inicio", "desc"]] }) as QueryContext<Planejamento>;
    this.query!.asPromise().then(planejamentos => {
      this.planejamentos = planejamentos.map(x => Object.assign({} as LookupItem, {
        key: x.id,
        value: x.nome,
        data: x
      }));
      this.cdRef.detectChanges();
      this.form!.controls.planejamento_id.setValue(this.planejamentos.length ? this.planejamentos[0].key : null);
    });
  }

  public objetivosPai(filhoId: string) {
    let items: PlanejamentoObjetivo[] = [];
    let addItens = (list: PlanejamentoObjetivo[]) => {
      for(let item of list) {
        if(item.id != filhoId) {
          items.push(item);
          addItens(this.objetivos.filter(x => x.objetivo_pai_id == item.id).sort((a,b) => a.sequencia - b.sequencia));
        }
      }
    }
    addItens(this.objetivos.filter(x => !x.objetivo_pai_id).sort((a,b) => a.sequencia - b.sequencia));
    return items;
  }

  public marcador(row: PlanejamentoObjetivo): string {
    let level = row._metadata?.level || 0;
    return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
  }

  public objetivosEixo(eixoId: string) {
    let objetivos = this.planejamento?.objetivos?.filter(y => y.eixo_tematico_id == eixoId && !y.objetivo_pai_id).sort((a, b) => a.sequencia - b.sequencia) || [];
    let recursivo = (list: PlanejamentoObjetivo[], level: number) => {
      for(let item of list) {
        item.objetivos = this.planejamento?.objetivos?.filter(y => y.objetivo_pai_id == item.id).sort((a, b) => a.sequencia - b.sequencia) || [];
        item._metadata = Object.assign(item._metadata || {}, { level })
        recursivo(item.objetivos, level + 1);
      }
    }
    recursivo(objetivos, 0);
    return objetivos;
  }

  public onPlanejamentoChange() {
    if(this.planejamentoInstitucional!.selectedItem) {
      this.dao!.getById(this.planejamentoInstitucional!.selectedItem?.key, this.join).then(planejamento => {
        this.planejamento = planejamento as Planejamento;
        this.objetivos = this.planejamento.objetivos || [];
        this.eixos = this.query!.extra?.eixos?.filter((x: EixoTematico) => this.form?.controls.todos.value || this.planejamento?.objetivos?.find(y => y.eixo_tematico_id == x.id)).map((x: EixoTematico) => Object.assign({} as EixoPlanejamento, {
          eixo: x,
          eixo_tematico_id: x.id,
          objetivos: this.objetivosEixo(x.id)
        })) || [];
        this.cdRef.detectChanges();
      });
    }
  }

  public onTodosChange() {
    this.onPlanejamentoChange();
  }

  public onObjetivoClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id]});
  }

  public onObjetivoAddClick(data: any) {
    let eixo = this.eixos.find(x => x.eixo.id == data.id);   
    let objetivo = new PlanejamentoObjetivo({
      _status: "ADD",
      id: this.dao!.generateUuid(),
      planejamento_id: this.planejamento?.id,
      eixo_tematico_id: data.eixo.id,
      eixo_tematico: data.eixo,
      sequencia: eixo?.objetivos.length ? eixo?.objetivos[0].sequencia : 0
    });
    this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
      metadata: { 
        planejamento: this.planejamento!, 
        objetivo: objetivo,
        objetivos: this.objetivosPai(objetivo.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) this.objetivoDao!.save(modalResult).then(objetivo => this.onPlanejamentoChange());
      }
    });
  }

  public onObjetivoDeleteClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;
    this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
      if (confirm) this.objetivoDao!.delete(objetivo).then(result => this.onPlanejamentoChange());
    });
  }

  public onObjetivoEditClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;
    this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
      metadata: { planejamento: this.planejamento!, objetivo: objetivo }, modalClose: async (modalResult) => {
        if (modalResult) this.objetivoDao?.save(modalResult).then(planejamento => this.onPlanejamentoChange());
      }
    });
  }

  /* Drag & Drop */
  onObjetivoDrop(event: DndDropEvent, dropped: EixoPlanejamento | PlanejamentoObjetivo) {
    console.log("Drop", event);
    dropped.objetivos = dropped.objetivos || [];
    let objetivo = event.data as PlanejamentoObjetivo; 
    let index = typeof event.index === 'undefined' ? dropped.objetivos.length : event.index;
    let neighborhood = index ? (dropped.objetivos[index] || dropped.objetivos[index-1] || undefined) : undefined;
    dropped.objetivos.splice(index, 0, objetivo);
    this.loading = true;
    this.objetivoDao?.update(objetivo.id, {
      eixo_tematico_id: dropped.eixo_tematico_id,
      objetivo_pai_id: dropped.id || null,
      sequencia: neighborhood?.sequencia || 0
    }).then(result => this.onPlanejamentoChange()).finally(() => this.loading = false);
  }

  onObjetivoDragEnd(event: DragEvent) {
    console.log("DragEnd", event);
  }

  onObjetivoDragged(item: any, dragged: EixoPlanejamento | PlanejamentoObjetivo, effect: DropEffect) {
    console.log("Dragged", item, dragged.objetivos);
    dragged.objetivos = dragged.objetivos || [];
    dragged.objetivos.splice(dragged.objetivos.indexOf(item), 1);
  }

  onObjetivoDragStart(event: DragEvent) {
    console.log("DragStart", event);
  }

}