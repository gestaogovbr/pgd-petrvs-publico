import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContribuicaoFormComponent } from './contribuicao-form.component';
import { ConsolidacaoApiClient } from '../../infra/consolidacao-api.client';
import { PlanoEntregaApiService } from 'src/app/v2/services/plano-entrega-api.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';

describe('ContribuicaoFormComponent', () => {
  let component: ContribuicaoFormComponent;
  let api: jasmine.SpyObj<ConsolidacaoApiClient>;

  beforeEach(() => {
    api = jasmine.createSpyObj<ConsolidacaoApiClient>('ConsolidacaoApiClient', ['createContribuicao']);

    TestBed.configureTestingModule({
      imports: [ContribuicaoFormComponent],
      providers: [
        { provide: ConsolidacaoApiClient, useValue: api },
        { provide: PlanoEntregaApiService, useValue: { buscarPorUnidade: () => of([]), queryEntregasPorPlano: () => of([]) } },
        { provide: UnidadeService, useValue: { searchByNomeOuCodigo: () => of([]) } },
      ],
    });

    const fixture = TestBed.createComponent(ContribuicaoFormComponent);
    component = fixture.componentInstance;
    component.plano = { id: 'plano-1', unidade_id: null } as any;
    component.consolidacaoId = 'consol-1';
  });

  it('salvar envia esforco_executado a partir do campo de CHD e origem do form', () => {
    api.createContribuicao.and.returnValue(of({} as any));

    component.entregaForm.patchValue({
      origem: 'PROPRIA_UNIDADE',
      plano_entrega_entrega_id: 'pee-1',
      descricao: 'Trabalho executado',
      forca_trabalho: 70,
    });

    const emitSpy = spyOn(component.saved, 'emit');
    component.salvar();

    expect(api.createContribuicao).toHaveBeenCalledWith('plano-1', 'consol-1', jasmine.objectContaining({
      origem: 'PROPRIA_UNIDADE',
      plano_entrega_entrega_id: 'pee-1',
      descricao: 'Trabalho executado',
      esforco_executado: 70,
    }));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('não salva quando o formulário é inválido', () => {
    component.entregaForm.patchValue({
      origem: 'PROPRIA_UNIDADE',
      plano_entrega_entrega_id: '',
      descricao: '',
      forca_trabalho: 50,
    });

    component.salvar();

    expect(api.createContribuicao).not.toHaveBeenCalled();
  });
});
