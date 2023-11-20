import { Component, Injector, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'plano-trabalho-entrega-atividades',
  templateUrl: './plano-trabalho-entrega-atividades.component.html',
  styleUrls: ['./plano-trabalho-entrega-atividades.component.scss']
})
export class PlanoTrabalhoEntregaAtividadesComponent extends PageFrameBase {
  @ViewChild('listaAtividades', { static: false }) public listaAtividades?: GridComponent;

  @Input() set entregaId(value: string) {
    if(this._entregaId != value) {
      this._entregaId = value;
    }
  }  
  get entregaId(): string {
    return this._entregaId;
  }

  private _entregaId!: string;
  public AtividadeDao: AtividadeDaoService;
  public items: Atividade[] = [];

  public loader: boolean = false;

  constructor(public injector: Injector){
    super(injector);
    this.AtividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.join = ['unidade', 'usuario','demandante', 'reacoes.usuario:id,nome,apelido']
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }

  public loadData() {
    this.loader = true;
    this.AtividadeDao.query({where: [["plano_trabalho_entrega_id", "==", this._entregaId]], join: this.join}).asPromise().then(response => {
      this.items = response
    }).finally(()=> {
      this.loader = false;
    })
  }

}
