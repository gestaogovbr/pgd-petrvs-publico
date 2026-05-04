<?php

use App\V2\StatusService;
use App\Repository\StatusJustificativaRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Atividade;
use App\Models\StatusJustificativa;
use App\Enums\StatusEnum;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->statusRepo = Mockery::mock(StatusJustificativaRepository::class);
    $this->service = new StatusService($this->statusRepo);

    Auth::shouldReceive('id')->andReturn('user-1');
});

afterEach(function () {
    Mockery::close();
});

describe('StatusService::atualizaStatus', function () {

    test('cria registro no histórico com FK correta para PlanoTrabalho', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->shouldReceive('save')->once();

        $this->statusRepo->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['codigo'] === StatusEnum::ATIVO->value
                && $attrs['justificativa'] === 'Ativado.'
                && $attrs['usuario_id'] === 'user-1'
                && $attrs['plano_trabalho_id'] === 'plano-1'
            ))
            ->andReturn(Mockery::mock(StatusJustificativa::class));

        $this->service->atualizaStatus($plano, StatusEnum::ATIVO->value, 'Ativado.');
    });

    test('cria registro no histórico com FK correta para PlanoTrabalhoConsolidacao', function () {
        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'consolidacao-1';
        $consolidacao->shouldReceive('save')->once();

        $this->statusRepo->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['plano_trabalho_consolidacao_id'] === 'consolidacao-1'
            ))
            ->andReturn(Mockery::mock(StatusJustificativa::class));

        $this->service->atualizaStatus($consolidacao, StatusEnum::CONCLUIDO->value, 'Concluído.');
    });

    test('cria registro no histórico com FK correta para Atividade', function () {
        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->id = 'atividade-1';
        $atividade->shouldReceive('save')->once();

        $this->statusRepo->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['atividade_id'] === 'atividade-1'
            ))
            ->andReturn(Mockery::mock(StatusJustificativa::class));

        $this->service->atualizaStatus($atividade, StatusEnum::INCLUIDO->value, 'Incluído.');
    });

    test('atualiza o atributo status na entidade', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::INCLUIDO->value;
        $plano->shouldReceive('save')->once();

        $this->statusRepo->shouldReceive('create')
            ->andReturn(Mockery::mock(StatusJustificativa::class));

        $this->service->atualizaStatus($plano, StatusEnum::ATIVO->value, 'Ativado.');

        expect($plano->status)->toBe(StatusEnum::ATIVO->value);
    });
});
