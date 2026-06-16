<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia;

use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Ocorrencia\DTOs\ConsolidacaoAfastamentoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OcorrenciaService
{
    public function __construct(
        private readonly OcorrenciaStoreValidator $validator,
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function agentes(): Collection
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->getUnidadeIdsSubordinadas($usuarioLogadoId);

        return $this->usuarioRepository->findAgentesVisiveis($usuarioLogadoId, $unidadeIds);
    }

    public function index(array $data): LengthAwarePaginator
    {
        $usuarioLogadoId = Auth::id();
        $unidadeIds = $this->getUnidadeIdsSubordinadas($usuarioLogadoId);
        $dto = OcorrenciaIndexDTO::fromRequest($data, $usuarioLogadoId, $unidadeIds);

        return $this->afastamentoRepository->buscarOcorrenciasListagem($dto);
    }

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $this->validator->validarAutorizacao($dto->usuarioId, Auth::id());

        $this->validator->validarImpacto(new OcorrenciaOperacaoDTO(
            $dto->usuarioId,
            $dto->dataInicio,
            $dto->dataFim,
            null,
            'criar',
            $dto->tipoMotivoAfastamentoId,
        ));

        return DB::transaction(function () use ($dto) {
            $afastamento = $this->afastamentoRepository->insert($dto->toPersistArray());

            $this->vincularConsolidacoes($afastamento);

            return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
        });
    }

    public function update(OcorrenciaUpdateDTO $dto): Afastamento
    {
        $this->validator->validarAutorizacao($dto->usuarioId, Auth::id());
        $afastamento = $this->validator->validarExistencia($dto->ocorrenciaId, $dto->usuarioId);

        $dataInicio = $dto->dataInicio ?? (string) $afastamento->data_inicio;
        $dataFim = $dto->dataFim ?? (string) $afastamento->data_fim;
        $tipoId = $dto->tipoMotivoAfastamentoId ?? $afastamento->tipo_motivo_afastamento_id;

        $this->validator->validarImpacto(new OcorrenciaOperacaoDTO(
            $dto->usuarioId,
            $dataInicio,
            $dataFim,
            $afastamento->id,
            'editar',
            $tipoId,
        ));

        return DB::transaction(function () use ($afastamento, $dto) {
            $this->consolidacaoRepository->deleteAfastamentoVinculos($afastamento->id);

            $this->afastamentoRepository->update($afastamento->id, $dto->toPersistArray());
            $afastamento->refresh();

            $this->vincularConsolidacoes($afastamento);

            return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
        });
    }

    public function destroy(string $ocorrenciaId, string $usuarioId): void
    {
        $this->validator->validarAutorizacao($usuarioId, Auth::id());
        $afastamento = $this->validator->validarExistencia($ocorrenciaId, $usuarioId);

        $this->validator->validarImpacto(new OcorrenciaOperacaoDTO(
            $usuarioId,
            (string) $afastamento->data_inicio,
            (string) $afastamento->data_fim,
            $afastamento->id,
            'excluir',
        ));

        DB::transaction(function () use ($afastamento) {
            $this->consolidacaoRepository->deleteAfastamentoVinculos($afastamento->id);
            $this->afastamentoRepository->destroy($afastamento->id);
        });
    }

    /**
     * @return list<string>
     */
    private function getUnidadeIdsSubordinadas(string $usuarioId): array
    {
        $gerendciadasIds = $this->unidadeRepository->getUnidadesGerenciadas($usuarioId)->pluck('id')->all();

        return $this->unidadeRepository->getSubordinadasRecursivas($gerendciadasIds)->pluck('id')->all();
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
