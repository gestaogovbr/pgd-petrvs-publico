import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
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
  selector: 'usuario-integrante',
  templateUrl: './usuario-integrante.component.html',
  styleUrls: ['./usuario-integrante.component.scss']
})
export class UsuarioIntegranteComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() public usuarioId?: string;

  public integranteDao: UnidadeIntegranteDaoService;
  public unidadeDao: UnidadeDaoService;
  public usuario?: Usuario;
  public items: UsuarioIntegranteConsolidado[] = [];

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
    this.usuarioId = this.urlParams?.has("usuarioId") ? this.urlParams!.get("usuarioId") : this.metadata?.usuario || this.usuarioId || "10c6685a-c68f-4ae7-ab11-1288c4492f0d";
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
      let result = await this.integranteDao!.loadUnidadesIntegrantes(this.usuarioId!);
      this.items = result.integrantes;
      this.usuario = result.usuario;
    } finally {
      this.grid!.loading = false;
    }
    this.cdRef.detectChanges();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(["unidade_id"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    }
    if(controlName == "atribuicoes" && !control.value?.length) {
      result = "Obrigatório ao menos uma atribuição!";
    }
    return result;
  }

  public addItemHandle(): LookupItem | undefined {
    let result = undefined;
    const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form!.controls.atribuicao.value);
    const key = this.form!.controls.atribuicao.value;
    if(value?.length && this.util.validateLookupItem(this.form!.controls.atribuicao.value, key)) {
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

  public async addAtribuicao() {
    return Object.assign({}, {usuario_id: this.usuarioId, _status: "ADD", unidade_id: "", atribuicao: ""}) as IIndexable;
  }

  public async loadAtribuicao(form: FormGroup, row: any) {
/*     form.controls.usuario_id.setValue(row.usuario_id);
    form.controls.atribuicoes.setValue(row.atribuicoes.map((x: string) => Object.assign({}, {
      key: x,
      value: this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      icon: this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, x),
      color: this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, x)
    })));
    form.controls.atribuicao.setValue(""); */
  }

  public async removeAtribuicao(row: any) {
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

  public async saveAtribuicao(form: FormGroup, row: any) {
    let consolidado = row as UsuarioIntegranteConsolidado;
    if(form!.controls.atribuicoes.value.length) {
      consolidado.unidade_id = form!.controls.unidade_id.value;
      consolidado.atribuicoes = form!.controls.atribuicoes.value.map((x: LookupItem) => x.key);
      this.loading = true;
      try {
        await this.integranteDao.saveUnidadeIntegrante(this.usuario!.id, consolidado);
        this.items
        await this.loadData({}, this.form);
      } finally {
        this.loading = false;
      }
    }
    return undefined;
  }

}
