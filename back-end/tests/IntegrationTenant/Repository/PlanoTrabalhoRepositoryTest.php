<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoTrabalhoEntrega;

beforeEach(function () {
    $this->repository = app(PlanoTrabalhoRepository::class);
    $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $this->perfilId,
    ]);
    $this->programa = Programa::factory()->create();
});

    test('retorna apenas planos de outros usuários aguardando assinatura', function () {
        $outroUsuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->usuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::ATIVO->value,
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$this->unidade->id], [], $this->usuario->id);

        expect($result)->toHaveCount(1)
            ->and($result->first()->usuario_id)->toBe($outroUsuario->id);
    });

    test('não inclui plano do gestor titular para chefe substituto', function () {
        $gestorTitular = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $gestorSubstituto = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $participante = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        $integranteTitular = UnidadeIntegrante::query()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $gestorTitular->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitular->id,
        ]);

        $integranteSubstituto = UnidadeIntegrante::query()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $gestorSubstituto->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR_SUBSTITUTO',
            'unidade_integrante_id' => $integranteSubstituto->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $gestorTitular->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $participante->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$this->unidade->id], [], $gestorSubstituto->id);

        expect($result)->toHaveCount(1)
            ->and($result->first()->usuario_id)->toBe($participante->id);
    });

    test('inclui plano do gestor titular quando usuário não é chefe substituto', function () {
        $gestorTitular = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $outroUsuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        $integranteTitular = UnidadeIntegrante::query()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $gestorTitular->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitular->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $gestorTitular->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $outroUsuario->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura([$this->unidade->id], [], 'usuario-qualquer');

        expect($result)->toHaveCount(2)
            ->and($result->pluck('usuario_id')->contains($gestorTitular->id))->toBeTrue()
            ->and($result->pluck('usuario_id')->contains($outroUsuario->id))->toBeTrue();
    });

    test('inclui apenas gestor titular das subordinadas', function () {
        $unidadeSubordinada = Unidade::factory()->create(['unidade_pai_id' => $this->unidade->id]);

        $usuarioLogado = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $titularSubordinada = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $participanteSubordinada = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $participanteSuperior = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        $integranteTitularSub = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $titularSubordinada->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteTitularSub->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $participanteSuperior->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $titularSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $unidadeSubordinada->id,
            'usuario_id' => $participanteSubordinada->id,
            'status' => StatusEnum::AGUARDANDO_ASSINATURA->value,
        ]);

        $result = $this->repository->getPlanosTrabalhoAssinatura(
            [$this->unidade->id],
            [$unidadeSubordinada->id],
            $usuarioLogado->id
        );

        expect($result)->toHaveCount(2)
            ->and($result->pluck('usuario_id')->contains($participanteSuperior->id))->toBeTrue()
            ->and($result->pluck('usuario_id')->contains($titularSubordinada->id))->toBeTrue()
            ->and($result->pluck('usuario_id')->contains($participanteSubordinada->id))->toBeFalse();
    });
describe('PlanoTrabalhoRepository::create', function () {

    test('persiste o plano de trabalho no banco', function () {
        $plano = $this->repository->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        expect($plano)->toBeInstanceOf(PlanoTrabalho::class)
            ->and($plano->exists)->toBeTrue()
            ->and($plano->usuario_id)->toBe($this->usuario->id);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $plano->id,
            'status' => 'INCLUIDO',
        ]);
    });

    test('gera numero automaticamente via stored procedure', function () {
        $plano = $this->repository->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        expect($plano->numero)->toBeGreaterThan(0);
    });
});

describe('PlanoTrabalhoRepository::buscarPlanosListagem', function () {

    test('filtra por usuario_id', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $outroUsuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $outroUsuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => $this->usuario->id]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1)
            ->and($result->items()[0]->usuario_id)->toBe($this->usuario->id);
    });

    test('retorna apenas vigentes', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
            'status' => StatusEnum::ATIVO,
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => now()->subYear(),
            'data_fim' => now()->subMonth(),
            'status' => StatusEnum::CONCLUIDO,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('filtra por intervalo de datas', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('filtra por unidade_id', function () {
        $outraUnidade = Unidade::factory()->create();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
            'status' => StatusEnum::ATIVO,
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $outraUnidade->id,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
            'status' => StatusEnum::ATIVO,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'unidade_id' => [$this->unidade->id],
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('retorna apenas planos arquivados quando arquivados=true', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_arquivamento' => now(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_arquivamento' => null,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => $this->usuario->id, 'arquivados' => true]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('exclui planos arquivados quando arquivados=false', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_arquivamento' => now(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'data_arquivamento' => null,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => $this->usuario->id]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('respeita paginação', function () {
        PlanoTrabalho::factory()->count(5)->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'usuario_id' => $this->usuario->id,
            'page' => 1,
            'size' => 2,
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(5)
            ->and($result->count())->toBe(2)
            ->and($result->lastPage())->toBe(3);
    });

    test('ordena por numero asc', function () {
        $planoA = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);
        $planoB = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'usuario_id' => $this->usuario->id,
            'order_by' => 'numero',
            'order_dir' => 'asc',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);
        $numeros = collect($result->items())->pluck('numero')->toArray();

        expect($numeros)->toBe(collect($numeros)->sort()->values()->toArray());
    });

    test('ordena por numero desc', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'usuario_id' => $this->usuario->id,
            'order_by' => 'numero',
            'order_dir' => 'desc',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);
        $numeros = collect($result->items())->pluck('numero')->toArray();

        expect($numeros)->toBe(collect($numeros)->sortDesc()->values()->toArray());
    });

    test('ordena por usuario_nome asc', function () {
        $usuarioA = Usuario::factory()->create([
            'nome' => 'Ana',
            'perfil_id' => $this->perfilId,
        ]);
        $usuarioZ = Usuario::factory()->create([
            'nome' => 'Zélia',
            'perfil_id' => $this->perfilId,
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuarioZ->id,
            'unidade_id' => $this->unidade->id,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuarioA->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'unidade_id' => $this->unidade->id,
            'order_by' => 'usuario_nome',
            'order_dir' => 'asc',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);
        $ids = collect($result->items())->pluck('usuario_id')->toArray();

        expect($ids[0])->toBe($usuarioA->id)
            ->and($ids[1])->toBe($usuarioZ->id);
    });

    test('ordena por usuario_nome desc', function () {
        $usuarioA = Usuario::factory()->create([
            'nome' => 'Ana',
            'perfil_id' => $this->perfilId,
        ]);
        $usuarioZ = Usuario::factory()->create([
            'nome' => 'Zélia',
            'perfil_id' => $this->perfilId,
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuarioA->id,
            'unidade_id' => $this->unidade->id,
        ]);
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuarioZ->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'unidade_id' => $this->unidade->id,
            'order_by' => 'usuario_nome',
            'order_dir' => 'desc',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);
        $ids = collect($result->items())->pluck('usuario_id')->toArray();

        expect($ids[0])->toBe($usuarioZ->id)
            ->and($ids[1])->toBe($usuarioA->id);
    });
});

describe('PlanoTrabalhoRepository::findByIdComRelacoes', function () {

    test('retorna plano com relations carregadas', function () {
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $result = $this->repository->findByIdComRelacoes($plano->id);

        expect($result)->not->toBeNull()
            ->and($result->id)->toBe($plano->id)
            ->and($result->relationLoaded('usuario'))->toBeTrue()
            ->and($result->relationLoaded('unidade'))->toBeTrue()
            ->and($result->relationLoaded('programa'))->toBeTrue()
            ->and($result->relationLoaded('entregas'))->toBeTrue()
            ->and($result->relationLoaded('consolidacoes'))->toBeTrue();
    });

    test('retorna entregas quando existem', function () {
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
        ]);

        PlanoTrabalhoEntrega::factory()->create(['plano_trabalho_id' => $plano->id]);

        $result = $this->repository->findByIdComRelacoes($plano->id);

        expect($result->entregas)->toHaveCount(1);
    });

    test('retorna null quando id nao existe', function () {
        $result = $this->repository->findByIdComRelacoes(fake()->uuid());

        expect($result)->toBeNull();
    });
});
