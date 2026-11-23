<?php

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\StatusJustificativa;
use App\Models\TipoMotivoAfastamento;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\Consolidacao\PeriodoAvaliativoDispensadoSql;
use App\V2\PlanoTrabalho\DataProviders\AguardandoMinhaAvaliacaoDataProvider;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->tipoDesconto = TipoMotivoAfastamento::factory()->create(['calculo' => 'DECRESCIMO']);
    $this->tipoAcrescimo = TipoMotivoAfastamento::factory()->create(['calculo' => 'ACRESCIMO']);

    $this->unidade = Unidade::factory()->create();
    $this->chefe = Usuario::factory()->create();
    $this->participante = Usuario::factory()->create();

    UnidadeIntegranteAtribuicao::factory()
        ->gestorSubstituto()
        ->paraUsuarioUnidade($this->chefe->id, $this->unidade->id)
        ->create();

    $this->planos = app(PlanoTrabalhoRepository::class);
    $this->provider = app(AguardandoMinhaAvaliacaoDataProvider::class);
    $this->consolidacoes = app(PlanoTrabalhoConsolidacaoRepository::class);
});

function inserirOcorrencia(string $usuarioId, string $tipoId, string $inicio, string $fim): void
{
    DB::connection('tenant')->table('afastamentos')->insert([
        'id' => (string) Str::uuid(),
        'usuario_id' => $usuarioId,
        'tipo_motivo_afastamento_id' => $tipoId,
        'data_inicio' => $inicio,
        'data_fim' => $fim,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

function periodoConcluido(string $usuarioId, string $unidadeId, string $inicio, string $fim): PlanoTrabalhoConsolidacao
{
    $plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $usuarioId,
        'unidade_id' => $unidadeId,
        'data_inicio' => $inicio,
        'data_fim' => $fim,
        'data_arquivamento' => null,
        'encerrado_at' => null,
    ]);

    return PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'status' => StatusEnum::CONCLUIDO->value,
        'data_inicio' => $inicio,
        'data_fim' => $fim,
    ]);
}

function dispensado(string $usuarioId, string $inicio, string $fim): int
{
    $row = DB::connection('tenant')->selectOne(
        'SELECT ' . PeriodoAvaliativoDispensadoSql::FUNCAO . '(?, ?, ?) AS dispensado',
        [$usuarioId, $inicio, $fim],
    );

    return (int) $row->dispensado;
}

describe('período avaliativo dispensado não fica pendente de avaliação', function () {

    test('ocorrência que cobre o período dispensa a avaliação', function () {
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-06-15');

        expect(dispensado($this->participante->id, '2026-05-01', '2026-05-31'))->toBe(1);
    });

    test('ocorrências adjacentes que juntas cobrem o período dispensam a avaliação', function () {
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-05-15');
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-05-16', '2026-06-15');

        expect(dispensado($this->participante->id, '2026-05-01', '2026-05-31'))->toBe(1);
    });

    test('lacuna entre ocorrências não dispensa o período', function () {
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-05-01', '2026-05-10');
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-05-12', '2026-05-31');

        expect(dispensado($this->participante->id, '2026-05-01', '2026-05-31'))->toBe(0);
    });

    test('ocorrência de acréscimo não dispensa o período', function () {
        inserirOcorrencia($this->participante->id, $this->tipoAcrescimo->id, '2026-04-15', '2026-06-15');

        expect(dispensado($this->participante->id, '2026-05-01', '2026-05-31'))->toBe(0);
    });

    test('a tag conta só o período concluído que não está dispensado', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->participante->id,
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'data_arquivamento' => null,
            'encerrado_at' => null,
        ]);

        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::CONCLUIDO->value,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
        ]);
        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => StatusEnum::CONCLUIDO->value,
            'data_inicio' => '2026-06-01',
            'data_fim' => '2026-06-30',
        ]);

        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-05-31');

        $result = $this->planos->buscarPlanosListagem(
            PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => $this->participante->id]),
        );

        expect($result->total())->toBe(1)
            ->and((int) $result->items()[0]->aguardando_avaliacao)->toBe(1);
    });

    test('plano cuja única pendência está dispensada não entra na home nem na listagem da chefia', function () {
        periodoConcluido($this->participante->id, $this->unidade->id, '2026-05-01', '2026-05-31');
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-06-15');

        $pendente = periodoConcluido(
            Usuario::factory()->create()->id,
            $this->unidade->id,
            '2026-05-01',
            '2026-05-31',
        );

        expect($this->provider->count($this->chefe->id))->toBe(1)
            ->and($this->provider->buscar($this->chefe->id)->total())->toBe(1)
            ->and($this->provider->buscar($this->chefe->id)->items()[0]->id)->toBe($pendente->plano_trabalho_id)
            ->and($this->planos->countAguardandoMinhaAvaliacao([$this->unidade->id], $this->chefe->id))->toBe(1);
    });

    test('relatório detalhado marca a situação da avaliação como Dispensado', function () {
        $consolidacao = periodoConcluido($this->participante->id, $this->unidade->id, '2026-05-01', '2026-05-31');
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-06-15');

        $situacao = DB::connection('tenant')
            ->table('view_relatorio_plano_trabalho_detalhado')
            ->where('id', $consolidacao->id)
            ->value('situacao_avaliacao');

        expect($situacao)->toBe(PeriodoAvaliativoDispensadoSql::SITUACAO_RELATORIO);
    });

    test('pendência da home antiga ignora consolidação dispensada', function () {
        $dispensada = periodoConcluido($this->participante->id, $this->unidade->id, '2026-05-01', '2026-05-31');
        $pendente = periodoConcluido(
            Usuario::factory()->create()->id,
            $this->unidade->id,
            '2026-05-01',
            '2026-05-31',
        );
        inserirOcorrencia($this->participante->id, $this->tipoDesconto->id, '2026-04-15', '2026-06-15');

        foreach ([$dispensada, $pendente] as $consolidacao) {
            $status = new StatusJustificativa([
                'codigo' => StatusEnum::CONCLUIDO->value,
                'justificativa' => 'concluído',
                'plano_trabalho_consolidacao_id' => $consolidacao->id,
                'usuario_id' => $consolidacao->planoTrabalho->usuario_id,
            ]);
            $status->timestamps = false;
            $status->created_at = now()->subDays(10);
            $status->updated_at = now()->subDays(10);
            $status->save();
        }

        $resultado = $this->consolidacoes->getPendentesAvaliacao(
            [$this->unidade->id],
            [],
            $this->chefe->id,
            now()->subDays(5),
        );

        expect($resultado)->toHaveCount(1)
            ->and($resultado->first()->id)->toBe($pendente->id);
    });
});
