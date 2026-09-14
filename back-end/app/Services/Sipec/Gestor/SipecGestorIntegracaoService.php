<?php

declare(strict_types=1);

namespace App\Services\Sipec\Gestor;

use App\DTOs\Sipec\UnidadeChefiasDTO;
use App\Enums\Atribuicao;
use App\Facades\SipecLog;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UsuarioRepository;
use App\Services\CodigoOrgaoService;
use App\Services\NivelAcessoService;
use App\Services\UnidadeIntegranteService;
use Illuminate\Support\Facades\DB;

/**
 * Sincroniza titulares de chefia nas unidades,
 * baseando-se nos CPFs vindos de integracao_unidades.
 */
class SipecGestorIntegracaoService
{
    public function __construct(
        private readonly IntegracaoUnidadeRepository $integracaoUnidadeRepository,
        private readonly IntegracaoServidorRepository $integracaoServidorRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly UnidadeIntegranteService $unidadeIntegranteService,
        private readonly UnidadeIntegranteRepository $unidadeIntegranteRepository,
        private readonly UnidadeIntegranteAtribuicaoRepository $unidadeIntegranteAtribuicaoRepository,
        private readonly NivelAcessoService $nivelAcessoService,
    ) {
    }

    /**
     * @return array{titulares_atualizados: int, titulares_removidos: int, ignorados: int, erros: int}
     */
    public function processar(): array
    {
        $contadores = [
            'titulares_atualizados' => 0,
            'titulares_removidos' => 0,
            'ignorados' => 0,
            'erros' => 0,
        ];

        $unidades = $this->integracaoUnidadeRepository->getUnidadesComChefiasCompleto();

        foreach ($unidades as $row) {
            $dto = UnidadeChefiasDTO::fromStdClass($row);

            DB::beginTransaction();
            try {
                $this->sincronizarTitular($dto, $contadores);
                DB::commit();
            } catch (\Throwable $e) {
                DB::rollBack();
                $contadores['erros']++;
                report($e);
                SipecLog::error('SIPEC Gestor: erro ao sincronizar chefia', [
                    'unidade_id' => $dto->unidadeId,
                    'codigo' => $dto->codigoUnidade,
                    'erro' => $e->getMessage(),
                ]);
            }
        }

        SipecLog::info('SIPEC Gestor: sincronização concluída', $contadores);

        return $contadores;
    }

    private function sincronizarTitular(UnidadeChefiasDTO $dto, array &$contadores): void
    {
        if (!$dto->hasTitular()) {
            $this->revogarGestorDaUnidade($dto->unidadeId);
            $contadores['titulares_removidos']++;
            return;
        }

        $novoTitular = $this->encontrarServidorComoUsuario($dto->cpfTitular, $dto->codigoUnidade);

        if (!$novoTitular) {
            $contadores['ignorados']++;
            return;
        }

        if ($this->jaETitularDaUnidade($novoTitular, $dto->unidadeId)) {
            return;
        }

        if ($this->estaLotadoEmOutraUnidade($novoTitular, $dto->unidadeId)) {
            SipecLog::info('SIPEC Gestor: servidor lotado em outra unidade, não será atribuído como gestor', [
                'usuario_id' => $novoTitular->id,
                'unidade_destino' => $dto->unidadeId,
            ]);
            $contadores['ignorados']++;
            return;
        }

        $this->transferirTitularidade($novoTitular, $dto->unidadeId);
        $this->promoverPerfilParaChefia($novoTitular);
        $contadores['titulares_atualizados']++;
    }

    /**
     * Transfere a titularidade de uma unidade para o novo usuario:
     * - Revoga o titular anterior da unidade
     * - Revoga gestões deste usuario em outras unidades (exceto informais)
     * - Atribui LOTADO + GESTOR (preservando demais atribuições, removendo incompatíveis)
     * - Remove GESTOR_SUBSTITUTO deste usuario na unidade
     */
    private function transferirTitularidade(Usuario $novoTitular, string $unidadeId): void
    {
        $this->revogarGestorDaUnidade($unidadeId);
        $this->unidadeIntegranteAtribuicaoRepository->deleteGestorByUsuario($novoTitular->id);

        $atribuicoes = $this->montarAtribuicoesTitular($novoTitular, $unidadeId);
        $this->salvarAtribuicoes($novoTitular->id, $unidadeId, $atribuicoes);

        $this->revogarAtribuicao($novoTitular->id, $unidadeId, Atribuicao::GESTOR_SUBSTITUTO);
    }

    /**
     * Monta a lista de atribuições para o titular:
     * preserva existentes, remove incompatíveis, garante LOTADO + GESTOR.
     */
    private function montarAtribuicoesTitular(Usuario $usuario, string $unidadeId): array
    {
        $atuais = $this->usuarioRepository->getAtribuicoes($usuario->id, $unidadeId);

        $incompativeis = [Atribuicao::DELEGADO->value, Atribuicao::GESTOR_SUBSTITUTO->value];
        $obrigatorias = [Atribuicao::LOTADO->value, Atribuicao::GESTOR->value];

        $resultado = array_diff($atuais, $incompativeis);
        $resultado = array_merge($resultado, $obrigatorias);

        return array_values(array_unique($resultado));
    }

    // -------------------------------------------------------------------------
    // Consultas
    // -------------------------------------------------------------------------

    private function encontrarServidorComoUsuario(?string $cpf, ?string $codigoUnidade): ?Usuario
    {
        if (empty($cpf) || empty($codigoUnidade)) {
            return null;
        }

        $servidor = $this->integracaoServidorRepository->findByCpfAndCodigoExercicio(
            $cpf,
            $codigoUnidade,
            CodigoOrgaoService::atual(),
        );

        if (!$servidor) {
            SipecLog::warning('SIPEC Gestor: servidor não encontrado em integracao_servidores', [
                'cpf' => $cpf, 'codigo_unidade' => $codigoUnidade,
            ]);
            return null;
        }

        $usuario = !empty($servidor->matriculasiape)
            ? $this->usuarioRepository->findByMatricula($servidor->matriculasiape)
            : $this->usuarioRepository->findByCpf($cpf);

        if (!$usuario) {
            SipecLog::warning('SIPEC Gestor: usuario não encontrado', [
                'cpf' => $cpf, 'matricula' => $servidor->matriculasiape,
            ]);
        }

        return $usuario;
    }

    private function jaETitularDaUnidade(Usuario $usuario, string $unidadeId): bool
    {
        return $this->usuarioRepository->isIntegrante($usuario->id, $unidadeId, Atribuicao::GESTOR->value);
    }

    /**
     * Verifica se o usuario está lotado em uma unidade diferente da destino.
     * Lotação em unidade informal não conta (times volantes podem ter gestor externo).
     */
    private function estaLotadoEmOutraUnidade(Usuario $usuario, string $unidadeId): bool
    {
        /** @var \App\Models\UnidadeIntegrante|null $lotacaoAtual */
        $lotacaoAtual = $this->unidadeIntegranteRepository->findAllLotacoesByUsuario($usuario->id)->first();

        if (!$lotacaoAtual) {
            return false;
        }

        if ($lotacaoAtual->unidade_id === $unidadeId) {
            return false;
        }

        // Lotação em unidade informal não impede atribuição de gestor em outra unidade
        if (!empty($lotacaoAtual->unidade?->informal)) {
            return false;
        }

        return true;
    }

    // -------------------------------------------------------------------------
    // Escrita
    // -------------------------------------------------------------------------

    private function salvarAtribuicoes(string $usuarioId, string $unidadeId, array $atribuicoes): void
    {
        $this->unidadeIntegranteService->salvarIntegrantes([[
            'usuario_id' => $usuarioId,
            'unidade_id' => $unidadeId,
            'atribuicoes' => $atribuicoes,
        ]], false, true);
    }

    // -------------------------------------------------------------------------
    // Revogações
    // -------------------------------------------------------------------------

    private function revogarGestorDaUnidade(string $unidadeId): void
    {
        $gestorAtual = $this->unidadeIntegranteRepository->findGestorByUnidade($unidadeId);

        if (!$gestorAtual?->gestor) {
            return;
        }

        $this->unidadeIntegranteAtribuicaoRepository->delete($gestorAtual->gestor->id);
        SipecLog::info('SIPEC Gestor: titular anterior revogado', [
            'unidade_id' => $unidadeId,
            'usuario_id' => $gestorAtual->usuario_id,
        ]);
    }

    private function revogarAtribuicao(string $usuarioId, string $unidadeId, Atribuicao $atribuicao): void
    {
        $integrante = $this->unidadeIntegranteRepository->findUnidadeIntegrante($usuarioId, $unidadeId);

        $registro = $integrante?->gestores()
            ->where('atribuicao', $atribuicao->value)
            ->first();

        if ($registro) {
            $this->unidadeIntegranteAtribuicaoRepository->delete($registro->id);
        }
    }

    // -------------------------------------------------------------------------
    // Perfil
    // -------------------------------------------------------------------------

    private function promoverPerfilParaChefia(Usuario $usuario): void
    {
        $perfilChefia = $this->nivelAcessoService::getPerfilChefia();

        if (!$perfilChefia) {
            return;
        }

        if ($this->possuiPerfilProtegido($usuario)) {
            return;
        }

        $this->usuarioRepository->update($usuario->id, ['perfil_id' => $perfilChefia->id]);
    }

    private function possuiPerfilProtegido(Usuario $usuario): bool
    {
        $protegidos = array_filter([
            $this->nivelAcessoService::getPerfilAdministrador()?->id,
            $this->nivelAcessoService::getPerfilDesenvolvedor()?->id,
            $this->nivelAcessoService::getPerfilAdministradorGeral()?->id,
        ]);

        return in_array($usuario->perfil_id, $protegidos);
    }
}
