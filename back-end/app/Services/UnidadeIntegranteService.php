<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Throwable;

class UnidadeIntegranteService extends ServiceBase
{
    public function carregarIntegrantes($unidadeId, $usuarioId)
    {
        $result = [];
        $unidade = empty($unidadeId) ? null : Unidade::find($unidadeId);
        $usuario = empty($usuarioId) ? null : Usuario::find($usuarioId);
        if (!empty($unidadeId) && empty($unidade)) throw new ServerException("ValidateIntegrante", "Unidade não encontrada no banco");
        if (!empty($usuarioId) && empty($usuario)) throw new ServerException("ValidateIntegrante", "Usuário não encontrado no banco");
        foreach (($unidade ? $unidade->integrantes ?? [] : $usuario->unidadesIntegrantes ?? []) as $vinculo) {
            $result[$unidade ? $vinculo->usuario->id : $vinculo->unidade->id] = [
                "id" => $unidade ? $vinculo->usuario->id : $vinculo->unidade->id,
                "usuario_nome" => $unidade ? $vinculo->usuario->nome : null,
                "usuario_apelido" => $unidade ? $vinculo->usuario->apelido : null,
                "usuario_url_foto" => $unidade ? $vinculo->usuario->url_foto : null,
                "unidade_nome" => $usuario ? $vinculo->unidade->nome : null,
                "unidade_sigla" => $usuario ? $vinculo->unidade->sigla : null,
                "unidade_codigo" => $usuario ? $vinculo->unidade->codigo : null,
                "atribuicoes" => $vinculo->atribuicoes->map(fn ($a) => $a->atribuicao)
            ];
        }
        return ['rows' => array_values(array_filter($result, fn($vinculo) => count($vinculo["atribuicoes"]) > 0))];
    }

    public function salvarIntegrantes(array $vinculos, $transaction = true): array
    {
        $result = [];
        $msgExclusaoVinculo = $msgExclusaoLotacao = $msgLotacaoInformal = "";
        foreach ($vinculos as $vinculo) {
            if ($transaction) DB::beginTransaction();
            try {
                $usuario = Usuario::find($vinculo["usuario_id"]);
                $unidade = Unidade::find($vinculo["unidade_id"]);
                if (empty($unidade) || empty($usuario)) throw new ServerException("ValidateIntegrante", "Unidade/Usuário não existe no banco");
                if (!empty($vinculo['_metadata']['perfil_id'])) $this->usuarioService->update(['id' => $usuario->id, 'perfil_id' => $vinculo['_metadata']['perfil_id']], $unidade);
                $atribuicoesFinais = [];
                $integranteNovoOuExistente = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidade->id, 'usuario_id' => $usuario->id]);
                if (empty($vinculo["atribuicoes"])) {     // apagar todas as suas atribuições do servidor neste vínculo ...
                    if (!empty($usuario->lotacao) && $usuario->lotacao->id == $integranteNovoOuExistente->id) {     // mas, uma das atribuições neste vínculo é a de LOTADO
                        $integranteNovoOuExistente->atribuicoes->each(function ($a) {
                            if ($a->atribuicao != 'LOTADO') $a->delete();     // deletar todas as atribuições, exceto a de LOTADO
                        });
                        $msgExclusaoVinculo = "O vínculo de LOTADO não pode ser apagado; apenas transferido, através da atribuição de lotação em outra unidade.";
                        array_push($atribuicoesFinais, "LOTADO");
                    } else $integranteNovoOuExistente->deleteCascade();  // dentre as atribuições do vínculo não está a de LOTADO... neste caso, apaga o vínculo e suas atribuições
                } else {
                    $this->validarAtribuicoes($vinculo["atribuicoes"]);   // Verifica se é 'GESTOR', 'GESTOR_SUBSTITUTO' e 'GESTOR_DELEGADO' ao mesmo tempo
                    $unidadeLotacao = $usuario->lotacao ? $usuario->lotacao->unidade : null;                                    // unidade de lotação do usuário
                    $unidadeGerenciaTitular = $usuario->gerenciaTitular ? $usuario->gerenciaTitular->unidade : null;            // unidade onde eventualmente o usuário já é gestor titular
                    $atualGestorUnidade = $unidade->gestor ? $unidade->gestor->usuario : null;                                  // usuário que é o atual gestor titular da unidade
                    $lotarServidor = function () use ($integranteNovoOuExistente, &$unidadeLotacao, &$atribuicoesFinais, $unidade) {
                      UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      $unidadeLotacao = $unidade;
                      array_push($atribuicoesFinais, "LOTADO");
                    };
                    $definirLotacao = function () use (&$unidadeLotacao, $unidade, $lotarServidor, $usuario, &$atribuicoesFinais, &$msgExclusaoLotacao, &$msgLotacaoInformal) {
                        if (empty($unidadeLotacao->id)){    // Não tem lotação ainda.
                            if (empty($unidade->informal)) $lotarServidor();    // A unidade em questão é formal.
                            else $msgLotacaoInformal = "A atribuição de LOTADO não pode ser vinculada a uma Unidade Informal.";
                        } else {  // Já possui lotação.
                            if($unidadeLotacao->id != $unidade->id) {   // Mas não é na unidade em questão
                              if(empty($unidadeGerenciaTitular)){    // O servidor não é Chefe da sua atual unidade de lotação
                                $usuario->lotacao->lotado->delete();
                                $lotarServidor();
                              } else $msgExclusaoLotacao = "Não é possível lotar o(a) servidor(a) na unidade " . strtoupper($unidade->sigla) . "por ser Chefe da sua atual lotação - " . strtoupper($unidadeLotacao->sigla) . "!";
                            } else array_push($atribuicoesFinais, "LOTADO");
                        }
                    };
                    $definirGerenciaTitular = function () use ($integranteNovoOuExistente, &$unidadeGerenciaTitular, &$atualGestorUnidade, $unidade, $usuario, &$unidadeLotacao, $definirLotacao, &$atribuicoesFinais, &$msgExclusaoLotacao) {
                        // se já existe um gestor titular diferente para essa unidade, é preciso excluir sua atribuição de gestor antes de entregar a gerência da unidade ao novo usuário. Isso é válido, inclusive, para unidades informais.
                        if (!empty($atualGestorUnidade->id) && $atualGestorUnidade->id != $usuario->id) {
                            $unidade->gestor->gestor->delete();
                            $atualGestorUnidade = null;
                        }
                        // se o usuário já é gestor titular de outra unidade, e ambas são formais (a outra e essa nova), é preciso perder aquela gerência antes de assumir essa nova gerência titular.
                        if (!empty($unidadeGerenciaTitular->id) && $unidadeGerenciaTitular->id != $unidade->id && empty($unidade->informal) && empty($unidadeGerenciaTitular->informal)) {
                            $usuario->gerenciaTitular->gestor->delete();
                            $unidadeGerenciaTitular = null;
                        }
                        // se a unidade for formal, é necessário garantir que a lotação do gestor titular é na unidade que vai gerenciar
                        if (empty($unidade->informal)) {
                            if($unidadeLotacao->id != $unidade->id) $definirLotacao();
                            $msgExclusaoLotacao = "";
                        }
                        // finalmente, se o usuário ainda não é gerente titular, ou se uma das duas gerências titulares (a já existente e essa nova que está sendo proposta) é de uma unidade informal, é criada a atribuição nova de gestor titular
                        if (empty($unidadeGerenciaTitular->id) || $unidadeGerenciaTitular->informal || $unidade->informal) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                        $unidadeGerenciaTitular = $unidade;
                        array_push($atribuicoesFinais, "GESTOR");
                    };
                    $definirGerenciaSubstituta = function () use ($integranteNovoOuExistente, &$atribuicoesFinais) {
                        UnidadeIntegranteAtribuicao::firstOrCreate(["atribuicao" => "GESTOR_SUBSTITUTO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                        array_push($atribuicoesFinais, "GESTOR_SUBSTITUTO");
                    };
                    $definirGerenciaDelegada = function () use ($integranteNovoOuExistente, &$atribuicoesFinais) {
                        UnidadeIntegranteAtribuicao::firstOrCreate(["atribuicao" => "GESTOR_DELEGADO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                        array_push($atribuicoesFinais, "GESTOR_DELEGADO");
                    };
                    if (in_array("LOTADO", $vinculo["atribuicoes"])) $definirLotacao();
                    if (in_array("GESTOR", $vinculo["atribuicoes"])) $definirGerenciaTitular();
                    if (in_array("GESTOR_SUBSTITUTO", $vinculo["atribuicoes"])) $definirGerenciaSubstituta();
                    if (in_array("GESTOR_DELEGADO", $vinculo["atribuicoes"])) $definirGerenciaDelegada();
                    // Só salvar atribuições diferentes de lotação e gerência (Lotado, Gestor, Gestor_delegado, Gestor_substituto) e se ainda não existir
                    foreach (array_diff($vinculo["atribuicoes"], ['LOTADO', 'GESTOR', 'GESTOR_DELEGADO', 'GESTOR_SUBSTITUTO']) as $atribuicao) {
                        if (empty(UnidadeIntegranteAtribuicao::where('atribuicao', $atribuicao)->where('unidade_integrante_id', $integranteNovoOuExistente->id)->first())) {
                            UnidadeIntegranteAtribuicao::create(['atribuicao' => $atribuicao, 'unidade_integrante_id' => $integranteNovoOuExistente->id], [])->save();
                        }
                        array_push($atribuicoesFinais, $atribuicao);
                    }
                }
                $atribuicoesFinais = array_values(array_unique($atribuicoesFinais));
                /* Excluir as atribuições remanescentes */
                foreach ($integranteNovoOuExistente->atribuicoes as $atribuicao) {
                    if (!in_array($atribuicao->atribuicao, $atribuicoesFinais)) $atribuicao->delete();
                }
                if ($transaction) DB::commit();
                array_push($result, [
                    'unidade_id' => $unidade->id,
                    'usuario_id' => $usuario->id,
                    'atribuicoes' => $atribuicoesFinais,
                    '_metadata' => ['msg' => $msgExclusaoVinculo . $msgExclusaoLotacao . $msgLotacaoInformal]
                ]);
            } catch (Throwable $e) {
                if ($transaction) DB::rollback();
                throw $e;
            }
        }
        return $result;
    }

    public function validarAtribuicoes($atribuicoes)
    {
        if (count(array_intersect(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], $atribuicoes)) > 1) throw new ServerException("ValidateIntegrante", "A um mesmo servidor só pode ser atribuída uma função de gestor, para uma mesma Unidade!");
    }
}
