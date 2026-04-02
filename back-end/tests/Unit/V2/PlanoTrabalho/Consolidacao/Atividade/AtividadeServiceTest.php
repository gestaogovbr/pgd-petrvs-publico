<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeService;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeStoreValidator;
use App\Repository\AtividadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Atividade;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);
    $this->authValidator = Mockery::mock(AtividadeAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(AtividadeStoreValidator::class);

    $this->service = new AtividadeService(
        $this->atividadeRepo,
        $this->authValidator,
        $this->storeValidator,
    );

    Auth::shouldReceive('id')->andReturn('usuario-1');
});

afterEach(fn () => Mockery::close());

describe('AtividadeService::store', function () {

    test('cria atividade com sucesso', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->unidade_id = 'unidade-1';

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'usuario-1')
            ->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();

        $this->storeValidator->shouldReceive('validar')
            ->with($plano, 'consolidacao-1', Mockery::type('array'))
            ->andReturn($consolidacao);

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

        $result = $this->service->store('plano-1', 'consolidacao-1', [
            'plano_trabalho_entrega_id' => 'entrega-1',
            'descricao' => 'Trabalho executado',
        ]);

        expect($result->id)->toBe('atividade-1');
    });
});

describe('AtividadeService::update', function () {

    test('atualiza atividade com sucesso', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->authValidator->shouldReceive('validar')->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $this->storeValidator->shouldReceive('validar')->andReturn($consolidacao);

        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->id = 'atividade-1';
        $atividade->plano_trabalho_consolidacao_id = 'consolidacao-1';

        /** @var Atividade $atividadeAtualizada */
        $atividadeAtualizada = Mockery::mock(Atividade::class)->makePartial();
        $atividadeAtualizada->id = 'atividade-1';
        $atividadeAtualizada->descricao = 'Atualizado';

        $this->atividadeRepo->shouldReceive('findById')
            ->with('atividade-1')
            ->andReturn($atividade, $atividadeAtualizada);

        $this->atividadeRepo->shouldReceive('update')
            ->with('atividade-1', ['descricao' => 'Atualizado']);

        $result = $this->service->update('plano-1', 'consolidacao-1', 'atividade-1', [
            'descricao' => 'Atualizado',
        ]);

        expect($result->descricao)->toBe('Atualizado');
    });

    test('lança exceção quando atividade não encontrada', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);
        $this->storeValidator->shouldReceive('validar');
        $this->atividadeRepo->shouldReceive('findById')->andReturn(null);

        $this->service->update('p-1', 'c-1', 'a-x', ['descricao' => 'x']);
    })->throws(NotFoundException::class, 'Atividade não encontrada.');

    test('lança exceção quando atividade não pertence à consolidação', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);
        $this->storeValidator->shouldReceive('validar');

        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->plano_trabalho_consolidacao_id = 'outra-consolidacao';

        $this->atividadeRepo->shouldReceive('findById')->andReturn($atividade);

        $this->service->update('p-1', 'c-1', 'a-1', ['descricao' => 'x']);
    })->throws(ValidateException::class, 'A atividade não pertence a esta consolidação.');
});

describe('AtividadeService::destroy', function () {

    test('remove atividade com sucesso', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);
        $this->storeValidator->shouldReceive('validar');

        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->plano_trabalho_consolidacao_id = 'consolidacao-1';

        $this->atividadeRepo->shouldReceive('findById')->with('atividade-1')->andReturn($atividade);
        $this->atividadeRepo->shouldReceive('delete')->with('atividade-1')->once()->andReturn(true);

        $this->service->destroy('plano-1', 'consolidacao-1', 'atividade-1');

        $this->atividadeRepo->shouldHaveReceived('delete')->with('atividade-1');
    });

    test('lança exceção quando atividade não encontrada no destroy', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);
        $this->storeValidator->shouldReceive('validar');
        $this->atividadeRepo->shouldReceive('findById')->andReturn(null);

        $this->service->destroy('p-1', 'c-1', 'a-x');
    })->throws(NotFoundException::class, 'Atividade não encontrada.');
});
