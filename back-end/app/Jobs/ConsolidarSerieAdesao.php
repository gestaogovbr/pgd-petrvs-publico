<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ConsolidarSerieAdesao implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly ?string $tenantId = null,
        private readonly ?string $periodo = null,
    ) {
        $this->queue = 'default';
    }

    public function handle(): void
    {
        if ($this->tenantId) {
            $tenant = tenancy()->find($this->tenantId);
            tenancy()->initialize($tenant);
        }

        $periodo = $this->periodo ?? now()->format('Y-m');

        $this->consolidarUnidadesExecutoras($periodo);
        $this->consolidarParticipantesPGD($periodo);
    }

    private function consolidarUnidadesExecutoras(string $periodo): void
    {
        $unidades = Unidade::query()
            ->whereNull('deleted_at')
            ->get(['id', 'sigla', 'unidade_pai_id', 'executora']);

        $agora = now();

        foreach ($unidades as $unidade) {
            $subordinadas = Unidade::query()
                ->where('unidade_pai_id', $unidade->id)
                ->whereNull('deleted_at')
                ->get(['id', 'executora']);

            $todasUnidades = collect([$unidade])->merge($subordinadas);
            $executoras = $todasUnidades->filter(fn ($u) => (bool) $u->executora)->count();
            $naoExecutoras = $todasUnidades->count() - $executoras;

            DB::table('serie_unidades_executoras')->updateOrInsert(
                [
                    'unidade_id' => $unidade->id,
                    'periodo' => $periodo,
                ],
                [
                    'id' => Str::uuid()->toString(),
                    'unidade_sigla' => $unidade->sigla,
                    'unidade_pai_id' => $unidade->unidade_pai_id,
                    'executoras_qtd' => $executoras,
                    'nao_executoras_qtd' => $naoExecutoras,
                    'updated_at' => $agora,
                    'created_at' => $agora,
                ]
            );
        }
    }

    private function consolidarParticipantesPGD(string $periodo): void
    {
        $unidades = Unidade::query()
            ->whereNull('deleted_at')
            ->get(['id', 'sigla', 'unidade_pai_id']);

        $agora = now();

        foreach ($unidades as $unidade) {
            $unidadeIds = [$unidade->id];

            $subordinadasIds = Unidade::query()
                ->where('unidade_pai_id', $unidade->id)
                ->whereNull('deleted_at')
                ->pluck('id')
                ->toArray();

            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);

            $usuarios = Usuario::query()
                ->whereHas('unidadesIntegrantes', fn ($q) => $q
                    ->whereIn('unidade_id', $unidadeIds)
                    ->whereHas('atribuicoes', fn ($a) => $a->whereIn('atribuicao', ['LOTADO', 'COLABORADOR']))
                )
                ->whereNull('deleted_at')
                ->get(['id', 'participa_pgd']);

            $participantes = $usuarios->filter(fn ($u) => $u->participa_pgd === 'sim')->count();
            $naoParticipantes = $usuarios->count() - $participantes;

            DB::table('serie_participantes_pgd')->updateOrInsert(
                [
                    'unidade_id' => $unidade->id,
                    'periodo' => $periodo,
                ],
                [
                    'id' => Str::uuid()->toString(),
                    'unidade_sigla' => $unidade->sigla,
                    'unidade_pai_id' => $unidade->unidade_pai_id,
                    'participantes_qtd' => $participantes,
                    'nao_participantes_qtd' => $naoParticipantes,
                    'updated_at' => $agora,
                    'created_at' => $agora,
                ]
            );
        }
    }
}
