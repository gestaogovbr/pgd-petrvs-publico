<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioExcelPaginadoExport;
use App\Exports\RelatorioExcelPaginadoWriter;
use App\Jobs\ExcluirRelatorioGeracaoJob;
use App\Jobs\ExpirarRelatorioGeracaoJob;
use App\Jobs\GerarRelatorioExcelJob;
use App\Models\Usuario;
use App\Repository\RelatorioGeracaoRepository;
use App\Services\RelatorioGeracao\RelatorioExcelGeradorFactory;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStatusQueryDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class RelatorioGeracaoService
{
    public function __construct(
        private readonly RelatorioGeracaoRepository $repository,
        private readonly RelatorioExcelGeradorFactory $geradorFactory,
        private readonly RelatorioExcelPaginadoWriter $excelWriter,
    ) {
    }

    /**
     * @return LengthAwarePaginator<RelatorioGeracaoRowDTO>
     */
    public function index(RelatorioGeracaoIndexDTO $dto, Usuario $usuario, Request $httpRequest): LengthAwarePaginator
    {
        $paginator = $this->repository->paginateForUsuario((string) $usuario->id, $dto);

        $rows = [];
        foreach ($paginator->items() as $row) {
            $rows[] = RelatorioGeracaoRowDTO::fromModel($row);
        }

        return new LengthAwarePaginator(
            $rows,
            $paginator->total(),
            $paginator->perPage(),
            $paginator->currentPage(),
            ['path' => $httpRequest->url(), 'query' => $httpRequest->query()],
        );
    }

    /**
     * @return list<RelatorioGeracaoRowDTO>
     */
    public function statusPorIds(RelatorioGeracaoStatusQueryDTO $dto, Usuario $usuario): array
    {
        $geracoes = $this->repository->findByIdsForUsuario($dto->ids, (string) $usuario->id);

        $rows = [];
        foreach ($geracoes as $geracao) {
            $rows[] = RelatorioGeracaoRowDTO::fromModel($geracao);
        }

        return $rows;
    }

    public function store(RelatorioGeracaoStoreDTO $dto, Usuario $usuario): RelatorioGeracaoRowDTO
    {
        $tenantId = $this->requireTenantId();
        $parametros = $dto->toParametros();

        $geracao = $this->repository->create([
            'tipo' => $dto->tipo->value,
            'nome' => $dto->tipo->nome(),
            'status' => RelatorioGeracaoStatus::PROCESSANDO,
            'usuario_id' => $usuario->id,
            'parametros' => [
                'where' => $parametros['where'],
                'orderBy' => $parametros['orderBy'],
            ],
            'iniciado_em' => now(),
            'progresso_pagina' => 0,
            'progresso_total' => null,
        ]);

        GerarRelatorioExcelJob::dispatch($geracao->id, $tenantId);

        return RelatorioGeracaoRowDTO::fromModel($geracao);
    }

    public function processar(string $geracaoId): void
    {
        $geracao = $this->repository->find($geracaoId);
        if ($geracao === null) {
            Log::warning('Geração de relatório não encontrada', ['geracaoId' => $geracaoId]);
            return;
        }

        $path = null;

        try {
            $tipo = RelatorioGeracaoTipo::from((string) $geracao->tipo);
            $gerador = $this->geradorFactory->make($tipo);
            $path = 'relatorios/' . $geracao->id . '.xlsx';

            Storage::disk('local')->makeDirectory('relatorios');

            $export = new RelatorioExcelPaginadoExport(
                $gerador->criarExport(),
                fn (int $page, int $limit): array => $gerador->consultarPagina($geracao->parametros ?? [], $page, $limit),
                $gerador->pageSize(),
                function (int $processadas, ?int $total) use ($geracao): void {
                    $this->repository->update((string) $geracao->id, [
                        'progresso_pagina' => $processadas,
                        'progresso_total' => $total,
                    ]);
                }
            );

            $this->excelWriter->store($export, Storage::disk('local')->path($path));
            unset($export);

            $this->repository->update((string) $geracao->id, [
                'status' => RelatorioGeracaoStatus::CONCLUIDA,
                'arquivo_path' => $path,
                'arquivo_nome' => $gerador->arquivoNome(),
                'finalizado_em' => now(),
                'erro_mensagem' => null,
            ]);
        } catch (Throwable $e) {
            if ($path !== null && Storage::disk('local')->exists($path)) {
                Storage::disk('local')->delete($path);
            }

            $this->repository->update((string) $geracao->id, [
                'status' => RelatorioGeracaoStatus::ERRO,
                'finalizado_em' => now(),
                'erro_mensagem' => GerarRelatorioExcelJob::mensagemErro($e),
            ]);

            Log::error('Erro ao gerar relatório Excel', [
                'geracaoId' => $geracaoId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    public function download(string $id, Usuario $usuario): StreamedResponse
    {
        $geracao = $this->repository->findForUsuario($id, (string) $usuario->id);
        if ($geracao === null) {
            throw new NotFoundException('Geração de relatório não encontrada.');
        }

        if ($geracao->status !== RelatorioGeracaoStatus::CONCLUIDA || empty($geracao->arquivo_path)) {
            throw new ServerException('RelatorioGeracao', 'O relatório ainda não está disponível para download.');
        }

        if (! Storage::disk('local')->exists($geracao->arquivo_path)) {
            throw new NotFoundException('Arquivo não encontrado.');
        }

        return Storage::disk('local')->download(
            $geracao->arquivo_path,
            $geracao->arquivo_nome ?: 'relatorio.xlsx'
        );
    }

    public function marcarErro(string $geracaoId, ?string $mensagem): void
    {
        $this->repository->marcarErroSeProcessando($geracaoId, $mensagem);
    }

    public function expirarGeracoesTravadas(): int
    {
        return $this->repository->marcarExpiradas(
            ExpirarRelatorioGeracaoJob::LIMITE_MINUTOS,
            ExpirarRelatorioGeracaoJob::MENSAGEM_ERRO,
        );
    }

    public function excluirGeracoesAntigas(): int
    {
        $geracoes = $this->repository->findAntigas(ExcluirRelatorioGeracaoJob::RETENCAO_HORAS);
        $excluidas = 0;

        foreach ($geracoes as $geracao) {
            $this->apagarArquivoGeracao((string) $geracao->id, $geracao->arquivo_path);
            $this->repository->forceDelete((string) $geracao->id);
            $excluidas++;
        }

        return $excluidas;
    }

    private function apagarArquivoGeracao(string $geracaoId, mixed $arquivoPath): void
    {
        $paths = array_unique(array_filter([
            is_string($arquivoPath) && $arquivoPath !== '' ? $arquivoPath : null,
            'relatorios/' . $geracaoId . '.xlsx',
        ]));

        foreach ($paths as $path) {
            if (Storage::disk('local')->exists($path)) {
                Storage::disk('local')->delete($path);
            }
        }
    }

    private function requireTenantId(): string
    {
        $tenantId = (string) tenant('id');
        if ($tenantId === '') {
            throw new ServerException('RelatorioGeracao', 'Tenant não identificado para a geração do relatório.');
        }

        return $tenantId;
    }
}
