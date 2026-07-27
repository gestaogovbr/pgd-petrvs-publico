import { inject, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import {
  RELATORIO_ENTREGA_PERMISSAO,
  RELATORIO_ENTREGA_PERMISSAO_PE,
} from '../domain/types';

@Injectable()
export class RelatorioEntregaUnidadesService {
  private readonly auth = inject(AuthService);
  private readonly unidadeDao = inject(UnidadeDaoService);

  readonly permissao = RELATORIO_ENTREGA_PERMISSAO;

  unidadesPermitidas: string[] = [];

  async init(): Promise<void> {
    this.unidadesPermitidas = [];
    if (this.podeTodasUnidades() || !this.auth.unidade) {
      return;
    }

    let unidades = [this.auth.unidade];
    if (this.podeUnidadesVinculadas()) {
      if (this.auth.unidades?.length) {
        unidades = this.auth.unidades;
      }
    }

    for (const unidade of unidades) {
      if (!unidade?.id) continue;
      this.unidadesPermitidas.push(unidade.id);
      const subordinadas = (await this.unidadeDao.subordinadas(unidade.id)).map((item) => item.id);
      this.unidadesPermitidas = this.unidadesPermitidas.concat(subordinadas);
    }
  }

  podeAcessar(): boolean {
    return (
      this.auth.hasPermissionTo(RELATORIO_ENTREGA_PERMISSAO) ||
      this.auth.hasPermissionTo(RELATORIO_ENTREGA_PERMISSAO_PE)
    );
  }

  whereUnidade(): unknown[] {
    if (this.podeTodasUnidades() || !this.unidadesPermitidas.length) {
      return [];
    }
    return [['id', 'in', this.unidadesPermitidas]];
  }

  /** Unidade informada é válida para seleção (atribuição ativa + escopo do relatório). */
  normalizarUnidadeSelecionada(unidadeId: string | null): string | null {
    if (!unidadeId) return null;
    if (!this.possuiAtribuicaoAtiva(unidadeId)) return null;
    if (!this.isUnidadePermitida(unidadeId)) return null;
    return unidadeId;
  }

  /**
   * RN04 no escopo do relatório: mais alta na hierarquia com atribuição ativa;
   * empate → unidade atual do usuário.
   */
  resolverUnidadePadrao(_apiPadrao?: string | null): string | null {
    const candidatos = this.unidadesComAtribuicaoAtivaNoEscopo();
    return this.selecionarMaisAlta(candidatos);
  }

  private unidadesComAtribuicaoAtivaNoEscopo(): Unidade[] {
    const comAtribuicao = this.unidadesComAtribuicaoAtiva();
    if (this.podeTodasUnidades() || !this.unidadesPermitidas.length) {
      return comAtribuicao;
    }
    return comAtribuicao.filter((u) => u.id && this.unidadesPermitidas.includes(u.id));
  }

  private unidadesComAtribuicaoAtiva(): Unidade[] {
    const areas = this.auth.usuario?.areas_trabalho ?? [];
    const unidades: Unidade[] = [];

    for (const area of areas) {
      const ativas = (area.atribuicoes ?? []).some((atribuicao) => !atribuicao.deleted_at);
      if (!ativas || !area.unidade?.id) continue;
      unidades.push(area.unidade);
    }

    return unidades;
  }

  private possuiAtribuicaoAtiva(unidadeId: string): boolean {
    return this.unidadesComAtribuicaoAtiva().some((u) => u.id === unidadeId);
  }

  private isUnidadePermitida(unidadeId: string): boolean {
    if (this.podeTodasUnidades() || !this.unidadesPermitidas.length) {
      return true;
    }
    return this.unidadesPermitidas.includes(unidadeId);
  }

  private selecionarMaisAlta(candidatos: Unidade[]): string | null {
    if (!candidatos.length) return null;

    let menorProfundidade = Number.MAX_SAFE_INTEGER;
    let melhores: Unidade[] = [];

    for (const unidade of candidatos) {
      const profundidade = this.profundidadeHierarquica(unidade);
      if (profundidade < menorProfundidade) {
        menorProfundidade = profundidade;
        melhores = [unidade];
        continue;
      }
      if (profundidade === menorProfundidade) {
        melhores.push(unidade);
      }
    }

    if (melhores.length === 1) {
      return melhores[0].id ?? null;
    }

    const unidadeAtualId = this.auth.unidade?.id;
    if (unidadeAtualId && melhores.some((u) => u.id === unidadeAtualId)) {
      return unidadeAtualId;
    }

    melhores.sort((a, b) => (a.id ?? '').localeCompare(b.id ?? ''));
    return melhores[0].id ?? null;
  }

  private profundidadeHierarquica(unidade: Unidade): number {
    const segmentos = (unidade.path ?? '').split('/').filter((s) => s.length > 0);
    return segmentos.length + 1;
  }

  private podeTodasUnidades(): boolean {
    return (
      this.auth.hasPermissionTo(`${RELATORIO_ENTREGA_PERMISSAO}_TODAS_UNIDADES`) ||
      this.auth.hasPermissionTo(`${RELATORIO_ENTREGA_PERMISSAO_PE}_TODAS_UNIDADES`)
    );
  }

  private podeUnidadesVinculadas(): boolean {
    return (
      this.auth.hasPermissionTo(`${RELATORIO_ENTREGA_PERMISSAO}_UNIDADES_VINCULADAS`) ||
      this.auth.hasPermissionTo(`${RELATORIO_ENTREGA_PERMISSAO_PE}_UNIDADES_VINCULADAS`)
    );
  }
}
