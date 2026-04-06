<?php

declare(strict_types=1);

use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Str;

describe('UsuarioRepository — leitura para envio PGD (findOneParaEnvio)', function () {
    beforeEach(function () {
        $this->repository = app(UsuarioRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial Read Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão Read Pest'])->id;
    });

    it('retorna null quando o id não existe', function () {
        expect($this->repository->findOneParaEnvio(Str::uuid()->toString()))->toBeNull();
    });

    it('retorna o usuário com unidades integrantes apenas na atribuição LOTADO', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $unidadeLotada = Unidade::factory()->create();
        $unidadeGestor = Unidade::factory()->create();

        $integranteLotado = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeLotada->id,
            'usuario_id' => $usuario->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'unidade_integrante_id' => $integranteLotado->id,
            'atribuicao' => 'LOTADO',
        ]);

        $integranteGestor = UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeGestor->id,
            'usuario_id' => $usuario->id,
        ]);
        UnidadeIntegranteAtribuicao::query()->create([
            'unidade_integrante_id' => $integranteGestor->id,
            'atribuicao' => 'GESTOR',
        ]);

        $result = $this->repository->findOneParaEnvio($usuario->id);

        expect($result)->not->toBeNull();
        expect($result->id)->toBe($usuario->id);
        expect($result->relationLoaded('unidadesIntegrantes'))->toBeTrue();
        expect($result->unidadesIntegrantes)->toHaveCount(1);
        expect($result->unidadesIntegrantes->first()->id)->toBe($integranteLotado->id);
    });
});

describe('PlanoEntregaRepository — leitura para envio PGD (findOneParaEnvio)', function () {
    beforeEach(function () {
        $this->repository = app(PlanoEntregaRepository::class);
    });

    it('retorna null quando o id não existe', function () {
        expect($this->repository->findOneParaEnvio(Str::uuid()->toString()))->toBeNull();
    });

    it('retorna o plano com programa, unidade e entregas (e unidade nas entregas quando houver)', function () {
        $plano = PlanoEntrega::factory()->create();

        $result = $this->repository->findOneParaEnvio($plano->id);

        expect($result)->not->toBeNull();
        expect((string) $result->id)->toBe((string) $plano->id);
        expect($result->relationLoaded('programa'))->toBeTrue();
        expect($result->relationLoaded('unidade'))->toBeTrue();
        expect($result->relationLoaded('entregas'))->toBeTrue();
        expect($result->programa->relationLoaded('unidade'))->toBeTrue();
        if ($result->entregas->isNotEmpty()) {
            expect($result->entregas->first()->relationLoaded('unidade'))->toBeTrue();
        }
    });
});

describe('PlanoTrabalhoRepository — leitura para envio PGD (findOneParaEnvio)', function () {
    beforeEach(function () {
        $this->repository = app(PlanoTrabalhoRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial PT Read Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão PT Read Pest'])->id;
    });

    it('retorna null quando o id não existe', function () {
        expect($this->repository->findOneParaEnvio(Str::uuid()->toString()))->toBeNull();
    });

    it('retorna o plano com usuario, entregas e consolidacoes avaliadas (e avaliacao nas consolidacoes)', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        PlanoTrabalhoEntrega::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'plano_entrega_entrega_id' => null,
        ]);

        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::INCLUIDO->value,
        ]);
        $consolidacaoAvaliada = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::AVALIADO->value,
        ]);

        $result = $this->repository->findOneParaEnvio($plano->id);

        expect($result)->not->toBeNull();
        expect($result->id)->toBe($plano->id);
        expect($result->relationLoaded('usuario'))->toBeTrue();
        expect($result->relationLoaded('entregas'))->toBeTrue();
        expect($result->relationLoaded('consolidacoes'))->toBeTrue();
        expect($result->entregas)->toHaveCount(1);
        expect($result->consolidacoes)->toHaveCount(1);
        expect($result->consolidacoes->first()->id)->toBe($consolidacaoAvaliada->id);
        expect($result->consolidacoes->first()->relationLoaded('avaliacao'))->toBeTrue();
    });
});
