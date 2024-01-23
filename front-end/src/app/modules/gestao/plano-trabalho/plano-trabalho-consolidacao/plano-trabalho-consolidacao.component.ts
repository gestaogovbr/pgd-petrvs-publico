import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
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
  @ViewChild(InputSearchComponent, { static: false }) public unidadeSelecionada?: InputSearchComponent;

  public usuarios: Usuario[] = [];
  public unidade?: Unidade;
  public unidadeDao: UnidadeDaoService;
  public loadingUnidade: boolean = false;
  public filter: FormGroup;

  constructor(public injector: Injector) {
    super(injector);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      arquivados: { default: false }
    });
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: false }
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
    this.filter!.controls.unidade_id.setValue(this.unidade?.id || this.auth.lotacao || null);
    if(this.unidade) {
      await this.loadUsuarios(this.unidade.id);
    }
  }
  
  public async loadUsuarios(unidade: any) {
    this.usuarios = [];
    this.loadingUnidade = true;
    this.loading = true;
    this.cdRef.detectChanges();
    try {
      this.usuarios = await this.unidadeDao.lotados(unidade);
    } finally {
      this.loading = false;
      this.loadingUnidade = false;
      this.cdRef.detectChanges();
    }
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    this.loadUsuarios(form.unidade_id);
  }
}
