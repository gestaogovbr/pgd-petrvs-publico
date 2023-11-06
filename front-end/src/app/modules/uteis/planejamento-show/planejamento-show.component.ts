import { Component, Injector, Input } from "@angular/core";
import { PlanejamentoDaoService } from "src/app/dao/planejamento-dao.service";
import { Planejamento } from "src/app/models/planejamento.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { ColunaTipo } from "../colunas/colunas.component";

@Component({
  selector: 'planejamento-show',
  templateUrl: './planejamento-show.component.html',
  styleUrls: ['./planejamento-show.component.scss'],
})
export class PlanejamentoShowComponent extends PageFrameBase {
  @Input() planejamento: Planejamento = {} as Planejamento;
  public planejamentoSuperior: Planejamento | null = null;
  public colunas: ColunaTipo[] = [];

  public planejamentoDao: PlanejamentoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.planejamentoDao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
  }

  ngOnInit(): void {
    super.ngOnInit();    
    this.colunas.push(
      {titulo: 'Missão', texto: this.planejamento.missao}, 
      {titulo: 'Visão', texto: this.planejamento.visao}, 
      {titulo: 'Valores', texto: this.planejamento.valores.map(item => item.value).join('<br>')},
      {titulo: 'Resultados institucionais', texto: this.planejamento.resultados_institucionais?.map(item => item.value).join('<br>')},
    );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if(this.planejamento.planejamento_superior_id) this.buscaPlanejamentoSuperior(this.planejamento.planejamento_superior_id)
    
  }

  async buscaPlanejamentoSuperior(planejamento_superior_id: string){
    this.planejamentoSuperior = await this.planejamentoDao.getById(planejamento_superior_id)
  }
}