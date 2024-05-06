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

Trait Atribuicao
{
    function executarAcao(EnumAtribuicao $atribuicao, Usuario $usuario, Unidade $unidadeDestino, UnidadeIntegrante $integranteNovoOuExistente) : void{
        switch ($atribuicao) {
            case EnumAtribuicao::AVALIADOR_PLANO_ENTREGA:
                $this->lotaServidor(EnumAtribuicao::AVALIADOR_PLANO_ENTREGA, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::AVALIADOR_PLANO_TRABALHO:
                $this->lotaServidor(EnumAtribuicao::AVALIADOR_PLANO_TRABALHO, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::HOMOLOGADOR_PLANO_ENTREGA:
                $this->lotaServidor(EnumAtribuicao::HOMOLOGADOR_PLANO_ENTREGA, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::COLABORADOR:
                $this->lotaServidor(EnumAtribuicao::COLABORADOR, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR:
                $this->processaGestor($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_SUBSTITUTO:
                $this->processaGestorSubstituto($integranteNovoOuExistente);
                break;
            case EnumAtribuicao::GESTOR_DELEGADO:
                $this->processaGestorDelegado($integranteNovoOuExistente);
                break;
            case EnumAtribuicao::LOTADO:
                $this->processaLotado($unidadeDestino, $usuario, $integranteNovoOuExistente);
                break;
            default:
                throw new Exception("Atribuição não encontrada!");
            break;    
        }
    }

    private function processaGestorSubstituto(UnidadeIntegrante $integranteNovoOuExistente){
        //FIXME não foram visto regras para gestor subsitituto.
        $this->lotaServidor(EnumAtribuicao::GESTOR_SUBSTITUTO, $integranteNovoOuExistente);
    }

    private function processaGestorDelegado(UnidadeIntegrante $integranteNovoOuExistente){
        //FIXME não foram visto regras para gestor delegado.
        $this->lotaServidor(EnumAtribuicao::GESTOR_DELEGADO, $integranteNovoOuExistente);
    }

    private function processaLotado(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente) : void
    {
        if(!empty($this->getUnidadeAtualDoUsuario($usuario)) && $this->getUnidadeAtualDoUsuario($usuario)->id == $unidadeDestino->id){
            Log::channel('siape')->info('O servidor já está lotado nessa unidade!: ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
            return;
        }

        if($this->usuarioTemPlanodeTrabalhoAtivo($usuario)){
            Log::channel('siape')->info('O servidor já possui um plano de trabalho ativo nessa unidade!: ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
            //adicionar Log: "O servidor já possui um plano de trabalho ativo!"
            $this->removeUmaLotacao( $usuario);
            $this->lotaServidor(EnumAtribuicao::COLABORADOR, $$this->getUnidadeAtualDoUsuario($usuario)->id);
        }
        Log::channel('siape')->info('Lotando servidor na unidade: ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
        //Log: "O servidor foi lotado na unidade $unidadeDestino->nome"
        $this->lotaServidor(EnumAtribuicao::LOTADO, $integranteNovoOuExistente);

    }

    private function processaGestor(Unidade $unidadeDestino, Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente) : void
    {
        if(!empty($this->getGestorAtualDaUnidade($unidadeDestino)) && $this->getGestorAtualDaUnidade($unidadeDestino)->id != $usuario->id){
            //Log Removendo o Gestor da Unidade %s
            Log::channel('siape')->info('Removendo o Gestor da Unidade : ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
           $this->removeAtualGestorDaUnidade($unidadeDestino);
        }

        if($this->usuarioEGestorEmOutraUnidade($usuario, $unidadeDestino)){
            //Log: Removendo Usuario %s da Gestão da Unidade %s
            Log::channel('siape')->info(' Removendo Usuario da Gestão da Unidade : ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
           $this->removeUsuarioDaGestaoAtual($usuario);
        }

        //Log: "Garante o usuario lotado na unidade de destino"
        $this->processaLotado($unidadeDestino, $usuario, $integranteNovoOuExistente);
        
        Log::channel('siape')->info('Lotando gestor na unidade: ' , ['usuario'=>$usuario->toJson(), 'unidade'=>$unidadeDestino->toJson()]);
        $this->lotaServidor(EnumAtribuicao::GESTOR, $integranteNovoOuExistente);
        
    }

    private function removeUsuarioDaGestaoAtual(Usuario $usuario) : void
    {
        $usuario->gerenciaTitular->gestor->delete();
    }

    private function usuarioEGestorEmOutraUnidade(Usuario $usuario, Unidade $unidade) : bool
    {
        return !empty($this->getUnidadeOndeOUsuarioEGestor($usuario)) && $this->getUnidadeOndeOUsuarioEGestor($usuario)->id != $unidade->id && empty($unidade->informal) && empty($this->getUnidadeOndeOUsuarioEGestor($usuario)->informal);
    }

    private function removeAtualGestorDaUnidade(Unidade $unidade) : void
    {
        if($this->getGestorAtualDaUnidade($unidade)){
            //Log Removendo o Gestor %s da Unidade %s
            $unidade->gestor->gestor->delete();
        }
    }

    private function getUnidadeOndeOUsuarioEGestor(Usuario $usuario) : Unidade|null
    {
        return $usuario->gerenciaTitular() ? $usuario->gerenciaTitular()->unidade : null;
    }

    private function getGestorAtualDaUnidade(Unidade $unidade) : Usuario|null
    {
        return $unidade->gestor ? $unidade->gestor->usuario : null;     
    }

    private function getUnidadeAtualDoUsuario(Usuario $usuario) : Unidade|null
    {
        return $usuario->lotacao ? $usuario->lotacao->unidade : null; ;
    }

    private function usuarioTemPlanodeTrabalhoAtivo(Usuario $usuario) : bool
    {
        return $usuario->planosTrabalho()->where('status', 'ATIVO')->exists();
    }

    private function lotaServidor(EnumAtribuicao $atribuicao, UnidadeIntegrante $unidadeIntegrante){
        UnidadeIntegranteAtribuicao::create(["atribuicao" => $atribuicao, "unidade_integrante_id" => $unidadeIntegrante->id])->save();
    }

    private function removeLotacao(Usuario $usuario) : void
    {
        $usuario->lotacao()->lotado->delete();
    }

    


    private function LimparAtribuicoes(UnidadeIntegrante $integranteNovoOuExistente, bool $removerLotado = false) : void
    {
        if($removerLotado){
            Log::channel('siape')->info(' Limpando todas as atribuições : ' , ['usuario'=>$integranteNovoOuExistente->toJson()]);
            $integranteNovoOuExistente->deleteCascade();
            return ;
        }
        Log::channel('siape')->info(' Limpando as atribuições menos a lotado: ' , ['usuario'=>$integranteNovoOuExistente->toJson()]);
        $integranteNovoOuExistente->atribuicoes()->each(function($atribuicao){
            $atribuicao->delete();
        });
        return ;
    }

     private function validarAtribuicoes($atribuicoes, string $nome = null) :void
     {
       if (count(array_intersect([EnumAtribuicao::GESTOR, EnumAtribuicao::GESTOR_SUBSTITUTO, EnumAtribuicao::GESTOR_DELEGADO], $atribuicoes)) > 1) throw new ServerException("ValidateIntegrante", "A um mesmo servidor $nome só pode ser atribuída uma função de gestor, para uma mesma Unidade!");
     }

     
}