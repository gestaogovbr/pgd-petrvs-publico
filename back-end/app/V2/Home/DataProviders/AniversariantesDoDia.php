<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;

class AniversariantesDoDia
{
    use ResolveUnidades;

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
        $hoje = now();

        $aniversariantes = Usuario::query()
            ->whereNotNull('data_nascimento')
            ->whereMonth('data_nascimento', $hoje->month)
            ->whereDay('data_nascimento', $hoje->day)
            ->whereHas('unidadesIntegrantes', fn ($q) => $q
                ->whereIn('unidade_id', $unidadeIds)
                ->has('atribuicoes')
            )
            ->orderBy('nome')
            ->get(['id', 'nome', 'apelido', 'nome_social'])
            ->map(fn (Usuario $u) => ['nome' => $u->nome_exibicao])
            ->values()
            ->toArray();

        return [
            'aniversariantes' => $aniversariantes,
        ];
    }
}
