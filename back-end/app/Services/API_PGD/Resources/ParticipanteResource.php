<?php

namespace App\Services\API_PGD\Resources;

use App\Exceptions\ExportPgdException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ParticipanteResource extends JsonResource
{
    public function toArray(Request $request)
    {
        if (!$this->ultimaParticipacaoPrograma){
            throw new ExportPgdException('Usuário sem Participação');
        }

        if (!$this->matricula){
            throw new ExportPgdException('Usuário sem Matrícula');
        }

        if (!$this->ultimoPlanoTrabalho){
            throw new ExportPgdException('Usuário sem Plano de Trabalho');
        }

        $autorizadora = $this->ultimaParticipacaoPrograma->programa->unidadeAutorizadora ?? null;
        
        if (!$autorizadora || !$autorizadora->codigo){
            throw new ExportPgdException('Usuário sem Unidade Autorizadora');
        }

        $instituidora = $this->ultimaParticipacaoPrograma->programa->unidade ?? null;
        
        if (!$instituidora || !$instituidora->codigo){
            throw new ExportPgdException('Usuário sem Unidade Instituidora');
        }

        $unidadeIntegrante = $this->unidadesIntegrantes->first();

        if (!$unidadeIntegrante || !$unidadeIntegrante->unidade || !$unidadeIntegrante->unidade->codigo){
            throw new ExportPgdException('Usuário não possui unidade de Lotação');
        }

        $dataAssinatura = $this->ultimoPlanoTrabalho->ultimaAssinatura->data_assinatura ?? '';
        if (!$dataAssinatura){
            //throw new ExportPgdException('Usuário não possui assinatura');
        }

        if (!$this->ultimoPlanoTrabalho->tipoModalidade){
            throw new ExportPgdException('Usuário não possui modalidade definida');
        }
        
        $modalidade = new ModalidadeResource($this->ultimoPlanoTrabalho->tipoModalidade);

        $result = [
            "id"                        => $this->id,
            "tipo"                      => 'participante',
            "origem_unidade"            => "SIAPE",
            'cod_unidade_autorizadora'  => $autorizadora->codigo ?? null,
            'cod_unidade_instituidora'  => $instituidora->codigo ?? null,
            'cod_unidade_lotacao'       => $unidadeIntegrante->unidade->codigo ?? null,
            'matricula_siape'           => $this->matricula,
            'cpf'                       => $this->cpf,
            'situacao'                  => $this->ultimaParticipacaoPrograma->habilitado ?? 0,
            "modalidade_execucao"       => $modalidade->get(),
            "data_assinatura_tcr"       => Carbon::parse($dataAssinatura)->toDateTimeLocalString()
        ];

        return $result;
    }
}
