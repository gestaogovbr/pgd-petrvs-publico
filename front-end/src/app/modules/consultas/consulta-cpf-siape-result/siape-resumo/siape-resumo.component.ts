import { Component, Input, OnInit } from '@angular/core';

export interface SiapeRelatorioUnidade {
  chefeCpf?: string | null;
  quantidadeServidoresLotados?: number | null;
  unidade?: {
    id?: string | null;
    codigo?: string | null;
    sigla?: string | null;
    nome?: string | null;
    unidade_pai_id?: string | null;
    unidade_pai_codigo?: string | null;
    unidade_pai_sigla?: string | null;
    unidade_raiz?: boolean | null;
  } | null;
}

export interface SiapeResumoServidorItem {
  status: string;
  mensagem?: string | null;
  nome?: string | null;
  usuario_existia?: boolean;
  usuario_inserido?: boolean;
  lotacao_associada?: boolean;
  alteracoes?: string[];
}

export interface SiapeResumoUnidadeItem {
  status: string;
  mensagem?: string | null;
  unidade_codigo?: string | null;
  unidade_nome?: string | null;
  unidade_sigla?: string | null;
  unidade_existia?: boolean;
  unidade_inserida?: boolean;
  unidade_pai_id?: string | null;
  unidade_pai_codigo?: string | null;
  unidade_pai_sigla?: string | null;
  unidade_raiz?: boolean | null;
  quantidade_servidores_lotados?: number | null;
  chefe_cpf?: string | null;
  alteracoes?: string[];
}

export type SiapeResumoItem = SiapeResumoServidorItem | SiapeResumoUnidadeItem;

@Component({
    selector: 'app-siape-resumo',
    templateUrl: './siape-resumo.component.html',
    styleUrls: ['./siape-resumo.component.scss'],
    standalone: false
})
export class SiapeResumoComponent implements OnInit {

  @Input() resumo: SiapeResumoItem[] = [];
  @Input() relatorio?: SiapeRelatorioUnidade;

  constructor() { }

  ngOnInit() {
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case 'sucesso': return 'success';
      case 'parcial': return 'warning';
      case 'erro': return 'danger';
      default: return 'secondary';
    }
  }

  public getStatusIcon(status: string): string {
    switch (status) {
      case 'sucesso': return 'bi bi-check-circle-fill';
      case 'parcial': return 'bi bi-exclamation-triangle-fill';
      case 'erro': return 'bi bi-x-circle-fill';
      default: return 'bi bi-info-circle-fill';
    }
  }

  public getStatusLabel(status: string): string {
    switch (status) {
      case 'sucesso': return 'Sucesso';
      case 'parcial': return 'Parcial';
      case 'erro': return 'Erro';
      default: return 'Desconhecido';
    }
  }

  public isResumoUnidade(item: SiapeResumoItem): item is SiapeResumoUnidadeItem {
    return 'unidade_codigo' in item || 'unidade_existia' in item;
  }

  public isResumoServidor(item: SiapeResumoItem): item is SiapeResumoServidorItem {
    return !this.isResumoUnidade(item);
  }

  public unidadePaiLabel(item: SiapeResumoUnidadeItem): string {
    if (item.unidade_raiz) {
      return 'Unidade raiz';
    }

    if (item.unidade_pai_codigo || item.unidade_pai_sigla) {
      return [item.unidade_pai_codigo, item.unidade_pai_sigla].filter(Boolean).join(' - ');
    }

    return 'Não informada';
  }
}
