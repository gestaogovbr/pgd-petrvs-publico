<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeService;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeWriteValidator;
use App\Repository\AtividadeRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Atividade;
use App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO;
use App\V2\PlanoTrabalho\Entrega\Validators\CargaHorariaJustificativaValidator;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);
    $this->entregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->authValidator = Mockery::mock(AtividadeAuthorizationValidator::class);
    $this->writeValidator = Mockery::mock(AtividadeWriteValidator::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);

    $this->service = new AtividadeService(
        $this->atividadeRepo,
        $this->entregaRepo,
        $this->authValidator,
        $this->writeValidator,
        new CargaHorariaJustificativaValidator(),
        $this->planoRepo,
    );

    DB::shouldReceive('transaction')->andReturnUsing(fn ($cb) => $cb());
});

afterEach(fn () => Mockery::close());

function mockCargaHorariaCompleta(string $entregaId): void
{
    /** @var PlanoTrabalhoEntrega $entrega */
    $entrega = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
    $entrega->id = $entregaId;
    $entrega->forca_trabalho = 100;

    test()->entregaRepo->shouldReceive('findById')->with($entregaId)->andReturn($entrega);
    test()->entregaRepo->shouldReceive('somatoriosEsforcoProjetados')
        ->andReturn(new SomatoriosEsforcoDTO(100.0, 100.0));
}

describe('AtividadeService::store', function () {

    test('cria atividade e atualiza esforco executado da entrega', function () {
        $dto = AtividadeStoreDTO::fromArray(
            [
                'plano_trabalho_entrega_id' => 'entrega-1',
                'descricao' => 'Trabalho executado',
                'esforco_executado' => 80,
            ],
            'plano-1', 'consolidacao-1', 'usuario-1',
        );

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->unidade_id = 'unidade-1';

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'usuario-1')->andReturn($plano);
        $this->writeValidator->shouldReceive('validar')
            ->with($plano, $dto);
        mockCargaHorariaCompleta('entrega-1');

        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->id = 'atividade-1';

        $this->atividadeRepo->shouldReceive('create')
            ->with(Mockery::on(fn ($data) =>
                $data['descricao'] === 'Trabalho executado' &&
                $data['plano_trabalho_entrega_id'] === 'entrega-1' &&
                $data['plano_trabalho_consolidacao_id'] === 'consolidacao-1'
            ))
            ->andReturn($atividade);

        $this->entregaRepo->shouldReceive('update')
            ->once()
            ->with('entrega-1', ['esforco_executado' => 80.0]);

        expect($this->service->store($dto)->id)->toBe('atividade-1');
    });
});

describe('AtividadeService::update', function () {

    test('atualiza atividade e esforco executado da entrega', function () {
        $dto = AtividadeUpdateDTO::fromArray(
            ['descricao' => 'Atualizado', 'esforco_executado' => 70],
            'plano-1', 'consolidacao-1', 'atividade-1', 'usuario-1',
        );

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');

        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->id = 'atividade-1';
        $atividade->plano_trabalho_entrega_id = 'entrega-1';

        $this->writeValidator->shouldReceive('validarExistencia')->with($dto)->andReturn($atividade);
        mockCargaHorariaCompleta('entrega-1');

        /** @var Atividade $atividadeAtualizada */
        $atividadeAtualizada = Mockery::mock(Atividade::class)->makePartial();
        $atividadeAtualizada->descricao = 'Atualizado';

        $this->atividadeRepo->shouldReceive('update')->with('atividade-1', [
            'descricao' => 'Atualizado',
        ]);
        $this->entregaRepo->shouldReceive('update')
            ->once()
            ->with('entrega-1', ['esforco_executado' => 70.0]);
        $this->atividadeRepo->shouldReceive('findById')->with('atividade-1')->andReturn($atividadeAtualizada);

        expect($this->service->update($dto)->descricao)->toBe('Atualizado');
    });

    test('propaga exceção do validarExistencia', function () {
        $dto = AtividadeUpdateDTO::fromArray(
            ['descricao' => 'x', 'esforco_executado' => 50],
            'p-1', 'c-1', 'a-x', 'u-1',
        );

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');
        $this->writeValidator->shouldReceive('validarExistencia')
            ->andThrow(new NotFoundException('Registro de execução não encontrado.'));

        $this->service->update($dto);
    })->throws(NotFoundException::class, 'Registro de execução não encontrado.');
});
