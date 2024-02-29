import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { QueryContext } from 'src/app/dao/query-context';
import { IIndexable } from 'src/app/models/base.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';

export class NeastedProcesso extends CadeiaValorProcesso {
  public children: NeastedProcesso[] = [];
  public cor: string = "#010101";
  public level: string = "";
  public constructor(data?: any) { super(); this.initialization(data); }
}

@Component({
  selector: 'cadeia-valor-mapa',
  templateUrl: './cadeia-valor-mapa.component.html',
  styleUrls: ['./cadeia-valor-mapa.component.scss']
})
export class CadeiaValorMapaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('cadeiaValorInstitucional', { static: false }) public cadeiaValorInstitucional?: InputSelectComponent;
  @ViewChild('editProcessoForm', { static: false }) public editProcessoForm?: TemplateRef<any>;

  public cadeiaValorProcessoDao: CadeiaValorProcessoDaoService;
  public cadeiasValor: LookupItem[] = [];
  public cadeiaValor?: CadeiaValor;
  public processos: NeastedProcesso[] = [];
  public query?: QueryContext<CadeiaValor>;
  public canEdit: boolean = true;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<CadeiaValorDaoService>(CadeiaValorDaoService);
    this.cadeiaValorProcessoDao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.join = ['processos'];
    this.title = this.lex.translate('Cadeias de Valores');
    this.form = this.fh.FormBuilder({
      cadeia_valor_id: {default: null},
      nome: {default: ""}
    }, this.cdRef, this.validate);
  }

  public options: ToolbarButton[] = [
    {
      icon: "bi bi-file-earmark-bar-graph",
      label: "Entregas",
      onClick: this.consultProcesso.bind(this)
    },
    { divider: true },
    {
      icon: "bi bi-plus-circle",
      label: "Incluir subprocesso",
      onClick: this.addProcesso.bind(this) 
    },
    {
      icon: "bi bi-pencil-square",
      label: "Alterar",
      onClick: this.editProcesso.bind(this)
    },
    { divider: true },
    {
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.deleteProcesso.bind(this)
    }    
  ]

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "nome" && !control.value?.length) result = "Obrigatório";
    return result;
  }

  public consultProcesso(processo: NeastedProcesso) {
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo!.id]});
  }

  public async addProcesso(processo: NeastedProcesso) {
    let child = new CadeiaValorProcesso({
      path: processo.path + "/" + processo.id,
      cadeia_valor_id: processo.cadeia_valor_id,
      processo_pai_id: processo.id,
      nome: "",
      sequencia: 1
    });
    await this.editProcesso(child as NeastedProcesso);
  }

  public async editProcesso(processo: NeastedProcesso) {
    this.entity = processo;
    this.form!.controls.nome.setValue(processo.nome);
    this.form!.controls.nome.setErrors(null);
    let result = await this.dialog.template({ title: "Processo", modalWidth: 500 }, this.editProcessoForm!, [
      {
        label: "Gravar",
        icon: "bi bi-check-circle",
        color: "btn-outline-success",
        value: "GRAVAR"
      }, {
        label: "Cancelar",
        icon: "bi bi-dash-circle",
        color: "btn btn-outline-danger",
        value: "CANCELAR"
      }
    ]).asPromise();
    if(result.button.value == "GRAVAR") {
      if(this.form!.valid) {
        this.entity.nome = this.form!.controls.nome.value;
        this.submitting = true;
        try {
          let entity = await this.cadeiaValorProcessoDao.save(this.entity);
          if(entity) result.dialog.close();
          await this.refreshCadeiaValor();
        } catch (error: any) {
          this.dialog.alert("Error", error.message ? error.message : error || "Erro desconhecido");
        } finally {
          this.submitting = false;
        }
      } else {
        this.form!.markAllAsTouched();
      }
    } else {
      result.dialog.close();
    }
  }

  public async deleteProcesso(processo: NeastedProcesso) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      try {
        await this.cadeiaValorProcessoDao.delete(processo.id);
        await this.refreshCadeiaValor();
      } catch (error: any) {
        this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error || "Erro desconhecido"));
      }
    }
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.query = this.dao!.query({ where: [["data_arquivamento", "==", null]], orderBy: [["data_inicio", "desc"]], join: this.join }) as QueryContext<CadeiaValor>;
    this.query!.asPromise().then(cadeiasValor => {
      let cadeiaValorId = this.form!.controls.cadeia_valor_id.value;
      this.form!.controls.cadeia_valor_id.setValue(null);
      this.cadeiasValor = cadeiasValor.map(x => Object.assign({} as LookupItem, {
        key: x.id,
        value: x.nome,
        data: x
      }));
      this.cdRef.detectChanges();
      this.form!.controls.cadeia_valor_id.setValue(cadeiaValorId || (this.cadeiasValor.length ? this.cadeiasValor[0].key : null));
    });
  }

  public onCadeiaValorChange() {
    const recursiveProcesso = (level: string, processos: CadeiaValorProcesso[]): NeastedProcesso[] => processos.sort((a, b) => a.sequencia - b.sequencia).map(x => Object.assign(new NeastedProcesso({
      children: recursiveProcesso(level + x.sequencia + '.', this.cadeiaValor!.processos.filter(y => y.processo_pai_id == x.id)),
      level: level + x.sequencia,
      cor: this.lookup.CORES_BACKGROUND[Math.floor(Math.random() * this.lookup.CORES_BACKGROUND.length)].color
    }), x));
    this.cadeiaValor = this.cadeiaValorInstitucional?.selectedItem?.data as CadeiaValor;
    if(this.cadeiaValor) this.processos = recursiveProcesso("", this.cadeiaValor.processos.filter(x => !x.processo_pai_id));
  }

  public async refreshCadeiaValor() {
    await this.loadData(this.entity, this.form);
  }

  public onProcessoClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
    this.go.navigate({route: ['gestao', 'cadeiaValor', this.cadeiaValor?.id, 'objetivos', objetivo.id]});
  }

  public onObjetivoDeleteClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
  }

  public onObjetivoEditClick(data: any) {
    let objetivo = data as CadeiaValorProcesso;
  }

  /* Drag & Drop */
  onDrop(event: DndDropEvent, list?: any[]) {
    console.log("Drop", event);
    list?.splice(typeof event.index === 'undefined' ? list.length : event.index, 0, event.data);
  }

  onDragEnd(event: DragEvent) {
    console.log("DragEnd", event);
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    console.log("Dragged", item, list);
    list.splice(list.indexOf(item), 1);
  }

  onDragStart(event: DragEvent) {
    console.log("DragStart", event);
  }
  
}