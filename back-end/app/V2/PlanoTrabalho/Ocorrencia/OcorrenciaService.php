<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia;

use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\ConsolidacaoAfastamentoDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\PlanoTrabalho\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OcorrenciaService
{
    public function __construct(
        private readonly OcorrenciaStoreValidator $validator,
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $this->validator->validarStore($plano, $dto);

        return DB::transaction(function () use ($dto, $plano) {
            $afastamento = $this->afastamentoRepository->insert($dto->toPersistArray($plano->usuario_id));

            $this->vincularConsolidacoes($plano->id, $afastamento);

            return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
        });
    }

    public function update(OcorrenciaUpdateDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($dto->ocorrenciaId, $plano);

        return DB::transaction(function () use ($afastamento, $dto) {
            $this->afastamentoRepository->update($afastamento->id, $dto->toPersistArray());

            $afastamento->refresh();

            $this->consolidacaoRepository->updateAfastamentoSnapshot(
                $afastamento->id,
                json_encode($afastamento->toArray()),
            );

            return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
        });
    }

    public function destroy(string $planoTrabalhoId, string $ocorrenciaId): void
    {
        $plano = $this->validator->validarAutorizacao($planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($ocorrenciaId, $plano);

        DB::transaction(function () use ($afastamento) {
            $this->consolidacaoRepository->deleteAfastamentoVinculos($afastamento->id);
            $this->afastamentoRepository->destroy($afastamento->id);
        });
    }

    private function vincularConsolidacoes(string $planoTrabalhoId, Afastamento $afastamento): void
    {
        $consolidacoes = $this->consolidacaoRepository->findAllByPlanoTrabalhoIdAndPeriodo(
            $planoTrabalhoId,
            $afastamento->data_inicio,
            $afastamento->data_fim,
        );

        foreach ($consolidacoes as $consolidacao) {
            /** @var \App\Models\PlanoTrabalhoConsolidacao $consolidacao */
            $this->consolidacaoRepository->createAfastamentoVinculo(
                ConsolidacaoAfastamentoDTO::fromModels($consolidacao, $afastamento)->toPersistArray(),
            );
        }
    }
}
