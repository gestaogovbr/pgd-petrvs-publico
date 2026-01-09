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
        // Query para obter chefes titulares (vinculados via integracao_unidades e usuarios)
        $primeira = DB::table('integracao_unidades as iu')
            ->join('unidades as u', 'iu.codigo_siape', '=', 'u.codigo')
            ->leftJoin('usuarios as chefe', function ($join) {
                $join->on('iu.cpf_titular_autoridade_uorg', '=', 'chefe.cpf')
                    ->whereNull('chefe.deleted_at');
            })
            ->leftJoin('integracao_servidores as is_chef', function ($join) {
                $join->on('iu.cpf_titular_autoridade_uorg', '=', 'is_chef.cpf')
                    ->where('is_chef.vinculo_ativo', '=', 1);
            })
            ->join('unidades_integrantes as ui', function ($join) {
                $join->on('chefe.id', '=', 'ui.usuario_id')
                    ->on('u.id',      '=', 'ui.unidade_id');
            })
            ->join('unidades_integrantes_atribuicoes as uia', function ($join) {
                $join->on('ui.id', '=', 'uia.unidade_integrante_id')
                    ->where('uia.atribuicao', '=', 'LOTADO')
                    ->whereNull('uia.deleted_at');
            })
            ->whereNull('u.deleted_at')
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('unidades_integrantes as ui2')
                    ->join('unidades_integrantes_atribuicoes as uia2', function ($join) {
                        $join->on('ui2.id', '=', 'uia2.unidade_integrante_id')
                            ->where('uia2.atribuicao', '=', 'GESTOR')
                            ->whereNull('uia2.deleted_at');
                    })
                    ->whereColumn('ui2.usuario_id', 'chefe.id')
                    ->whereNull('ui2.deleted_at');
            })
            ->select([
                'u.id           as id_unidade',
                'chefe.id       as id_chefe',
            ]);

        // Query para obter casos onde não há titular definido (remove gestores existentes)
        $segunda = DB::table('integracao_unidades as iu')
            ->join('unidades as u', 'iu.codigo_siape', '=', 'u.codigo')
            ->join('unidades_integrantes as ui', function ($join) {
                $join->on('ui.unidade_id', '=', 'u.id')
                    ->whereNull('ui.deleted_at');
            })
            ->join('unidades_integrantes_atribuicoes as uia', function ($join) {
                $join->on('ui.id', '=', 'uia.unidade_integrante_id')
                    ->where('uia.atribuicao', '=', 'GESTOR')
                    ->whereNull('uia.deleted_at');
            })
            ->whereNull('iu.cpf_titular_autoridade_uorg')
            ->select([
                'u.id                                    as id_unidade',
                DB::raw('iu.cpf_titular_autoridade_uorg as id_chefe'),
            ]);

        return $primeira
            ->unionAll($segunda)
            ->get()
            ->map(fn($item) => (array) $item)
            ->toArray();
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
