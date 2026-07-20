<?php

use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Enums\StatusEnum;
use App\Repository\RelatorioAgente\Eloquent\EloquentRelatorioAgenteReadRepository;
use Illuminate\Support\Facades\Bus;

beforeEach(function () {
    Bus::fake();
    $this->repository = app(EloquentRelatorioAgenteReadRepository::class);
    $this->perfil = Perfil::factory()->create(['nome' => 'Perfil Participante']);
    $this->unidade = Unidade::factory()->create();

    // Helper para criar usuário lotado na unidade
    $this->criarUsuarioLotado = function (array $attrs = []) {
        $usuario = Usuario::factory()->create(array_merge([
            'perfil_id' => $this->perfil->id,
            'situacao_siape' => 'ATIVO',
            'participa_pgd' => 'sim',
        ], $attrs));

        $integrante = UnidadeIntegrante::create([
            'id' => \Illuminate\Support\Str::uuid()->toString(),
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $usuario->id,
        ]);

        UnidadeIntegranteAtribuicao::create([
            'id' => \Illuminate\Support\Str::uuid()->toString(),
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'LOTADO',
        ]);

        return $usuario;
    };
});

test('filtro situacao ATIVO exclui usuários com participa_pgd não', function () {
    $ativo = ($this->criarUsuarioLotado)(['participa_pgd' => 'sim', 'situacao_siape' => 'ATIVO']);
    $inativo = ($this->criarUsuarioLotado)(['participa_pgd' => 'não', 'situacao_siape' => 'ATIVO']);

    $result = $this->repository->query([
        'where' => [
            ['unidade_id', '==', $this->unidade->id],
            ['situacao', '==', 'ATIVO'],
        ],
        'page' => 1,
        'limit' => 10,
    ]);

    $ids = $result['rows']->pluck('id')->toArray();

    expect($ids)->toContain($ativo->id);
    expect($ids)->not->toContain($inativo->id);
});

test('filtro situacao INATIVO retorna usuários com participa_pgd não', function () {
    $ativo = ($this->criarUsuarioLotado)(['participa_pgd' => 'sim', 'situacao_siape' => 'ATIVO']);
    $inativo = ($this->criarUsuarioLotado)(['participa_pgd' => 'não', 'situacao_siape' => 'ATIVO']);

    $result = $this->repository->query([
        'where' => [
            ['unidade_id', '==', $this->unidade->id],
            ['situacao', '==', 'INATIVO'],
        ],
        'page' => 1,
        'limit' => 10,
    ]);

    $ids = $result['rows']->pluck('id')->toArray();

    expect($ids)->toContain($inativo->id);
    expect($ids)->not->toContain($ativo->id);
});

test('issue 2313 - relatorio compara modalidade SouGov e Petrvs por valor normalizado', function () {
    $usuario = ($this->criarUsuarioLotado)([
        'modalidade_pgd' => 'Teletrabalho Parcial',
        'participa_pgd' => 'sim',
        'situacao_siape' => 'ATIVO',
    ]);

    PlanoTrabalho::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $this->unidade->id,
        'modalidade_pgd' => 'parcial',
        'status' => StatusEnum::ATIVO->value,
        'data_inicio' => '2024-03-01',
        'data_fim' => '2024-06-30',
    ]);

    $result = $this->repository->query([
        'where' => [
            ['unidade_id', '==', $this->unidade->id],
        ],
        'page' => 1,
        'limit' => 10,
    ]);

    $row = $result['rows']->firstWhere('id', $usuario->id);

    expect($row)->not->toBeNull()
        ->and($row->comparacaoSouGovPetrvs)->toBe('IGUAL');
});
