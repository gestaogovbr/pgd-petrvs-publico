import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { Plano } from 'src/app/models/plano.model';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { PlanoTrabalhoEntregaDaoService } from 'src/app/dao/plano-trabalho-entrega-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';

@Component({
  selector: 'plano-list-entrega',
  templateUrl: './plano-list-entrega.component.html',
  styleUrls: ['./plano-list-entrega.component.scss']
})
export class PlanoListEntregaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Plano | undefined) { super.entity = value; } get entity(): Plano | undefined { return super.entity; }
  @Input() set disabled(value: boolean) { if (this._disabled != value) this._disabled = value; } get disabled(): boolean { return this._disabled; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  //@Input() eixos?: EixoTematico[];

  public get items(): PlanoTrabalhoEntrega[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Plano());
    if (!this.gridControl.value.entregas) this.gridControl.value.entregas = [];
    return this.gridControl.value.entregas;
  }
  public minHeight: number = 350;
  public options: ToolbarButton[] = [];
  public entregaDao?: PlanoTrabalhoEntregaDaoService;
  //public eixoDao?: EixoTematicoDaoService;
  private _disabled: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanoDaoService>(PlanoDaoService);
    this.entregaDao = injector.get<PlanoTrabalhoEntregaDaoService>(PlanoTrabalhoEntregaDaoService);
    //this.eixoDao = injector.get<EixoTematicoDaoService>(EixoTematicoDaoService);
    //this.groupBy = [{ field: "eixo_tematico_id", label: "Eixo Temático" }];
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      plano_id: {default: null},
      entrega_id: {default: null},
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    //this.eixos = this.metadata?.eixos || this.eixos;
    //this.sortEntregas();
/*     if (!this.eixos) this.eixoDao?.query().getAll().then(eixos => {
      this.eixos = eixos;
    }); */
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let entrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    if (this.auth.hasPermissionTo('MOD_PTR_EDT') && !this.disabled) {
      result.push({ hint: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: (entrega: PlanoTrabalhoEntrega) => { this.editEntrega(entrega); } });
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let entrega: PlanoTrabalhoEntrega = row as PlanoTrabalhoEntrega;
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (entrega: PlanoTrabalhoEntrega) => this.go.navigate({ route: ['gestao', 'plano', 'entrega', entrega.id, 'consult'] }, { modal: true }) });
    if (this.auth.hasPermissionTo('MOD_PTR_EXCL') && !this.disabled) {
      result.push({ label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: (entrega: PlanoTrabalhoEntrega) => { this.removeEntrega(entrega); } });
    }
    return result;
  }

/*   public marcador(row: PlanoTrabalhoEntrega): string {
    let level = row._metadata?.level || 0;
    return level < 1 ? "" : (level < 2 ? "• " : (level < 3 ? "- " : "+ "));
  } */

  public async addEntrega() {
    // ************ 
    // se for adicionar um entrega num grid não persistente é necessário checar se o planejamento é da entidade ou da unidade, pois se
    // se for de uma unidade será obrigatório já ter escolhido o planejamento superior
    let entrega = new PlanoTrabalhoEntrega({ 
      _status: "ADD", 
      id: this.dao!.generateUuid(),
      plano_id: this.entity?.id
    });
    this.go.navigate({ route: ['gestao', 'plano', 'entrega'] }, {
      metadata: { 
        plano: this.entity!, 
        entrega: entrega,
        //entregas: this.entregasPai(entrega.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          try {
            this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.entregaDao!.save(modalResult)); 
            //this.sortEntregas();
          } catch (error: any) {
            this.error(error?.error || error?.message || error);            
          }
        };
      }
    });
  }

/*   public entregasPai(filhoId: string) {
    let items: Planejamentoentrega[] = [];
    let addItens = (list: Planejamentoentrega[]) => {
      for(let item of list) {
        if(item.id != filhoId) {
          items.push(item);
          addItens(this.items.filter(x => x.entrega_pai_id == item.id).sort((a,b) => a.sequencia - b.sequencia));
        }
      }
    }
    addItens(this.items.filter(x => !x.entrega_pai_id).sort((a,b) => a.sequencia - b.sequencia));
    return items;
  } */

/*   public sortentregas() {
    let items: Planejamentoentrega[] = [];
    let addItens = (list: Planejamentoentrega[], level: number) => {
      for(let item of list) {
        item._metadata = Object.assign(item._metadata || {}, { level });
        items.push(item);
        if(item._status != "DELETE") addItens(this.items.filter(x => x.entrega_pai_id == item.id).sort((a,b) => a.sequencia - b.sequencia), level + 1);
      }
    }
    addItens(this.items.filter(x => !x.entrega_pai_id).sort((a,b) => a.sequencia - b.sequencia), 0);
    this.items.length = 0;
    this.items.push(...items);
    this.cdRef.detectChanges();
  } */

  public async editEntrega(entrega: PlanoTrabalhoEntrega) {
    entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
    let index = this.items.indexOf(entrega);
    this.go.navigate({ route: ['gestao', 'plano', 'entrega'] }, {
      metadata: { 
        plano: this.entity!, 
        entrega: entrega,
        //objetivos: this.objetivosPai(objetivo.id) 
      },
      modalClose: async (modalResult) => {
        if (modalResult) {
          if (!this.isNoPersist) await this.entregaDao?.save(modalResult);
          this.items[index] = modalResult;
          //this.sortObjetivos();
        };
      }
    });
  }

  public async removeEntrega(entrega: PlanoTrabalhoEntrega) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if (confirm) {
      let index = this.items.indexOf(entrega);
      if (this.isNoPersist) {
        entrega._status = "DELETE";
      } else {
        await this.entregaDao!.delete(entrega);
        this.grid?.items.splice(index, 1);
      };
      //this.sortObjetivos();
      return true;
    } else {
      return false;
    }
  }

/*   public getEixo(id: string): EixoTematico | undefined {
    return this.eixos?.find(x => x.id == id);
  } */

}


