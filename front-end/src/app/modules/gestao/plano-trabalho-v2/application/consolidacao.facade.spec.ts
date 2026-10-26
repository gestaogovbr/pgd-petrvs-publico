import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConsolidacaoFacade } from './consolidacao.facade';
import { ConsolidacaoApiClient } from '../infra/consolidacao-api.client';
import { ConcluirConsolidacaoUseCase } from './concluir-consolidacao.usecase';
import { AvaliarConsolidacaoUseCase } from './avaliar-consolidacao.usecase';
import { SolicitarRecursoUseCase } from './solicitar-recurso.usecase';
import { TipoMotivoAfastamentoService } from 'src/app/v2/services/tipo-motivo-afastamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/v2/services/message.service';
import { Consolidacao, ContribuicaoExecucao } from '../domain/types';

function contribuicao(partial: Partial<ContribuicaoExecucao> = {}): ContribuicaoExecucao {
  return {
    id: partial.id ?? 'contrib-1',
    plano_trabalho_consolidacao_id: partial.plano_trabalho_consolidacao_id ?? 'consol-1',
    plano_trabalho_entrega_id: partial.plano_trabalho_entrega_id ?? null,
    plano_entrega_entrega_id: partial.plano_entrega_entrega_id ?? 'pee-1',
    orgao: partial.orgao ?? null,
    descricao: partial.descricao ?? null,
    esforco_executado: partial.esforco_executado ?? 0,
    registrado_at: partial.registrado_at ?? null,
    plano_entrega_entrega: partial.plano_entrega_entrega ?? null,
  };
}

function consolidacao(contribuicoes: ContribuicaoExecucao[]): Consolidacao {
  return {
    id: 'consol-1',
    status: 'INCLUIDO',
    data_inicio: '2025-01-01',
    data_fim: '2025-01-31',
    atividades: [],
    contribuicoes,
    avaliacoes: [],
    avaliacao_id: null,
    ocorrencias: [],
  };
}

describe('ConsolidacaoFacade', () => {
  let facade: ConsolidacaoFacade;
  let api: jasmine.SpyObj<ConsolidacaoApiClient>;
  let message: jasmine.SpyObj<MessageService>;
  let concluirUC: jasmine.SpyObj<ConcluirConsolidacaoUseCase>;

  beforeEach(() => {
    api = jasmine.createSpyObj<ConsolidacaoApiClient>('ConsolidacaoApiClient', [
      'getConsolidacoes', 'getDispensas', 'getNotasConsolidacao',
      'updateContribuicao', 'deleteContribuicao',
    ]);
    message = jasmine.createSpyObj<MessageService>('MessageService', ['success', 'error']);
    concluirUC = jasmine.createSpyObj<ConcluirConsolidacaoUseCase>('ConcluirConsolidacaoUseCase', ['execute']);

    TestBed.configureTestingModule({
      providers: [
        ConsolidacaoFacade,
        { provide: ConsolidacaoApiClient, useValue: api },
        { provide: ConcluirConsolidacaoUseCase, useValue: concluirUC },
        { provide: AvaliarConsolidacaoUseCase, useValue: {} },
        { provide: SolicitarRecursoUseCase, useValue: {} },
        { provide: TipoMotivoAfastamentoService, useValue: { listar: () => of([]) } },
        { provide: AuthService, useValue: { usuario: { id: 'u-1', nome_exibicao: 'User' } } },
        { provide: MessageService, useValue: message },
      ],
    });

    facade = TestBed.inject(ConsolidacaoFacade);
  });

  it('getContribuicoes retorna as contribuições do período', () => {
    const c = consolidacao([contribuicao()]);
    expect(facade.getContribuicoes(c).length).toBe(1);
  });

  it('getEsforcoExecutado usa o valor da contribuição quando não editado', () => {
    const contrib = contribuicao({ esforco_executado: 42 });
    expect(facade.getEsforcoExecutado('consol-1', contrib)).toBe(42);
  });

  it('getEsforcoExecutado usa o valor editado quando setado', () => {
    const contrib = contribuicao({ esforco_executado: 42 });
    facade.setEsforcoExecutado('consol-1', contrib.id, '80');
    expect(facade.getEsforcoExecutado('consol-1', contrib)).toBe(80);
  });

  it('estaRegistrada reflete registrado_at', () => {
    expect(facade.estaRegistrada(contribuicao({ registrado_at: null }))).toBeFalse();
    expect(facade.estaRegistrada(contribuicao({ registrado_at: '2025-02-01' }))).toBeTrue();
  });

  it('esforcoExecutadoValido valida intervalo 0..999,99', () => {
    facade.setEsforcoExecutado('consol-1', 'contrib-1', '50');
    expect(facade.esforcoExecutadoValido('consol-1', contribuicao())).toBeTrue();
    facade.setEsforcoExecutado('consol-1', 'contrib-1', '1000');
    expect(facade.esforcoExecutadoValido('consol-1', contribuicao())).toBeFalse();
  });

  it('temAlteracao detecta mudança de texto ou esforço', () => {
    const contrib = contribuicao({ descricao: 'base', esforco_executado: 10 });
    const c = consolidacao([contrib]);
    expect(facade.temAlteracao(c, contrib)).toBeFalse();
    facade.setTexto('consol-1', contrib.id, 'novo texto');
    expect(facade.temAlteracao(c, contrib)).toBeTrue();
  });

  it('podeConfirmar exige texto e esforço válido', () => {
    const contrib = contribuicao({ descricao: '', esforco_executado: 10 });
    const c = consolidacao([contrib]);
    expect(facade.podeConfirmar(c, contrib)).toBeFalse();
    facade.setTexto('consol-1', contrib.id, 'trabalho');
    expect(facade.podeConfirmar(c, contrib)).toBeTrue();
  });

  it('confirmarContribuicao chama updateContribuicao e atualiza a lista', () => {
    const contrib = contribuicao({ descricao: 'x', esforco_executado: 10 });
    const c = consolidacao([contrib]);
    facade.consolidacoes.set([c]);
    const salva = contribuicao({ descricao: 'trabalho', esforco_executado: 30, registrado_at: '2025-02-01' });
    api.updateContribuicao.and.returnValue(of(salva));

    facade.setTexto('consol-1', contrib.id, 'trabalho');
    facade.setEsforcoExecutado('consol-1', contrib.id, '30');
    facade.confirmarContribuicao(c, contrib);

    expect(api.updateContribuicao).toHaveBeenCalled();
    expect(facade.consolidacoes()[0].contribuicoes[0].registrado_at).toBe('2025-02-01');
  });

  it('excluirContribuicao remove da lista após confirmação', () => {
    const contrib = contribuicao();
    const c = consolidacao([contrib]);
    facade.consolidacoes.set([c]);
    api.deleteContribuicao.and.returnValue(of(void 0));

    facade.excluirContribuicao(c, contrib);
    facade.confirmacaoPendente()!.onConfirmar();

    expect(api.deleteContribuicao).toHaveBeenCalledWith('', 'consol-1', contrib.id);
    expect(facade.consolidacoes()[0].contribuicoes.length).toBe(0);
  });

  it('iniciarJustificativaCargaHoraria abre o modal com o total', () => {
    const c = consolidacao([contribuicao({ registrado_at: '2025-02-01' })]);
    facade.iniciarJustificativaCargaHoraria(c, 80);

    expect(facade.justificativaCargaHorariaPendente()?.total).toBe(80);
    expect(facade.justificativaCargaHorariaPendente()?.consolidacao.id).toBe('consol-1');
  });

  it('confirmarJustificativaCargaHoraria conclui enviando a justificativa', () => {
    const c = consolidacao([contribuicao({ registrado_at: '2025-02-01' })]);
    facade.consolidacoes.set([c]);
    concluirUC.execute.and.returnValue(of({ ...c, status: 'CONCLUIDO' }));

    facade.iniciarJustificativaCargaHoraria(c, 80);
    facade.justificativaCargaHoraria.set('Justificativa da divergência');
    facade.confirmarJustificativaCargaHoraria();

    expect(concluirUC.execute).toHaveBeenCalledWith('', 'consol-1', 'Justificativa da divergência');
    expect(facade.justificativaCargaHorariaPendente()).toBeNull();
  });

  it('confirmarJustificativaCargaHoraria não conclui sem justificativa', () => {
    const c = consolidacao([contribuicao()]);
    facade.iniciarJustificativaCargaHoraria(c, 80);
    facade.justificativaCargaHoraria.set('   ');
    facade.confirmarJustificativaCargaHoraria();

    expect(concluirUC.execute).not.toHaveBeenCalled();
  });

  it('concluirConsolidacao sem divergência conclui direto na confirmação', () => {
    const c = consolidacao([contribuicao({ registrado_at: '2025-02-01' })]);
    facade.consolidacoes.set([c]);
    concluirUC.execute.and.returnValue(of({ ...c, status: 'CONCLUIDO' }));

    facade.concluirConsolidacao(c);
    facade.confirmacaoPendente()!.onConfirmar();

    expect(concluirUC.execute).toHaveBeenCalledWith('', 'consol-1', undefined);
  });
});
