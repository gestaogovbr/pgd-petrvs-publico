<?php

declare(strict_types=1);

namespace App\Services\Siape\Servidor;

use App\Enums\UsuarioSituacaoSiape;
use App\Facades\SiapeLog;
use App\Models\SiapeBlackListServidor;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorReadRepositoryContract;
use App\Repository\SiapeBlackListServidor\Contracts\SiapeBlackListServidorWriteRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use App\Services\NivelAcessoService;
use Illuminate\Support\Facades\DB;

final class SiapeServidorBlacklistLifecycleService
{
    public function __construct(
        private readonly SiapeBlackListServidorReadRepositoryContract $blacklistReadRepository,
        private readonly SiapeBlackListServidorWriteRepositoryContract $blacklistWriteRepository,
        private readonly UsuarioReadRepositoryContract $usuarioReadRepository,
        private readonly UsuarioWriteRepositoryContract $usuarioWriteRepository,
    ) {
    }

    public function registrarAusenciaFuncional(string $cpf, string $response): int
    {
        return DB::transaction(function () use ($cpf, $response): int {
            $blacklists = $this->blacklistReadRepository->findAllByCpfForUpdate($cpf);

            if ($blacklists->contains(static fn (SiapeBlackListServidor $item): bool => $item->matricula === null)) {
                return 0;
            }

            $matriculasExistentes = $blacklists
                ->pluck('matricula')
                ->filter()
                ->map(static fn (mixed $matricula): string => (string) $matricula)
                ->all();
            $matriculasElegiveis = $this->usuarioReadRepository->matriculasElegiveisParaBlacklistSiape($cpf);
            $criadas = 0;

            if ($matriculasElegiveis === [] && $blacklists->isEmpty()) {
                $this->blacklistWriteRepository->firstOrCreate($cpf, null, $response);
                return 1;
            }

            foreach ($matriculasElegiveis as $matricula) {
                if (in_array($matricula, $matriculasExistentes, true)) {
                    continue;
                }

                $this->blacklistWriteRepository->firstOrCreate($cpf, $matricula, $response);
                $criadas++;
            }

            return $criadas;
        });
    }

    /** @return array{removidas: int, usuarios_reativados: int} */
    public function removerManualmentePorCpf(string $cpf): array
    {
        return DB::transaction(function () use ($cpf): array {
            $blacklists = $this->blacklistReadRepository->findAllByCpfForUpdate($cpf);
            $matriculas = $this->usuarioReadRepository->findComMatriculaByCpf($cpf)
                ->pluck('matricula')
                ->filter()
                ->map(static fn (mixed $matricula): string => (string) $matricula)
                ->values()
                ->all();
            $removidas = 0;

            foreach ($blacklists as $blacklist) {
                $removidas += $this->blacklistWriteRepository->forceDelete((string) $blacklist->id) ? 1 : 0;
            }

            return [
                'removidas' => $removidas,
                'usuarios_reativados' => $this->usuarioWriteRepository->reativarPorCpfEMatriculas($cpf, $matriculas, null, null),
            ];
        });
    }

    /**
     * @param list<string> $matriculasAtivas
     * @return array{blacklists_criadas: int, blacklists_removidas: int, usuarios_reativados: int}
     */
    public function reconciliarRetornoFuncional(string $cpf, array $matriculasAtivas, string $response): array
    {
        return DB::transaction(function () use ($cpf, $matriculasAtivas, $response): array {
            $resultado = [
                'blacklists_criadas' => 0,
                'blacklists_removidas' => 0,
                'usuarios_reativados' => 0,
            ];
            $blacklists = $this->blacklistReadRepository->findAllByCpfForUpdate($cpf);
            $blacklistDefinitivaGeral = $blacklists->contains(
                static fn (SiapeBlackListServidor $item): bool => $item->matricula === null && (bool) $item->inativado
            );

            if ($blacklistDefinitivaGeral) {
                return $resultado;
            }

            $matriculasDefinitivas = $blacklists
                ->filter(static fn (SiapeBlackListServidor $item): bool => $item->matricula !== null && (bool) $item->inativado)
                ->pluck('matricula')
                ->map(static fn (mixed $matricula): string => (string) $matricula)
                ->all();
            $matriculasParaReativar = [];

            foreach ($blacklists as $blacklist) {
                $matricula = $blacklist->matricula === null ? null : (string) $blacklist->matricula;
                $retornou = $matricula === null
                    ? $matriculasAtivas !== []
                    : in_array($matricula, $matriculasAtivas, true);

                if ((bool) $blacklist->inativado || !$retornou) {
                    continue;
                }

                if ($this->blacklistWriteRepository->forceDelete((string) $blacklist->id)) {
                    $resultado['blacklists_removidas']++;
                    if ($matricula === null) {
                        $matriculasParaReativar = array_merge($matriculasParaReativar, $matriculasAtivas);
                    } else {
                        $matriculasParaReativar[] = $matricula;
                    }
                }
            }

            $usuarios = $this->usuarioReadRepository->findComMatriculaByCpf($cpf);
            foreach ($usuarios as $usuario) {
                $matricula = (string) $usuario->matricula;
                if (in_array($matricula, $matriculasAtivas, true)) {
                    continue;
                }

                if (
                    in_array($matricula, $matriculasDefinitivas, true)
                    || in_array($usuario->situacao_siape, [UsuarioSituacaoSiape::INATIVO->value, UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value], true)
                    || $blacklists->contains(static fn (SiapeBlackListServidor $item): bool => (string) $item->matricula === $matricula)
                ) {
                    continue;
                }

                $this->blacklistWriteRepository->firstOrCreate($cpf, $matricula, $response);
                $resultado['blacklists_criadas']++;
            }

            $matriculasParaReativar = array_values(array_unique(array_filter(
                $matriculasParaReativar,
                static fn (string $matricula): bool => !in_array($matricula, $matriculasDefinitivas, true)
            )));
            $perfilConsulta = NivelAcessoService::getPerfilConsulta();
            $perfilParticipante = NivelAcessoService::getPerfilParticipante();
            $resultado['usuarios_reativados'] = $this->usuarioWriteRepository->reativarPorCpfEMatriculas(
                $cpf,
                $matriculasParaReativar,
                $perfilConsulta?->id,
                $perfilParticipante?->id,
            );

            if ($resultado['blacklists_criadas'] > 0 || $resultado['blacklists_removidas'] > 0 || $resultado['usuarios_reativados'] > 0) {
                SiapeLog::info('Lifecycle SIAPE servidor reconciliado por dados funcionais', [
                    'cpf_final' => substr($cpf, -4),
                    ...$resultado,
                ]);
            }

            return $resultado;
        });
    }
}
