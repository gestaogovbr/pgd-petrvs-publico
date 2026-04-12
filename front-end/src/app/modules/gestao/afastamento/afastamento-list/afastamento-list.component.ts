import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { Afastamento } from 'src/app/models/afastamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
    selector: 'app-afastamento-list',
    templateUrl: './afastamento-list.component.html',
    styleUrls: ['./afastamento-list.component.scss'],
    standalone: false
})

export class AfastamentoListComponent extends PageListBase<Afastamento, AfastamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public tipoMotivoAfastamentoDao: TipoMotivoAfastamentoDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public listagemInicial: Boolean = true;
  public unidades?: any[];
  public listarApenasProprioUsuario: Boolean = true;

  constructor(public injector: Injector) {
    super(injector, Afastamento, AfastamentoDaoService);
    /* Inicializações */
    this.join = ["tipo_motivo_afastamento:id, nome", "usuario: id, nome"];
    this.tipoMotivoAfastamentoDao = injector.get<TipoMotivoAfastamentoDaoService>(TipoMotivoAfastamentoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.title = this.lex.translate("Ocorrências");
    this.code = "MOD_OCOR";
    this.filter = this.fh.FormBuilder({
      observacoes: {default: ""},
      data_inicio: {default: new Date()},
      data_fim: {default: new Date()},
      usuario_id: {default: ""},
      tipo_motivo_afastamento_id: {default: ""}
    });
    this.OPTION_INFORMACOES.onClick = (afastamento: Afastamento) => this.go.navigate({ route: ['gestao', 'afastamento', afastamento.id, 'consult'] }, { modal: true });

    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_OCOR_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
    this.orderBy = [['created_at', 'desc']];
  }

  public filtro() {
    this.listagemInicial = false;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if (this.listarApenasProprioUsuario) {
      result.push(["usuario_id", "==", this.auth.usuario!.id]);
    }
    if(form.usuario_id?.length && form.tipo_motivo_afastamento_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
      result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
    } else if (form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
    } else if (form.tipo_motivo_afastamento_id?.length) {
      result.push(["tipo_motivo_afastamento_id", "==", form.tipo_motivo_afastamento_id]);
    } else if(this.dao?.validDateTime(form.data_inicio) && this.dao?.validDateTime(form.data_fim) && !this.listagemInicial) {
      result.push(this.dao?.intersectionWhere("data_inicio", "data_fim", this.util.startOfDay(form.data_inicio), this.util.startOfDay(form.data_fim)));
    }
    
    return result;
  }

  public async ngOnInit() {
    super.ngOnInit();

    this.unidades = [];

    this.listarApenasProprioUsuario = !this.auth.hasPermissionTo('MOD_OCOR_TODAS_UNIDADES')
      && (!this.auth.hasPermissionTo('MOD_OCOR_UNIDADE'));

    if (!this.listarApenasProprioUsuario && this.auth.unidade && !this.auth.hasPermissionTo('MOD_OCOR_TODAS_UNIDADES')) {
      let unidades = [this.auth.unidade];
      // carrega todas as vinculacoes do usuario e subordinadas
      if (this.auth.hasPermissionTo('MOD_OCOR_UNIDADE')) {
        if (this.auth.unidades) {
          unidades.concat(this.auth.usuario!.areas_trabalho?.map(area => area!.unidade!) || []);
        }
      }

      for(let unidade of unidades) {
        this.unidades.push(unidade.id);
        const subordinadas = (await this.unidadeDao.subordinadas(unidade?.id)).map((item: any) => item.id);
        this.unidades = this.unidades.concat(subordinadas);
      }
    }
  }
}

