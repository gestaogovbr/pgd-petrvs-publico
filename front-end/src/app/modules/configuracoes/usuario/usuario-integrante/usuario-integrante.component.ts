import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IIndexable, IntegranteAtribuicao } from 'src/app/models/base.model';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { UnidadeIntegranteService } from 'src/app/services/unidade-integrante.service';

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
  public unidadeIntegranteService: UnidadeIntegranteService;
  public integranteDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuario?: Usuario;
  public tiposAtribuicao: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.unidadeIntegranteService = injector.get<UnidadeIntegranteService>(UnidadeIntegranteService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
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
    this.grid!.loading = true;
    try {
      let result = await this.integranteDao!.loadIntegrantes("", this.entity!.id);
      this.items = result.integrantes.filter(x => x.atribuicoes.length > 0);
      this.usuario = result.usuario;
    } finally {
      this.grid!.loading = false;
    }
    this.cdRef.detectChanges();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (["unidade_id", "atribuicoes"].includes(controlName) && !control.value?.length) { result = "Obrigatório"; }
    if ((controlName == "unidade_id") && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-a, ao invés de incluí-la novamente!";
    return result;
  }

  /**
   * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
   * @returns 
   */
  public async addAtribuicao() {
    return {
      id: this.integranteDao!.generateUuid(),
      unidade_id: "",
      atribuicoes: []
    } as IIndexable;
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

  /**
   * Método chamado na edição de uma atribuição do usuário
   * @param form 
   * @param row 
   */
  public async loadAtribuicao(form: FormGroup, row: any) {
    form.controls.unidade_id.setValue(this.grid?.adding ? row.unidade_id : row.id);
    form.controls.atribuicoes.setValue(this.unidadeIntegranteService.converterAtribuicoes(row.atribuicoes));
    form.controls.atribuicao.setValue("");
  }

  /**
   * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removeAtribuicao(row: any) {
    let nomeServidor = this.entity!.nome;
    let nomeUnidade = (row as IntegranteConsolidado).unidade_nome;
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor '" + nomeServidor + "' na unidade '" + nomeUnidade + "' ?");
    if (confirm) {
      this.loading = true;
      let msg: string | undefined;
      try {
        if (!this.isNoPersist) await this.integranteDao.saveIntegrante([{ 'unidade_id': row.id, 'usuario_id': this.usuario!.id, 'atribuicoes': [] }]).then(resposta => {
          if (msg = resposta.find(v => v.msg?.length)?.msg) { if (this.grid) this.grid.error = msg; };
        });
        await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      }
      return msg ? false : true;
    } else {
      return false;
    }
  }

  /**
   * Garante que não será possível excluir a lotação de um servidor por este caminho
   * @param row Atribuição do servidor na unidade
   * @returns 
   */
  public deleteItemHandle(row: LookupItem): boolean | undefined | void {
    return row.key != "LOTADO";
  };

  /**
   * Método chamado no salvamento de uma atribuição do usuário, seja este componente persistente ou não.
   * @param form 
   * @param row 
   * @returns 
   */
  public async saveAtribuicao(form: FormGroup, row: any) {
    let confirm = true;
    let n = this.unidadeIntegranteService.alterandoGestor(form, this.items);
    if (n.length) confirm = await this.dialog.confirm("Confirma a Alteração de Gestor ?", n.length == 1 ? "O " + n[0] + " será alterado." : "Serão alterados: " + n.join(', ') + ".");
    if (form!.controls.atribuicoes.value.length && confirm) {
      this.loading = true;
      try {
        let novasAtribuicoes: IntegranteAtribuicao[] = form!.controls.atribuicoes.value.map((x: LookupItem) => x.key);
        if (!this.isNoPersist) {
          await this.integranteDao.saveIntegrante([{ 'unidade_id': form!.controls.unidade_id.value, 'usuario_id': this.usuario!.id, 'atribuicoes': novasAtribuicoes }]).then(resposta => {
            let msg: string | undefined;
            if (msg = resposta?.find(v => v.msg?.length)?.msg) { if (this.grid) this.grid.error = msg; };
          });
          await this.loadData({}, this.form);
          if (this.grid) this.grid!.error = "";
        } else {
//          novoIntegrante = Object.assign(novoIntegrante, { _status:  novoIntegrante._status == "ADD" ? "ADD" : "EDIT" });
//          await this.loadAtribuicao(form, row);
        }
      } catch (error: any) {
        if (this.grid) this.grid.error = error;
        await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      }
    }
    return undefined;
  }
}
