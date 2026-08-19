<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Models\Afastamento;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;

class EmFeriasHoje
{
    use ResolveUnidades;

    private const NOME_FERIAS = 'Férias';

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(HomeRequestDTO $dto): array
    {
        $unidadeIds = $this->resolverUnidades($dto);
        $hoje = now()->toDateString();

        $afastamentos = Afastamento::query()
            ->whereHas('tipoMotivoAfastamento', fn ($q) => $q->where('nome', self::NOME_FERIAS))
            ->whereHas('usuario.unidadesIntegrantes', fn ($q) => $q->whereIn('unidade_id', $unidadeIds))
            ->whereDate('data_inicio', '<=', $hoje)
            ->whereDate('data_fim', '>=', $hoje)
            ->with('usuario')
            ->get();

        $emFerias = $afastamentos
            ->unique('usuario_id')
            ->map(fn (Afastamento $a) => [
                'nome' => $a->usuario->nome_exibicao,
                'data_inicio' => $a->data_inicio,
                'data_fim' => $a->data_fim,
            ])
            ->values()
            ->toArray();

        return [
            'em_ferias' => $emFerias,
        ];
    }
}
