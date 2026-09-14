<?php

use App\V2\PlanoTrabalho\Entrega\Validators\PlanoTrabalhoEntregaStoreValidator;
use App\V2\PlanoTrabalho\Entrega\DTOs\PlanoTrabalhoEntregaStoreDTO;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\AtividadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->planoEntregaRepo = Mockery::mock(PlanoEntregaRepository::class);
    $this->ptEntregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);

    $this->validator = new PlanoTrabalhoEntregaStoreValidator(
        $this->planoRepo,
        $this->planoEntregaRepo,
        $this->ptEntregaRepo,
        $this->consolidacaoRepo,
        $this->atividadeRepo,
    );
});

afterEach(fn () => Mockery::close());

function mockPlano(string $status, string $dataInicio = '2025-01-01', string $dataFim = '2025-06-30'): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->data_inicio = $dataInicio;
    $plano->data_fim = $dataFim;
    return $plano;
}

function mockEntregaPE(string $dataInicio, ?string $dataFim): PlanoEntregaEntrega
{
    /** @var PlanoEntregaEntrega $entrega */
    $entrega = Mockery::mock(PlanoEntregaEntrega::class)->makePartial();
    $entrega->id = 'pee-1';
    $entrega->data_inicio = $dataInicio;
    $entrega->data_fim = $dataFim;
    return $entrega;
}

function mockConsolidacao(string $status, string $planoTrabalhoId = 'plano-1'): PlanoTrabalhoConsolidacao
{
    /** @var PlanoTrabalhoConsolidacao $consolidacao */
    $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $consolidacao->id = 'cons-1';
    $consolidacao->status = $status;
    $consolidacao->plano_trabalho_id = $planoTrabalhoId;
    return $consolidacao;
}

function dtoPlanoEntrega(string $planoTrabalhoId = 'plano-1', string $peeId = 'pee-1', ?string $consolidacaoId = null): PlanoTrabalhoEntregaStoreDTO
{
    $data = [
        'origem' => 'PROPRIA_UNIDADE',
        'plano_entrega_entrega_id' => $peeId,
    ];

    if ($consolidacaoId !== null) {
        $data['consolidacao_id'] = $consolidacaoId;
    }

    return PlanoTrabalhoEntregaStoreDTO::fromArray($data, $planoTrabalhoId);
}

function dtoOutroOrgao(string $planoTrabalhoId = 'plano-1'): PlanoTrabalhoEntregaStoreDTO
{
    return PlanoTrabalhoEntregaStoreDTO::fromArray([
        'origem' => 'OUTRO_ORGAO',
        'orgao' => 'Órgão externo',
    ], $planoTrabalhoId);
}

function dtoNaoVinculado(string $planoTrabalhoId = 'plano-1', ?string $consolidacaoId = null): PlanoTrabalhoEntregaStoreDTO
{
    $data = ['origem' => 'SEM_ENTREGA'];

    if ($consolidacaoId !== null) {
        $data['consolidacao_id'] = $consolidacaoId;
    }

    return PlanoTrabalhoEntregaStoreDTO::fromArray($data, $planoTrabalhoId);
}

describe('PlanoTrabalhoEntregaStoreValidator::validar', function () {

    test('lança exceção quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lança exceção quando status do plano não permitido', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::CONCLUIDO->value));

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'Contribuições só podem ser incluídas ou excluídas quando o Plano de Trabalho está em rascunho, aguardando assinatura ou em execução.');

    test('permite inclusão em execução quando período avaliativo está aberto', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega(consolidacaoId: 'cons-1'));

        expect(true)->toBeTrue();
    });

    test('lança exceção em execução quando período está aguardando avaliação', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::CONCLUIDO->value));

        $this->validator->validar(dtoNaoVinculado('plano-1', 'cons-1'));
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('lança exceção em execução quando período está avaliado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::AVALIADO->value));

        $this->validator->validar(dtoNaoVinculado('plano-1', 'cons-1'));
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('lança exceção quando o período avaliativo não pertence ao plano', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::INCLUIDO->value, 'outro-plano'));

        $this->validator->validar(dtoNaoVinculado('plano-1', 'cons-1'));
    })->throws(ValidateException::class, 'O período avaliativo não pertence a este Plano de Trabalho.');

    test('lança exceção em execução quando não há período aberto', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('possuiPeriodoAberto')->with('plano-1')->andReturn(false);

        $this->validator->validar(dtoNaoVinculado());
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('lança exceção quando entrega PE não encontrada', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(null);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(NotFoundException::class, 'A entrega do plano de entregas não foi encontrada.');

    test('lança exceção quando vínculo duplicado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->with('plano-1', 'pee-1', null)->andReturn(true);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'Esta entrega já está vinculada a este Plano de Trabalho.');

    test('permite editar entrega existente sem erro de duplicidade', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->with('plano-1', 'pee-1', 'entrega-1')->andReturn(false);

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
        ], 'plano-1', 'entrega-1');

        $this->validator->validar($dto);
    })->throwsNoExceptions();

    test('lança exceção quando entrega totalmente antes do PT', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value, '2025-06-01', '2025-12-31'));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-01-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');

    test('lança exceção quando entrega totalmente depois do PT', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value, '2025-01-01', '2025-06-30'));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-07-01', '2025-12-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());
    })->throws(ValidateException::class, 'O período da entrega do plano de entregas não possui interseção com o período do plano de trabalho.');

    test('permite entrega com interseção de período', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());

        expect(true)->toBeTrue();
    });

    test('permite entrega sem data_fim (aberta)', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-03-01', null));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);

        $this->validator->validar(dtoPlanoEntrega());

        expect(true)->toBeTrue();
    });

    test('tipo OUTRO_ORGAO não valida entrega PE', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldNotReceive('findEntregaById');
        $this->ptEntregaRepo->shouldNotReceive('existeVinculo');

        $this->validator->validar(dtoOutroOrgao());

        expect(true)->toBeTrue();
    });

    test('tipo SEM_ENTREGA não valida entrega PE', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldNotReceive('findEntregaById');
        $this->ptEntregaRepo->shouldNotReceive('existeVinculo');

        $this->validator->validar(dtoNaoVinculado());

        expect(true)->toBeTrue();
    });

    test('lança exceção quando somatório executado difere do planejado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);
        $this->ptEntregaRepo->shouldReceive('somatoriosEsforcoProjetados')
            ->once()
            ->with('plano-1', 'entrega-1', 60.0, 30.0)
            ->andReturn(new \App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO(100.0, 70.0));

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'forca_trabalho' => 60,
            'esforco_executado' => 30,
        ], 'plano-1', 'entrega-1');

        $this->validator->validar($dto);
    })->throws(ValidateException::class, 'O somatório do esforço executado deve ser igual ao somatório do esforço planejado no Plano de Trabalho.');

    test('permite esforço executado quando somatórios permanecem iguais', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->andReturn(mockEntregaPE('2025-02-01', '2025-05-31'));
        $this->ptEntregaRepo->shouldReceive('existeVinculo')->andReturn(false);
        $this->ptEntregaRepo->shouldReceive('somatoriosEsforcoProjetados')
            ->once()
            ->with('plano-1', 'entrega-1', 60.0, 40.0)
            ->andReturn(new \App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO(100.0, 100.0));

        $dto = PlanoTrabalhoEntregaStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'forca_trabalho' => 60,
            'esforco_executado' => 40,
        ], 'plano-1', 'entrega-1');

        $this->validator->validar($dto);

        expect(true)->toBeTrue();
    });
});

describe('PlanoTrabalhoEntregaStoreValidator::validarUpdate', function () {

    test('bloqueia edição quando o plano está em execução', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));

        $this->validator->validarUpdate(dtoNaoVinculado());
    })->throws(ValidateException::class, 'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.');
});

describe('PlanoTrabalhoEntregaStoreValidator::validarDestroy', function () {

    test('permite quando status INCLUIDO', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::INCLUIDO->value));

        $this->validator->validarDestroy('plano-1');

        expect(true)->toBeTrue();
    });

    test('permite exclusão em execução quando período avaliativo está aberto', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::INCLUIDO->value));
        $this->atividadeRepo->shouldReceive('possuiEmPeriodosFechados')->with('entrega-1')->andReturn(false);

        $this->validator->validarDestroy('plano-1', 'entrega-1', 'cons-1');

        expect(true)->toBeTrue();
    });

    test('lança exceção na exclusão em execução quando período está avaliado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::AVALIADO->value));

        $this->validator->validarDestroy('plano-1', 'entrega-1', 'cons-1');
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('lança exceção na exclusão quando há registro em período fechado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(mockPlano(StatusEnum::ATIVO->value));
        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('cons-1')
            ->andReturn(mockConsolidacao(StatusEnum::INCLUIDO->value));
        $this->atividadeRepo->shouldReceive('possuiEmPeriodosFechados')->with('entrega-1')->andReturn(true);

        $this->validator->validarDestroy('plano-1', 'entrega-1', 'cons-1');
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');
});
