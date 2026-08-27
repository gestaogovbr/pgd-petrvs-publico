import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { RelatorioLacunaPlanoTrabalhoDaoService } from 'src/app/dao/relatorio-lacuna-plano-trabalho-dao.service';
import { RelatorioLacunaPlanoTrabalho } from 'src/app/models/relatorio-lacuna-plano-trabalho.model';
import { QueryOptions } from 'src/app/dao/query-options';
import { of } from 'rxjs';
import { RelatorioBaseComponent } from '../relatorio-base/relatorio-base.component';

@Component({
  selector: 'relatorio-lacuna-plano-trabalho',
  templateUrl: './relatorio-lacuna-plano-trabalho.component.html',
  styleUrls: ['./relatorio-lacuna-plano-trabalho.component.scss'],
  standalone: false
})
export class RelatorioLacunaPlanoTrabalhoComponent extends RelatorioBaseComponent<
  RelatorioLacunaPlanoTrabalho,
  RelatorioLacunaPlanoTrabalhoDaoService
> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public permissao: string = 'MOD_RELATORIO_PT';
  public readonly lacunaHint =
    'Período em que o agente público, esteve selecionado como Participante do PGD no Siape, mas não possui Plano de Trabalho em execução ou concluído.';

  constructor(public injector: Injector) {
    super(injector, RelatorioLacunaPlanoTrabalho, RelatorioLacunaPlanoTrabalhoDaoService);

    this.filter = this.fh.FormBuilder({
      unidade_id: { default: this.auth.unidade?.id },
      incluir_unidades_subordinadas: { default: false },
      periodo_inicio: { default: null },
      periodo_fim: { default: null },
      nome: { default: '' },
      matricula: { default: '' },
      unidadeNome: { default: '' },
      quantidade_dias: { default: '' },
      lacuna: { default: '' },
      ocorrencias_texto: { default: '' },
    });

    this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
    this.filter!.get('periodo_inicio')?.setValidators(this.requiredValidator.bind(this));
    this.filter!.get('periodo_fim')?.setValidators(this.requiredValidator.bind(this));
    this.filter.get('unidade_id')?.updateValueAndValidity();
    this.filter.get('periodo_inicio')?.updateValueAndValidity();
    this.filter.get('periodo_fim')?.updateValueAndValidity();

    this.orderBy = [
      ['unidadeHierarquia', 'asc'],
      ['nome_exibicao', 'asc'],
      ['lacuna_inicio', 'asc'],
    ];
    this.rowsLimit = 20;
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.loaded = true;
  }

  public filterWhere = (filter: FormGroup) => {
    const result: any[] = [];
    const form: any = filter.value;

    if (form.unidade_id?.length) {
      result.push(['unidade_id', '==', form.unidade_id]);
    }

    if (form.incluir_unidades_subordinadas) {
      result.push(['incluir_unidades_subordinadas', '==', 1]);
    }

    if (form.periodo_inicio) {
      const inicio =
        typeof form.periodo_inicio === 'string'
          ? form.periodo_inicio.slice(0, 10)
          : form.periodo_inicio.toISOString().slice(0, 10);
      result.push(['periodo_inicio', '==', inicio]);
    }

    if (form.periodo_fim) {
      const fim =
        typeof form.periodo_fim === 'string'
          ? form.periodo_fim.slice(0, 10)
          : form.periodo_fim.toISOString().slice(0, 10);
      result.push(['periodo_fim', '==', fim]);
    }

    if (form.nome) {
      result.push(['nome', 'like', '%' + form.nome + '%']);
    }

    if (form.matricula?.length) {
      result.push(['matricula', 'like', '%' + form.matricula + '%']);
    }

    if (form.unidadeNome) {
      result.push(['unidadeHierarquia', 'like', '%' + form.unidadeNome + '%']);
    }

    if (form.quantidade_dias !== '' && form.quantidade_dias !== null) {
      result.push(['quantidade_dias', '==', form.quantidade_dias]);
    }

    if (form.lacuna) {
      result.push(['lacuna', 'like', '%' + form.lacuna + '%']);
    }

    if (form.ocorrencias_texto) {
      result.push(['ocorrencias_texto', 'like', '%' + form.ocorrencias_texto + '%']);
    }

    return result;
  };

  public onButtonFilterClick = (filter: FormGroup) => {
    if (this.filter!.valid) {
      if (this.grid && this.grid.query) {
        this.loaded = true;
      }
      const queryOptions = this.grid?.queryOptions || this.queryOptions || {};
      this.grid?.query?.reload(queryOptions);
    } else {
      this.filter!.markAllAsTouched();
    }
  };

  public exportExcel = (form: any, queryOptions: QueryOptions) => {
    this.loading = true;
    try {
      return this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy,
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }

    return of(null);
  };
}
