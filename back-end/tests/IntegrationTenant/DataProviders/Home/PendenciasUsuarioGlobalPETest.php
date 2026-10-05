<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\Home\DataProviders\PendenciasUsuario;

/**
 * Testes das regras de pendências de PE no getDataGlobal:
 *  - Homologação e Avaliação: responsabilidade da chefia da unidade-pai -> PEs das FILHAS
 *  - Registros de execução: responsabilidade do gestor da PRÓPRIA unidade
 */
function criarPE(string $unidadeId, string $status, ?\DateTimeInterface $createdAt = null): PlanoEntrega
{
    return PlanoEntrega::factory()->create([
        'unidade_id' => $unidadeId,
        'status' => $status,
        'created_at' => $createdAt ?? now(),
    ]);
}

beforeEach(function () {
    $this->provider = app(PendenciasUsuario::class);

    // Hierarquia: unidadeGerenciada (chefe) -> filha
    $this->unidadeGerenciada = Unidade::factory()->create();
    $this->filha = Unidade::factory()->create(['unidade_pai_id' => $this->unidadeGerenciada->id]);

    $this->chefe = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()
        ->gestor()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidadeGerenciada->id)
        ->create();

    // data > DATA_MUDANCA_REGRA_PE para entrar nas contagens de avaliação/homologação
    $this->depoisDaRegra = \Illuminate\Support\Carbon::parse(PlanoEntrega::DATA_MUDANCA_REGRA_PE)->addDay();
});

describe('PendenciasUsuario::getDataGlobal - regras de PE', function () {

    test('avaliacao de PE conta PEs CONCLUIDO das unidades filhas', function () {
        criarPE($this->filha->id, StatusEnum::CONCLUIDO->value, $this->depoisDaRegra);

        $result = $this->provider->getDataGlobal($this->chefe->id);

        expect($result['avaliacoes_pe_pendentes'])->toBe(1);
    });

    test('avaliacao de PE NÃO conta PE CONCLUIDO da própria unidade gerenciada', function () {
        // PE na própria unidade -> compete à chefia do pai dela, não ao chefe desta unidade
        criarPE($this->unidadeGerenciada->id, StatusEnum::CONCLUIDO->value, $this->depoisDaRegra);

        $result = $this->provider->getDataGlobal($this->chefe->id);

        expect($result['avaliacoes_pe_pendentes'])->toBe(0);
    });

    test('homologacao de PE conta PEs HOMOLOGANDO das unidades filhas', function () {
        criarPE($this->filha->id, StatusEnum::HOMOLOGANDO->value);

        $result = $this->provider->getDataGlobal($this->chefe->id);

        expect($result['assinaturas_pe_pendentes'])->toBe(1);
    });

    test('homologacao de PE NÃO conta PE HOMOLOGANDO da própria unidade gerenciada', function () {
        criarPE($this->unidadeGerenciada->id, StatusEnum::HOMOLOGANDO->value);

        $result = $this->provider->getDataGlobal($this->chefe->id);

        expect($result['assinaturas_pe_pendentes'])->toBe(0);
    });
});
