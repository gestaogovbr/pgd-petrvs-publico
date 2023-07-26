import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { UsuarioIntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-usuario-integrante',
  templateUrl: './usuario-integrante.component.html',
  styleUrls: ['./usuario-integrante.component.scss']
})
export class UsuarioIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public integranteDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public items: UsuarioIntegranteConsolidado[] = [];
  public usuarioId: string = "";
  public usuario?: Unidade;

  constructor(public injector: Injector) {
    super(injector);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      unidade_id: {default: ""},
      atribuicoes: {default: undefined},
      atribuicao: {default: ""}
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.usuarioId = this.urlParams!.get("idUsuario") as string;
  }

  ngAfterViewInit() {
    (async () => {
      await this.loadData({}, this.form);
    })();
  }

  /**
   * Método chamado na inicialização do componente para carregar todas as unidades-integrantes do usuário.
   * @param entity 
   * @param form 
   */
  public async loadData(entity: IIndexable, form?: FormGroup | undefined) {
/*     this.grid!.loading = true;
    try {
      let result = await this.integranteDao!.loadUnidadesIntegrantes(this.unidadeId);
      this.items = result.integrantes;
      this.unidade = result.unidade;
    } finally {
      this.grid!.loading = false;
    }
    this.cdRef.detectChanges(); */
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async addIntegrante() {
/*     return {
      id: this.integranteDao!.generateUuid(),
      usuario_id: "",
      atribuicoes: []
    } as IIndexable; */
  }

  public addItemHandleAtribuicoes(): LookupItem | undefined {
    let result = undefined;
/*     const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
    const key = this.form!.controls.atribuicao.value;
    if(value?.length && this.util.validateLookupItem(this.form!.controls.atribuicoes.value, key)) {
      const icon = this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
      const color = this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
      result = {
        key: key,
        value: value,
        icon: icon,
        color: color
      };
      this.form!.controls.atribuicao.setValue("");
    } */
    return result;
  };

  /**
   * Método chamado na edição de um integrante da Unidade.
   * @param form 
   * @param row 
   */
  public async loadIntegrante(form: FormGroup, row: any) {
/*     form.controls.usuario_id.setValue(row.usuario_id);
    form.controls.atribuicoes.setValue(row.atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    })));
    form.controls.atribuicao.setValue(""); */
  }

  public async removeIntegrante(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
/*       this.loading = true;
      try {
        await this.integranteDao.saveIntegrante(this.unidade!.id, Object.assign(row, { atribuicoes: [] }));
        await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      } */
      return true;
    } else {
      return false;
    }
  }

  public async saveIntegrante(form: FormGroup, row: any) {
/*     let consolidado = row as UnidadeIntegranteConsolidado;
    if(form!.controls.atribuicoes.value.length) {
      consolidado.usuario_id = form!.controls.usuario_id.value;
      consolidado.atribuicoes = form!.controls.atribuicoes.value.map((x: LookupItem) => x.key);
      this.loading = true;
      try {
        await this.integranteDao.saveIntegrante(this.unidade!.id, consolidado);
        await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      }
    } */
    return undefined;
  }

}
