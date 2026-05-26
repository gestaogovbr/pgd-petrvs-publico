<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeService;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeDestroyDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeWriteValidator;
use App\Repository\AtividadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\Atividade;
use App\Exceptions\NotFoundException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);
    $this->authValidator = Mockery::mock(AtividadeAuthorizationValidator::class);
    $this->writeValidator = Mockery::mock(AtividadeWriteValidator::class);

    $this->service = new AtividadeService(
        $this->atividadeRepo,
        $this->authValidator,
        $this->writeValidator,
    );
});

afterEach(fn () => Mockery::close());

describe('AtividadeService::store', function () {

    test('cria atividade com sucesso', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Trabalho executado'],
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

        expect($this->service->store($dto)->id)->toBe('atividade-1');
    });
});

describe('AtividadeService::update', function () {

    test('atualiza atividade com sucesso', function () {
        $dto = AtividadeUpdateDTO::fromArray(
            ['descricao' => 'Atualizado'],
            'plano-1', 'consolidacao-1', 'atividade-1', 'usuario-1',
        );

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');
        $this->writeValidator->shouldReceive('validarExistencia')->with($dto);

        /** @var Atividade $atividadeAtualizada */
        $atividadeAtualizada = Mockery::mock(Atividade::class)->makePartial();
        $atividadeAtualizada->descricao = 'Atualizado';

        $this->atividadeRepo->shouldReceive('update')->with('atividade-1', ['descricao' => 'Atualizado']);
        $this->atividadeRepo->shouldReceive('findById')->with('atividade-1')->andReturn($atividadeAtualizada);

        expect($this->service->update($dto)->descricao)->toBe('Atualizado');
    });

    test('propaga exceção do validarExistencia', function () {
        $dto = AtividadeUpdateDTO::fromArray(
            ['descricao' => 'x'], 'p-1', 'c-1', 'a-x', 'u-1',
        );

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');
        $this->writeValidator->shouldReceive('validarExistencia')
            ->andThrow(new NotFoundException('Registro de execução não encontrado.'));

        $this->service->update($dto);
    })->throws(NotFoundException::class, 'Registro de execução não encontrado.');
});

describe('AtividadeService::destroy', function () {

    test('remove atividade com sucesso', function () {
        $dto = new AtividadeDestroyDTO('plano-1', 'consolidacao-1', 'atividade-1', 'usuario-1');

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');
        $this->writeValidator->shouldReceive('validarExistencia')->with($dto);
        $this->atividadeRepo->shouldReceive('delete')->with('atividade-1')->once();

        $this->service->destroy($dto);

        $this->atividadeRepo->shouldHaveReceived('delete')->with('atividade-1');
    });

    test('propaga exceção do validarExistencia no destroy', function () {
        $dto = new AtividadeDestroyDTO('p-1', 'c-1', 'a-x', 'u-1');

        $this->authValidator->shouldReceive('validar')->andReturn(Mockery::mock(PlanoTrabalho::class)->makePartial());
        $this->writeValidator->shouldReceive('validar');
        $this->writeValidator->shouldReceive('validarExistencia')
            ->andThrow(new NotFoundException('Registro de execução não encontrado.'));

        $this->service->destroy($dto);
    })->throws(NotFoundException::class, 'Registro de execução não encontrado.');
});
