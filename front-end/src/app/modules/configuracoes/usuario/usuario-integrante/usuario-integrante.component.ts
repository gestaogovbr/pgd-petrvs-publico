import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IIndexable, IntegranteAtribuicao } from 'src/app/models/base.model';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { IntegranteService } from 'src/app/services/integrante.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';

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

  public items: IntegranteConsolidado[] = [];
  public integranteService: IntegranteService;
  public integranteDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public tiposAtribuicao: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.integranteService = injector.get<IntegranteService>(IntegranteService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      unidade_id: { default: "" },
      atribuicoes: { default: undefined },
      atribuicao: { default: "" },
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.entity_id = this.metadata?.entity_id || this.entity?.id;
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter((atribuicao) => atribuicao.key != "LOTADO") : this.lookup.UNIDADE_INTEGRANTE_TIPO;
  }

  ngAfterViewInit() {
    (async () => {
      await this.loadData({ id: this.entity_id }, this.form);
    })();
  }

  /**
   * Método chamado na inicialização do componente para carregar todas as unidades-integrantes do usuário.
   * @param entity 
   * @param form 
   */
  public async loadData(entity: IIndexable, form?: FormGroup | undefined) {
    if (entity.id) {
      let integrantes: IntegranteConsolidado[] = [];
      try {
        let result = await Promise.all([
          this.usuarioDao.getById(entity.id),
          this.integranteDao!.loadIntegrantes("", entity.id)
        ]);
        this.entity = result[0]!;
        integrantes = result[1].integrantes.filter(x => x.atribuicoes?.length > 0);
      } finally {
        integrantes.forEach(i => this.items?.push(this.integranteService.completarIntegrante(i, i.id, entity.id, i.atribuicoes)));
        this.items = this.integranteService.ordenar(this.items);
        this.cdRef.detectChanges();
        this.grid!.loading = false;
      }
    }
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (["unidade_id", "atribuicoes"].includes(controlName) && !control.value?.length) { result = "Obrigatório"; }
    if (controlName == "unidade_id" && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-a, ao invés de incluí-la novamente!";
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let atribuicoes: LookupItem[] = form!.controls.atribuicoes.value;
    if (this.util.array_diff(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], atribuicoes.map(na => na.key) || []).length < 2) {
      return "A um mesmo servidor só pode ser atribuída uma função de gestor, para uma mesma Unidade!";
    }
    return undefined;
  }

  /**
   * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
   * @returns 
   */
  public async addIntegrante() {
    let novo = {
      id: this.integranteDao!.generateUuid(),
      unidade_id: "",
      atribuicoes: []
    } as IIndexable;
    return novo;
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
  public async loadIntegrante(form: FormGroup, row: any) {
    form.controls.unidade_id.setValue(this.grid?.adding ? row.unidade_id : row.id);
    form.controls.atribuicoes.setValue(this.integranteService.converterAtribuicoes(row.atribuicoes));
    form.controls.atribuicao.setValue("");
  }

  /**
   * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removeIntegrante(row: IntegranteConsolidado) {
    let nomeServidor = this.entity!.nome;
    let nomeUnidade = row.unidade_nome;
    if (this.isNoPersist && row.atribuicoes.length == 1 && row.atribuicoes[0] == "LOTADO") {
      await this.dialog.alert("IMPOSSÍVEL EXCLUIR !", "Um vínculo não pode ser excluído quando sua única atribuição é a lotação do servidor. Se quiser alterar a lotação, use a aba principal.");
    } else {
      let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor '" + nomeServidor + "' na unidade '" + nomeUnidade + "' ?");
      if (confirm) {
        let msg: string | undefined;
        try {
          if (!this.isNoPersist) {    // se persistente
            this.loading = true;
            await this.integranteDao.saveIntegrante([this.integranteService.completarIntegrante(row, row.id, this.entity!.id, [])]).then(resposta => {
              if (msg = resposta.find(v => v._metadata.msg?.length)?._metadata.msg) { if (this.grid) this.grid.error = msg; };
            });
            await this.loadData({ id: this.entity!.id }, this.form);
          } else {                    // se não persistente
            Object.assign(row, { '_status': "DELETE", 'atribuicoes': [] });
            return false;
          }
        } catch (e: any) {
          this.loading = false;
        } finally {
          this.loading = false;
        }
        //return msg ? false : true;
      }
    }
    return false;
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
   * Método chamado no salvamento de uma unidade-integrante (new/edit), seja este componente persistente ou não.
   * @param form 
   * @param row 
   * @returns 
   */
  public async saveIntegrante(form: FormGroup, row: IntegranteConsolidado) {
    form.controls.atribuicoes.setValue(this.lookup.uniqueLookupItem(form!.controls.atribuicoes.value));
/*     if (this.grid) this.grid!.error = "";
    this.cdRef.detectChanges(); */
    let error: any = undefined;
    //error = this.formValidation(form);
    if (!error) {
      let confirm = true;
      let n = this.integranteService.alterandoGestor(form, row.atribuicoes || []);
      if (n.length) confirm = await this.dialog.confirm("Confirma a Alteração de Gestor ?", n.length == 1 ? "O " + n[0] + " será alterado." : "Serão alterados: " + n.join(', ') + ".");
      if (form!.controls.atribuicoes.value.length && confirm) {
        this.loading = true;
        try {
          let novasAtribuicoes: IntegranteAtribuicao[] = form!.controls.atribuicoes.value.map((x: LookupItem) => x.key);
          if (!this.isNoPersist) { // se persistente
            await this.integranteDao.saveIntegrante([this.integranteService.completarIntegrante(row, form!.controls.unidade_id.value, this.entity!.id, novasAtribuicoes)]).then(resposta => {
              let msg: string | undefined;
              if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg) { if (this.grid) this.grid!.error = msg; };
            });
            await this.loadData({ id: this.entity!.id }, this.form);
            if (this.grid) this.grid!.error = "";
          } else {                // se não persistente
            this.substituirItem(row, novasAtribuicoes);
          }
        } catch (error: any) {
          if (this.grid) this.grid.error = error;
          await this.loadData({ id: this.entity!.id }, this.form);
        } finally {
          this.loading = false;
        }
      }
    } else {
      if (this.grid) this.grid.error = "ATENÇÃO" + "&" + error;
      this.substituirItem(row, form.controls.atribuicoes.value.map((x: LookupItem) => x.key));
    }
    return undefined;
  }

  public substituirItem(row: IntegranteConsolidado, atribuicoes: IntegranteAtribuicao[]){
    let index = this.items!.findIndex(x => x["id"] == row["id"]);
    this.items![index!] = this.integranteService.completarIntegrante(
      { id: row.id, unidade_sigla: this.unidade?.selectedItem?.entity.sigla, unidade_nome: this.unidade?.selectedItem?.entity.nome, unidade_codigo: this.unidade?.selectedItem?.entity.codigo },
      this.form!.controls.unidade_id.value, this.entity!.id, atribuicoes
    );
    this.cdRef.detectChanges();
  }


}
