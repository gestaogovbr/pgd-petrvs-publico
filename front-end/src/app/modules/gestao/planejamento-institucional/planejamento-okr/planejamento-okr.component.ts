import {
  Component,
  ElementRef,
  Injector,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { PlanejamentoObjetivoDaoService } from 'src/app/dao/planejamento-objetivo-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { QueryContext } from 'src/app/dao/query-context';
import { IIndexable } from 'src/app/models/base.model';
import { PlanejamentoOkr } from 'src/app/models/planejamento-okr.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PlanoEntregaEntregaObjetivo } from 'src/app/models/plano-entrega-entrega-objetivo.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { PlanoTrabalhoEntrega } from 'src/app/models/plano-trabalho-entrega.model';
import { Entrega } from 'src/app/models/entrega.model';
import { AtividadeService } from '../../atividade/atividade.service';

@Component({
  selector: 'planejamento-okr',
  templateUrl: './planejamento-okr.component.html',
  styleUrls: ['./planejamento-okr.component.scss'],
})
export class PlanejamentoOkrComponent extends PageFrameBase {
  @ViewChild('planejamentoInstitucional', { static: false })
  public planejamentoInstitucional?: InputSelectComponent;

  public planejamentos: LookupItem[] = [];
  public planejamento?: Planejamento;
  public objetivos: PlanejamentoOkr[] = [];
  public objetivo_entregas: PlanoEntregaEntregaObjetivo[] = [];

  public query?: QueryContext<Planejamento>;
  public objetivoDao?: PlanejamentoObjetivoDaoService;
  public atividadeDao: AtividadeDaoService;

  public planoEntregaService: PlanoEntregaService;
  public atividadeService: AtividadeService;

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<PlanejamentoDaoService>(PlanejamentoDaoService);
    this.objetivoDao = injector.get<PlanejamentoObjetivoDaoService>(
      PlanejamentoObjetivoDaoService
    );
    this.planoEntregaService =
      injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.atividadeService = injector.get<AtividadeService>(AtividadeService);
    this.join = ['objetivos_okr'];
    this.title =
      this.lex.translate('Objetivos') +
      ' ' +
      this.lex.translate('do Planejamento Institucional');
    this.form = this.fh.FormBuilder(
      {
        planejamento_id: { default: null },
        todos: { default: false },
      },
      this.cdRef,
      this.validate
    );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.loadData(this.entity);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  };

  public async loadData(entity: IIndexable, form?: FormGroup) {
    this.query = this.dao!.query({
      where: [['data_arquivamento', '==', null]],
      orderBy: [['data_inicio', 'desc']],
    }) as QueryContext<Planejamento>;
    this.query!.asPromise().then((planejamentos) => {
      this.planejamentos = planejamentos.map((x) =>
        Object.assign({} as LookupItem, {
          key: x.id,
          value: x.nome,
          data: x,
        })
      );
      this.cdRef.detectChanges();
      this.form!.controls.planejamento_id.setValue(
        this.planejamentos.length ? this.planejamentos[0].key : null
      );
    });
  }

  carregaEntregas(objetivoId: string) {
    this.objetivoDao
      ?.getById(objetivoId, [
        'objetivos_entrega.entrega.entrega',
        'objetivos_entrega.entrega.entregas_plano_trabalho',
        'objetivos_entrega.entrega.unidade:id,nome',
      ])
      .then((resultado) => {
        if (resultado && resultado.objetivos_entrega) {
          this.objetivo_entregas = resultado.objetivos_entrega;
          const entregasPorUnidade: any = {};

          this.objetivo_entregas.forEach((entrega) => {
            const unidade = entrega.entrega?.unidade;
            if (unidade) {
              const unidadeId = unidade.id;
              if (!entregasPorUnidade[unidadeId]) {
                entregasPorUnidade[unidadeId] = { unidade, entregas: [] };
              }
              entregasPorUnidade[unidadeId].entregas.push(entrega);
            }
          });

          const objetivo = this.objetivos.find((o) => o.id == objetivoId);
          if (objetivo) {
            objetivo.unidadesComEntregas = Object.values(entregasPorUnidade);
          }
        }
      });
  }

  async carregaAtividades(
    entregasPlanoTrabalho: PlanoTrabalhoEntrega[],
    entrega: Entrega,
    event: Event
  ) {
    const entregasPlanoTrabalhoIds = entregasPlanoTrabalho.map((e) => e.id);
    entrega!.atividades = await this.atividadeDao
      .query({
        where: [['plano_trabalho_entrega_id', 'in', entregasPlanoTrabalhoIds]],
        join: ['usuario:id,nome'],
      })
      .asPromise();

    const divPai = (event.target as HTMLElement).closest('.entrega-geral')
    const divAtividades = divPai?.getElementsByClassName('atividades');
    if(divAtividades?.length){
      divAtividades[0].setAttribute("class", "atividades atividadesVisivel");
      if(!entrega.atividades.length){
        divAtividades[0].innerHTML = `Essa entrega não tem ${this.lex.translate('Atividades')} cadastradas`
      }  
    }
    
    this.cdRef.detectChanges();
  }

  public onPlanejamentoChange() {
    if (this.planejamentoInstitucional!.selectedItem) {
      this.dao!.getById(
        this.planejamentoInstitucional!.selectedItem?.key,
        this.join
      ).then((planejamento) => {
        this.planejamento = planejamento as Planejamento;
        this.objetivos = this.planejamento.objetivos_okr || [];
        this.cdRef.detectChanges();
      });
    }
  }
}
