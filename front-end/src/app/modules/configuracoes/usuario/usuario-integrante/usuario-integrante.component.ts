import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable, IntegranteAtribuicao } from 'src/app/models/base.model';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'usuario-integrante',
  templateUrl: './usuario-integrante.component.html',
  styleUrls: ['./usuario-integrante.component.scss']
})
export class UsuarioIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Usuario | undefined) { super.entity = value; } get entity(): Usuario | undefined { return super.entity; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() public entity_id?: string;

  public items: IntegranteConsolidado[] = [];
  public integranteDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuario?: Usuario;
  public tiposAtribuicao: LookupItem[] = [];
  public unidadesJaVinculadas: string[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: { default: "" },
      unidade_id: { default: "" },
      atribuicoes: { default: undefined },
      atribuicao: { default: "" },
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.entity || this.entity;
    this.entity_id = this.metadata?.entity_id || this.entity_id;
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter((atribuicao) => atribuicao.key != "LOTADO") : this.lookup.UNIDADE_INTEGRANTE_TIPO;
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new Usuario());
    await this.loadData(this.entity!, form);
  }

  /**
   * Método chamado na inicialização do componente para carregar todas as unidades-integrantes do usuário.
   * @param entity 
   * @param form 
   */
  public async loadData(entity: IIndexable, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.grid!.loading = true;
    try {
      let result = await this.integranteDao!.loadIntegrantes("", this.entity!.id);
      this.items = result.integrantes.filter(x => x.atribuicoes.length > 0);
      this.usuario = result.usuario;
      this.unidadesJaVinculadas = (this.items as IntegranteConsolidado[]).map(x => x.id);
    } finally {
      this.grid!.loading = false;
    }
    this.cdRef.detectChanges();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (["unidade_id"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    }
    if (controlName == "atribuicoes" && !control.value?.length) {
      result = "Obrigatório ao menos uma atribuição!";
    }
    return result;
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
    const key = this.form!.controls.atribuicao.value;
    if (value?.length && this.util.validateLookupItem(this.form!.controls.atribuicao.value, key)) {
      const icon = this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
      const color = this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
      result = {
        key: key,
        value: value,
        icon: icon,
        color: color
      };
      this.form!.controls.atribuicao.setValue("");
    }
    return result;
  };

  public deleteItemHandle(row: LookupItem): boolean | undefined | void {
    return !this.isNoPersist || (this.isNoPersist && row.key != "LOTADO");
  };

  /**
   * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
   * @returns 
   */
  public async addAtribuicao() {
    return Object.assign(new IntegranteConsolidado(), {
      id: this.dao!.generateUuid(),   // ainda não sei pra que esse id nesse momento
      atribuicoes: []
      //usuario_id: this.entity?.id
    }) as IIndexable;
  }

  /**
   * Método utilizado durante a inclusão/alteração de uma atribuição no grid, seja este componente persistente ou não
   * @param form 
   * @param row 
   */
  public async loadAtribuicao(form: FormGroup, row: any) {
    form.controls.atribuicoes.setValue(this.converterAtribuicoes(row.atribuicoes));
    form.controls.unidade_id.setValue(row.id);
    form.controls.atribuicao.setValue("");
  }

  /**
   * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removeAtribuicao(row: any) {
    let a = (row as IntegranteConsolidado).usuario_nome;
    let b = (row as IntegranteConsolidado).unidade_nome;
    let nome = (row as IntegranteConsolidado).usuario_nome || (row as IntegranteConsolidado).unidade_nome;
    let confirm = await this.dialog.confirm("Excluir '" + nome + "'", "Deseja realmente excluir?");
    if (confirm) {
      this.loading = true;
      try {
        if(!this.isNoPersist) this.integranteDao.saveIntegrante([{'unidade_id': row.id, 'usuario_id': this.usuario!.id, 'atribuicoes': []}]);
        //await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      }
      return this.isNoPersist ? false : true; // (*3)
    } else {
      return false;
    }
  }

  /**
 * Método chamado no salvamento de uma atribuição do usuário, seja este componente persistente ou não.
 * @param form 
 * @param row 
 * @returns 
 */
  public async saveAtribuicao(form: FormGroup, row: any) {
    this.loading = true;
    let novoIntegrante: IntegranteConsolidado = new IntegranteConsolidado;
    try {
      let novasAtribuicoes: IntegranteAtribuicao[] = form!.controls.atribuicoes.value.map((x: LookupItem) => x.key);
      if (!this.isNoPersist) {
        let $result = await this.integranteDao.saveIntegrante([{'unidade_id': form!.controls.unidade_id.value, 'usuario_id': this.usuario!.id, 'atribuicoes': novasAtribuicoes}]);
          novoIntegrante = Object.assign(novoIntegrante, {
          id: form!.controls.unidade_id.value,
          atribuicoes: $result[0].atribuicoes,
          unidade_codigo: (this.unidade?.selectedEntity as Unidade).codigo,
          unidade_sigla: (this.unidade?.selectedEntity as Unidade).sigla,
          unidade_nome: (this.unidade?.selectedEntity as Unidade).nome
        });
        if (this.grid?.adding) this.grid!.items[this.grid!.items.length - 1].id = '';  // (*4)
      } else {
        //novoIntegrante = Object.assign(novoIntegrante, { _status:  novoIntegrante._status == "ADD" ? "ADD" : "EDIT" });
        await this.loadAtribuicao(form, row);
      }
    } catch (e: any) {
      this.error(e.message ? e.message : e.toString() || e);
    } finally {
      this.loading = false;
    }
    return novoIntegrante;
  }

  public converterAtribuicoes(atribuicoes: string[]): LookupItem[] {
    return atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    }))
  }

}
