<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Exceptions\ServerException;
use App\Exceptions\LogError;
use App\Facades\SiapeLog;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use Throwable;

class ProcessadorAtualizacaoDadosService extends ServiceBase
{
    private int $chunkSize = 50;
    private int $transactionRetries = 3;
    private $result;
    private $usuarioComum;

    /**
     * Busca e processa atualizações de dados dos servidores em lotes.
     */
    public function processar(&$result, $usuarioComum)
    {
        $this->result = $result;
        $this->usuarioComum = $usuarioComum;

        $this->processarDadosPessoais();
        $this->processarLotacoes();
    }

    private function processarDadosPessoais(): array
    {
        $atualizacoesDados = $this->buscarAtualizacoesDados();
        $chunks = array_chunk($atualizacoesDados, $this->chunkSize);

        foreach ($chunks as $chunk) {
            DB::transaction(function () use ($chunk) {
                foreach ($chunk as $linha) {
                    $this->atualizarServidor($linha);
                }
            }, $this->transactionRetries);
        }

        $n = count($atualizacoesDados);
        
        //FIXME adicionar resultado para array de observações
        if ($n > 0) array_push($this->result['servidores']["Observações"], $n . ($n == 1 ? ' servidor foi atualizado porque sofreu alteração em seus dados pessoais!' : ' servidores foram atualizados porque sofreram alteração em seus dados pessoais!'));
        
        SiapeLog::info('Concluída a fase de atualização de servidores que apresentaram alteração nos seus dados Pessoais!.....');

        return $atualizacoesDados;
    }

    private function buscarAtualizacoesDados(): array
    {
        return DB::select(
            "SELECT
                u.id,
                isr.matriculasiape,
                isr.cpf AS cpf_servidor,
                u.nome AS nome_anterior,
                isr.nome AS nome_servidor,
                u.apelido AS apelido_anterior,
                isr.nomeguerra AS nome_guerra,
                u.email AS email_anterior,
                isr.emailfuncional,
                u.telefone AS telefone_anterior,
                isr.telefone,
                isr.data_modificacao AS data_modificacao,
                u.data_modificacao AS data_modificacao_anterior,
                isr.data_nascimento,
                isr.ident_unica AS ident_unica,
                u.ident_unica AS ident_unica_anterior,
                u.nome_jornada AS nome_jornada_antigo,
                isr.nome_jornada AS nome_jornada,
                u.cod_jornada AS cod_jornada_antigo,
                isr.cod_jornada AS cod_jornada,
                u.tipo_modalidade_id AS tipo_modalidade_id_anterior,
                isr.modalidade_pgd,
                u.participa_pgd AS participa_pgd_anterior,
                isr.participa_pgd
            FROM integracao_servidores isr
            LEFT JOIN usuarios u ON (isr.matriculasiape = u.matricula)
            WHERE
                (isr.nome != u.nome OR
                isr.emailfuncional != u.email OR
                isr.nomeguerra != u.apelido OR
                isr.telefone != u.telefone OR
                (isr.nome_jornada != u.nome_jornada OR isr.nome_jornada IS NOT NULL AND u.nome_jornada IS NULL) OR
                (isr.cod_jornada != u.cod_jornada OR isr.cod_jornada IS NOT NULL AND u.cod_jornada IS NULL) OR
                (isr.modalidade_pgd IS NOT NULL AND u.tipo_modalidade_id IS NULL) OR
                (isr.participa_pgd != u.participa_pgd OR isr.participa_pgd IS NOT NULL AND u.participa_pgd IS NULL) OR
                (isr.data_modificacao > u.data_modificacao OR isr.data_modificacao IS NOT NULL AND u.data_nascimento IS NULL))"
        );
    }

    private function atualizarServidor($linha): void
    {
        SiapeLog::info("Atualizando dados do servidor Matricula: " . $linha->matriculasiape);

        $this->integracaoService->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($linha->emailfuncional, $linha->matriculasiape, $linha->id);
        $modalidadePgdValida = $this->integracaoService->validarModalidadePgd($linha->modalidade_pgd);

        $sqlUpdateDados = "UPDATE usuarios SET " .
            "nome = :nome, apelido = :nomeguerra, " .
            "email = :email, " .
            "ident_unica = :ident_unica, " .
            "cod_jornada = :cod_jornada, " .
            "nome_jornada = :nome_jornada, " .
            "data_nascimento = :data_nascimento, " .
            "tipo_modalidade_id = :tipo_modalidade_id, " .
            "participa_pgd = :participa_pgd, " .
            "data_modificacao = :data_modificacao WHERE id = :id";


        DB::update($sqlUpdateDados, [
            'nome'               => $linha->nome_servidor,
            'nomeguerra'         => $linha->nome_guerra,
            'email'              => $linha->emailfuncional,
            'cod_jornada'        => $linha->cod_jornada,
            'nome_jornada'       => $linha->nome_jornada,
            'tipo_modalidade_id' => $modalidadePgdValida,
            'participa_pgd'      => $linha->participa_pgd,
            'id'                 => $linha->id,
            'ident_unica'        => $linha->ident_unica,
            'data_modificacao'   => UtilService::asDateTime($linha->data_modificacao),
            'data_nascimento'    => $linha->data_nascimento,
        ]);
    }

    private function processarLotacoes(): void
    {
        $atualizacoesLotacoes = DB::select(
          "SELECT usuario.id AS usuario_id, isr.nome AS nome, " .
            "  u.codigo AS exercicio_antigo, " .
            "  isr.codigo_servo_exercicio AS exercicio_atual, " .
            "  u.id AS exercicio_antigo_id, " .

            "(SELECT u2.id " .
            "FROM unidades AS u2 " .
            "WHERE isr.codigo_servo_exercicio = u2.codigo LIMIT 1) AS exercicio_atual_id, " .

            " uia.atribuicao AS atribuicao " .

            "FROM unidades_integrantes_atribuicoes AS uia " .
            "JOIN unidades_integrantes AS ui ON ui.id = uia.unidade_integrante_id " .
            "JOIN unidades AS u ON ui.unidade_id = u.id " .
            "JOIN usuarios AS usuario ON ui.usuario_id = usuario.id " .
            "JOIN integracao_servidores AS isr ON isr.matriculasiape = usuario.matricula " .
            "WHERE uia.atribuicao = 'LOTADO' AND u.codigo <> isr.codigo_servo_exercicio and ui.deleted_at IS NULL " .
            "AND uia.deleted_at IS NULL " .
            "ORDER BY exercicio_antigo ASC"
        );


        $sqlServidoresInseridosNaoLotados = DB::select(
          "SELECT u.id AS usuario_id, un.id AS unidade_id , u.matricula
          FROM usuarios AS u
          INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
          INNER JOIN unidades AS un ON un.codigo = ius.codigo_servo_exercicio
          WHERE u.id NOT IN
              (SELECT u.id
              FROM usuarios AS u
              INNER JOIN integracao_servidores AS ius ON u.matricula = ius.matriculasiape
              INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
              INNER  JOIN unidades_integrantes_atribuicoes AS uia ON ui.id = uia.unidade_integrante_id
              WHERE uia.atribuicao = 'LOTADO'
                AND uia.deleted_at IS NULL
              GROUP BY u.id)"
        );
        
        $atualizacoesLotacoesResult = [];
        
        DB::transaction(function () use (&$atualizacoesLotacoes, &$sqlServidoresInseridosNaoLotados, &$atualizacoesLotacoesResult) {
            $this->atualizarMatriculasUsuariosSemMatricula();

            if (!empty($sqlServidoresInseridosNaoLotados)) {
                foreach ($sqlServidoresInseridosNaoLotados as $inserirLotacao) {
                    $dbResult = $this->salvarLotacaoUsuario($inserirLotacao);
                    if($dbResult) array_push($atualizacoesLotacoesResult,$dbResult);
                }
            }

            if (!empty($atualizacoesLotacoes)) {
                foreach ($atualizacoesLotacoes as $linha) {

                    $unidadeExercicioId = isset($linha->exercicio_atual_id)?$linha->exercicio_atual_id:null;

                    $dbResult = $this->salvarLotacaoUsuario((object)[
                        'usuario_id' => $linha->usuario_id,
                        'unidade_id' => $unidadeExercicioId,
                        'linha' => $linha
                    ]);

                    if($dbResult) array_push($atualizacoesLotacoesResult,$dbResult);

                }
            }

            SiapeLog::info('Concluída a fase de atualização de servidores que apresentaram alteração nas suas lotações!.....');

            $nLotacoes = count($atualizacoesLotacoes);

            if ($nLotacoes > 0) array_push($this->result['servidores']["Observações"], $nLotacoes . ($nLotacoes == 1 ? ' servidor foi atualizado porque sofreu alteração na sua lotação!' : ' servidores foram atualizados porque sofreram alterações nas lotações!'));

            /**
             * Incluir todos servidores da tabela integracao_servidores que não estejam na tabela usuarios.
             * Foi modificado a ideia original onde era uma opção o autoincluir.
             * Obs.:: Inserção de novos servidores automaticamente.
             */

            $this->cadastrarUsuariosAusentes();

            SiapeLog::info('Concluída a fase de atualização das lotações dos servidores!.....');
        });

    }

    private function salvarLotacaoUsuario($inserirLotacao)
    {   
        if (empty($inserirLotacao->unidade_id)) {
            SiapeLog::info(sprintf("O servidor cpf #%s não tem unidade de exercicio ativa ou existente relacionada, não será alocado", $inserirLotacao['cpf']),[$inserirLotacao]);
            return false;
        }

        $vinculo = array([
            'usuario_id' => $inserirLotacao->usuario_id,
            'unidade_id' => $inserirLotacao->unidade_id,
            'atribuicoes' => [Atribuicao::LOTADO->value],
        ]);

        try {
            $dbResult = $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
        } catch (Throwable $th) {
            report($th);
            SiapeLog::error("IntegracaoService: Durante integração não foi possível alterar lotação!", [$dbResult, $vinculo]);
        }
        if (!isset($dbResult)) {
            SiapeLog::error("IntegracaoService: Houve uma falha na tentantiva de alterar a lotação", [$dbResult, $vinculo]);
        } else
            return $dbResult;
            
        return false;
    }

    private function atualizarMatriculasUsuariosSemMatricula(): void
    {
        try {
            $usuariosSemMatricula = DB::table('usuarios')
            ->whereNull('deleted_at')
            ->where(function ($q) {
                $q->whereNull('matricula')
                    ->orWhere('matricula', '');
            })
            ->whereNotNull('cpf')
            ->whereRaw("cpf <> ''")
            ->select('id', 'cpf')
            ->get();

            if ($usuariosSemMatricula->isEmpty()) {
                return;
            }

            foreach ($usuariosSemMatricula as $usr) {
                $matriculaSiape = DB::table('integracao_servidores')
                    ->where('cpf', $usr->cpf)
                    ->value('matriculasiape');

                if (!empty($matriculaSiape)) {
                    DB::table('usuarios')
                        ->where('id', $usr->id)
                        ->update(['matricula' => $matriculaSiape]);
                    SiapeLog::info(sprintf("Atualizada matrícula do usuário id=%s a partir do SIAPE.", $usr->id));
                } else {
                    SiapeLog::warning(sprintf("Matrícula SIAPE não encontrada para usuário id=%s com CPF %s.", $usr->id, $usr->cpf));
                }
            }
        } catch (Throwable $e) {
            report($e);
            SiapeLog::error(sprintf("Erro ao atualizar matrículas de usuários sem matrícula: %s", $e->getMessage()));
        }
    }
    
    private function verificaSeUsuarioSoMudouMatricula(string $cpfCheck, ?string $unidadeExercicioIdCheck, string $matriculaNova, string $codigoExercicio): bool
    {
        if (!empty($cpfCheck) && !empty($unidadeExercicioIdCheck)) {
            $usuarioLotadoMesmaUnidade = DB::table('usuarios as u')
                ->join('unidades_integrantes as ui', 'ui.usuario_id', '=', 'u.id')
                ->join('unidades_integrantes_atribuicoes as uia', 'uia.unidade_integrante_id', '=', 'ui.id')
                ->where('u.cpf', $cpfCheck)
                ->where('ui.unidade_id', $unidadeExercicioIdCheck)
                ->where('uia.atribuicao', 'LOTADO')
                ->whereNull('u.deleted_at')
                ->whereNull('uia.deleted_at')
                ->select('u.id')
                ->orderBy('u.created_at', 'asc')
                ->first();

            if (!empty($usuarioLotadoMesmaUnidade) && isset($usuarioLotadoMesmaUnidade->id)) {
                DB::table('usuarios')
                    ->where('id', $usuarioLotadoMesmaUnidade->id)
                    ->update(['matricula' => $matriculaNova]);
                SiapeLog::info(sprintf('Atualizada matrícula do usuário CPF %s para %s (unidade exercício código %s) sem criar novo usuário.',
                    (string) $cpfCheck,
                    (string) $matriculaNova,
                    (string) $codigoExercicio
                ));
                return false;
            }
            return true;
        }
        return true;
    }

    private function gerarUsuario($v_isr, $tipoModalidadeNaoIdentificada, $perfilParticipanteId)
    {
        
        $tipoModalidadePgd = $this->UtilService->valueOrDefault($v_isr['modalidade_pgd']);

        $tipoModalidadePgd = empty($tipoModalidadePgd)? $tipoModalidadeNaoIdentificada : $this->integracaoService->validarModalidadePgd($tipoModalidadePgd);
        return new Usuario([
                    'id' => Uuid::uuid4(),
                    'email' => $this->UtilService->valueOrDefault($v_isr['emailfuncional']),
                    'nome' => $this->UtilService->valueOrDefault($v_isr['nome']),
                    'cpf' => $this->UtilService->valueOrDefault($v_isr['cpf']),
                    'matricula' => $this->UtilService->valueOrDefault($v_isr['matricula']),
                    'apelido' => $this->UtilService->valueOrDefault($v_isr['apelido']),
                    'telefone' => $this->UtilService->valueOrDefault($v_isr['telefone'], null),
                    'data_nascimento' => $this->UtilService->valueOrDefault($v_isr['data_nascimento'], null),
                    'sexo' => $this->UtilService->valueOrDefault($v_isr['sexo']),
                    'situacao_funcional' => $this->UtilService->valueOrDefault($v_isr['situacao_funcional'], "DESCONHECIDO"),
                    'perfil_id' => $perfilParticipanteId,
                    'tipo_modalidade_id' => $tipoModalidadePgd,
                    'exercicio' => $this->UtilService->valueOrDefault($v_isr['exercicio']),
                    'uf' => $this->UtilService->valueOrDefault($v_isr['uf'], null),
                    'data_modificacao' => $this->UtilService->asDateTime($v_isr['data_modificacao']),
                    'ident_unica' => $this->UtilService->valueOrDefault($v_isr['ident_unica']),
                ]);
    }

    private function cadastrarUsuariosAusentes()
    {
        $query = "SELECT " .
                "isr.matriculasiape as matricula, " .
                "isr.nome as nome, isr.cpf as cpf, " .
                "isr.emailfuncional as emailfuncional, " .
                "isr.sexo as sexo, " .
                "isr.uf as uf, " .
                "isr.data_nascimento as data_nascimento, " .
                "isr.telefone as telefone, " .
                "isr.nomeguerra as apelido, " .
                "isr.codigo_servo_exercicio as exercicio, " .
                "isr.situacao_funcional as situacao_funcional, " .
                "isr.data_modificacao as data_modificacao, " .
                "isr.ident_unica as ident_unica, " .
                "isr.modalidade_pgd, ".
                "isr.funcoes as gestor " .
                "FROM integracao_servidores as isr " .
                "LEFT JOIN usuarios u on u.matricula = isr.matriculasiape " .
                "WHERE u.matricula is NULL";

        $vinculos_isr = DB::select($query);

        $perfilParticipante = NivelAcessoService::getPerfilParticipante();
        $perfilParticipanteId = null;
        if (!empty($perfilParticipante)) $perfilParticipanteId = $perfilParticipante->id;

        if (empty($perfilParticipanteId)) throw new ServerException("ValidateUsuario", "Perfil usuário comum (" . $this->usuarioComum . ") não encontrado no banco de dados. Verificar configuração no painel SaaS.\n[ver XXX_XXX]");
        
        if (empty($vinculos_isr) || !is_array($vinculos_isr)) {
            SiapeLog::info("Não foram encontrados servidores para serem inseridos na tabela usuários.");
        }

        $tipoModalidadeNaoIdentificada = $this->integracaoService->validarModalidadePgd('');
        
        foreach ($vinculos_isr as $v_isr) {
            $v_isr = $this->UtilService->object2array($v_isr);
            $cpfCheck = $this->UtilService->valueOrDefault($v_isr['cpf']);
            $matriculaNova = $this->UtilService->valueOrDefault($v_isr['matricula']);
            $codigoExercicio = $this->UtilService->valueOrDefault($v_isr['exercicio']);
            $unidadeExercicio = Unidade::where('codigo', $codigoExercicio)->first();
            $unidadeExercicioIdCheck = isset($unidadeExercicio->id) ? $unidadeExercicio->id : null;

            if(!$this->verificaSeUsuarioSoMudouMatricula($cpfCheck, $unidadeExercicioIdCheck, $matriculaNova, $codigoExercicio)) {
                continue;
            }
        
            $registro = $this->gerarUsuario($v_isr, $tipoModalidadeNaoIdentificada, $perfilParticipanteId);

            if (empty($matriculaNova)) {
                SiapeLog::info("O servidor não tem matrícula relacionada, não será cadastrado", $registro->toArray());
                continue;
            }

            $this->integracaoService->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($registro->email, $registro->matricula);

            SiapeLog::info("Inserindo servidor na tabela Usuários", $registro->toArray());
            $registro->save();

            $usuarioId = $registro->id;

            $unidadeExercicioId = null;
            $unidadeExercicioId = Unidade::where("codigo", $v_isr["exercicio"])->first();
            isset($unidadeExercicioId->id) ? $unidadeExercicioId = $unidadeExercicioId->id : $unidadeExercicioId = null;

            if (is_null($unidadeExercicioId)) {
                SiapeLog::info(sprintf("O servidor matricula #%s não tem unidade de  exercicio, não será alocado", $registro['matricula']));
                continue;
            }

            $queryAtribuicoes = $registro->getUnidadesAtribuicoesAttribute();
            $atribuicoes = [];

            if (!empty($queryAtribuicoes) && is_array($queryAtribuicoes) && array_key_exists($unidadeExercicioId, $queryAtribuicoes) && $queryAtribuicoes[$unidadeExercicioId]) {
                $atribuicoes = $queryAtribuicoes[$unidadeExercicioId];
            if (!in_array(Atribuicao::LOTADO->value, $atribuicoes)) array_push($atribuicoes, Atribuicao::LOTADO->value);
                $atribuicoes = array_values(array_unique($atribuicoes));
            } else {
                $atribuicoes = [Atribuicao::LOTADO->value];
            }

            $vinculo = array([
            'usuario_id' => $usuarioId,
            'unidade_id' => $unidadeExercicioId,
            'atribuicoes' => $atribuicoes,
            ]);

            $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
        }
    }
}
