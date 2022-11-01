import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

export type UnidadeMerge = {
  id: string,
  unidade_origem_id: string,
  unidade_destino_id: string,
  unidade_origem?: Unidade,
  unidade_destino?: Unidade
}

@Component({
  selector: 'app-unidade-merge',
  templateUrl: './unidade-merge.component.html',
  styleUrls: ['./unidade-merge.component.scss']
})
export class UnidadeMergeComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidadeOrigem', { static: false }) public unidadeOrigem?: InputSearchComponent;
  @ViewChild('unidadeDestino', { static: false }) public unidadeDestino?: InputSearchComponent;

  public items: UnidadeMerge[] = [];
  public toolbarButtons: ToolbarButton[] = [
    {
      icon: "bi bi-yin-yang",
      label: "Mesma sigla",
      hint: "Unificar todos que tenham a mesma sigla. Sendo a inativa considerada como origem.",
      onClick: this.onMesmaSiglaClick.bind(this)
    }
  ];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      exclui_origem: {default: false},
      origem_inativo: {default: true},
      unidade_origem_id: {default: ""},
      unidade_destino_id: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public onMesmaSiglaClick() {
    this.loading = true;
    (this.dao as UnidadeDaoService).mesmaSigla().then(unidades => {
      let destinos: Unidade[] = [];
      destinos = unidades.reduce((acumulador, valor) => {
        if(!valor.inativo && !acumulador.find(x => x.sigla == valor.sigla)) acumulador.push(valor);
        return acumulador; 
      }, destinos);
      let destinosIds = destinos.map(x => x.id);
      let origens = unidades.filter(x => !destinosIds.includes(x.id) && !!x.inativo);
      let origensIds = origens.map(x => x.id);
      this.items = [];
      for(let origem of origens) {
        let destino = destinos.find(x => x.sigla == origem.sigla);
        if(destino) {
          this.items.push({
            id: this.util.md5(),
            unidade_origem_id: origem.id,
            unidade_destino_id: destino.id,
            unidade_origem: origem,
            unidade_destino: destino
          });
        }
      }
      /* Pegas as unidade que tem a Sigla repetida mas que não estão inativas */
      let error: string[] = [];
      for(let unidade of unidades) {
        if(!destinosIds.includes(unidade.id) && !origensIds.includes(unidade.id)) error.push(unidade.codigo + " - " + unidade.sigla + " - " + unidade.nome);
      }
      if(error.length) this.editableForm!.error = (error.length == 1 ? "A unidade abaixo possui duplicidade de SIGLA, mas não está inativa:" : "As unidades abaixo possuem duplicidade de SIGLA, mas não estão inativas:") + "\n" + error.join("\n");
    }).finally(() => {
      this.loading = false;
    });
  }

  public async addMerge() {
    return {
      id: this.util.md5(),
      unidade_origem_id: "",
      unidade_destino_id: "",
      unidade_origem: undefined,
      unidade_destino: undefined
    } as IIndexable;
  }

  public async loadMerge(form: FormGroup, row: any) {
    form.controls.unidade_origem_id.setValue(row.unidade_origem_id);
    form.controls.unidade_destino_id.setValue(row.unidade_destino_id);
  }

  public async removeMerge(row: any) {
    return true;
  }

  public async saveMerge(form: FormGroup, row: any) {
    let result = undefined;
    if(this.form!.controls.unidade_origem_id.value?.length || this.form!.controls.unidade_destino_id.value?.length) {
      row.unidade_origem_id = form.controls.unidade_origem_id.value;
      row.unidade_origem = this.unidadeOrigem?.selectedItem?.entity || await this.dao?.getById(row.unidade_origem_id);
      row.unidade_destino_id = form.controls.unidade_destino_id.value;
      row.unidade_destino = this.unidadeDestino?.selectedItem?.entity || await this.dao?.getById(row.unidade_destino_id);
      result = row;
    }
    return result;
  }

  public onMerge() {
    let error: string | undefined = undefined;
    for(let row of this.items) error = error || (!row.unidade_origem_id?.length || !row.unidade_destino_id?.length ? "A origem e o destino precisam estar preenchidos em todos" : undefined);
    this.editableForm!.error = error;
    if(!error?.length) {
      this.loading = true;
      (this.dao as UnidadeDaoService).unificar(this.items.map(x => Object.assign({}, {unidade_origem_id: x.unidade_origem_id, unidade_destino_id: x.unidade_destino_id})), this.form!.controls.exclui_origem.value).then(result => {
        if(result) this.close();
      }).finally(() => {
        this.loading = false;
      });
    }
  }

}
