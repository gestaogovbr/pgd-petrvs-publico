<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Services\ServiceBase;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use Illuminate\Support\Facades\DB;
use App\Facades\SiapeLog;
use App\Exceptions\LogError;
use Throwable;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UsuarioRepository;
use App\Services\UnidadeIntegranteService;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;

/**
 * @property UnidadeIntegranteService $unidadeIntegranteService
 * @property NivelAcessoService $nivelAcessoService
 * @property PerfilService $perfilService
 */
class IntegracaoGestorService extends ServiceBase
{
    public function __construct(
        private readonly IntegracaoUnidadeRepository $integracaoUnidadeRepository,
        private readonly IntegracaoServidorRepository $integracaoServidorRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {
        parent::__construct();
    }

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
                $this->unidadeIntegranteService,
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

        $unidadesIntegracao = $this->integracaoUnidadeRepository->getUnidadesComChefias();

        foreach ($unidadesIntegracao as $unidade) {
            $idUnidade = $unidade->id_unidade;
            $cpfChefe = $unidade->cpf_chefe;
            $codigoUnidade = $unidade->codigo_unidade;

            if (empty($cpfChefe)) {
                $chefias[] = ['id_unidade' => $idUnidade, 'id_chefe' => null];
                continue;
            }

            $servidorIntegracao = $this->integracaoServidorRepository->findByCpfAndCodigoExercicio($cpfChefe, $codigoUnidade);

            if (!$servidorIntegracao) {
                SiapeLog::warning("Servidor com CPF {$cpfChefe} não encontrado na tabela integracao_servidores vinculado à unidade {$codigoUnidade}. Tentando buscar apenas pelo CPF na tabela de usuários.");
            }

            $usuario = $this->usuarioRepository->findByCpf($cpfChefe);

            if (!$usuario) {
                SiapeLog::warning("Usuário com CPF {$cpfChefe} (Chefe da unidade {$codigoUnidade}) não encontrado na tabela usuarios.");
                continue;
            }

            $idUsuario = $usuario->id;

            $chefiaAtual = $this->usuarioRepository->isIntegrante($idUsuario, $idUnidade, Atribuicao::GESTOR->value);

            if ($chefiaAtual) {
                continue;
            }

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
    public function createGestorIntegracao(array $chefias, $unidadeIntegranteService, $nivelAcessoService, $perfilService, array $config): GestorIntegracao
    {
        return app(GestorIntegracao::class, [
            'dados' => $chefias,
            'unidadeIntegranteService' => $unidadeIntegranteService,
            'nivelAcessoService' => $nivelAcessoService,
            'perfilService' => $perfilService,
            'config' => $config,
        ]);
    }
}
