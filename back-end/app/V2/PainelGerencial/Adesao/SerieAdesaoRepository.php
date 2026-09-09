<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao;

use App\V2\PainelGerencial\Adesao\DTOs\SerieParticipantesPGDDTO;
use App\V2\PainelGerencial\Adesao\DTOs\SerieUnidadesExecutorasDTO;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SerieAdesaoRepository
{
    public function upsertUnidadesExecutoras(SerieUnidadesExecutorasDTO $dto): void
    {
        DB::table('serie_unidades_executoras')->updateOrInsert(
            ['unidade_id' => $dto->unidadeId, 'periodo' => $dto->periodo],
            [
                'id' => Str::uuid()->toString(),
                'unidade_sigla' => $dto->unidadeSigla,
                'unidade_nome' => $dto->unidadeNome,
                'unidade_pai_id' => $dto->unidadePaiId,
                'executoras_qtd' => $dto->executorasQtd,
                'nao_executoras_qtd' => $dto->naoExecutorasQtd,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );
    }

    public function upsertParticipantesPGD(SerieParticipantesPGDDTO $dto): void
    {
        DB::table('serie_participantes_pgd')->updateOrInsert(
            ['unidade_id' => $dto->unidadeId, 'periodo' => $dto->periodo],
            [
                'id' => Str::uuid()->toString(),
                'unidade_sigla' => $dto->unidadeSigla,
                'unidade_nome' => $dto->unidadeNome,
                'unidade_pai_id' => $dto->unidadePaiId,
                'participantes_qtd' => $dto->participantesQtd,
                'nao_participantes_qtd' => $dto->naoParticipantesQtd,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );
    }
}
