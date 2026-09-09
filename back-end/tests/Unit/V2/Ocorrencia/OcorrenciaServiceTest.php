<?php

use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Ocorrencia\DTOs\OcorrenciaImpactoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\OcorrenciaImpactoPolicy;
use App\V2\Ocorrencia\OcorrenciaService;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

beforeEach(function () {
    $this->validator = Mockery::mock(OcorrenciaStoreValidator::class);
    $this->impactoPolicy = Mockery::mock(OcorrenciaImpactoPolicy::class);
    $this->afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
    $this->ptRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->service = new OcorrenciaService(
        $this->validator,
        $this->impactoPolicy,
        $this->afastamentoRepo,
        $this->ptRepo,
        $this->consolidacaoRepo,
        $this->unidadeRepo,
        $this->usuarioRepo,
    );

    Auth::shouldReceive('id')->andReturn('user-logado');
});

describe('getGerenciadasComSubordinadasIds (via agentes)', function () {

    test('passa unidade IDs do repository para findAgentesVisiveis', function () {
        $this->unidadeRepo->shouldReceive('getGerenciadasComSubordinadasIds')
            ->once()->with('user-logado')
            ->andReturn(['unidade-a', 'unidade-b', 'unidade-c']);

        $this->usuarioRepo->shouldReceive('findAgentesVisiveis')
            ->once()
            ->with('user-logado', ['unidade-a', 'unidade-b', 'unidade-c'])
            ->andReturn(new Collection());

        $this->service->agentes();
    });

    test('retorna vazio quando usuário não gerencia nenhuma unidade', function () {
        $this->unidadeRepo->shouldReceive('getGerenciadasComSubordinadasIds')
            ->once()->with('user-logado')
            ->andReturn([]);

        $this->usuarioRepo->shouldReceive('findAgentesVisiveis')
            ->once()
            ->with('user-logado', [])
            ->andReturn(new Collection());

        $this->service->agentes();
    });
});

describe('impactoConsolidacoes', function () {

    test('bloqueia exclusão quando ocorrência tem mais de 365 dias', function () {
        $afastamento = Mockery::mock(Afastamento::class)->makePartial();
        $afastamento->shouldReceive('getAttribute')->with('created_at')->andReturn(now()->subDays(400));

        $this->afastamentoRepo->shouldReceive('findById')
            ->once()->with('af-old')->andReturn($afastamento);

        $this->impactoPolicy->shouldNotReceive('calcularImpacto');

        $dto = new OcorrenciaOperacaoDTO('user-1', '2026-01-01', '2026-01-31', 'af-old', 'excluir');
        $result = $this->service->impactoConsolidacoes($dto);

        expect($result->operacaoBloqueada)->toBeTrue();
    });

    test('delega ao policy quando exclusão tem menos de 365 dias', function () {
        $afastamento = Mockery::mock(Afastamento::class)->makePartial();
        $afastamento->shouldReceive('getAttribute')->with('created_at')->andReturn(now()->subDays(100));

        $this->afastamentoRepo->shouldReceive('findById')
            ->once()->with('af-recent')->andReturn($afastamento);

        $this->impactoPolicy->shouldReceive('calcularImpacto')
            ->once()->andReturn(OcorrenciaImpactoDTO::semImpacto());

        $dto = new OcorrenciaOperacaoDTO('user-1', '2026-01-01', '2026-01-31', 'af-recent', 'excluir');
        $result = $this->service->impactoConsolidacoes($dto);

        expect($result->operacaoBloqueada)->toBeFalse();
    });

    test('delega ao policy para operações que não são exclusão', function () {
        $this->afastamentoRepo->shouldNotReceive('findById');

        $this->impactoPolicy->shouldReceive('calcularImpacto')
            ->once()->andReturn(OcorrenciaImpactoDTO::semImpacto());

        $dto = new OcorrenciaOperacaoDTO('user-1', '2026-01-01', '2026-01-31', null, 'criar');
        $result = $this->service->impactoConsolidacoes($dto);

        expect($result->operacaoBloqueada)->toBeFalse();
    });
});
