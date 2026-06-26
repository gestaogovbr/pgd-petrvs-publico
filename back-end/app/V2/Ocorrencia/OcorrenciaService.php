<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia;

use App\Exceptions\ValidateException;
use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Ocorrencia\DTOs\ConsolidacaoAfastamentoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaImpactoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OcorrenciaService
{
    private const PRAZO_MAXIMO_EXCLUSAO_DIAS = 365;

    public function __construct(
        private readonly OcorrenciaStoreValidator $validator,
        private readonly OcorrenciaImpactoPolicy $impactoPolicy,
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function agentes(): Collection
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->getUnidadeIdsWithSubordinadas($usuarioLogadoId);

        return $this->usuarioRepository->findAgentesVisiveis($usuarioLogadoId, $unidadeIds);
    }

    public function index(array $data): LengthAwarePaginator
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->getUnidadeIdsWithSubordinadas($usuarioLogadoId);
        $dto = OcorrenciaIndexDTO::fromRequest($data, $usuarioLogadoId, $unidadeIds);

        return $this->afastamentoRepository->buscarOcorrenciasListagem($dto);
    }

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $this->validator->validarAutorizacao($dto->usuarioId, Auth::id());

        return DB::transaction(function () use ($dto) {
            $afastamento = $this->afastamentoRepository->insert($dto->toPersistArray());

            $this->vincularConsolidacoes($afastamento);

            return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
        });
    }

    public function destroy(string $ocorrenciaId, string $usuarioId): void
    {
        $this->validator->validarAutorizacao($usuarioId, Auth::id());
        $afastamento = $this->validator->validarExistencia($ocorrenciaId, $usuarioId);

        if ($afastamento->created_at->diffInDays(now()) > self::PRAZO_MAXIMO_EXCLUSAO_DIAS) {
            throw new ValidateException('Ocorrência cadastrada há mais de 1 ano não pode ser excluída.');
        }

        DB::transaction(function () use ($afastamento) {
            $this->consolidacaoRepository->deleteAfastamentoVinculos($afastamento->id);
            $this->afastamentoRepository->destroy($afastamento->id);
        });
    }

    public function impactoConsolidacoes(OcorrenciaOperacaoDTO $dto): OcorrenciaImpactoDTO
    {
        if ($dto->isExclusao() && $dto->ocorrenciaId) {
            $afastamento = $this->afastamentoRepository->findById($dto->ocorrenciaId);

            if ($afastamento && $afastamento->created_at->diffInDays(now()) > self::PRAZO_MAXIMO_EXCLUSAO_DIAS) {
                return OcorrenciaImpactoDTO::bloqueada();
            }
        }

        return $this->impactoPolicy->calcularImpacto($dto);
    }

    /**
     * @return list<string>
     */
    private function getUnidadeIdsWithSubordinadas(string $usuarioId): array
    {
        $gerendciadasIds = $this->unidadeRepository->getUnidadesGerenciadas($usuarioId)->pluck('id')->all();
        $subordinadasIds = $this->unidadeRepository->getSubordinadasRecursivas($gerendciadasIds)->pluck('id')->all();

        return array_values(array_unique(array_merge($gerendciadasIds, $subordinadasIds)));
    }

    private function vincularConsolidacoes(Afastamento $afastamento): void
    {
        $planos = $this->planoTrabalhoRepository->planosAtivosPorData(
            $afastamento->data_inicio,
            $afastamento->data_fim,
            $afastamento->usuario_id,
        );

        foreach ($planos as $plano) {
            /** @var \App\Models\PlanoTrabalho $plano */
            $consolidacoes = $this->consolidacaoRepository->findAllByPlanoTrabalhoIdAndPeriodo(
                $plano->id,
                $afastamento->data_inicio,
                $afastamento->data_fim,
            );

            foreach ($consolidacoes as $consolidacao) {
                $this->consolidacaoRepository->createAfastamentoVinculo(
                    ConsolidacaoAfastamentoDTO::fromModels($consolidacao, $afastamento)->toPersistArray(),
                );
            }
        }
    }
}
