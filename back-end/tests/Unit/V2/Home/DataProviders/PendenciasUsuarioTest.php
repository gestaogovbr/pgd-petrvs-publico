<?php

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Home\DataProviders\PendenciasUsuario;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\PlanoTrabalho\DataProviders\AguardandoMinhaAssinaturaDataProvider;
use App\V2\PlanoTrabalho\DataProviders\AguardandoMinhaAvaliacaoDataProvider;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    \Illuminate\Support\Facades\Cache::flush();
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->planoEntregaRepository = Mockery::mock(PlanoEntregaRepository::class);
    $this->aguardandoAssinatura = Mockery::mock(AguardandoMinhaAssinaturaDataProvider::class);
    $this->aguardandoAvaliacao = Mockery::mock(AguardandoMinhaAvaliacaoDataProvider::class);

    $this->provider = new PendenciasUsuario(
        $this->unidadeRepository,
        $this->planoTrabalhoRepository,
        $this->consolidacaoRepository,
        $this->planoEntregaRepository,
        $this->aguardandoAssinatura,
        $this->aguardandoAvaliacao,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PendenciasUsuario::getData', function () {

    test('retorna array com 6 contagens quando subordinadas está desabilitado', function () {
        $dto = HomeRequestDTO::fromArray(['unidade_id' => 'unidade-1', 'subordinadas' => false], 'user-1');

        // Sem subordinadas, não chama getSubordinadasRecursivasIds
        $this->unidadeRepository->shouldNotReceive('getSubordinadasRecursivasIds');

        // PE homologação: subordinadas vazio → 0
        $this->planoEntregaRepository
            ->shouldReceive('countPlanosEntregaHomologacao')
            ->with([])
            ->andReturn(0);

        // PT assinatura: escopo = [unidade-1]
        $this->planoTrabalhoRepository
            ->shouldReceive('countPlanosTrabalhoAssinatura')
            ->with(['unidade-1'], 'user-1')
            ->andReturn(3);

        // PE sem progresso: apenas a própria unidade
        $this->planoEntregaRepository
            ->shouldReceive('countEntregasSemProgresso')
            ->with(['unidade-1'], PlanoEntrega::DATA_MUDANCA_REGRA_PE)
            ->andReturn(2);

        // PT consolidações atrasadas
        $this->consolidacaoRepository
            ->shouldReceive('countConsolidacoesAtrasadas')
            ->with('user-1', ['unidade-1'])
            ->andReturn(1);

        // PT avaliação: escopo = [unidade-1]
        $this->planoTrabalhoRepository
            ->shouldReceive('countAguardandoMinhaAvaliacao')
            ->with(['unidade-1'], 'user-1')
            ->andReturn(5);

        // PE avaliação: subordinadas vazio → 0
        $this->planoEntregaRepository
            ->shouldReceive('countPlanosEntregaAvaliacao')
            ->with([], PlanoEntrega::DATA_MUDANCA_REGRA_PE)
            ->andReturn(0);

        $result = $this->provider->getData($dto);

        expect($result)->toBe([
            'assinaturas_pe_pendentes' => 0,
            'assinaturas_pt_pendentes' => 3,
            'registros_execucao_pe_atraso' => 2,
            'registros_execucao_pt_atraso' => 1,
            'avaliacoes_pt_pendentes' => 5,
            'avaliacoes_pe_pendentes' => 0,
        ]);
    });

    test('retorna contagens com subordinadas quando habilitado', function () {
        $dto = HomeRequestDTO::fromArray(['unidade_id' => 'unidade-1', 'subordinadas' => true], 'user-1');

        $this->unidadeRepository
            ->shouldReceive('getSubordinadasRecursivasIds')
            ->with(['unidade-1'])
            ->andReturn(['sub-1', 'sub-2']);

        // PE homologação: subordinadas [sub-1, sub-2]
        $this->planoEntregaRepository
            ->shouldReceive('countPlanosEntregaHomologacao')
            ->with(['sub-1', 'sub-2'])
            ->andReturn(4);

        // PT assinatura: escopo completo [unidade-1, sub-1, sub-2]
        $this->planoTrabalhoRepository
            ->shouldReceive('countPlanosTrabalhoAssinatura')
            ->with(['unidade-1', 'sub-1', 'sub-2'], 'user-1')
            ->andReturn(7);

        // PE sem progresso: apenas a própria unidade
        $this->planoEntregaRepository
            ->shouldReceive('countEntregasSemProgresso')
            ->with(['unidade-1'], PlanoEntrega::DATA_MUDANCA_REGRA_PE)
            ->andReturn(1);

        // PT consolidações atrasadas
        $this->consolidacaoRepository
            ->shouldReceive('countConsolidacoesAtrasadas')
            ->with('user-1', ['unidade-1'])
            ->andReturn(0);

        // PT avaliação: escopo completo
        $this->planoTrabalhoRepository
            ->shouldReceive('countAguardandoMinhaAvaliacao')
            ->with(['unidade-1', 'sub-1', 'sub-2'], 'user-1')
            ->andReturn(10);

        // PE avaliação: subordinadas [sub-1, sub-2]
        $this->planoEntregaRepository
            ->shouldReceive('countPlanosEntregaAvaliacao')
            ->with(['sub-1', 'sub-2'], PlanoEntrega::DATA_MUDANCA_REGRA_PE)
            ->andReturn(2);

        $result = $this->provider->getData($dto);

        expect($result)->toBe([
            'assinaturas_pe_pendentes' => 4,
            'assinaturas_pt_pendentes' => 7,
            'registros_execucao_pe_atraso' => 1,
            'registros_execucao_pt_atraso' => 0,
            'avaliacoes_pt_pendentes' => 10,
            'avaliacoes_pe_pendentes' => 2,
        ]);
    });

    test('retorna zeros quando não há pendências', function () {
        $dto = HomeRequestDTO::fromArray(['unidade_id' => 'unidade-1', 'subordinadas' => false], 'user-1');

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaHomologacao')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countPlanosTrabalhoAssinatura')->andReturn(0);
        $this->planoEntregaRepository->shouldReceive('countEntregasSemProgresso')->andReturn(0);
        $this->consolidacaoRepository->shouldReceive('countConsolidacoesAtrasadas')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countAguardandoMinhaAvaliacao')->andReturn(0);
        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')->andReturn(0);

        $result = $this->provider->getData($dto);

        expect($result)->toBe([
            'assinaturas_pe_pendentes' => 0,
            'assinaturas_pt_pendentes' => 0,
            'registros_execucao_pe_atraso' => 0,
            'registros_execucao_pt_atraso' => 0,
            'avaliacoes_pt_pendentes' => 0,
            'avaliacoes_pe_pendentes' => 0,
        ]);
    });

    test('registros_execucao_pe usa apenas a unidade raiz independente de subordinadas', function () {
        $dto = HomeRequestDTO::fromArray(['unidade_id' => 'unidade-1', 'subordinadas' => true], 'user-1');

        $this->unidadeRepository->shouldReceive('getSubordinadasRecursivasIds')->andReturn(['sub-1']);

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaHomologacao')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countPlanosTrabalhoAssinatura')->andReturn(0);
        $this->consolidacaoRepository->shouldReceive('countConsolidacoesAtrasadas')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countAguardandoMinhaAvaliacao')->andReturn(0);
        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')->andReturn(0);

        // Verifica que passa apenas a unidade raiz, não as subordinadas
        $this->planoEntregaRepository
            ->shouldReceive('countEntregasSemProgresso')
            ->once()
            ->with(['unidade-1'], PlanoEntrega::DATA_MUDANCA_REGRA_PE)
            ->andReturn(3);

        $result = $this->provider->getData($dto);

        expect($result['registros_execucao_pe_atraso'])->toBe(3);
    });

    test('registros_execucao_pt usa apenas a unidade raiz', function () {
        $dto = HomeRequestDTO::fromArray(['unidade_id' => 'unidade-1', 'subordinadas' => true], 'user-1');

        $this->unidadeRepository->shouldReceive('getSubordinadasRecursivasIds')->andReturn(['sub-1']);

        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaHomologacao')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countPlanosTrabalhoAssinatura')->andReturn(0);
        $this->planoEntregaRepository->shouldReceive('countEntregasSemProgresso')->andReturn(0);
        $this->planoTrabalhoRepository->shouldReceive('countAguardandoMinhaAvaliacao')->andReturn(0);
        $this->planoEntregaRepository->shouldReceive('countPlanosEntregaAvaliacao')->andReturn(0);

        // Verifica que passa usuario + unidade raiz
        $this->consolidacaoRepository
            ->shouldReceive('countConsolidacoesAtrasadas')
            ->once()
            ->with('user-1', ['unidade-1'])
            ->andReturn(2);

        $result = $this->provider->getData($dto);

        expect($result['registros_execucao_pt_atraso'])->toBe(2);
    });
});
