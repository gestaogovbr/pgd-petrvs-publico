<?php

namespace App\Services\Siape\Unidade;

use App\Exceptions\ServerException;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\Unidade\Enum\Atribuicao as EnumAtribuicao;
use Exception;
use Illuminate\Support\Facades\Log;

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
                $this->lotaServidor(EnumAtribuicao::COLABORADOR, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR->value:
                $this->processaGestor($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_SUBSTITUTO->value:
                $this->processaGestorSubstituto($integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_DELEGADO->value:
                $this->processaGestorDelegado($integranteNovoOuExistente);
                break;
            case EnumAtribuicao::LOTADO->value:
                $this->processaLotado($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            default:
                throw new Exception("Atribuição não encontrada!");
        }
        return $this->alteracoes;
    }

    private function processaGestorSubstituto(UnidadeIntegrante $integranteNovoOuExistente)
    {
        //FIXME não foram visto regras para gestor subsitituto.
        $this->lotaServidor(EnumAtribuicao::GESTOR_SUBSTITUTO, $integranteNovoOuExistente);
    }

    private function processaGestorDelegado(UnidadeIntegrante $integranteNovoOuExistente)
    {
        //FIXME não foram visto regras para gestor delegado.
        $this->lotaServidor(EnumAtribuicao::GESTOR_DELEGADO, $integranteNovoOuExistente);
    }

    private function processaLotado(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente): void
    {
        if (!empty($this->getUnidadeAtualDoUsuario($usuario)) && $this->getUnidadeAtualDoUsuario($usuario)->id == $unidadeDestino->id) {
            $this->alteracoes = ['info' => sprintf('O servidor  %s já está lotado nessa unidade %s:', $usuario->id, $unidadeDestino->id)];
            // Log::channel('siape')->info('O servidor já está lotado nessa unidade!: ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
            return;
        }

        $this->removeLotacao($usuario);
        if ($this->usuarioTemPlanodeTrabalhoAtivo($usuario)) {
            $this->alteracoes = ['lotacao' => sprintf('O servidor %s já possui um plano de trabalho ativo nessa unidade %s, alterando a lotação para COLABORADOR:', $usuario->id, $unidadeDestino->id)];
            // Log::channel('siape')->info('O servidor já possui um plano de trabalho ativo nessa unidade!: ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
            $colaborador = EnumAtribuicao::COLABORADOR;
            $this->lotaServidor($colaborador, $integranteNovoOuExistente);
        }
        // Log::channel('siape')->info('Lotando servidor na unidade: ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
        $this->alteracoes = ['lotacao' => sprintf('Lotando o servidor %s na Unidade %s', $usuario->id, $unidadeDestino->id)];
        $this->lotaServidor(EnumAtribuicao::LOTADO, $integranteNovoOuExistente);
    }

    private function processaGestor(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente): void
    {
        if (!empty($this->getGestorAtualDaUnidade($unidadeDestino)) && $this->getGestorAtualDaUnidade($unidadeDestino)->id != $usuario->id) {
            $this->alteracoes = ['removido' => sprintf('Removendo o Gestor %s da Unidade %s',$usuario->id, $unidadeDestino->id)];
            // Log::channel('siape')->info('Removendo o Gestor da Unidade : ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
            $this->removeAtualGestorDaUnidade($unidadeDestino);
        }

        if (!empty($this->getGestorAtualDaUnidade($unidadeDestino)) && $this->getGestorAtualDaUnidade($unidadeDestino)->id == $usuario->id) {
            $this->alteracoes = ['info' => sprintf('Já é gestor %s da unidade %s',$usuario->id, $unidadeDestino->id)];
            // Log::channel('siape')->info('Já é gestor da unidade: ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
            return;
        }

        if ($this->usuarioEGestorEmOutraUnidade($usuario, $unidadeDestino)) {
            $this->alteracoes = ['removido' => sprintf('Removendo o Gestor %s de outra Unidade %s', $usuario->id, $unidadeDestino->id)];
            // Log::channel('siape')->info(' Removendo Usuario da Gestão da Unidade : ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
            $this->removeUsuarioDaGestaoAtual($usuario);
        }


        $this->removeLotacao($usuario);
        $usuario = Usuario::find($usuario->id);
        $this->processaLotado($unidadeDestino, $usuario, $integranteNovoOuExistente);

        // Log::channel('siape')->info('Lotando gestor na unidade: ', ['usuario' => $usuario->id, 'unidade' => $unidadeDestino->id]);
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

    private function removeAtualGestorDaUnidade(Unidade $unidade): void
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
        return $usuario->lotacao ? $usuario->lotacao->unidade : null;;
    }

    private function usuarioTemPlanodeTrabalhoAtivo(Usuario $usuario): bool
    {
        return $usuario->planosTrabalho()->where('status', 'ATIVO')->exists();
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
            // Log::channel('siape')->info(' Limpando todas as atribuições : ', ['usuario' => $integranteNovoOuExistente->toJson()]);
            $integranteNovoOuExistente->deleteCascade();
            return;
        }
        // Log::channel('siape')->info(' Limpando as atribuições menos a lotado: ', ['usuario' => $integranteNovoOuExistente->toJson()]);
        $integranteNovoOuExistente->atribuicoes()->each(function ($atribuicao) {
            $atribuicao->delete();
        });
        return;
    }

    //todo modificar isso aqui para um função de limpar as atribuições indevidas.
    private function validarAtribuicoes(array $atribuicoes, string $nome = null): void
    {
        if (count(array_intersect([EnumAtribuicao::GESTOR->value, EnumAtribuicao::GESTOR_SUBSTITUTO->value, EnumAtribuicao::GESTOR_DELEGADO->value], $atribuicoes)) > 1)
        {
            throw new ServerException("ValidateIntegrante", "A um mesmo servidor $nome só pode ser atribuída uma função de gestor, para uma mesma Unidade!");

        } 
    }
}
