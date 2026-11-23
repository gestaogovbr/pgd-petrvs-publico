import { TestBed } from '@angular/core/testing';
import { ConsolidacaoPolicy } from './consolidacao.policy';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { Consolidacao, ConsolidacaoStatus, PlanoTrabalho } from '../domain/types';
import { PlanoTrabalhoStatus } from 'src/app/models/plano-trabalho.model';

function plano(partial: Partial<PlanoTrabalho> = {}): PlanoTrabalho {
  return {
    status: PlanoTrabalhoStatus.ATIVO,
    encerrado_at: null,
    usuario_id: 'u-1',
    unidade_id: 'unid-1',
    ...partial,
  } as unknown as PlanoTrabalho;
}

function consolidacao(partial: Partial<Consolidacao> = {}): Consolidacao {
  return {
    id: 'consol-1',
    status: ConsolidacaoStatus.INCLUIDO,
    data_inicio: '2025-08-01',
    data_fim: '2025-08-31',
    atividades: [],
    contribuicoes: [],
    avaliacoes: [],
    avaliacao_id: null,
    ocorrencias: [],
    ...partial,
  };
}

describe('ConsolidacaoPolicy', () => {
  let policy: ConsolidacaoPolicy;
  let unidadeService: jasmine.SpyObj<UnidadeService>;

  beforeEach(() => {
    unidadeService = jasmine.createSpyObj<UnidadeService>('UnidadeService', ['isGestorUnidade']);

    TestBed.configureTestingModule({
      providers: [
        ConsolidacaoPolicy,
        { provide: AuthService, useValue: { usuario: { id: 'u-1' } } },
        { provide: UnidadeService, useValue: unidadeService },
      ],
    });

    policy = TestBed.inject(ConsolidacaoPolicy);
  });

  describe('podeGerenciarContribuicoes', () => {
    it('permite quando PT está em execução e período INCLUIDO', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      expect(policy.podeGerenciarContribuicoes(plano(), consolidacao())).toBeTrue();
    });

    it('permite quando PT foi encerrado antecipadamente e o período é anterior ao encerramento', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      const planoTrabalho = plano({ status: PlanoTrabalhoStatus.CONCLUIDO, encerrado_at: '2025-09-30' });
      const periodo = consolidacao({ data_inicio: '2025-09-01' });

      expect(policy.podeGerenciarContribuicoes(planoTrabalho, periodo)).toBeTrue();
    });

    it('bloqueia quando o período é posterior ao encerramento antecipado', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      const planoTrabalho = plano({ status: PlanoTrabalhoStatus.CONCLUIDO, encerrado_at: '2025-09-30' });
      const periodo = consolidacao({ data_inicio: '2025-10-01' });

      expect(policy.podeGerenciarContribuicoes(planoTrabalho, periodo)).toBeFalse();
    });

    it('bloqueia quando PT está CONCLUIDO sem encerramento antecipado', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      const planoTrabalho = plano({ status: PlanoTrabalhoStatus.CONCLUIDO, encerrado_at: null });

      expect(policy.podeGerenciarContribuicoes(planoTrabalho, consolidacao())).toBeFalse();
    });

    it('bloqueia quando o período está fechado', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      const periodo = consolidacao({ status: ConsolidacaoStatus.CONCLUIDO });

      expect(policy.podeGerenciarContribuicoes(plano(), periodo)).toBeFalse();
    });

    it('bloqueia quando o usuário não é dono nem gestor da unidade', () => {
      unidadeService.isGestorUnidade.and.returnValue(false);
      const planoTrabalho = plano({ usuario_id: 'outro-usuario' });

      expect(policy.podeGerenciarContribuicoes(planoTrabalho, consolidacao())).toBeFalse();
    });

    it('permite quando o usuário é gestor da unidade', () => {
      unidadeService.isGestorUnidade.and.returnValue(true);
      const planoTrabalho = plano({ usuario_id: 'outro-usuario' });

      expect(policy.podeGerenciarContribuicoes(planoTrabalho, consolidacao())).toBeTrue();
    });
  });
});
