<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Atividade;
use App\Repository\AtividadeRepository;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeStoreValidator;
use Illuminate\Support\Facades\Auth;

class AtividadeService
{
    public function __construct(
        private readonly AtividadeRepository $atividadeRepository,
        private readonly AtividadeAuthorizationValidator $authValidator,
        private readonly AtividadeStoreValidator $storeValidator,
    ) {}

    public function store(string $planoTrabalhoId, string $consolidacaoId, array $data): Atividade
    {
        $usuarioId = Auth::id();
        $plano = $this->authValidator->validar($planoTrabalhoId, $usuarioId);
        $this->storeValidator->validar($plano, $consolidacaoId, $data);

        $dto = AtividadeStoreDTO::fromArray($data, $consolidacaoId, $plano->id, $plano->unidade_id, $usuarioId);

        return $this->atividadeRepository->create($dto->toArray());
    }

    public function update(string $planoTrabalhoId, string $consolidacaoId, string $atividadeId, array $data): Atividade
    {
        $usuarioId = Auth::id();
        $plano = $this->authValidator->validar($planoTrabalhoId, $usuarioId);
        $this->storeValidator->validar($plano, $consolidacaoId, $data);

        $atividade = $this->atividadeRepository->findById($atividadeId);

        if ($atividade === null) {
            throw new NotFoundException('Atividade não encontrada.');
        }

        if ($atividade->plano_trabalho_consolidacao_id !== $consolidacaoId) {
            throw new ValidateException('A atividade não pertence a esta consolidação.');
        }

        $dto = AtividadeUpdateDTO::fromArray($data);

        $this->atividadeRepository->update($atividadeId, $dto->toArray());

        return $this->atividadeRepository->findById($atividadeId);
    }

    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $atividadeId): void
    {
        $usuarioId = Auth::id();
        $plano = $this->authValidator->validar($planoTrabalhoId, $usuarioId);
        $this->storeValidator->validar($plano, $consolidacaoId, []);

        $atividade = $this->atividadeRepository->findById($atividadeId);

        if ($atividade === null) {
            throw new NotFoundException('Atividade não encontrada.');
        }

        if ($atividade->plano_trabalho_consolidacao_id !== $consolidacaoId) {
            throw new ValidateException('A atividade não pertence a esta consolidação.');
        }

        $this->atividadeRepository->delete($atividadeId);
    }
}
