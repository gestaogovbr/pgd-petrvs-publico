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
  //public _items?: any[];
  public integranteService: IntegranteService;
  public integranteDao: UnidadeIntegranteDaoService;
  public usuarioDao: UsuarioDaoService;
  //public unidade?: Unidade;
  public tiposAtribuicao: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.integranteService = injector.get<IntegranteService>(IntegranteService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: { default: "" },
      atribuicoes: { default: undefined },
      atribuicao: { default: "" }
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.entity_id = this.metadata?.entity_id || this.entity?.id;
    this.tiposAtribuicao = this.isNoPersist ? this.lookup.UNIDADE_INTEGRANTE_TIPO.filter((atribuicao) => !["GESTOR","GESTOR_SUBSTITUTO"].includes(atribuicao.key)) : this.lookup.UNIDADE_INTEGRANTE_TIPO;
  }

  ngAfterViewInit() {
    (async () => {
      await this.loadData({ id: this.entity_id }, this.form);
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
      try {
        await this.integranteDao!.loadIntegrantes(entity.id, "").then( resposta =>  integrantes = resposta.integrantes.filter(x => x.atribuicoes?.length > 0)); 
      } finally {
        integrantes.forEach(i => this.items?.push(this.integranteService.completarIntegrante(i, entity.id, i.id, i.atribuicoes)));
        this.items = this.integranteService.ordenar(this.items);
        this.cdRef.detectChanges();
        this.grid!.loading = false;
      }
    }
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) result = "Obrigatório";
    if ((controlName == "usuario_id") && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-o, ao invés de incluí-lo novamente!";
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    let atribuicoes: LookupItem[] = form!.controls.atribuicoes.value;
    //if() result = ""; CONSTRUIR A CONDIÇÃO PARA CHECAR SE HÁ A ATRIBUIÇÃO DE MAIS DE UM GESTOR PARA O MESMO SERVIDOR NA MESMA UNIDADE
    return undefined;
  }

  /**
   * Método chamado para inserir um integrante no grid, seja este componente persistente ou não.
   * @returns 
   */
  public async addIntegrante() {
    let novo = {
      id: this.integranteDao!.generateUuid(),
      usuario_id: "",
      atribuicoes: []
    } as IIndexable;
    return novo;
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
   * Método chamado na edição de um integrante da Unidade.
   * @param form 
   * @param row 
   */
  public async loadIntegrante(form: FormGroup, row: any) {
    form.controls.usuario_id.setValue(this.grid?.adding ? row.usuario_id : row.id);
    form.controls.atribuicoes.setValue(this.integranteService.converterAtribuicoes(row.atribuicoes));
    form.controls.atribuicao.setValue("");
  }

  /**
   * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não. 
   * @param row 
   * @returns 
   */
  public async removeIntegrante(row: IntegranteConsolidado) {
    let nomeServidor = row.usuario_nome;
    let nomeUnidade = this.entity!.nome;
    if(this.isNoPersist && row.atribuicoes.length == 1 && row.atribuicoes[0] == "LOTADO") {
      await this.dialog.alert("IMPOSSÍVEL EXCLUIR !", "Um vínculo não pode ser excluído quando sua única atribuição é a lotação do servidor. Se quiser alterar sua lotação, defina-a em outra Unidade.");
    } else {
      let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições do servidor '" + nomeServidor + "' na unidade '" + nomeUnidade + "' ?");
      if (confirm) {
        let msg: string | undefined;
        try {
          if (!this.isNoPersist) {    // se persistente
            this.loading = true;
            await this.integranteDao.saveIntegrante([this.integranteService.completarIntegrante(row, this.entity!.id, row.id, [])]).then(resposta => {
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
        //return msg ? false : true;
      }
    }
    return false;
  }

  /**
   * Garante que não será possível excluir atribuições que possam gerar inconsistências
   * @param row Atribuição do servidor na unidade
   * @returns 
   */
  public deleteItemHandle(row: LookupItem): boolean | undefined | void {
    return this.integranteService.permitidoApagar(row.key, this.isNoPersist);
  };

  /**
   * Método chamado no salvamento de um usuário-integrante (new/edit), seja este componente persistente ou não.
   * @param form 
   * @param row 
   * @returns 
   */
  public async saveIntegrante(form: FormGroup, row: IntegranteConsolidado) {
    form.controls.atribuicoes.setValue(this.lookup.uniqueLookupItem(form.controls.atribuicoes.value));
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
            await this.integranteDao.saveIntegrante([this.integranteService.completarIntegrante(row, this.entity!.id, form!.controls.usuario_id.value, novasAtribuicoes)]).then(resposta => {
              let msg: string | undefined;
              if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg) { if (this.grid) this.grid.error = msg; };
            });
            await this.loadData({ id: this.entity!.id }, this.form);
            if (this.grid) this.grid!.error = "";
          } else {                // se não persistente
            this.substituirItem(row, novasAtribuicoes);
//            await this.loadData({ id: this.entity!.id }, this.form);
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
      { id: row.id, usuario_apelido: this.usuario?.selectedItem?.entity.apelido, usuario_nome: this.usuario?.selectedItem?.entity.nome },
      this.entity!.id, this.form!.controls.usuario_id.value, atribuicoes
    );
    this.cdRef.detectChanges();
  }
}
