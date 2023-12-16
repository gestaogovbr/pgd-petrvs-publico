import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageBase } from 'src/app/modules/base/page-base';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'app-plano-trabalho-consolidacao',
  templateUrl: './plano-trabalho-consolidacao.component.html',
  styleUrls: ['./plano-trabalho-consolidacao.component.scss']
})
export class PlanoTrabalhoConsolidacaoComponent extends PageFrameBase {
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;

  public usuarios: Usuario[] = [];
  public unidade?: Unidade;
  public unidadeDao: UnidadeDaoService;
  public loadingUnidade: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      arquivados: { default: false }
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.tabs!.active = this.queryParams?.tab || "USUARIO";
    this.tabs!.title = this.lex.translate('Consolidações');
    (async () => {
      await this.loadData(this.entity!, this.form);
    })();
  }

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.unidade = this.auth.unidadeGestor();
    if(this.unidade) {
      this.usuarios = [];
      this.loadingUnidade = true;
      this.cdRef.detectChanges()
      try {
        this.usuarios = await this.unidadeDao.lotados(this.unidade.id);
      } finally {
        this.loadingUnidade = false;
        this.cdRef.detectChanges()
      }
    }
  }

}
