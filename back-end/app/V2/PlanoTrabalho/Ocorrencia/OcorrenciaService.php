<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia;

use App\Models\Afastamento;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\ConsolidacaoAfastamentoDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\PlanoTrabalho\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Support\Facades\Auth;

class OcorrenciaService
{
    public function __construct(
        private readonly OcorrenciaStoreValidator $validator,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $this->validator->validarStore($plano, $dto);

        // TODO (#1984): mover para AfastamentoRepository::create
        $afastamento = Afastamento::create($dto->toPersistArray($plano->usuario_id));

        $this->vincularConsolidacoes($plano->id, $afastamento);

        return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
    }

    public function update(OcorrenciaUpdateDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($dto->ocorrenciaId, $plano);
        
        // TODO (#1984): mover para AfastamentoRepository::update
        $afastamento->update($dto->toPersistArray());

        $this->consolidacaoRepository->updateAfastamentoSnapshot(
            $afastamento->id,
            json_encode($afastamento->fresh()->toArray()),
        );

        return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
    }

    public function destroy(string $planoTrabalhoId, string $ocorrenciaId): void
    {
        $plano = $this->validator->validarAutorizacao($planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($ocorrenciaId, $plano);

        $this->consolidacaoRepository->deleteAfastamentoVinculos($afastamento->id);

        // TODO (#1984): mover para AfastamentoRepository::delete
        $afastamento->delete();
    }

    private function vincularConsolidacoes(string $planoTrabalhoId, Afastamento $afastamento): void
    {
        $consolidacoes = $this->consolidacaoRepository->findByPlanoTrabalhoIdAndPeriodo(
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
