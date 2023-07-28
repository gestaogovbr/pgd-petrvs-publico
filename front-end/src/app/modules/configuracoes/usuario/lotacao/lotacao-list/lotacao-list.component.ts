import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeIntegrante } from 'src/app/models/unidade-integrante.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-lotacao-list',
  templateUrl: './lotacao-list.component.html',
  styleUrls: ['./lotacao-list.component.scss']
})
export class LotacaoListComponent extends PageListBase<UnidadeIntegrante, UnidadeIntegranteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, UnidadeIntegrante, UnidadeIntegranteDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);

    /* Inicializações */
    this.title = this.lex.translate("Lotação");
    this.join = ["usuario", "unidade"];
    this.modalWidth = 500;
    this.filter = this.fh.FormBuilder({
      principal: {default: ""},
      unidade_id: {default: ""},
      usuario_id: {default: ""}
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    const usuarioId = this.urlParams!.get("usuario_id")!;
    this.addParams = {usuario_id: usuarioId};
    this.usuarioDao.getById(usuarioId).then(usuario => {
      this.title = this.lex.translate("Lotação") + " " + this.lex.translate("usuário") + " " + this.util.apelidoOuNome(usuario!);
      this.cdRef.detectChanges();
    });
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["usuario_id", "=", this.urlParams?.get("usuario_id")]);

    return result;
  }
}

