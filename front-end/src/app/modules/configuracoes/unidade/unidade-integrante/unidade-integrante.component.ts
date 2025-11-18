import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable, IntegranteAtribuicao } from 'src/app/models/base.model';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { IntegranteService } from 'src/app/services/integrante.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'unidade-integrante',
  templateUrl: './unidade-integrante.component.html',
  styleUrls: ['./unidade-integrante.component.scss']
})
export class UnidadeIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Unidade | undefined) { super.entity = value; } get entity(): Unidade | undefined { return super.entity; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }

  public items: IntegranteConsolidado[] = [];
  public perfis: Usuario[] = [];//
  public integranteService: IntegranteService;
  public integranteDao: UnidadeIntegranteDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public tiposAtribuicao: LookupItem[] = [];
  public perfilDao: PerfilDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.integranteService = injector.get<IntegranteService>(IntegranteService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: { default: "" },
      atribuicoes: { default: undefined },
      atribuicao: { default: "" },
      perfil_id: { default: null }
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.entity = this.metadata?.unidade;
  
    if (this.entity) {
      let tiposPermitidos = this.lookup.UNIDADE_INTEGRANTE_TIPO;
      if(!this.entity?.executora){
        tiposPermitidos = tiposPermitidos.filter(
          atribuicao => atribuicao.key !== 'COLABORADOR'
        );
      }
      if (!this.entity?.instituidora) {
        this.tiposAtribuicao = tiposPermitidos.filter(
          atribuicao => atribuicao.key !== 'CURADOR'
        );
      }

      this.tiposAtribuicao = this.lookup.ordenarLookupItem(this.tiposAtribuicao);
    }
  }

  ngAfterViewInit() {
    (async () => {
      await this.loadData(this.entity!, this.form);
    })();
  }

  /**
   * Método chamado na inicialização do componente para carregar todos os integrantes da unidade.
   * @param entity 
   * @param form 
   */
  public async loadData(entity: IIndexable, form?: FormGroup | undefined) {
    if (entity.id) {
      let integrantes: IntegranteConsolidado[] = [];
      let usuarioIds: string[] = [];
      this.loading = true;
      try {
        await this.integranteDao!.carregarIntegrantes(entity.id, "").then(resposta => integrantes = resposta.integrantes.filter(x => x.atribuicoes?.length > 0));
        integrantes.forEach(integrante => usuarioIds.push(integrante.id))
        this.perfis = await this.usuarioDao.query({ where: [["id", "in", usuarioIds]] }).asPromise();
      } finally {
        this.loading = false;
        this.items = [];
        integrantes.forEach(i => this.items?.push(this.integranteService.completarIntegrante(i, entity.id, i.id, i.atribuicoes)));
        this.items = this.integranteService.ordenarIntegrantes(this.items);
        this.cdRef.detectChanges();
        this.grid!.loading = false;
      }
    }
  }

  public getPerfil(id: string) {
    let perfil = this.perfis.find(p => p.id == id);
    return perfil?.perfil?.nome;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) result = "Obrigatório";
    if ((controlName == "usuario_id") && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-o, ao invés de incluí-lo novamente!";
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let atribuicoes: LookupItem[] = form!.controls.atribuicoes.value;
    if (this.util.array_diff(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], atribuicoes.map(x => x.key) || []).length < 2) {
      return "A um mesmo servidor só pode ser atribuída uma função de gestor (titular, substituto ou delegado), para uma mesma Unidade!";
    }
    if (!this.entity?.executora && this.util.array_diff(['COLABORADOR'], atribuicoes.map(x => x.key) || []).length < 2) {
      return "Não é possível atribuir colaborador a uma unidade não executora.";
    }
    return undefined;
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
    const key = this.form!.controls.atribuicao.value;
    if (value?.length && this.util.validateLookupItem(this.form!.controls.atribuicoes.value, key)) {
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
   * Garante que não será possível excluir atribuições que possam gerar inconsistências
   * @param row Atribuição do servidor na unidade
   * @returns 
   */
  public deleteItemHandle(row: LookupItem): boolean | undefined | void {
    return this.integranteService.ehPermitidoApagar(row.key);
  };

  /**
   * Método chamado na edição de um integrante da Unidade.
   * @param form 
   * @param row 
   */
  public async carregarIntegrante(form: FormGroup, row: any) {
    let usuario = this.perfis.find(p => p.id == row.id);
    form.controls.usuario_id.setValue(this.grid?.adding ? row.usuario_id : row.id);
    form.controls.perfil_id.setValue(usuario?.perfil_id);
    if (usuario?.usuario_externo) {
      this.tiposAtribuicao = this.tiposAtribuicao.filter((x: LookupItem) => x.key != 'GESTOR_SUBSTITUTO');
    }
    form.controls.atribuicoes.setValue(this.integranteService.converterAtribuicoes(row.atribuicoes));
    form.controls.atribuicao.setValue("");
  }

  /**
* Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
* @returns 
*/
  public async adicionarIntegrante() {
    if (this.grid) this.grid.error = '';
    let novo = {
      id: this.integranteDao!.generateUuid(),
      usuario_id: "",
      atribuicoes: []
    } as IIndexable;
    return novo;
  }

  /**
   * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removerIntegrante(row: IntegranteConsolidado) {
    if (row.atribuicoes[0].includes("LOTADO")) {
      await this.dialog.alert("IMPOSSÍVEL EXCLUIR !", "O vínculo que inclui " + this.lex.translate('a lotação') + " " + this.lex.translate('do servidor') + " não pode ser excluído. Se desejar excluir as demais atribuições, edite o vínculo. Se deseja alterar " + this.lex.translate('a lotação') + ", lote-o em outra " + this.lex.translate('Unidade') + ".");
    } else {
      let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições " + this.lex.translate('do servidor') + row.usuario_nome?.toUpperCase() + " " + this.lex.translate('na unidade') + " " + this.entity!.sigla.toUpperCase() + " ?");
      if (confirm) {
        let msg: string | undefined;
        try {
          if (!this.isNoPersist) {    // se persistente
            this.loading = true;
            await this.integranteDao.salvarIntegrantes([this.integranteService.completarIntegrante(row, this.entity!.id, row.id, [])]).then(resposta => {
              if (msg = resposta.find(v => v._metadata.msg?.length)?._metadata.msg) { if (this.grid) this.grid.error = msg; };
            });
            await this.loadData({ id: this.entity!.id }, this.form);
          } else {                    // se não persistente
            Object.assign(row, { '_status': "DELETE", 'atribuicoes': [] });
            return false;
          }
        } finally {
          this.loading = false;
        }
      }
    }
    return false;
  }

  /**
   * Método chamado no salvamento de um usuário-integrante (new/edit), seja este componente persistente ou não.
   * @param form 
   * @param row 
   * @returns 
   */
  public async salvarIntegrante(form: FormGroup, row: IntegranteConsolidado) {
    let novasAtribuicoes = this.lookup.uniqueLookupItem(form!.controls.atribuicoes.value);
    form.controls.atribuicoes.setValue(novasAtribuicoes);
    if (this.grid) this.grid.error = "";
    this.cdRef.detectChanges();
    let error = this.formValidation(form);
    if (!error) {
      let confirm = true;
      let alteracaoGestor = this.integranteService.haAlteracaoGerencia(novasAtribuicoes.map(x => x.key), Object.assign(row, { usuario_nome: this.usuario?.selectedItem?.entity.nome }), (this.grid?.items as IntegranteConsolidado[]) || [], this.entity?.sigla || "");
      if (alteracaoGestor[0] != 'nenhuma') {
        confirm = await this.dialog.confirm("CONFIRMA A ALTERAÇÃO DA CHEFIA ?", alteracaoGestor[2]);
        if (confirm) {
          switch (alteracaoGestor[0]) {
            case 'troca':
              // Garante que o outro usuário, ex-chefe da unidade, perderá a atribuição de GESTOR
              this.grid!.items[alteracaoGestor[1]].atribuicoes = (this.grid!.items[alteracaoGestor[1]].atribuicoes as string[]).filter(x => !['GESTOR'].includes(x));
              break;
          }
          // Insere a atribuição de LOTADO para o novo Gerente, apenas para fins de atualização da tela, pois o back-end já fará isso automaticamente.
          novasAtribuicoes = this.integranteService.inserirAtribuicao(novasAtribuicoes, 'LOTADO');
          form.controls.atribuicoes.setValue(novasAtribuicoes);
          this.loading = true;
        } else return undefined;
      }
      try {
        if (!this.isNoPersist) { // se persistente
          await this.integranteDao.salvarIntegrantes([Object.assign({ _metadata: { perfil_id: form!.controls.perfil_id.value } }, this.integranteService.completarIntegrante(row, this.entity!.id, form!.controls.usuario_id.value, novasAtribuicoes.map(x => x.key)))]).then(resposta => {
            let msg: string | undefined;
            if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg) this.dialog.alert('ATENÇÃO: ERRO!', msg);
          });
          await this.loadData({ id: this.entity!.id }, this.form);
          if (this.grid) this.grid!.error = "";
        } else {                // se não persistente
          row.id = this.usuario?.selectedEntity.id;
          this.grid!.items = this.integranteService.substituirItem({
            id: row.id,
            itens: this.grid?.items || [],
            apelidoOuSigla: this.usuario?.selectedItem?.entity.apelido,
            nome: this.usuario?.selectedItem?.entity.nome,
            codigo: ""
          }, novasAtribuicoes.map((x: LookupItem) => x.key), new Unidade(this.entity!))
        }
        this.cdRef.detectChanges();
      } catch (error: any) {
        if (this.grid) this.grid.error = error;
        await this.loadData({ id: this.entity!.id }, this.form);
      } finally {
        this.loading = false;
      }
    } else {
      await this.dialog.alert("Impossível incluir/alterar o servidor!", error);
    }
    return undefined;
  }


}