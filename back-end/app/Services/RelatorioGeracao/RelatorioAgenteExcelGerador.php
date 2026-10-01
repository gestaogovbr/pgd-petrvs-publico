<?php

declare(strict_types=1);

namespace App\Services\RelatorioGeracao;

use App\Contracts\RelatorioExcelGeradorContract;
use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\DTOs\RelatorioGeracao\RelatorioExcelConsultaPaginaDTO;
use App\Enums\RelatorioGeracaoTipo;
use App\Exports\RelatorioAgenteExport;
use App\Models\RelatorioGeracao;
use App\Models\Usuario;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use Illuminate\Support\Collection;

class RelatorioAgenteExcelGerador implements RelatorioExcelGeradorContract
{
    public const PAGE_SIZE = 1000;

    private ?int $totalCount = null;

    /** @var array<string, mixed>|null */
    private ?array $filtersAutorizados = null;

    public function __construct(
        private RelatorioAgenteService $service,
        private RelatorioAgenteAuthorization $authorization,
        private RelatorioGeracao $geracao,
    ) {
    }

    public function pageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function arquivoNome(): string
    {
        return RelatorioGeracaoTipo::AGENTE->arquivoNome();
    }

    public function criarExport(): object
    {
        return new RelatorioAgenteExport(new Collection());
    }

    public function consultarPagina(RelatorioExcelConsultaPaginaDTO $consulta): array
    {
        $query = $consulta->toQueryArray();
        $query['filters'] = $this->filtersAutorizados ??= $this->aplicarFiltrosAutorizacao($consulta->filters);

        $result = $this->service->queryForExport($query, $this->totalCount);

        $this->totalCount = (int) $result['count'];

        return $result;
    }

    /**
     * @param array<string, mixed> $filters
     * @return array<string, mixed>
     */
    private function aplicarFiltrosAutorizacao(array $filters): array
    {
        $usuario = $this->usuarioDaGeracao();
        if ($usuario === null) {
            return $filters;
        }

        $queryDto = $this->authorization->aplicarFiltroParticipante(
            new RelatorioAgenteQueryDTO(
                filters: RelatorioAgenteFiltersDTO::fromArray($filters),
                orderBy: [],
            ),
            $usuario,
        );

        return $queryDto->filters->toArray();
    }

    private function usuarioDaGeracao(): ?Usuario
    {
        if ($this->geracao->relationLoaded('usuario')) {
            $usuario = $this->geracao->getRelation('usuario');

            return $usuario instanceof Usuario ? $usuario : null;
        }

        return Usuario::query()->with('perfil')->find($this->geracao->usuario_id);
    }
}
