import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoTarefa } from 'src/app/models/projeto-tarefa.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageBase } from 'src/app/modules/base/page-base';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'projeto-tarefa-filter',
  templateUrl: './projeto-tarefa-filter.component.html',
  styleUrls: ['./projeto-tarefa-filter.component.scss']
})
export class ProjetoTarefaFilterComponent extends PageBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() formDisabled: boolean = false;
  @Input() change?: (tarefas: ProjetoTarefa[]) => void;
  @Input() set projeto(value: Projeto | undefined) {
    if(this._projeto != value) {
      this._projeto = value;
      this.loadTarefas();
    }
  }
  get projeto(): Projeto | undefined {
    return this._projeto;
  }

  public form: FormGroup;
  public tarefas: ProjetoTarefa[] = [];
  public projetoService: ProjetoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public buttons: ToolbarButton[] = [
    {
      icon: "bi bi-check-all",
      color: "btn btn-outline-success",
      label: "Selecionar",
      onClick: (...args: any[]) => {
        this.grid?.setMultiselectSelectedItems(this.tarefas.filter(tarefa => 
          (this.form.controls.usuario_id?.value?.length && tarefa.alocacoes?.find(x => x.recurso?.usuario_id == this.form.controls.usuario_id?.value)) ||
          (this.form.controls.unidade_id?.value?.length && tarefa.alocacoes?.find(x => x.recurso?.unidade_id == this.form.controls.unidade_id?.value))
          //(this.util.isDataValid(this.form.controls.inicio?.value) && tarefa.inicio.getTime() )
        ));
      }
    },
    {
      label: "Todos",
      icon: "bi bi-grid-fill",
      hint: "Selecionar",
      color: "btn-outline-danger",
      onClick: (...args: any[]) => this.grid?.onSelectAllClick()
    }, {
      label: "Nenhum",
      icon: "bi bi-grid",
      hint: "Selecionar",
      color: "btn-outline-danger",
      onClick: (...args: any[]) => this.grid?.onUnselectAllClick()
    }
  ];

  private _projeto?: Projeto;
  
  constructor(public injector: Injector) {
    super(injector);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: {default: null},
      unidade_id: {default: null},
      inicio: {default: null},
      fim: {default: null}
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.grid?.enableMultiselect(true);
  }

  public getLevel(tarefa: ProjetoTarefa) {
    return (tarefa.path || "").split("/").length;
  }

  public loadTarefas() {
    this.grid?.onUnselectAllClick();
    this.tarefas = [new ProjetoTarefa({
      id: this._projeto?.id,
      index: 0,
      nome: this._projeto?.nome || "PROJETO",
      descricao: this.projeto?.descricao || "",
      inicio: this._projeto?.inicio || new Date(),
      termino: this._projeto?.termino || new Date()
    })];
    this.tarefas.push(...(this._projeto?.tarefas?.sort((a, b) => a.indice < b.indice ? -1 : 1) || []));
    this.cdRef.detectChanges();
    this.grid?.onSelectAllClick();
  }

  public onMultiselectChange(multiselected: IIndexable) {
    if(this.change) this.change(Object.values(multiselected) as ProjetoTarefa[]);
  }

}
