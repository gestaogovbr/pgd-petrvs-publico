<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Traits\UseDataFim;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class PlanoEntregaService extends ServiceBase
{
    use UseDataFim;

    public $unidades = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */

    public function arquivar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            if(!empty($planoEntrega)) {
                $this->update([
                    "id" => $planoEntrega->id,
                    "data_arquivamento" => $data["arquivar"] ? Carbon::now() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidatePlano", "Plano de Entrega não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function avaliar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'AVALIADO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;    
    }

    /**
     * Retorna um array com várias informações sobre o plano repassado como parâmetro que serão auxiliares na definição das permissões para as diversas operações possíveis com um Plano de Entregas.
     * @param array $entity     Um array com os dados de um plano já existente ou que esteja sendo criado.
     * @return array
     */
    public function buscaCondicoes(array $entity): array {
        $planoEntrega = PlanoEntrega::firstOrNew(['id' => $entity['id']], $entity);
        $planoEntregaPai = $planoEntrega->plano_entrega_id ? PlanoEntrega::find($planoEntrega->plano_entrega_id) : null;
        $planoEntrega->unidade = $planoEntrega->unidade ?? Unidade::find($planoEntrega->unidade_id);
        return [
            "planoValido" => $this->isPlanoEntregaValido($planoEntrega),
            "planoAtivo" => $this->isPlano("ATIVO", $planoEntrega),
            "planoPaiAtivo" => $planoEntrega->plano_entrega_id ? $this->isPlano("ATIVO", $planoEntregaPai) : false,
            "planoHomologando" => $this->isPlano("HOMOLOGANDO", $planoEntrega),
            "planoIncluindo" => $this->isPlano("INCLUINDO", $planoEntrega),
            "planoProprio" => $planoEntrega->plano_entrega_id == null,
            "planoVinculado" => $planoEntrega->plano_entrega_id != null,
            "gestorUnidadePlano" => $this->usuario->isGestorUnidade($planoEntrega->unidade_id),
            "gestorUnidadePaiPlano" => $this->usuario->isGestorUnidade($planoEntrega->unidade->unidade_id),
            "gestorLinhaAscendenteUnidadePlano" => !!array_filter($this->unidade->linhaAscendente($planoEntrega->unidade_id), fn($u) => $this->usuario->isGestorUnidade($u)),
            "unidadePlanoPaiEhUnidadePaiDoPlano" => $planoEntrega->plano_entrega_id ? $planoEntregaPai->unidade_id == $planoEntrega->unidade->unidade_id : false,
            "unidadePlanoEhLotacaoPrincipal" => $this->usuario->isLotacaoPrincipal($planoEntrega->unidade_id),
            "unidadePaiPlanoEhLotacaoPrincipal" => $this->usuario->isLotacaoPrincipal($planoEntrega->unidade->unidade_id),
            "unidadePlanoEhLotacaoUsuario" => in_array($planoEntrega->unidade_id, array_map(fn($lot) => $lot['unidade_id'], array_filter($this->usuario->loggedUser()->lotacoes->toArray(), fn($lot) => $lot['data_fim'] == null))),
            "unidadePlanoEhPaiAlgumaLotacaoUsuario" => $this->usuario->loggedUser()->lotacoes->filter(fn($lot) => $lot->data_fim == null)->map(fn($lot) => $lot->unidade_id)->map(fn($ul) => Unidade::find($ul)->unidade_id)->contains($planoEntrega->unidade_id),
            "unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai" => !!$planoEntrega->unidade->planosEntregas->filter(fn($p) => $this->isPlano('ATIVO',$p) && UtilService::intersect($planoEntrega->inicio,$planoEntrega->fim,$planoEntregaPai->inicio,$planoEntregaPai->fim)),
            "lotadoLinhaAscendenteUnidadePlano" => $this->usuario->isLotadoNaLinhaAscendente($planoEntrega->unidade_id),
            "unidadePlanoEstahLinhaAscendenteAlgumaLotacaoUsuario" => in_array($planoEntrega->unidade_id, array_values(array_unique(array_reduce(array_map(fn($ul) => $this->unidade->linhaAscendente($ul), array_map(fn($lot) => $lot['unidade_id'], array_filter($this->usuario->loggedUser()->lotacoes->toArray(), fn($lot) => $lot['data_fim'] == null))), 'array_merge', array()))))
        ];
    }

    public function cancelar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "data_cancelamento" => Carbon::now(),
                "cancelamento_usuario_id" => parent::loggedUser()->id
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarAvaliacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'CONCLUIDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarConclusao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'HOMOLOGANDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Retorna se o plano repassado como parâmetro pode ser visualizado pelo usuário logado.
     * @param string $plano_id
     * @return bool
     */
    public function canView($plano_id): bool {
        $condicoes = $this->buscaCondicoes(['id' => $plano_id]);
        $condition1 = $condicoes['unidadePlanoEhLotacaoUsuario'];
        $condition2 = $condicoes['lotadoLinhaAscendenteUnidadePlano'] && $this->usuario->hasPermissionTo("MOD_PENT_TOD_SUBORD");
        $condition3 = $this->usuario->loggedUser()->hasPermissionTo("MOD_PENT_TOD");
        $condition4 = $condicoes['unidadePlanoEhPaiAlgumaLotacaoUsuario'] && $this->usuario->hasPermissionTo("MOD_PENT_IMD_SUP");
        $condition5 = $condicoes['unidadePlanoEstahLinhaAscendenteAlgumaLotacaoUsuario'] && $this->usuario->hasPermissionTo("MOD_PENT_TOD_SUP");
        $condition6 = $condicoes['gestorLinhaAscendenteUnidadePlano'];
        return $condition1 || $condition2 || $condition3 || $condition4 || $condition5 || $condition6;
        /*  (RN_PENT_4_10)
            1. o usuário logado precisa ser lotado na unidade do plano; (RN_PENT_3_7) ou
            2. o usuário logado precisa ser lotado em alguma unidade da linha hierárquica ascendente da unidade do plano e possuir a capacidade "MOD_PENT_TOD_SUBORD"; ou
            3. o usuário logado precisa possuir a capacidade "MOD_PENT_TOD"; ou
            4. a unidade do plano é a unidade-pai de alguma das lotações do usuário logado e este possui a capacidade "MOD_PENT_IMD_SUP"; ou
            5. a unidade do plano é alguma das unidades da linha hierárquica ascendente de qualquer uma das lotações do usuário logado e este possui a capacidade "MOD_PENT_TOD_SUP"; ou
            6. o usuário logado é gestor de alguma unidade da linha hierárquica ascendente da unidade do plano; (RN_PENT_3_4) 
        */
    }

    public function concluir($data, $unidade){
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'CONCLUIDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Informa se o plano de entregas repassado como parâmetro está em curso.
     * Um Plano de Entregas está EM CURSO quando não foi deletado, nem cancelado, nem arquivado e possui status ATIVO;
     * @param PlanoEntrega $planoEntrega  
     */
    public function emCurso(PlanoEntrega $planoEntrega): bool {
        return $this->isPlanoEntregaValido($planoEntrega) && $planoEntrega->status == 'ATIVO';
    }

    public function homologar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Informa o status do plano de entregas repassado como parâmetro.
     * Um Plano de Entregas precisa ser VÁLIDO.
     * @param string $status
     * @param PlanoEntrega $planoEntrega  
     */
    public function isPlano($status, $planoEntrega): bool {
        return $this->isPlanoEntregaValido($planoEntrega) && $planoEntrega->status == $status;
    }

    /**
     * Informa se o plano de entregas repassado como parâmetro é um plano válido.
     * Um Plano de Entregas é válido se não foi deletado, nem cancelado, nem arquivado.
     * @param PlanoEntrega $planoEntrega  
     */
    public function isPlanoEntregaValido($planoEntrega): bool {
        return !$planoEntrega->data_fim && !$planoEntrega->data_cancelamento && !$planoEntrega->data_arquivamento;
    }

    public function liberarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'HOMOLOGANDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }
    
    public function metadados($planoEntrega) {
        if(empty($this->unidades[$planoEntrega->unidade_id])) {
            $this->unidades[$planoEntrega->unidade_id] = Unidade::find($planoEntrega->unidade_id);
        }
        $result = [
            "incluindo" => $planoEntrega->status == 'INCLUINDO',
            "homologando" => $planoEntrega->status == 'HOMOLOGANDO',
            "ativo" => $planoEntrega->status == 'ATIVO',
            "suspenso" => $planoEntrega->status == 'SUSPENSO',
            "concluido" => $planoEntrega->status == 'CONCLUIDO',
            "avaliado" => $planoEntrega->status == 'AVALIADO',
            "arquivado" => !empty($planoEntrega->data_arquivamento),
            "cancelado" => !empty($planoEntrega->data_cancelamento)
        ];
        return $result;
    }

    public function proxyRows($rows){
        foreach($rows as $row){ $row->metadados = $this->metadados($row); }
        return $rows;
    }

    public function proxyStore(&$data, $unidade, $action){
        if($action == "INSERT") { $data["criacao_usuario_id"] = parent::loggedUser()->id; }
        return $data;
    }

    public function reativar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;    
    }

    public function retirarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'INCLUINDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function suspender($data, $unidade){
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'SUSPENSO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function validateStore(){

    }

}