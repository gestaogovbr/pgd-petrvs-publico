<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use App\Services\Siape\Servidor\SiapeServidorBlacklistLifecycleService;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class SiapeBlackListServidorService extends ServiceBase
{
    public function __construct(
        private readonly SiapeBlackListServidorReadRepositoryContract $blacklistReadRepository,
        private readonly SiapeBlackListServidorWriteRepositoryContract $blacklistWriteRepository,
        private readonly UsuarioReadRepositoryContract $usuarioReadRepository,
        private readonly UsuarioWriteRepositoryContract $usuarioWriteRepository,
        private readonly SiapeServidorBlacklistLifecycleService $lifecycleService,
    ) {
        parent::__construct();
    }

    public function proxyQuery(Builder $query, array $data): void
    {
        $this->blacklistReadRepository->applyUsuarioGridJoin($query);
    }

    public function remover(string $cpf): array
    {
        try {
            $registros = $this->blacklistReadRepository->findAllByCpf($cpf);
            
            if ($registros->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'CPF não encontrado na blacklist',
                    'count' => 0
                ];
            }
            
            $count = $registros->count();
            
            $resultado = $this->lifecycleService->removerManualmentePorCpf($cpf);
            
            return [
                'success' => true,
                'message' => "CPF removido da blacklist com sucesso. {$count} registro(s) removido(s).",
                'count' => $resultado['removidas']
            ];
        } catch (Exception $e) {
            report($e);
            throw new Exception('Erro ao remover CPF da blacklist: ' . $e->getMessage());
        }
    }
    /**
     * Adiciona matrícula à blacklist se ainda não existir.
     */
    public function adicionar(string $cpf, ?string $matricula, string $motivo = 'Adicionado automaticamente via integração'): void
    {
        if (empty($matricula)) {
            return;
        }

        if ($this->blacklistReadRepository->exists($cpf, $matricula)) {
            return;
        }

        $this->blacklistWriteRepository->firstOrCreate($cpf, $matricula, $motivo);
        SiapeLog::info('Usuário adicionado à blacklist', [
            'cpf_final' => substr($cpf, -4),
            'matricula' => $matricula,
        ]);
    }

    /**
     * Verifica se o usuário está na blacklist e o reativa se necessário.
     * Retorna true se encontrou e removeu registro.
     */
    public function verificarERemover(string $cpf, ?string $matricula = null): bool
    {
        return DB::transaction(function () use ($cpf, $matricula): bool {
            $registro = $this->blacklistReadRepository->findByCpfAndOptionalMatricula($cpf, $matricula);

            if (!$registro) {
                return false;
            }

            if ((bool) $registro->inativado) {
                $matriculas = $matricula === null
                    ? $this->usuarioReadRepository->findComMatriculaByCpf($cpf)
                        ->pluck('matricula')
                        ->filter()
                        ->map(static fn (mixed $valor): string => (string) $valor)
                        ->values()
                        ->all()
                    : [$matricula];

                $this->usuarioWriteRepository->reativarPorCpfEMatriculas($cpf, $matriculas, null, null);
            }

            $this->blacklistWriteRepository->forceDelete((string) $registro->id);
            SiapeLog::info('Registro removido da blacklist', [
                'cpf_final' => substr($cpf, -4),
                'matricula' => $matricula,
            ]);

            return true;
        });
    }
}
