<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\Validators;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Illuminate\Support\Carbon;

class OcorrenciaStoreValidator
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}


    public function validarAutorizacao(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $this->autorizarDonoOuChefia(
            $plano,
            $usuarioLogadoId,
            $plano->unidade_id,
            'Usuário não tem permissão para registrar ocorrências neste Plano de Trabalho.',
        );

        return $plano;
    }

    public function validarStore(PlanoTrabalho $plano, OcorrenciaStoreDTO $dto): void
    {
        $this->validarPeriodoDentroDoPlano($plano, $dto->dataInicio, $dto->dataFim);
    }

    public function validarUpdate(PlanoTrabalho $plano, OcorrenciaUpdateDTO $dto, Afastamento $afastamento): void
    {
        $dataInicio = $dto->dataInicio ?? (string) $afastamento->data_inicio;
        $dataFim = $dto->dataFim ?? (string) $afastamento->data_fim;

        $this->validarPeriodoDentroDoPlano($plano, $dataInicio, $dataFim);
    }

    private function validarPeriodoDentroDoPlano(PlanoTrabalho $plano, string $dataInicio, string $dataFim): void
    {
        $inicio = Carbon::parse($dataInicio)->startOfDay();
        $fim = Carbon::parse($dataFim)->startOfDay();
        $planoInicio = Carbon::parse($plano->data_inicio)->startOfDay();
        $planoFim = Carbon::parse($plano->data_fim)->startOfDay();

        $semIntersecao = $fim->lt($planoInicio) || $inicio->gt($planoFim);

        if ($semIntersecao) {
            throw new ValidateException('A ocorrência deve ter período coincidente com o do Plano de Trabalho.');
        }
    }

    public function validarExistencia(string $ocorrenciaId, PlanoTrabalho $plano): Afastamento
    {
        // TODO (#1984): mover para AfastamentoRepository::findByIdAndUsuario
        $afastamento = Afastamento::where('id', $ocorrenciaId)
            ->where('usuario_id', $plano->usuario_id)
            ->first();

        if ($afastamento === null) {
            throw new NotFoundException('Ocorrência não encontrada.');
        }

        return $afastamento;
    }
}
