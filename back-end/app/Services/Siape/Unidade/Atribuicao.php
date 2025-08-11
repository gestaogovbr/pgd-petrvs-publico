<?php

namespace App\Services\Siape\Unidade;

use App\Exceptions\NotFoundException;
use App\Facades\SiapeLog;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\Unidade\Enum\Atribuicao as EnumAtribuicao;

trait Atribuicao
{
    private array $alteracoes = [];

    function executarAcao(string $atribuicao, Usuario $usuario, Unidade $unidadeDestino, UnidadeIntegrante $integranteNovoOuExistente): array
    {
        $this->alteracoes = [];
        switch ($atribuicao) {
            case EnumAtribuicao::AVALIADOR_PLANO_ENTREGA->value:
                //@deprecated função não utilizada
                break;
            case EnumAtribuicao::AVALIADOR_PLANO_TRABALHO->value:
                //@deprecated função não utilizada
                break;
            case EnumAtribuicao::HOMOLOGADOR_PLANO_ENTREGA->value:
                //@deprecated função não utilizada
                break;
            case EnumAtribuicao::COLABORADOR->value:
                $this->processaColaborador($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR->value:
                $this->processaGestor($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_SUBSTITUTO->value:
                $this->processaGestorSubstituto($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_DELEGADO->value:
                $this->processaGestorDelegado($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::LOTADO->value:
                $this->processaLotado($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::CURADOR->value:
                $this->processaCurador($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            default:
                throw new NotFoundException("Atribuição não encontrada!");
        }
        return $this->alteracoes;
    }

    private function processaCurador(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente)
    {
         /**
         * @var UnidadeIntegrante|null[] $curadores
         */
        $curadores = $usuario->curadores;
        foreach ($curadores as $curador) {
            if ($curador->unidade_id != $unidadeDestino->id) continue;
            if ($curador->usuario_id == $usuario->id) {
                $this->alteracoes = ['info' => sprintf('O servidor já é curador da unidade!', $usuario->id, $unidadeDestino->id)];
                return;
            }
        }

        //FIXME não foram visto regras para curador.
        $this->lotaServidor(EnumAtribuicao::CURADOR, $integranteNovoOuExistente);
    }

    private function processaColaborador(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente)
    {
        /**
         * @var UnidadeIntegrante|null[] $colaboracoes
         */
        $colaboracoes = $usuario->colaboracoes;

        foreach ($colaboracoes as $colaboracao) {
            if ($colaboracao->unidade_id != $unidadeDestino->id) continue;
            if ($colaboracao->usuario_id == $usuario->id) {
                $this->alteracoes = ['info' => sprintf('O servidor já é colaborador da unidade!', $usuario->id, $unidadeDestino->id)];
                return;
            }
        }

        $this->alteracoes = ['lotacao' => sprintf('Atribuindo Colaborador ao servidor %s na Unidade %s', $usuario->id, $unidadeDestino->id)];
        $this->lotaServidor(EnumAtribuicao::COLABORADOR, $integranteNovoOuExistente);
    }

    private function processaGestorSubstituto(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente)
    {
        /**
         * @var UnidadeIntegrante|null $lotacoes
         */
        $lotacoes = $usuario->gerenciasSubstitutas;

        foreach ($lotacoes as $lotacao) {
            if ($lotacao->unidade_id != $unidadeDestino->id) continue;

            if (!empty($integranteNovoOuExistente->gestorSubstituto) && $lotacao->gestorSubstituto->id == $integranteNovoOuExistente->gestorSubstituto->id) {
                $this->alteracoes = ['info' => sprintf('O servidor já é gestor substituto da unidade!', $usuario->id, $unidadeDestino->id)];
                return;
            }
        }
        $this->lotaServidor(EnumAtribuicao::GESTOR_SUBSTITUTO, $integranteNovoOuExistente);
    }

    private function processaGestorDelegado(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente)
    {
        /**
         * @var UnidadeIntegrante|null $lotacoes
         */
        $lotacoes = $usuario->gerenciasDelegadas;

        foreach ($lotacoes as $lotacao) {
            if ($lotacao->unidade_id != $unidadeDestino->id) continue;

            if (!empty($integranteNovoOuExistente->gestorDelegado) && $lotacao->gestorDelegado->id == $integranteNovoOuExistente->gestorDelegado->id) {
                $this->alteracoes = ['info' => sprintf('O servidor já é gestor delegado da unidade!', $usuario->id, $unidadeDestino->id)];
                return;
            }
        }
        $this->lotaServidor(EnumAtribuicao::GESTOR_DELEGADO, $integranteNovoOuExistente);
    }

    private function processaLotado(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente): void
    {
        if (!empty($this->getUnidadeAtualDoUsuario($usuario)) && $this->getUnidadeAtualDoUsuario($usuario)->id == $unidadeDestino->id) {
            $this->alteracoes = ['info' => sprintf('O servidor  %s já está lotado nessa unidade %s:', $usuario->id, $unidadeDestino->id)];
            return;
        }
        
        if ($this->usuarioTemPlanodeTrabalhoAtivo($usuario, $this->getUnidadeAtualDoUsuario($usuario))) {
            $this->alteracoes = ['lotacao' => sprintf('O servidor %s já possui um plano de trabalho ativo nessa unidade %s, alterando a lotação para COLABORADOR:', $usuario->id, $unidadeDestino->id)];
            $this->processaColaborador($unidadeDestino, $usuario,  $usuario->lotacao);
        }

        if ($this->usuarioEGestorEmOutraUnidade($usuario, $unidadeDestino)) {
            $this->alteracoes = ['removido' => sprintf('Removendo o Gestor %s de outra Unidade pois ele será lotado na unidade %s', $usuario->id, $unidadeDestino->id)];
            $this->removeUsuarioDaGestaoAtual($usuario);
        }

        $this->removeLotacao($usuario);
        $this->alteracoes = ['lotacao' => sprintf('Lotando o servidor %s na Unidade %s', $usuario->id, $unidadeDestino->id)];
        $this->lotaServidor(EnumAtribuicao::LOTADO, $integranteNovoOuExistente);
    }

    private function processaGestor(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente): void
    {
        if (!empty($this->getGestorAtualDaUnidade($unidadeDestino)) && $this->getGestorAtualDaUnidade($unidadeDestino)->id != $usuario->id) {
            $this->alteracoes = ['removido' => sprintf('Removendo o Gestor %s da Unidade %s', $usuario->id, $unidadeDestino->id)];
            $this->removeAtualGestorDaUnidade($unidadeDestino);
        }

         $usuario = Usuario::find($usuario->id);

        if(!is_null($this->getUnidadeAtualDoUsuario($usuario)) && $this->getUnidadeAtualDoUsuario($usuario)->id !== $unidadeDestino->id){
            $this->alteracoes = ['info' => sprintf('O servidor %s está lotado na unidade %s, nesse cenário ele não será lotado como gestor da unidade %s:', $usuario->id,$usuario->lotacao->unidade_id, $unidadeDestino->id)];
            // Nesse cenário, garente que o servidor não será lotado como gestor da unidade.
            $this->removeDeterminadasAtribuicoes([EnumAtribuicao::GESTOR->value], $integranteNovoOuExistente);
            return;
        }

        if (!empty($this->getGestorAtualDaUnidade($unidadeDestino)) && $this->getGestorAtualDaUnidade($unidadeDestino)->id == $usuario->id) {
            $this->alteracoes = ['info' => sprintf('Já é gestor %s da unidade %s', $usuario->id, $unidadeDestino->id)];
            return;
        }

        if ($this->usuarioEGestorEmOutraUnidade($usuario, $unidadeDestino)) {
            $this->alteracoes = ['removido' => sprintf('Removendo o Gestor %s de outra Unidade %s', $usuario->id, $unidadeDestino->id)];
            $this->removeUsuarioDaGestaoAtual($usuario);
        }

        $this->removeDeterminadasAtribuicoes([EnumAtribuicao::GESTOR_SUBSTITUTO->value, EnumAtribuicao::GESTOR_DELEGADO->value], $integranteNovoOuExistente);
        
        $this->removeTodasAsGestoesDoUsuario($usuario);
        
        $this->alteracoes = ['lotacao' => sprintf('Lotando o Gestor %s na Unidade %s', $usuario->id, $unidadeDestino->id)];
        
        $this->lotaServidor(EnumAtribuicao::GESTOR, $integranteNovoOuExistente);
    }

    private function removeTodasAsGestoesDoUsuario(Usuario $usuario): void
    {
        $usuario->gerencias->each(function (UnidadeIntegrante $gestao) {
            $gestao->gestores->each(function (UnidadeIntegranteAtribuicao $gestor) {
                if ($gestor->atribuicao == EnumAtribuicao::GESTOR->value) $gestor->delete();
            });
        });
    }

    private function removeUsuarioDaGestaoAtual(Usuario $usuario): void
    {
        $usuario->gerenciaTitular->gestor->delete();
    }

    private function usuarioEGestorEmOutraUnidade(Usuario $usuario, Unidade $unidade): bool
    {
        return !empty($this->getUnidadeOndeOUsuarioEGestor($usuario)) && $this->getUnidadeOndeOUsuarioEGestor($usuario)->id != $unidade->id && empty($unidade->informal) && empty($this->getUnidadeOndeOUsuarioEGestor($usuario)->informal);
    }

    public function removeAtualGestorDaUnidade(Unidade $unidade): void
    {
        if ($this->getGestorAtualDaUnidade($unidade)) {
            $unidade->gestor->gestor->delete();
        }
    }

    private function getUnidadeOndeOUsuarioEGestor(Usuario $usuario): Unidade|null
    {
        return $usuario->gerenciaTitular ? $usuario->gerenciaTitular->unidade : null;
    }

    private function getGestorAtualDaUnidade(Unidade $unidade): Usuario|null
    {
        return $unidade->gestor ? $unidade->gestor->usuario : null;
    }

    private function getUnidadeAtualDoUsuario(Usuario $usuario): Unidade|null
    {
        return $usuario->lotacao ? $usuario->lotacao->unidade : null;
    }

    public function usuarioTemPlanodeTrabalhoAtivo(Usuario $usuario, ?Unidade $unidade): bool
    {
        if($unidade == null) return false;
        
        return $usuario->planosTrabalho()
            ->where('unidade_id', $unidade->id)->exists();
    }

    private function lotaServidor(EnumAtribuicao $atribuicao, UnidadeIntegrante $unidadeIntegrante)
    {
        UnidadeIntegranteAtribuicao::create(["atribuicao" => $atribuicao->value, "unidade_integrante_id" => $unidadeIntegrante->id])->save();
    }

    private function removeLotacao(Usuario $usuario): void
    {
        $lotacoes = $usuario->lotacoes;
        foreach ($lotacoes as $lotacao) {
            if ($lotacao->lotado->atribuicao == EnumAtribuicao::LOTADO->value) $lotacao->lotado->delete();
        }
    }


    private function LimparAtribuicoes(UnidadeIntegrante $integranteNovoOuExistente, bool $removerLotado = false): void
    {
        if ($removerLotado) {
            $integranteNovoOuExistente->atribuicoes()->delete();
            return;
        }
        $integranteNovoOuExistente->atribuicoes()->each(function ($unidadeIntegrantesAtribuicoes) {
            if ($unidadeIntegrantesAtribuicoes->atribuicao != EnumAtribuicao::LOTADO->value)  $unidadeIntegrantesAtribuicoes->delete();
        });
        return;
    }

    private function decideALotacaoDeGestorInvalida(array &$atribuicoes, UnidadeIntegrante $integranteNovoOuExistente): void
    {

        if (!$this->validarAtribuicoes($atribuicoes)) {
            return;
        }
        $this->LimparAtribuicoes($integranteNovoOuExistente);
        $novasAtribuicoes = [];
        if (in_array(EnumAtribuicao::LOTADO->value, $atribuicoes)) {
            array_push($novasAtribuicoes, EnumAtribuicao::LOTADO->value);
        }
        if (in_array(EnumAtribuicao::COLABORADOR->value, $atribuicoes)) {
            array_push($novasAtribuicoes, EnumAtribuicao::COLABORADOR->value);
        }
        if (in_array(EnumAtribuicao::GESTOR->value, $atribuicoes)) {
            array_push($novasAtribuicoes, EnumAtribuicao::GESTOR->value);
            $atribuicoes = $novasAtribuicoes;
            return;
        }
        if (in_array(EnumAtribuicao::GESTOR_DELEGADO->value, $atribuicoes)) {
            array_push($novasAtribuicoes, EnumAtribuicao::GESTOR_DELEGADO->value);
            $atribuicoes = $novasAtribuicoes;
            return;
        }
        if (in_array(EnumAtribuicao::GESTOR_SUBSTITUTO->value, $atribuicoes)) {
            array_push($novasAtribuicoes, EnumAtribuicao::GESTOR_SUBSTITUTO->value);
            $atribuicoes = $novasAtribuicoes;
            return;
        }
    }

    private function validarAtribuicoes(array $atribuicoes): bool
    {
        return count(array_intersect([EnumAtribuicao::GESTOR->value, EnumAtribuicao::GESTOR_SUBSTITUTO->value, EnumAtribuicao::GESTOR_DELEGADO->value], $atribuicoes)) > 1;
    }

    public function removeDeterminadasAtribuicoes(array $atribuicoesRemover, UnidadeIntegrante $integranteNovoOuExistente): void
    {
        foreach ($integranteNovoOuExistente->atribuicoes as $atribuicao) {
            if (in_array($atribuicao->atribuicao, $atribuicoesRemover)) {
                SiapeLog::info(sprintf("Removendo atribuição %s da unidade %s do integrante %s", $atribuicao->atribuicao, $integranteNovoOuExistente->unidade_id, $integranteNovoOuExistente->usuario_id));
                $atribuicao->delete();
            }
        }
    }
}
