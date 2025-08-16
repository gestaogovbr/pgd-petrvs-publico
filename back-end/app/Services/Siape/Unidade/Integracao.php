<?php

namespace App\Services\Siape\Unidade;

use App\Exceptions\ServerException;
use App\Facades\SiapeLog;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Services\Siape\Contrato\InterfaceIntegracao;
use Illuminate\Support\Facades\DB;
use App\Services\Siape\Unidade\Enum\Atribuicao as EnumAtribuicao;
use Illuminate\Support\Facades\Log;

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
        $this->salvaIntegrantes();
    }

    private function salvaIntegrantes()
    {

        if ($this->transaction) DB::beginTransaction();
        try {

            $vinculosCollections = collect($this->vinculos);

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
         * @var Unidade $unidadeDestino
         */
        $unidadeDestino = Unidade::find($vinculoDTO->unidadeId);

        if (empty($unidadeDestino)) throw new ServerException("ValidateIntegrante", sprintf("Unidade %s não existe no banco", $vinculoDTO->unidadeId));

        $this->atualizaPerfilDoUsuario($usuario->id, !empty($vinculoDTO->perfilId) ? $vinculoDTO->perfilId : null);

        $integranteNovoOuExistente = $this->criaVinculoDoUsuarioComUnidade($usuario->id, $unidadeDestino->id);

        if (empty($vinculoDTO->atribuicoes)) {
            array_push($this->atribuicoesFinais, ["O vínculo de LOTADO não pode ser apagado; apenas transferido, através da atribuição de lotação em outra unidade."]);
            $this->limpaTodasAtribuicoesMenosLotado($usuario, $integranteNovoOuExistente);
            return ;
        }
        
        $todasLotacoesAntigas = $usuario->getUnidadesAtribuicoesAttribute();
        $lotacoesAntigas = [];

        if(!empty($todasLotacoesAntigas) && array_key_exists($vinculoDTO->unidadeId, $todasLotacoesAntigas)) {
            $lotacoesAntigas = $todasLotacoesAntigas[$vinculoDTO->unidadeId];
        }

        $atribuicoesRemover = array_diff($lotacoesAntigas, $vinculoDTO->atribuicoes);

        $this->decideALotacaoDeGestorInvalida($vinculoDTO->atribuicoes, $integranteNovoOuExistente);

        collect($vinculoDTO->atribuicoes)->map(function ($atribuicao) use ($usuario, $unidadeDestino, $integranteNovoOuExistente, $vinculoDTO) {
           $alteracao = $this->executarAcao($atribuicao, $usuario, $unidadeDestino, $integranteNovoOuExistente);
           SiapeLog::info(sprintf("Atribuição %s do usuário %s na unidade %s", $atribuicao, $usuario->id, $unidadeDestino->id), $alteracao);
           array_push($this->atribuicoesFinais, $alteracao);
           unset($vinculoDTO->atribuicoes[$atribuicao]);
        });

        if(!empty($atribuicoesRemover)){
            $this->removeDeterminadasAtribuicoes($atribuicoesRemover, $integranteNovoOuExistente);
        }
        
    }


    public function removeAtribuicao(UnidadeIntegrante $integrante, EnumAtribuicao $atribuicao): void
    {
        $atribuicaoExistente = UnidadeIntegranteAtribuicao::where('unidade_integrante_id', $integrante->id)
            ->where('atribuicao', $atribuicao->value)
            ->first();

        if ($atribuicaoExistente) {
            $atribuicaoExistente->delete();
            $integrante->delete();
            array_push($this->atribuicoesFinais, sprintf("Atribuição %s removida do integrante %s", $atribuicao->value, $integrante->id));
        } else {
            array_push($this->atribuicoesFinais, sprintf("Atribuição %s já não existe para o integrante %s", $atribuicao->value, $integrante->id));
        }
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
        (!empty($usuario->lotacao) && $usuario->lotacao->id == $integranteNovoOuExistente->id) ?
            $this->LimparAtribuicoes($integranteNovoOuExistente) :
            $this->LimparAtribuicoes($integranteNovoOuExistente, true);
    }
    private function atualizaPerfilDoUsuario(string $usuarioId, string|null $perfilId)
    {
        // if (!empty($vinculo['_metadata']['perfil_id'])) $this->usuarioService->update(['id' => $usuario->id, 'perfil_id' => $vinculo['_metadata']['perfil_id']], $unidade);
    }

    private function criaVinculoDoUsuarioComUnidade(string $usuarioId, string $unidadeId): UnidadeIntegrante
    {
        //fixme colocar no repositorio
        $integranteNovoOuExistente = UnidadeIntegrante::withTrashed()->firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $usuarioId]);
        if($integranteNovoOuExistente->trashed()) {
            $integranteNovoOuExistente->restore();
        }
        return $integranteNovoOuExistente;
    }
}
