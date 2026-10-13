<?php

declare(strict_types=1);

use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\PerfilEnum;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\Models\Usuario;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use App\Services\RelatorioGeracao\RelatorioAgenteExcelGerador;

afterAll(function () {
    Mockery::close();
});

function makeRelatorioAgenteExcelGeracao(array $overrides = []): RelatorioGeracao
{
    $geracao = new RelatorioGeracao();
    $geracao->id = $overrides['id'] ?? 'geracao-agente-1';
    $geracao->tipo = RelatorioGeracaoTipo::AGENTE->value;
    $geracao->usuario_id = $overrides['usuario_id'] ?? 'usuario-1';

    if (array_key_exists('usuario', $overrides)) {
        $geracao->setRelation('usuario', $overrides['usuario']);
    }

    return $geracao;
}

test('gerador de Agentes consulta o serviço de exportação com página e limite', function () {
    $consulta = new RelatorioExcelConsultaPaginaDTO(
        filters: ['unidade_id' => 'u1'],
        orderBy: [['nome', 'asc']],
        page: 1,
        limit: 1000,
    );

    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with($consulta->toQueryArray(), null)
        ->andReturn([
            'count' => 300,
            'rows' => collect([(object) ['id' => 'ag-1']]),
            'extra' => null,
        ]);

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('aplicarFiltroParticipante')->never();

    $geracao = makeRelatorioAgenteExcelGeracao(['usuario' => null]);

    $gerador = new RelatorioAgenteExcelGerador($service, $authorization, $geracao);
    $result = $gerador->consultarPagina($consulta);

    expect($gerador->pageSize())->toBe(1000)
        ->and($gerador->arquivoNome())->toBe('relatorio-agentes.xlsx')
        ->and($result['count'])->toBe(300)
        ->and($result['rows'])->toHaveCount(1);
});

test('gerador de Agentes aplica restrição de participante com usuario da geração', function () {
    $usuario = new Usuario();
    $usuario->id = 'usuario-participante';
    $usuario->setRelation('perfil', (object) ['nivel' => PerfilEnum::PARTICIPANTE->value]);

    $geracao = makeRelatorioAgenteExcelGeracao([
        'usuario_id' => 'usuario-participante',
        'usuario' => $usuario,
    ]);

    $filtersOriginais = ['unidade_id' => 'u-1', 'nome' => 'Ana'];
    $filtersRestritos = RelatorioAgenteFiltersDTO::fromArray($filtersOriginais)
        ->restritoAoUsuario('usuario-participante')
        ->toArray();

    $queryDtoRestrito = (new RelatorioAgenteQueryDTO(
        filters: RelatorioAgenteFiltersDTO::fromArray($filtersOriginais),
        orderBy: [],
    ))->withFilters(
        RelatorioAgenteFiltersDTO::fromArray($filtersOriginais)->restritoAoUsuario('usuario-participante')
    );

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('aplicarFiltroParticipante')
        ->once()
        ->with(Mockery::type(RelatorioAgenteQueryDTO::class), $usuario)
        ->andReturn($queryDtoRestrito);

    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $query) use ($filtersRestritos): bool {
            return $query['filters'] === $filtersRestritos
                && $query['orderBy'] === [['nome', 'asc']]
                && $query['page'] === 1
                && $query['limit'] === 1000;
        }), null)
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['id' => 'ag-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioAgenteExcelGerador($service, $authorization, $geracao);
    $result = $gerador->consultarPagina(new RelatorioExcelConsultaPaginaDTO(
        filters: $filtersOriginais,
        orderBy: [['nome', 'asc']],
        page: 1,
        limit: 1000,
    ));

    expect($result['count'])->toBe(1)
        ->and($result['rows'])->toHaveCount(1);
});
