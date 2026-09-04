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
use App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaImpactoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function agentes(?string $termo = null, int $page = 1, int $perPage = 20): LengthAwarePaginator
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->unidadeRepository->getGerenciadasComSubordinadasIds($usuarioLogadoId);

        return $this->usuarioRepository->findAgentesVisiveis($usuarioLogadoId, $unidadeIds, $termo, $page, $perPage);
    }

    public function index(array $data): LengthAwarePaginator
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->unidadeRepository->getGerenciadasComSubordinadasIds($usuarioLogadoId);
        $dto = OcorrenciaIndexDTO::fromRequest($data, $usuarioLogadoId, $unidadeIds);

        return $this->afastamentoRepository->buscarOcorrenciasListagem($dto);
    }

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $this->validator->validarAutorizacao($dto->usuarioId, Auth::id());

        $afastamento = $this->afastamentoRepository->insert($dto->toPersistArray());

        return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
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
}
