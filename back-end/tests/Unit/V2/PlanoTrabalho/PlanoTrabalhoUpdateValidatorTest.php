<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateValidator;
use App\Repository\UnidadeRepository;
use App\Repository\ProgramaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Usuario;
use Tests\TestCase;

uses(TestCase::class);

function buildUpdateValidatorDTO(array $overrides = []): PlanoTrabalhoStoreDTO
{
    return PlanoTrabalhoStoreDTO::fromArray(array_merge([
        'usuario_id' => 'user-1',
        'unidade_id' => 'unidade-1',
        'programa_id' => 'programa-1',
        'data_inicio' => '2024-03-01',
        'data_fim' => '2024-06-30',
        'modalidade_pgd' => 'presencial',
    ], $overrides), 'criador-1');
}

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->programaRepo = Mockery::mock(ProgramaRepository::class);
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);

    $this->validacao = new PlanoTrabalhoUpdateValidator(
        $this->unidadeRepo,
        $this->programaRepo,
        $this->planoRepo,
        $this->usuarioRepo,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoUpdateValidator', function () {
    test('issue 2313 - permite modalidade parcial quando SouGov retorna teletrabalho parcial em formato legível', function () {
        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->data_inativacao = null;

        $programa = Mockery::mock(Programa::class)->makePartial();
        $programa->data_inicio = '2024-01-01';
        $programa->data_fim = '2024-12-31';

        $agente = Mockery::mock(Usuario::class)->makePartial();
        $agente->modalidade_pgd = 'Teletrabalho Parcial';
        $agente->participa_pgd = 'sim';

        $this->unidadeRepo->shouldReceive('findById')->andReturn($unidade);
        $this->programaRepo->shouldReceive('findById')->with('programa-1')->andReturn($programa);
        $this->programaRepo->shouldReceive('isVigenteParaUnidade')->andReturn(true);
        $this->planoRepo->shouldReceive('existeConflitoPeriodoExcluindo')->andReturn(false);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($agente);

        $this->validacao->validar(buildUpdateValidatorDTO(['modalidade_pgd' => 'parcial']), 'plano-1');

        expect(true)->toBeTrue();
    });
});
