<?php

namespace App\Jobs\Envio\Resources;

use App\Exceptions\ExportPgdException;
use App\Enums\EnvioParticipanteSituacaoEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

/**
 * @mixin \App\Models\Usuario
 */
class ParticipanteResource extends JsonResource
{
    const TAMANHO_MATRICULAS = 7;

    public function toArray(Request $request)
    {
        if (!$this->matricula){
            throw new ExportPgdException("Usuário sem Matrícula", $this->id);
        }

        if (!$this->ultimoPlanoTrabalho){
            throw new ExportPgdException("Usuário não possui Planos de Trabalho", $this->id);
        }

        $unidadeIntegrante = $this->unidadesIntegrantes->first();

        if (!$unidadeIntegrante || !$unidadeIntegrante->unidade || !$unidadeIntegrante->unidade->codigo){
            throw new ExportPgdException("Usuário não possui unidade de Lotação", $this->id);
        }

        $dataAssinatura = $this->ultimaAssinatura->data_assinatura ?? null;

        if (!$dataAssinatura){
            throw new ExportPgdException("Usuário não possui data de assinatura", $this->id);
        }

        if (empty($this->ultimoPlanoTrabalho->modalidade_pgd)){
            throw new ExportPgdException("Usuário não possui modalidade definida");
        }

        $modalidade = new ModalidadeResource($this->ultimoPlanoTrabalho->modalidade_pgd);

        $result = [
            "id"                        => $this->id,
            "tipo"                      => 'participante',
            "origem_unidade"            => "SIAPE",
            'cod_unidade_instituidora'  => $this->ultimoPlanoTrabalho->programa->unidade->codigo ?? null,
            'cod_unidade_lotacao'       => $this->lotacao->unidade->codigo ?? null,
            'matricula_siape'           => str_pad($this->matricula, self::TAMANHO_MATRICULAS, '0', STR_PAD_LEFT),
            'cpf'                       => $this->cpf,
            'situacao'                  => $this->getSituacao(),
            "modalidade_execucao"       => $modalidade->get(),
            "data_assinatura_tcr"       => $dataAssinatura ? Carbon::parse($dataAssinatura)->toDateTimeLocalString() : null
        ];

        return $result;
    }

    private function getSituacao(): int
    {
        return ($this->participa_pgd == 'sim')
            ? EnvioParticipanteSituacaoEnum::ATIVO->value
            : EnvioParticipanteSituacaoEnum::INATIVO->value;
    }
}
