<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao;

use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoStoreValidator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class ContribuicaoExecucaoService
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoContribuicaoRepository $repository,
        private readonly ContribuicaoExecucaoAuthorizationValidator $authorizationValidator,
        private readonly ContribuicaoExecucaoStoreValidator $storeValidator,
    ) {}

    public function store(ContribuicaoExecucaoStoreDTO $dto): PlanoTrabalhoConsolidacaoContribuicao
    {
        $plano = $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $this->storeValidator->validarStore($plano, $dto);

        return DB::transaction(function () use ($dto): PlanoTrabalhoConsolidacaoContribuicao {
            $contribuicao = $this->repository->create($dto->toPersistArray());
            $this->repository->marcarRegistrado($contribuicao->id, Carbon::now());

            return $contribuicao->refresh();
        });
    }

    public function update(ContribuicaoExecucaoStoreDTO $dto): PlanoTrabalhoConsolidacaoContribuicao
    {
        $plano = $this->authorizationValidator->validar($dto->planoTrabalhoId, Auth::id());
        $contribuicao = $this->storeValidator->validarUpdate($plano, $dto);

        return DB::transaction(function () use ($dto, $contribuicao): PlanoTrabalhoConsolidacaoContribuicao {
            $this->repository->update($contribuicao->id, $dto->toPersistArray());
            $this->repository->marcarRegistrado($contribuicao->id, Carbon::now());

            /** @var PlanoTrabalhoConsolidacaoContribuicao $atualizada */
            $atualizada = $this->repository->findById($contribuicao->id);

            return $atualizada;
        });
    }

    public function destroy(string $planoTrabalhoId, string $consolidacaoId, string $contribuicaoId): void
    {
        $plano = $this->authorizationValidator->validar($planoTrabalhoId, Auth::id());
        $contribuicao = $this->storeValidator->validarDestroy($plano, $consolidacaoId, $contribuicaoId);

        DB::transaction(function () use ($contribuicao): void {
            $this->repository->delete($contribuicao->id)
                || throw new RuntimeException('Falha ao remover a contribuição de execução.');
        });
    }
}
