<?php

namespace App\Jobs\Envio\Resources;

use App\Exceptions\ExportPgdException;
use App\Enums\EnvioPlanoTrabalhoStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\CalendarioService;
use Carbon\Carbon;

/**
 * @mixin \App\Models\PlanoTrabalho
 */
class PlanoTrabalhoResource extends JsonResource
{
    const NENHUMA_ENTREGA = 0;
    const TAMANHO_MATRICULAS = 7;
    const CONTRIBUICAO_PROPRIA_UNIDADE = 1;
    const CONTRIBUICAO_SEM_ENTREGA = 2;
    const CONTRIBUICAO_OUTRA_UNIDADE = 3;
    private const VALOR_AUSENTE = 0.0;

    public function toArray($request)
    {
        $calendarioService = new CalendarioService;
        $diasUteis = $calendarioService->qtdDiasUteis(
            $this->data_inicio, $this->data_fim,
            $this->unidade_id
        );

        $entregas = $this->entregas ?? [];

        return [
            "id"                        => $this->id,
            "tipo"                      => 'trabalho',
            "origem_unidade"            => "SIAPE",
            "id_plano_trabalho"         => $this->id,
            "status"                    => $this->converteStatus($this->status),
            "cod_unidade_executora"     => $this->unidade->codigo ?? null,
            "cod_unidade_autorizadora"  => $this->cod_unidade_autorizadora,
            "cpf_participante"          => $this->usuario->cpf ?? '',
            "matricula_siape"           => $this->usuario->matricula ? str_pad($this->usuario->matricula, self::TAMANHO_MATRICULAS, '0', STR_PAD_LEFT): '',
            "cod_unidade_lotacao_participante" => $this->usuario->lotacao?->unidade?->codigo,
            "data_inicio"               => Carbon::parse($this->data_inicio)->format('Y-m-d'),
            "data_termino"              => Carbon::parse($this->data_fim)->format('Y-m-d'),
            "carga_horaria_disponivel"  => self::cargaHorariaDisponivelEmHorasInteiras($diasUteis, $this->carga_horaria),
            "contribuicoes"             => PlanoTrabalhoContribuicaoResource::collection($entregas),
            "avaliacoes_registros_execucao" => $this->consolidacoes
                ? PlanoTrabalhoAvaliacaoResource::collection($this->consolidacoes)
                : [],
          ];
    }

    /**
     * A API PGD exige inteiro em carga_horaria_disponivel (NON_NEGATIVE_INT4).
     * A carga diária do PT é decimal; o produto com dias úteis precisa ser arredondado.
     */
    public static function cargaHorariaDisponivelEmHorasInteiras(mixed $diasUteis, mixed $cargaHorariaDiaria): int
    {
        $dias = is_numeric($diasUteis) ? (float) $diasUteis : self::VALOR_AUSENTE;
        $cargaDiaria = is_numeric($cargaHorariaDiaria) ? (float) $cargaHorariaDiaria : self::VALOR_AUSENTE;

        return (int) round($dias * $cargaDiaria);
    }

    function converteStatus($status)
    {
        switch ($status) {
            case 'CANCELADO':
                return EnvioPlanoTrabalhoStatusEnum::CANCELADO->value;
            case 'ATIVO':
                return EnvioPlanoTrabalhoStatusEnum::EM_EXECUCAO->value;
            case 'CONCLUIDO':
            case 'AVALIADO':
                return EnvioPlanoTrabalhoStatusEnum::CONCLUIDO->value;
            default:
                // return 4; // somente para testes
                throw new ExportPgdException('Plano de Trabalho com status inválido para Envio: '.$status);
        }
    }
}
