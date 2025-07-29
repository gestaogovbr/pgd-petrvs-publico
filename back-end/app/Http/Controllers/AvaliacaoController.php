<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use App\Models\Avaliacao;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\UnidadeService;
use App\Services\UsuarioService;
use App\Services\UtilService;
use Illuminate\Support\Facades\Log;
use Throwable;

class AvaliacaoController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                $data = $request->validate([
                    'entity' => ['required'],
                    'with' => ['array']
                ]);
                $this->canAvaliar($data["entity"], $usuario);
                break;
            case 'DESTROY':
                throw new ServerException("ValidateAvaliacao", "Operação não permitida");
                break;
            case 'CANCELAR_AVALIACAO':
                $data = $request->validate([
                    'id' => ['required'],
                ]);
                $avaliacao = Avaliacao::find($data["id"]);
                if(empty($avaliacao)) throw new ServerException("ValidateAvaliacao", "Avaliação não encontrada");
                $this->canAvaliar($avaliacao->toArray(), $usuario);
                break;
            case 'RECORRER':
                $unidadeService = new UnidadeService();
                $data = $request->validate([
                    'id' => ['required'],
                    'recurso' => ['required'],
                ]);
                $avaliacao = Avaliacao::find($data["id"]);
                if(empty($avaliacao)) throw new ServerException("ValidateAvaliacao", "Avaliação não encontrada");

                /* (RN_AVL_2) [PT] O usuário do plano de trabalho que possuir o acesso MOD_PTR_CSLD_REC_AVAL poderá recorrer da nota atribuida dentro do limites estabelecido pelo programa; */
                if(!$usuario->hasPermissionTo('MOD_PTR_CSLD_REC_AVAL')) throw new ServerException("ValidateAvaliacao", "Usuário não possuí o acesso MOD_PTR_CSLD_REC_AVAL.\n[ver RN_AVL_2]");

                $planoTrabalho = $avaliacao->planoTrabalhoConsolidacao->planoTrabalho;

                if($planoTrabalho->usuario_id != $usuario->id) throw new ServerException("ValidateAvaliacao", "Apenas o usuário do plano de trabalho poderá recorrer.\n[ver RN_AVL_2]");

                $programa = $planoTrabalho->programa;
                if($programa->dias_tolerancia_recurso_avaliacao > 0 && (UtilService::daystamp($avaliacao->data_avaliacao) + $programa->dias_tolerancia_recurso_avaliacao < UtilService::daystamp($unidadeService->hora($planoTrabalho->unidade_id))))
                    # desabilitado validação enquanto não tiver as notificações
                    #throw new ServerException("ValidateAvaliacao", "O prazo de " . $programa->dias_tolerancia_recurso_avaliacao . " dias para o recurso foi extrapolado.\n[ver RN_AVL_2]");
                break;
        }
    }

    public function canAvaliar($data, $usuario) {
        $unidadeService = new UnidadeService();
        $usuarioService = new UsuarioService();
        $consolidacao = !empty($data["plano_trabalho_consolidacao_id"]) ? PlanoTrabalhoConsolidacao::find($data["plano_trabalho_consolidacao_id"]) : null;
        $planoEntrega = !empty($data["plano_entrega_id"]) ? PlanoEntrega::find($data["plano_entrega_id"]) : null;
        /* (RN_AVL_4) [PT] Somente será possível realizar avaliação de consolidação CONCLUIDO ou AVALIADO; */
        if(!empty($consolidacao) && !in_array($consolidacao->status, ["CONCLUIDO", "AVALIADO"])) throw new ServerException("ValidateAvaliacao", "Para avaliar é necessário estar Concluído ou já Avaliado, e para cancelar é necessário estar Avaliado.\n[ver RN_AVL_4]");
        /* (RN_AVL_1) [PT;PE] A avaliação somente poderá ser realizada pelo superior imediatamente hierárquico ou por quem delegado através da
            atribuição de avaliador (no caso de consolidação o superior hierárquico é o gestor da unidade, substituto ou delegado, já para o
            plano de entrega o superior será o gestor, substituto ou delegado da unidade imediatamente superior). Deverá possuir tambem a
            capacidade MOD_PTR_CSLD_AVAL (consolidação do plano de trabalho), ou MOD_PENT_AVAL/MOD_PENT_AVAL_SUBORD (plano de entrega); */
        $avaliador = fn($unidade) => $usuarioService->isGestorUnidade($unidade);
        $unidade = !empty($consolidacao) ? $consolidacao->planoTrabalho->unidade : ($planoEntrega?->unidade?->instituidora == 1 ? $planoEntrega?->unidade : $planoEntrega?->unidade?->unidadePai);
        if(empty($unidade)) throw new ServerException("ValidateAvaliacao", "Unidade do gestor não encontrada no sistema");
        $condicao1 = !empty($consolidacao) && $usuario->hasPermissionTo("MOD_PTR_CSLD_AVAL") && ($avaliador($unidade->id) || $avaliador($unidade->unidade_pai_id));
        $condicao2 = !empty($planoEntrega) && $usuario->hasPermissionTo("MOD_PENT_AVAL") && $avaliador($unidade->id);
        $condicao3 = !empty($planoEntrega) && $usuario->hasPermissionTo("MOD_PENT_AVAL_SUBORD") && array_filter($unidadeService->linhaAscendente($unidade->id), fn($u) => $avaliador($u));
        if(!empty($consolidacao) && !$condicao1) throw new ServerException("ValidateAvaliacao", "Usuário não possui a capacidade MOD_PTR_CSLD_AVAL.\n[ver RN_AVL_1]");
        if(!empty($planoEntrega) && !$condicao2 && !$condicao3) throw new ServerException("ValidateAvaliacao", "Usuário não possui a capacidade MOD_PENT_AVAL ou MOD_PENT_AVAL_SUBORD.\n[ver RN_AVL_1]");
    }

    public function recorrer(Request $request) {
        try {
            $this->checkPermissions("RECORRER", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));

            $data = $request->validate([
                'id' => ['required'],
                'recurso' => ['required'],
            ]);
            return response()->json([
                'success' => $this->service->recorrer($data["id"], $data["recurso"])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

    public function cancelarAvaliacao(Request $request) {
        try {
            $this->checkPermissions("CANCELAR_AVALIACAO", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));
            $data = $request->validate([
                'id' => ['required']
            ]);
            return response()->json([
                'success' => $this->service->cancelarAvaliacao($data["id"])
            ]);
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
        }
    }

}
