<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Exceptions\ServerException;
use App\Models\Programa;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;
use Throwable;
use Exception;

class PlanoEntregaService extends ServiceBase
{
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
     * Se o plano recebido como parâmetro possuir ID, as informações devolvidas serão baseadas nos dados armazenados no banco. Caso contrário, as informações devolvidas serão baseadas nos dados
     * recebidos na chamada do método. 
     * @param array $entity     Um array com os dados de um plano já existente ou que esteja sendo criado.
     * @return array
     */
    public function buscaCondicoes(array $entity): array {
        $planoEntrega = !empty($entity['id']) ? PlanoEntrega::find($entity['id'])->toArray() : $entity;
        $planoEntregaPai = !empty($planoEntrega['plano_entrega_id']) ? PlanoEntrega::find($planoEntrega['plano_entrega_id']) : null;
        $planoEntrega['unidade'] = !empty($planoEntrega['unidade_id']) ? Unidade::find($planoEntrega['unidade_id'])->toArray() : null;
        $planoEntrega['unidade']['planosEntrega'] = !empty($planoEntrega['unidade']) ? PlanoEntrega::where('unidade_id',$planoEntrega['unidade_id'])->get()->toArray() : null;
        return [
            "planoValido" => $this->isPlanoEntregaValido($planoEntrega),
            "planoAtivo" => $this->isPlano("ATIVO", $planoEntrega),
            "planoPaiAtivo" => $planoEntrega['plano_entrega_id'] ? $this->isPlano("ATIVO", $planoEntregaPai->toArray()) : false,
            "planoHomologando" => $this->isPlano("HOMOLOGANDO", $planoEntrega),
            "planoIncluindo" => $this->isPlano("INCLUINDO", $planoEntrega),
            "planoProprio" => $planoEntrega['plano_entrega_id'] == null,
            "planoVinculado" => $planoEntrega['plano_entrega_id'] != null,
            "gestorUnidadePlano" => $this->usuario->isGestorUnidade($planoEntrega['unidade_id']),
            "gestorUnidadePaiUnidadePlano" => !empty($planoEntrega['unidade']['unidade_id']) && $this->usuario->isGestorUnidade($planoEntrega['unidade']['unidade_id']),
            "gestorLinhaAscendenteUnidadePlano" => !!array_filter($this->unidade->linhaAscendente($planoEntrega['unidade_id']), fn($u) => $this->usuario->isGestorUnidade($u)),
            "unidadePlanoPaiEhUnidadePaiUnidadePlano" => $planoEntrega['plano_entrega_id'] ? $planoEntregaPai->unidade_id == $planoEntrega['unidade']['unidade_id'] : false,
            "unidadePlanoEhLotacao" => $this->usuario->isLotacao($planoEntrega['unidade_id']),
            "unidadePaiUnidadePlanoEhLotacao" => !empty($planoEntrega['unidade']['unidade_id']) && $this->usuario->isLotacao($planoEntrega['unidade']['unidade_id']),
            "unidadePlanoEhAlgumaLotacaoUsuario" => in_array($planoEntrega['unidade_id'], array_map(fn($u) => $u['id'], $this->usuario->loggedUser()->unidades->toArray())),
            "unidadePlanoEhPaiAlgumaLotacaoUsuario" => $this->usuario->loggedUser()->unidades->map(fn($u) => $u->id)->map(fn($ul) => Unidade::find($ul)->unidade_id)->contains($planoEntrega['unidade_id']),            
            "unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai" => !!array_filter($planoEntrega['unidade']['planosEntrega'], fn($p) => $this->isPlano('ATIVO',$p) && UtilService::intersect($planoEntrega['inicio'], $planoEntrega['fim'], $planoEntregaPai->inicio, $planoEntregaPai->fim)),
            "lotadoLinhaAscendenteUnidadePlano" => $this->usuario->isLotadoNaLinhaAscendente($planoEntrega['unidade_id']),
            "unidadePlanoEstahLinhaAscendenteAlgumaLotacaoUsuario" => in_array($planoEntrega['unidade_id'], array_values(array_unique(array_reduce(array_map(fn($ul) => $this->unidade->linhaAscendente($ul), array_map(fn($u) => $u['id'], $this->usuario->loggedUser()->unidades->toArray())), 'array_merge', array()))))
        ];
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
     * @param array $planoEntrega  
     */
    public function isPlano($status, $planoEntrega): bool {
        return $this->isPlanoEntregaValido($planoEntrega) && $planoEntrega['status'] == $status;
    }

    /**
     * Informa se o plano de entregas repassado como parâmetro é um plano válido.
     * Um Plano de Entregas é válido se não foi deletado, nem cancelado, nem arquivado.
     * @param array $planoEntrega  
     */
    public function isPlanoEntregaValido($planoEntrega): bool {
        return empty($planoEntrega['id']) ? false : !$planoEntrega['deleted_at'] && !$planoEntrega['data_cancelamento'] && !$planoEntrega['data_arquivamento'];
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

    /**
    *  Verifica se algumas condições estão atendidas, antes de realizar a inserção/alteração do Plano de Entregas: 
    *  - as datas do Plano de Entregas devem se encaixar na duração do Programa de Gestão;
    *  - as datas das entregas do Plano de Entregas devem se encaixar na duração do Programa de Gestão;
    *  - após criado um Plano de Entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id; (RN_PENT_3_9)
    */
    public function validateStore($dataOrEntity, $unidade, $action)
    {
        if(!$this->verificaDuracaoPlano($dataOrEntity) || !$this->verificaDatasEntregas($dataOrEntity)) throw new Exception("O prazo das datas não satisfaz a duração estipulada no programa.");
        if($action == "EDIT") {
            $planoEntrega = PlanoEntrega::find($dataOrEntity["id"]);
            if($dataOrEntity["unidade_id"] != $planoEntrega->unidade_id) throw new ServerException("ValidatePlano", "Depois de criado um Plano de Entregas, não é possível alterar a sua Unidade.");
            if($dataOrEntity["programa_id"] != $planoEntrega->programa_id) throw new ServerException("ValidatePlano", "Depois de criado um Plano de Entregas, não é possível alterar o seu Programa.");
             /* (RN_PENT_3_9)
                Após criado um plano de entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id;
             */
        }
    }

    /**
    * Verifica se as datas do plano de entrega se encaixam na duração do Programa de gestão
    */
    public function verificaDuracaoPlano($planoEntrega)
    {
        $result = true;
        $programa = Programa::find($planoEntrega["programa_id"]);
        if ($programa->prazo_execucao > 0) {
            $dataInicio = new DateTime($planoEntrega["inicio"]);
            $dataFim = new DateTime($planoEntrega["fim"]);
            $diff = $dataInicio->diff($dataFim);
            if ($diff->days > $programa->prazo_execucao) {
                $result = false;
            }
        }
        return $result;
    }

    /**
     * Verifica se as datas de início e fim das entregas do plano de entrega se encaixam na duração do Programa de gestão (true para caso esteja tudo ok)
     */
    public function verificaDatasEntregas($planoEntrega)
    {
        $result = true;
        $dataInicio = new DateTime($planoEntrega["inicio"]);
        $dataFim = new DateTime($planoEntrega["fim"]);
        if ($planoEntrega["entregas"]) {
            foreach ($planoEntrega["entregas"] as $entrega) {
                $entregaInicio = new DateTime($entrega["inicio"]);
                $entregaFim = new DateTime($entrega["fim"]);
                $result = $result && ($dataInicio <= $entregaInicio) && ($dataFim >= $entregaFim);
            }
        }
        return $result;
    }

    /**
     *                  MAPA DE COBERTURA DAS REGRAS DE NEGÓCIO - PLANO DE ENTREGAS
     *                  
     *   REGRAS NÃO     REGRAS TOTALMENTE        OUTRAS REGRAS       OUTRAS REGRAS
     *   IMPLEMENTADAS  IMPLEMENTADAS            100% COBERTAS       PARCIALMENTE COBERTAS
     *                  ----------------------------------------------------------------------
     *   RN_PENT_1_1
     *   RN_PENT_1_2
     *                  RN_PENT_1_3
     *   RN_PENT_1_4
     *   RN_PENT_2_1
     *   RN_PENT_2_2
     *                  RN_PENT_2_3
     *                  RN_PENT_2_4
     *   RN_PENT_2_5
     *   RN_PENT_2_6
     *   RN_PENT_2_7
     *   RN_PENT_3_1
     *                  RN_PENT_3_2
     *                  RN_PENT_3_3
     *   RN_PENT_3_4
     *   RN_PENT_3_5
     *   RN_PENT_3_6
     *   RN_PENT_3_7
     *   RN_PENT_3_8
     *                  RN_PENT_3_9
     *                  RN_PENT_4_1
     *                  RN_PENT_4_2
     *                  RN_PENT_4_3
     *                  RN_PENT_4_4
     *                  RN_PENT_4_5
     *                  RN_PENT_4_6
     *                  RN_PENT_4_7
     *                  RN_PENT_4_8
     *                  RN_PENT_4_9
     *                  RN_PENT_4_10
     *                  RN_PENT_4_11
     *                  RN_PENT_4_12
     *                  RN_PENT_4_13
     *                  RN_PENT_4_14
     *                  RN_PENT_4_15
     *                  RN_PENT_4_16
     * 
     * 
     * 
     */
}