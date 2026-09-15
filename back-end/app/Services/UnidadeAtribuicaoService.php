<?php

namespace App\Services;

use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Services\Siape\Unidade\Enum\Atribuicao;

class UnidadeAtribuicaoService
{
    public function __construct(
        private readonly UnidadeIntegranteRepository $unidadeIntegranteRepository,
        private readonly UnidadeIntegranteAtribuicaoRepository $unidadeIntegranteAtribuicaoRepository,
    ) {
    }

    public function garantirAtribuicao(UnidadeIntegrante $integrante, Atribuicao $atribuicao): UnidadeIntegranteAtribuicao
    {
        return $this->unidadeIntegranteAtribuicaoRepository->findOrCreateIncludingDeleted(
            $integrante->id,
            $atribuicao->value
        );
    }

    public function transferirLotacao(Usuario $usuario, UnidadeIntegrante $integranteDestino): void
    {
        $this->removerLotacoesAnterioresPreservandoVinculo($usuario, $integranteDestino);
        $this->garantirAtribuicao($integranteDestino, Atribuicao::LOTADO);
    }

    public function removerLotacoesAnterioresPreservandoVinculo(
        Usuario $usuario,
        UnidadeIntegrante $integranteDestino
    ): void {
        $lotacoes = $this->unidadeIntegranteRepository->findAllLotacoesByUsuario($usuario->id);

        foreach ($lotacoes as $lotacaoAtual) {
            /** @var UnidadeIntegrante $lotacaoAtual */
            if ($lotacaoAtual->id === $integranteDestino->id) {
                continue;
            }

            $this->garantirAtribuicao($lotacaoAtual, Atribuicao::COLABORADOR);

            if ($lotacaoAtual->lotado instanceof UnidadeIntegranteAtribuicao) {
                $this->unidadeIntegranteAtribuicaoRepository->delete($lotacaoAtual->lotado->id);
            }
        }
    }
}
