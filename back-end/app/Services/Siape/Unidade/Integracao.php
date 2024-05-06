<?php

namespace App\Services\Siape\Unidade;

use App\Exceptions\ServerException;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\Contrato\InterfaceIntegracao;
use Illuminate\Support\Facades\DB;
use App\Services\Siape\Unidade\Enum\Atribuicao as EnumAtribuicao;

class Integracao implements InterfaceIntegracao
{

    use Atribuicao;

    private bool $transaction = true;

    private array $atribuicoesFinais = [];


    public function __construct(private array $vinculos)
    {
    }

    public function processar(): void
    {
    }

    private function salvaIntegrantes(array $vinculos)
    {

        if ($this->transaction) DB::beginTransaction();
        try {

            $vinculosCollections = collect($vinculos);

            $vinculosCollections->map(function ($vinculo) {

                $vinculoDTO = VinculoDTO::fromArray($vinculo);



                $this->processaVinculo($vinculoDTO);
            });


            if ($this->transaction) DB::commit();
        } catch (\Exception $e) {
            if ($this->transaction) DB::rollBack();
            throw $e;
        }
    }

    private function processaVinculo(VinculoDTO $vinculoDTO)
    {
        /** 
         * @var Usuario $usuario
         */
        $usuario = Usuario::find($vinculoDTO->usuarioId);
        if (empty($usuario)) throw new ServerException("ValidateIntegrante", sprintf("Usuário %s não existe no banco", $vinculoDTO->usuarioId));
        /**
         * @var Unidade $unidade
         */
        $unidadeDestino = Unidade::find($vinculoDTO->unidadeId);

        if (empty($unidadeDestino)) throw new ServerException("ValidateIntegrante", sprintf("Unidade %s não existe no banco", $vinculoDTO->unidadeId));

        $this->atualizaPerfilDoUsuario($usuario->id, $vinculoDTO->metadata['perfil_id']);

        $integranteNovoOuExistente = $this->criaVinculoDoUsuarioComUnidade($usuario->id, $unidade->id);
        $msgExclusaoLotacao = "";
        $msgLotacaoInformal = "";

        if (empty($vinculoDTO->atribuicoes)) {
            $msgExclusaoVinculo = "O vínculo de LOTADO não pode ser apagado; apenas transferido, através da atribuição de lotação em outra unidade.";
            $this->limpaTodasAtribuicoesMenosLotado($usuario, $integranteNovoOuExistente);
            $this->preparaLogs($integranteNovoOuExistente, $unidade, $usuario, $msgExclusaoVinculo, $msgExclusaoLotacao, $msgLotacaoInformal, $result);
            return $result;
        }

        $this->validarAtribuicoes($vinculoDTO->atribuicoes, $usuario->nome);

        collect($vinculoDTO->atribuicoes)->map(function ($atribuicao) use ($usuario, $unidade, $integranteNovoOuExistente){
            $this->executarAcao($atribuicao, $usuario, $unidade, $integranteNovoOuExistente);
        });

        
    }

    private function lotarServidor(UnidadeIntegrante $integranteNovoOuExistente, Unidade|null &$unidadeLotacao, Unidade $unidade) : void
    {
        UnidadeIntegranteAtribuicao::create(["atribuicao" => EnumAtribuicao::LOTADO, "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
        $unidadeLotacao = $unidade;
        array_push($this->atribuicoesFinais, EnumAtribuicao::LOTADO);
    }

    private function definirLotacao(Unidade|null $unidadeLotacao, Unidade $unidade, Usuario $usuario, Unidade|null $unidadeGerenciaTitular, UnidadeIntegrante $integranteNovoOuExistente)
    {
        if (empty($unidadeLotacao->id)) {    // Não tem lotação ainda.
            if (empty($unidade->informal)) $this->lotarServidor($integranteNovoOuExistente, $unidadeLotacao, $unidade);    // A unidade em questão é formal.
            else $msgLotacaoInformal = "A atribuição de LOTADO não pode ser vinculada a uma Unidade Informal.";
        } else {  // Já possui lotação.
            if ($unidadeLotacao->id != $unidade->id) {   // Mas não é na unidade em questão
                if (empty($unidadeGerenciaTitular)) {    // O servidor não é Chefe da sua atual unidade de lotação
                    $usuario->lotacao->lotado->delete();
                    $this->lotarServidor($integranteNovoOuExistente, $unidadeLotacao, $unidade); 
                } else $msgExclusaoLotacao = "Não é possível lotar " . strtoupper($usuario->nome) . " na unidade " . strtoupper($unidade->sigla) . " por exercer a Chefia titular da sua atual lotação - " . strtoupper($unidadeLotacao->sigla) . "!";
            } else array_push($atribuicoesFinais, "LOTADO");
        }
    }

    private function preparaLogs(UnidadeIntegrante $integranteNovoOuExistente, Unidade $unidade, Usuario $usuario, $msgExclusaoVinculo, $msgExclusaoLotacao, $msgLotacaoInformal, &$result)
    {
        $this->atribuicoesFinais = array_values(array_unique($this->atribuicoesFinais));
        /* Excluir as atribuições remanescentes */
        foreach ($integranteNovoOuExistente->atribuicoes as $atribuicao) {
            if (!in_array($atribuicao->atribuicao, $this->atribuicoesFinais)) $atribuicao->delete();
        }
        if ($this->transaction) DB::commit();
        array_push($result, [
            'unidade_id' => $unidade->id,
            'usuario_id' => $usuario->id,
            'atribuicoes' =>  $this->atribuicoesFinais,
            '_metadata' => ['msg' => $msgExclusaoVinculo . $msgExclusaoLotacao . $msgLotacaoInformal]
        ]);
    }



    public function setTransaction(bool $transaction): void
    {
        $this->transaction = $transaction;
    }

    public function getTransaction(): bool
    {
        return $this->transaction;
    }

    public function getAtribuicoesFinais(): array
    {
        return $this->atribuicoesFinais;
    }
    private function limpaTodasAtribuicoesMenosLotado(Usuario $usuario, UnidadeIntegrante $integranteNovoOuExistente)
    {
        (!empty($usuario->lotacao()) && $usuario->lotacao()->id == $integranteNovoOuExistente->id) ?
            $this->LimparAtribuicoes($integranteNovoOuExistente) :
            $this->LimparAtribuicoes($integranteNovoOuExistente, true);
    }
    private function atualizaPerfilDoUsuario(string $usuarioId, string $perfilId)
    {
        // if (!empty($vinculo['_metadata']['perfil_id'])) $this->usuarioService->update(['id' => $usuario->id, 'perfil_id' => $vinculo['_metadata']['perfil_id']], $unidade);
    }

    private function criaVinculoDoUsuarioComUnidade(string $usuarioId, string $unidadeId): UnidadeIntegrante
    {
        //fixme colocar no repositorio
        $integranteNovoOuExistente = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $usuarioId]);
        return $integranteNovoOuExistente;
    }

    
}
