import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
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
  eixo: EixoTematico,
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

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.objetivoDao = injector.get<PlanejamentoObjetivoDaoService>(PlanejamentoObjetivoDaoService);
    this.join = ['objetivos'];
    this.title = "Objetivos do " + this.lex.noun('planejamento Institucional', true);
    this.form = this.fh.FormBuilder({
      planejamento_id: {default: null}
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
      this.form!.controls.planejamento_id.setValue(this.planejamentos.length ? this.planejamentos[0].key : null);
    });
  }

  public onPlanejamentoChange() {
    this.dao!.getById(this.planejamentoInstitucional!.selectedItem?.key, this.join).then(planejamento => {
      this.planejamento = planejamento as Planejamento;
      this.eixos = this.query!.extra?.eixos?.filter((x: EixoTematico) => this.planejamento?.objetivos?.find(y => y.eixo_tematico_id == x.id)).map((x: EixoTematico) => Object.assign({} as EixoPlanejamento, {
        eixo: x,
        objetivos: this.planejamento?.objetivos?.filter(y => y.eixo_tematico_id == x.id) || []
      })) || [];
      this.cdRef.detectChanges();
    });
  }

  public onObjetivoClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo.id]});
  }

  public onObjetivoDeleteClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;

  }

  public onObjetivoEditClick(data: any) {
    let objetivo = data as PlanejamentoObjetivo;
    this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo'] }, {
      metadata: { planejamento: this.planejamento!, objetivo: objetivo }, modalClose: async (modalResult) => {
        if (modalResult) this.objetivoDao?.save(modalResult).then(planejamento => {
          this.onPlanejamentoChange();
        });
      }
    });
  }

  /* Drag & Drop */
  onObjetivoDrop(event: DndDropEvent, list?: any[]) {
    console.log("Drop", event);
    list?.splice(typeof event.index === 'undefined' ? list.length : event.index, 0, event.data);
  }

  onObjetivoDragEnd(event: DragEvent) {
    console.log("DragEnd", event);
  }

  onObjetivoDragged(item: any, list: any[], effect: DropEffect) {
    console.log("Dragged", item, list);
    list.splice(list.indexOf(item), 1);
  }

  onObjetivoDragStart(event: DragEvent) {
    console.log("DragStart", event);
  }

}