import { Component, ContentChild, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { Plano } from 'src/app/models/plano.model';
import { PageBase } from 'src/app/modules/base/page-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'plano-termo-adesao',
  templateUrl: './plano-termo-adesao.component.html',
  styleUrls: ['./plano-termo-adesao.component.scss']
})
export class PlanoTermoAdesaoComponent extends PageBase implements OnInit {
  @ViewChild("termo", {static: false}) termo?: ElementRef;
  //@ContentChild("content") content?: HTMLElement;
  @Input() set vinculadas(value: boolean) {
    if(this._vinculadas != value) {
      this._vinculadas = value;
      if(!this.plano?.atividades?.length) {
        this.loadAtividades();
      }
      this.cdRef.detectChanges();
    }
  }
  get vinculadas(): boolean {
    return this._vinculadas;
  }
  @Input() set plano(value: Plano | undefined) {
    if(this._plano != value) {
      this._plano = value;
      if(this._plano?.atividades?.length) {
        this.atividades = this._plano?.atividades.map(x => x.atividade!) || [];
      } else {
        this.loadAtividades();
      }
      this.cdRef.detectChanges();
    }
  }
  get plano(): Plano | undefined {
    return this._plano;
  }

  public atividades: Atividade[] = [];
  public mensagemCarregando = "Carregando atividades...";

  /*private _loading: boolean = false;
  public set loading(value: boolean) {
    if(!value) {
      this.dialog.closeSppinerOverlay();
    } else if(!this._loading) {
      this.dialog.showSppinerOverlay("Carregando atividades");
    }
    this._loading = value;
  }
  public get loading(): boolean {
    return this._loading;
  }*/
  
  public atividadeDao: AtividadeDaoService;

  private _vinculadas: boolean = true;
  private _plano?: Plano;

  constructor(public injector: Injector) { 
    super(injector);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
  }

  public loadAtividades() {
    const query = this.atividadeDao.query({where: [['unidade_id', '=', this.plano?.unidade_id], ['vinculadas', '=', this.vinculadas]]})
    this.loading = true;
    query.asPromise().then(atividades => {
      this.atividades = atividades;
      this.cdRef.detectChanges();
    }).catch((error) => {
      this.dialog.alert("Error ao carregar atividades", error?.message ? error.message : error);
    }).finally(() => {
      this.loading = false;
    });
  }

  public getEntregas(entregas: LookupItem[]) {
    return entregas.map(x => x.value).join("\n");
  }

  public getParametros(parametros: LookupItem[]) {
    return parametros.map(x => x.value).join("\n");
  }

  public getFaixaComplexidade(atividade: Atividade) {
    return atividade.complexidade.find(x => x.padrao)?.grau || "Normal";
  }

  public get conteudo(): string {
    return this.termo?.nativeElement.innerHTML || "";
  }

  public getTempoTeletrabalho(atividade: Atividade): string {
    const fator_ganho_produtivade = 1 - ((this.plano?.ganho_produtividade || 0) / 100);
    return this.util.decimalToTimerFormated(atividade.tempo_pactuado * fator_ganho_produtivade, true)
  }

  public get ganhoProdutividade(): string {
    return this.util.formatDecimal(this.plano?.ganho_produtividade || 0) + "%";
  }

  public get cargaHorariaTitulo(): string {
    return this.plano?.forma_contagem_carga_horaria == "MES" ? "Carga horária mensal:" : this.plano?.forma_contagem_carga_horaria == "SEMANA" ? "Carga horária semanal:" : "Carga horária diária:";
  }

  public get cargaHoraria(): number {
    const factor = this.plano?.forma_contagem_carga_horaria == "MES" ? 20 : this.plano?.forma_contagem_carga_horaria == "SEMANA" ? 5 : 1;
    return (this.plano?.carga_horaria || 0) * factor;
  }

  ngOnInit(): void {
  }

}
