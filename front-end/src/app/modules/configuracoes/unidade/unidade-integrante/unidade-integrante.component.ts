import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

export type UnidadeIntegranteItem = {
  usuario?: Usuario;
  usuario_id: string;
  atribuicoes: LookupItem[];
};

@Component({
  selector: 'app-unidade-integrante',
  templateUrl: './unidade-integrante.component.html',
  styleUrls: ['./unidade-integrante.component.scss']
})
export class UnidadeIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public items: UnidadeIntegranteItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: {default: ""},
      atribuicoes: {default: undefined},
      atribuicao: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async addIntegrante() {
    return {
      id: this.dao!.generateUuid(),
      usuario_id: "",
      atribuicoes: []
    } as IIndexable;
  }

  public async loadIntegrante(form: FormGroup, row: any) {
    form.controls.usuario_id.setValue(row.usuario_id);
    form.controls.atribuicoes.setValue(row.atribuicoes);
    form.controls.atribuicao.setValue("");
  }

  public async removeIntegrante(row: any) {
    return true;
  }

  public async saveIntegrante(form: FormGroup, row: any) {
    let result = undefined;
    /* Realizar validações */
    return result;
  }


}
