<?php

use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\Siape\Unidade\Atribuicao as AtribuicaoTrait;
use App\Services\Siape\Unidade\Enum\Atribuicao as EnumAtribuicao;

test('lotaServidor persiste atribuicao no banco do tenant', function () {
    $usuario = Usuario::factory()->create();
    $unidade = Unidade::factory()->create();

    $integrante = UnidadeIntegrante::create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
    ]);

    expect(UnidadeIntegranteAtribuicao::where('unidade_integrante_id', $integrante->id)->count())->toBe(0);

    $subject = new class {
        use AtribuicaoTrait;

        public function getUnidadeIntegranteRepository(): UnidadeIntegranteRepository
        {
            return app(UnidadeIntegranteRepository::class);
        }

        public function getUnidadeIntegranteAtribuicaoRepository(): UnidadeIntegranteAtribuicaoRepository
        {
            return app(UnidadeIntegranteAtribuicaoRepository::class);
        }

        public function getUsuarioRepository(): UsuarioRepository
        {
            return app(UsuarioRepository::class);
        }

        public function getUnidadeRepository(): UnidadeRepository
        {
            return app(UnidadeRepository::class);
        }

        public function callLotaServidor(EnumAtribuicao $atribuicao, UnidadeIntegrante $unidadeIntegrante): void
        {
            $this->lotaServidor($atribuicao, $unidadeIntegrante);
        }
    };

    $subject->callLotaServidor(EnumAtribuicao::LOTADO, $integrante);

    $this->assertDatabaseHas('unidades_integrantes_atribuicoes', [
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => EnumAtribuicao::LOTADO->value,
        'deleted_at' => null,
    ]);
});

