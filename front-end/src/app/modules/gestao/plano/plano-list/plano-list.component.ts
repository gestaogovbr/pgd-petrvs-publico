import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Plano } from 'src/app/models/plano.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { FullRoute } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-plano-list',
  templateUrl: './plano-list.component.html',
  styleUrls: ['./plano-list.component.scss']
})
export class PlanoListComponent extends PageListBase<Plano, PlanoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public static selectRoute?: FullRoute = {route: ["gestao", "plano"]};
  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public allPages: ListenerAllPagesService;
  public tipoModalidadeDao: TipoModalidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Plano, PlanoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    /* Inicializações */
    this.title = this.lex.noun("Plano de trabalho",true);
    this.code = "MOD_PTR";
    this.filter = this.fh.FormBuilder({
      usuario: {default: ""},
      unidade_id: {default: null}
    });
    this.join = ["unidade.entidade", "usuario", "programa", "documento", "tipo_modalidade"];
    // Testa se o usuário possui permissão para exibir dados do plano de trabalho
    if (this.auth.hasPermissionTo("MOD_PTR_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o plano de trabalho
    if (this.auth.hasPermissionTo("MOD_PTR_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
    this.options.push({
      label: "Termos de adesão",
      icon: "bi bi-file-earmark-check",
      onClick: ((row: Plano) => this.go.navigate({route: ['gestao', 'plano', row.id, 'termos']}, {modalClose: (modalResult) => console.log(modalResult?.conteudo)})).bind(this)
    });
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.unidade_id.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.usuario?.length) {
      result.push(["usuario.nome", "like", "%" + form.usuario + "%"]);
    }
    if(form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    return result;
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

}

