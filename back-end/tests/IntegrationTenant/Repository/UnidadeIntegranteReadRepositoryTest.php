<?php

namespace Tests\IntegrationTenant\Repository;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use Illuminate\Support\Facades\Bus;

beforeEach(function () {
    Bus::fake();
});

describe('UnidadeIntegranteRepository::findAllComAtribuicoesAtivasByUsuario', function () {

    test('ignora integrante com todas as atribuições excluídas', function () {
        $repo = app(UnidadeIntegranteRepository::class);
        $usuario = Usuario::factory()->create();

        $unidadeOrfa = Unidade::factory()->create(['sigla' => 'DINOV']);
        $unidadeAtiva = Unidade::factory()->create(['sigla' => 'CODAS']);

        $integranteOrfa = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeOrfa->id,
            'usuario_id' => $usuario->id,
        ]);
        $atribuicaoExcluida = UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'LOTADO',
            'unidade_integrante_id' => $integranteOrfa->id,
        ]);
        $atribuicaoExcluida->delete();

        $integranteAtivo = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeAtiva->id,
            'usuario_id' => $usuario->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteAtivo->id,
        ]);

        $todos = $repo->findAllByUsuario($usuario->id)->pluck('unidade_id')->all();
        $comAtribuicaoAtiva = $repo->findAllComAtribuicoesAtivasByUsuario($usuario->id)->pluck('unidade_id')->all();

        expect($todos)->toEqualCanonicalizing([$unidadeOrfa->id, $unidadeAtiva->id])
            ->and($comAtribuicaoAtiva)->toBe([$unidadeAtiva->id]);
    });
});

describe('PlanoTrabalhoIndexValidator — escopo sem unidades órfãs', function () {

    test('listagem V2 não inclui planos de unidade sem atribuição ativa do gestor', function () {
        $perfilUnidade = Perfil::factory()->create(['nivel' => PerfilEnum::UNIDADE->value]);
        $gestor = Usuario::factory()->create(['perfil_id' => $perfilUnidade->id]);
        $participante = Usuario::factory()->create(['perfil_id' => $perfilUnidade->id]);

        $dinov = Unidade::factory()->create(['sigla' => 'DINOV']);
        $cgpgd = Unidade::factory()->create(['sigla' => 'CGPGD', 'unidade_pai_id' => $dinov->id]);
        $codas = Unidade::factory()->create(['sigla' => 'CODAS', 'unidade_pai_id' => $cgpgd->id]);

        $programaCodas = Programa::factory()->create(['unidade_id' => $codas->id]);
        $programaDinov = Programa::factory()->create(['unidade_id' => $dinov->id]);

        $integranteDinov = UnidadeIntegrante::query()->create([
            'unidade_id' => $dinov->id,
            'usuario_id' => $gestor->id,
        ]);
        $lotacaoDinov = UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'LOTADO',
            'unidade_integrante_id' => $integranteDinov->id,
        ]);
        $lotacaoDinov->delete();

        $integranteCodas = UnidadeIntegrante::query()->create([
            'unidade_id' => $codas->id,
            'usuario_id' => $gestor->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'atribuicao' => 'GESTOR',
            'unidade_integrante_id' => $integranteCodas->id,
        ]);

        PlanoTrabalho::factory()->create([
            'unidade_id' => $dinov->id,
            'usuario_id' => $participante->id,
            'programa_id' => $programaDinov->id,
            'status' => StatusEnum::ATIVO->value,
            'data_inicio' => now()->subMonth()->format('Y-m-d'),
            'data_fim' => now()->addMonth()->format('Y-m-d'),
        ]);

        $planoCodas = PlanoTrabalho::factory()->create([
            'unidade_id' => $codas->id,
            'usuario_id' => $participante->id,
            'programa_id' => $programaCodas->id,
            'status' => StatusEnum::ATIVO->value,
            'data_inicio' => now()->subMonth()->format('Y-m-d'),
            'data_fim' => now()->addMonth()->format('Y-m-d'),
        ]);

        $filtro = PlanoTrabalhoIndexDTO::fromArray([
            'vigentes' => true,
            'usuarioLogadoId' => $gestor->id,
        ]);

        $filtroValidado = app(PlanoTrabalhoIndexValidator::class)->validar($filtro);
        $resultado = app(PlanoTrabalhoRepository::class)->buscarPlanosListagem($filtroValidado);

        expect($filtroValidado->unidadesId)->toBe([$codas->id])
            ->and($resultado->total())->toBe(1)
            ->and($resultado->items()[0]->id)->toBe($planoCodas->id)
            ->and($resultado->items()[0]->unidade_id)->toBe($codas->id);
    });
});
