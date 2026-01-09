<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use App\Facades\SiapeLog;
use App\Exceptions\LogError;
use Throwable;

class IntegracaoGestorService extends ServiceBase
{
    /**
     * Atualização dos Gestores.
     * 
     * @param array $inputs
     * @param array $config
     * @return array
     */
    public function atualizarGestores(array $inputs, array $config): array
    {
        $result = [];

        // Verifica se a atualização de gestores foi explicitamente desativada
        if (isset($inputs["gestores"]) && !$inputs["gestores"]) {
            $result['Resultado'] = 'Os gestores não foram atualizados, conforme solicitado!';
            return $result;
        }

        SiapeLog::info("Iniciando a fase de reconstrução das funções de chefia!.....");

        try {
            DB::beginTransaction();

            $chefes = $this->montarArrayChefias();

            SiapeLog::info("Concluída a fase de montagem do array de chefias!.....");

            $integracaoChefia = $this->createGestorIntegracao(
                $chefes,
                new Usuario(),
                $this->unidadeIntegrante,
                $this->nivelAcessoService,
                $this->perfilService,
                $config
            );

            $integracaoChefia->processar();
            $messagensRetorno = $integracaoChefia->getMessage();
            
            SiapeLog::info("Mensagens de retorno da atualização de chefias: ", $messagensRetorno);

            DB::commit();

            $result['Resultado'] = 'Sucesso';
            $result['Observações'] = [
                'Sucesso: ' . count($messagensRetorno['sucesso']) . ' chefias foram atualizadas com sucesso!',
                'Erro: ' . count($messagensRetorno['erro']) . ' chefias não puderam ser atualizadas!',
                'Aviso: ' . count($messagensRetorno['vazio']) . ' chefias vazias ou não encontradas!',
            ];

        } catch (Throwable $e) {
            DB::rollback();
            report($e);
            
            $errorMessage = "Erro ao atualizar os gestores (titulares/substitutos): " . $e->getMessage();
            SiapeLog::error($errorMessage);
            LogError::newError("Erro ao atualizar os gestores (titulares/substitutos)", $e);
            
            $result['Resultado'] = 'ERRO: ' . $e->getMessage();
        }

        SiapeLog::info("Concluída a fase de reconstrução das funções de chefia!");

        return $result;
    }

    /**
     * Monta o array de chefias baseando-se nas tabelas de integração e unidades.
     * 
     * @return array
     */
    protected function montarArrayChefias(): array
    {
        $chefias = [];

        // 1. Obter todas as unidades da tabela integracao_unidades
        $unidadesIntegracao = DB::table('integracao_unidades as iu')
            ->join('unidades as u', 'iu.codigo_siape', '=', 'u.codigo')
            ->select([
                'u.id as id_unidade',
                'u.codigo as codigo_unidade',
                'iu.cpf_titular_autoridade_uorg as cpf_chefe'
            ])
            ->whereNull('u.deleted_at')
            ->get();

        foreach ($unidadesIntegracao as $unidade) {
            $idUnidade = $unidade->id_unidade;
            $cpfChefe = $unidade->cpf_chefe;
            $codigoUnidade = $unidade->codigo_unidade;

            // 1.1 Se CPF do chefe for nulo ou vazio, remove chefia (id_chefe = null)
            if (empty($cpfChefe)) {
                $chefias[] = ['id_unidade' => $idUnidade, 'id_chefe' => null];
                continue;
            }

            // 2. Busca do Usuário (Chefe)
            // Primeiro busca na tabela integracao_servidores para garantir que é o servidor lotado nesta unidade
            $servidorIntegracao = DB::table('integracao_servidores')
                ->where('cpf', $cpfChefe)
                ->where('codigo_servo_exercicio', $codigoUnidade)
                ->first();

            if (!$servidorIntegracao) {
                SiapeLog::warning("Servidor com CPF {$cpfChefe} não encontrado na tabela integracao_servidores vinculado à unidade {$codigoUnidade}. Tentando buscar apenas pelo CPF na tabela de usuários.");
                // Fallback: Tenta buscar usuário apenas pelo CPF se não encontrar o vínculo específico
                // Isso pode acontecer se a integração de servidores ainda não rodou ou falhou para este servidor
            }

            // Busca o usuário na tabela usuarios
            $usuario = Usuario::where('cpf', $cpfChefe)->first();

            if (!$usuario) {
                SiapeLog::warning("Usuário com CPF {$cpfChefe} (Chefe da unidade {$codigoUnidade}) não encontrado na tabela usuarios.");
                continue;
            }

            $idUsuario = $usuario->id;

            // 3. Validação e Correção da Lotação
            // Verifica a lotação atual do usuário
            $lotacaoAtual = DB::table('usuarios as u')
                ->join('unidades_integrantes as ui', 'u.id', '=', 'ui.usuario_id')
                ->join('unidades_integrantes_atribuicoes as uia', 'ui.id', '=', 'uia.unidade_integrante_id')
                ->join('unidades as un', 'ui.unidade_id', '=', 'un.id')
                ->where('uia.atribuicao', 'LOTADO')
                ->whereNull('uia.deleted_at')
                ->whereNull('ui.deleted_at')
                ->where('u.id', $idUsuario)
                ->select('un.id as id_unidade_lotacao')
                ->first();
            
            $idUnidadeLotacaoAtual = $lotacaoAtual ? $lotacaoAtual->id_unidade_lotacao : null;

            // Se a lotação atual for diferente da unidade de chefia, corrige a lotação
            if ($idUnidadeLotacaoAtual !== $idUnidade) {
                SiapeLog::info("Usuário {$idUsuario} (CPF {$cpfChefe}) será lotado na unidade {$codigoUnidade} para assumir chefia.");
                
                $vinculo = [[
                    'usuario_id' => $idUsuario,
                    'unidade_id' => $idUnidade,
                    'atribuicoes' => ['LOTADO']
                ]];

                try {
                    $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
                } catch (Throwable $e) {
                    SiapeLog::error("Erro ao tentar lotar usuário {$idUsuario} na unidade {$codigoUnidade}: " . $e->getMessage());
                    // Não continua o processamento deste chefe se não conseguir lotar
                    continue; 
                }
            }

            // 4. Verificação de Chefia Existente
            // Verifica se o usuário já é chefe nesta unidade
            $chefiaAtual = DB::table('usuarios as u')
                ->join('unidades_integrantes as ui', 'u.id', '=', 'ui.usuario_id')
                ->join('unidades_integrantes_atribuicoes as uia', 'ui.id', '=', 'uia.unidade_integrante_id')
                ->where('uia.atribuicao', 'GESTOR')
                ->whereNull('uia.deleted_at')
                ->whereNull('ui.deleted_at')
                ->where('u.id', $idUsuario)
                ->where('ui.unidade_id', $idUnidade)
                ->exists();

            if ($chefiaAtual) {
                // Usuário já é chefe desta unidade, não precisa fazer nada
                continue;
            }

            // Adiciona ao array de chefias a serem atualizadas
            $chefias[] = [
                'id_unidade' => $idUnidade,
                'id_chefe' => $idUsuario
            ];
        }

        return $chefias;
    }

    /**
     * Factory method for GestorIntegracao to allow testing/mocking
     */
    public function createGestorIntegracao(array $chefias, Usuario $usuario, $unidadeIntegrante, $nivelAcessoService, $perfilService, array $config): GestorIntegracao
    {
        return new GestorIntegracao(
            $chefias,
            $usuario,
            $unidadeIntegrante,
            $nivelAcessoService,
            $perfilService,
            $config
        );
    }
}
