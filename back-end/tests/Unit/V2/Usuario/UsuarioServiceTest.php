<?php

use App\V2\Usuario\UsuarioService;
use App\Repository\UsuarioRepository;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->service = new UsuarioService($this->usuarioRepository);
});

afterEach(function () {
    Mockery::close();
});

describe('UsuarioService::buscarAgentesPublicosNoEscopoCadastrante', function () {

    test('delega ao repository de escopo do cadastrante', function () {
        $collection = new Collection([
            (object) ['id' => 'u-1', 'nome' => 'Financeiro', 'matricula' => '001', 'sigla' => 'FIN'],
        ]);

        $this->usuarioRepository
            ->shouldReceive('findAgentesPublicosNoEscopoCadastrante')
            ->once()
            ->with('Financ', 'cadastrante-1')
            ->andReturn($collection);

        $result = $this->service->buscarAgentesPublicosNoEscopoCadastrante('Financ', 'cadastrante-1');

        expect($result)->toBe($collection)->and($result)->toHaveCount(1);
    });
});

describe('UsuarioService::buscarPorNomeOuMatricula', function () {

    test('delega ao repository sem filtro de unidade', function () {
        $collection = new Collection();

        $this->usuarioRepository
            ->shouldReceive('findAllByNomeMatricula')
            ->once()
            ->with('João')
            ->andReturn($collection);

        expect($this->service->buscarPorNomeOuMatricula('João'))->toBe($collection);
    });
});
