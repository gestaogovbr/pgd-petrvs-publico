<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\StatusEnum;
use App\Models\Usuario;
use App\Repository\RelatorioAgenteRepository;
use Illuminate\Support\Collection;

class RelatorioAgenteService
{
    public function __construct(
        private readonly RelatorioAgenteRepository $relatorioAgenteRepository,
    ) {
    }

    /**
     * Consulta paginada para a geração do Excel em segundo plano.
     *
     * @param array{page?: int, limit?: int, where?: array, orderBy?: array} $data
     * @return array{count: int, rows: Collection, extra?: mixed}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $result = $this->query([
            'page' => $this->resolverPage($data['page'] ?? 1),
            'limit' => $this->resolverLimit($data['limit'] ?? 1000),
            'where' => $data['where'] ?? [],
            'orderBy' => $data['orderBy'] ?? [],
        ]);

        if ($knownCount !== null) {
            $result['count'] = $knownCount;
        }

        return $result;
    }

    /**
     * @param array<string, mixed> $data
     * @return array{count: int, rows: Collection, extra?: mixed}
     */
    public function query(array $data): array
    {
        $result = $this->relatorioAgenteRepository->query($data);
        $this->aplicarProxyRows($result['rows']);

        return $result;
    }

    private function resolverPage(mixed $page): int
    {
        return max(1, (int) $page);
    }

    private function resolverLimit(mixed $limit): int
    {
        return max(1, (int) $limit);
    }

    private function aplicarProxyRows(Collection $rows): Collection
    {
        $tipos = Usuario::getTiposIndisponibilidades();

        foreach ($rows as $row) {
            $row->tipoPedagio = $tipos[$row->tipo_pedagio] ?? '-';
            $row->perfil = str_replace('Perfil ', '', $row->perfil ?? '');
            $row->plano_trabalho_status_label = StatusEnum::tryFrom($row->plano_trabalho_status ?? '')?->label() ?? '-';
        }

        return $rows;
    }
}
