<?php

use App\Enums\StatusEnum;
use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\PlanoEntrega\DataProviders\RegistroExecucaoAtrasoPEDataProvider;
use Illuminate\Support\Str;

function peAtrasado(string $unidadeId, string $status = 'CONCLUIDO'): PlanoEntrega
{
    return PlanoEntrega::withoutEvents(fn () => PlanoEntrega::factory()->create([
        'unidade_id' => $unidadeId,
        'status' => $status,
        // data_fim vencida há mais que o prazo de progresso (31 dias)
        'data_fim' => now()->subDays(60),
        // criado após o corte da regra
        'created_at' => \Illuminate\Support\Carbon::parse(PlanoEntrega::DATA_MUDANCA_REGRA_PE)->addDay(),
    ]));
}

function entregaSemProgresso(PlanoEntrega $pe): PlanoEntregaEntrega
{
    $entrega = Entrega::factory()->create(['unidade_id' => $pe->unidade_id]);

    return PlanoEntrega::withoutEvents(fn () => PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $pe->id,
        'unidade_id' => $pe->unidade_id,
        'entrega_id' => $entrega->id,
    ]));
}

function inserirProgresso(PlanoEntregaEntrega $entrega, string $usuarioId): void
{
    \DB::table('planos_entregas_entregas_progressos')->insert([
        'id' => Str::uuid()->toString(),
        'data_progresso' => now(),
        'usuario_id' => $usuarioId,
        'plano_entrega_entrega_id' => $entrega->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

function inserirProgressoSoftDeleted(PlanoEntregaEntrega $entrega, string $usuarioId): void
{
    \DB::table('planos_entregas_entregas_progressos')->insert([
        'id' => Str::uuid()->toString(),
        'data_progresso' => now(),
        'usuario_id' => $usuarioId,
        'plano_entrega_entrega_id' => $entrega->id,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => now(),
    ]);
}

beforeEach(function () {
    $this->provider = app(RegistroExecucaoAtrasoPEDataProvider::class);

    $this->unidadeGerida = Unidade::factory()->create();
    $this->chefe = Usuario::factory()->create();
    UnidadeIntegranteAtribuicao::factory()->gestor()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidadeGerida->id)->create();
});

describe('RegistroExecucaoAtrasoPEDataProvider', function () {

    test('conta entrega sem progresso e lista o PE atrasado (própria unidade)', function () {
        $pe = peAtrasado($this->unidadeGerida->id);
        entregaSemProgresso($pe);

        expect($this->provider->count($this->chefe->id))->toBe(1);

        $page = $this->provider->buscar($this->chefe->id);
        expect($page->total())->toBe(1);
        expect($page->items()[0]->id)->toBe($pe->id);
    });

    test('NÃO conta quando a entrega já tem registro de progresso', function () {
        $pe = peAtrasado($this->unidadeGerida->id);
        $entrega = entregaSemProgresso($pe);
        inserirProgresso($entrega, $this->chefe->id);

        expect($this->provider->count($this->chefe->id))->toBe(0);
        expect($this->provider->buscar($this->chefe->id)->total())->toBe(0);
    });

    test('CONTA quando o único progresso da entrega está soft-deleted', function () {
        $pe = peAtrasado($this->unidadeGerida->id);
        $entrega = entregaSemProgresso($pe);
        // progresso soft-deleted não é progresso válido → a entrega segue "sem RE"
        inserirProgressoSoftDeleted($entrega, $this->chefe->id);

        expect($this->provider->count($this->chefe->id))->toBe(1);
        expect($this->provider->buscar($this->chefe->id)->total())->toBe(1);
    });

    test('NÃO conta PE dentro do prazo (data_fim recente)', function () {
        $pe = PlanoEntrega::withoutEvents(fn () => PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidadeGerida->id,
            'status' => StatusEnum::CONCLUIDO->value,
            'data_fim' => now()->subDays(5),
            'created_at' => \Illuminate\Support\Carbon::parse(PlanoEntrega::DATA_MUDANCA_REGRA_PE)->addDay(),
        ]));
        entregaSemProgresso($pe);

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('NÃO conta PE que não está CONCLUIDO', function () {
        // Só PEs CONCLUIDOS têm RE cobrável; ATIVO/HOMOLOGANDO/etc. não contam.
        entregaSemProgresso(peAtrasado($this->unidadeGerida->id, StatusEnum::ATIVO->value));
        entregaSemProgresso(peAtrasado($this->unidadeGerida->id, StatusEnum::SUSPENSO->value));
        entregaSemProgresso(peAtrasado($this->unidadeGerida->id, StatusEnum::CANCELADO->value));

        expect($this->provider->count($this->chefe->id))->toBe(0);
    });

    test('count conta entregas em atraso; buscar lista o PE uma única vez', function () {
        $pe = peAtrasado($this->unidadeGerida->id);
        entregaSemProgresso($pe);
        entregaSemProgresso($pe);

        // count conta ENTREGAS (2); buscar lista PEs distintos (1)
        expect($this->provider->count($this->chefe->id))->toBe(2);
        expect($this->provider->buscar($this->chefe->id)->total())->toBe(1);
    });
});
