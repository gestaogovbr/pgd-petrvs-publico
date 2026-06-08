<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade;

use App\Models\Atividade;
use App\Repository\AtividadeRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeDestroyDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeWriteValidator;

class AtividadeService
{
    public function __construct(
        private readonly AtividadeRepository $atividadeRepository,
        private readonly AtividadeAuthorizationValidator $authValidator,
        private readonly AtividadeWriteValidator $writeValidator,
    ) {}

    public function store(AtividadeStoreDTO $dto): Atividade
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);

        return $this->atividadeRepository->create($dto->toPersistArray($plano->id, $plano->unidade_id));
    }

    public function update(AtividadeUpdateDTO $dto): Atividade
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);
        $this->writeValidator->validarExistencia($dto);

        $this->atividadeRepository->update($dto->atividadeId, $dto->toArray());

        return $this->atividadeRepository->findById($dto->atividadeId);
    }

    public function destroy(AtividadeDestroyDTO $dto): void
    {
        $plano = $this->authValidator->validar($dto->planoTrabalhoId(), $dto->usuarioId());
        $this->writeValidator->validar($plano, $dto);
        $this->writeValidator->validarExistencia($dto);

        $this->atividadeRepository->delete($dto->atividadeId);
    }
}
