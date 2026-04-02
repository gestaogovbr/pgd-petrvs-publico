<?php

use App\V2\StatusService;
use App\Repository\StatusJustificativaRepository;
use App\Models\PlanoTrabalho;
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

    test('cria registro no histórico com FK e dados corretos', function () {
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

    test('ignora entidade com model não mapeado', function () {
        $entity = Mockery::mock(\Illuminate\Database\Eloquent\Model::class)->makePartial();
        $entity->shouldNotReceive('save');

        $this->statusRepo->shouldNotReceive('create');

        $this->service->atualizaStatus($entity, 'ATIVO', 'Teste.');
    });

    test('não persiste histórico nem salva quando entidade não é mapeada', function () {
        $entity = Mockery::mock(\Illuminate\Database\Eloquent\Model::class)->makePartial();

        $this->statusRepo->shouldNotReceive('create');
        $entity->shouldNotReceive('save');

        $this->service->atualizaStatus($entity, 'ATIVO', 'Teste.');
    });
});
