import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-unidade-integrante',
  templateUrl: './unidade-integrante.component.html',
  styleUrls: ['./unidade-integrante.component.scss']
})
export class UnidadeIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Unidade | undefined) { super.entity = value; } get entity(): Unidade | undefined { return super.entity; }
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() public entity_id?: string;
  //@Input() public unidadeId: string = "";

  public integranteDao: UnidadeIntegranteDaoService;
  public usuarioDao: UsuarioDaoService;
  public items: IntegranteConsolidado[] = [];
  public unidade?: Unidade;
  public tiposAtribuicao: LookupItem[] = [];
  public usuariosJaVinculados: string[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: {default: ""},
      atribuicoes: {default: undefined},
      atribuicao: {default: ""}
    }, this.cdRef, this.validate);
  }

  ngOnInit() {
    super.ngOnInit();
    //this.unidadeId = this.urlParams?.has("idUnidade") ? this.urlParams!.get("idUnidade") : this.metadata?.idUnidade || this.unidadeId;
    //this.entity = this.unidade
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
   * Método chamado na inicialização do componente para carregar todos os integrantes da unidade.
   * @param entity 
   * @param form 
   */
  public async loadData(entity: IIndexable, form?: FormGroup | undefined) {
    this.grid!.loading = true;
    try {
      let result = await this.integranteDao!.loadIntegrantes(this.entity!.id, "");
      this.items = result.integrantes.filter(x => x.atribuicoes.length > 0);
      this.unidade = result.unidade;
    } finally {
      this.grid!.loading = false;
    }
    this.cdRef.detectChanges();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length) result = "Obrigatório";
    if((controlName == "usuario_id") && this.grid?.adding && this.items.map(i => i.id).includes(control.value)) result = "O usuário já é integrante desta unidade. Edite-o, ao invés de incluir novamente!";
    return result;
  }

  public async addIntegrante() {
    return {
      id: this.integranteDao!.generateUuid(),
      usuario_id: "",
      atribuicoes: []
    } as IIndexable;
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
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
    form.controls.atribuicoes.setValue(row.atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    })));
    form.controls.atribuicao.setValue("");
  }

  public async removeIntegrante(row: any) {
    let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
    if(confirm) {
      this.loading = true;
      let msg: string | undefined;
      try {
        await this.integranteDao.saveIntegrante([{'unidade_id': this.unidade!.id, 'usuario_id': row.id, 'atribuicoes': []}]).then( resposta => {
          if(msg = resposta.find(v => v.msg?.length)?.msg) { if(this.grid) this.grid.error = msg; };
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

  public async saveIntegrante(form: FormGroup, row: any) {
    let confirm = true;
    let n = this.alterandoGestor(form);
    if (n.length) confirm = await this.dialog.confirm("Confirma a Alteração de Gestor ?", n.length == 1 ?  "O " + n[0] + " será alterado." : "Serão alterados: " + n.join(', ') + ".");
    if(form!.controls.atribuicoes.value.length && confirm) {
      this.loading = true;
      try {
        await this.integranteDao.saveIntegrante([{'unidade_id': this.unidade!.id, 'usuario_id': form!.controls.usuario_id.value, 'atribuicoes': form!.controls.atribuicoes.value.map((x: LookupItem) => x.key)}]).then( resposta => {
          let msg: string | undefined;
          if(msg = resposta?.find(v => v.msg?.length)?.msg) { if(this.grid) this.grid.error = msg; };
        });
        await this.loadData({}, this.form);
        if(this.grid) this.grid!.error = "";
      } catch (error: any) {
        if(this.grid) this.grid.error = error;
        await this.loadData({}, this.form);
        //this.cdRef.detectChanges();
      } finally {
        this.loading = false;
      }
    }
    return undefined;
  }

/*   public editEndIntegrante(){
    if(this.grid) this.grid!.error = "";
  } */

  public alterandoGestor(form: FormGroup): string[] {
    let result: string[] = [];
    ['GESTOR','GESTOR_DELEGADO','GESTOR_SUBSTITUTO'].forEach(g => { if(form!.controls.atribuicoes.value.map((a: { key: string; }) => a.key).includes(g) && this.items.find( i => i.atribuicoes.includes(g) )) result.push(this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, g)); });
    return result;
  }

}
