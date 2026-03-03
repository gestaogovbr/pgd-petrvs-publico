<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Exceptions\ServerException;
use App\Exceptions\NotFoundException;
use App\Facades\SiapeLog;
use App\Services\ServiceBase;
use App\Services\UtilService;
use App\Services\UsuarioService;
use App\Services\UnidadeIntegranteService;
use App\Services\IntegracaoService;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Repository\IntegracaoServidorRepository;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use Throwable;

/**
 * @property UsuarioService $usuarioService
 * @property UnidadeIntegranteService $unidadeIntegrante
 * @property IntegracaoService $integracaoService
 */
class ProcessadorAtualizacaoDadosSiapeService extends ServiceBase
{
    private int $chunkSize = 50;
    private int $transactionRetries = 3;
    private $result;
    private $usuarioComum;
    protected UnidadeRepository $unidadeRepository;
    protected UsuarioRepository $usuarioRepository;
    protected IntegracaoServidorRepository $integracaoServidorRepository;

    public function __construct() {
        parent::__construct();
        $this->unidadeRepository = app(UnidadeRepository::class);
        $this->usuarioRepository = app(UsuarioRepository::class);
        $this->integracaoServidorRepository = app(IntegracaoServidorRepository::class);
    }

    /**
     * Busca e processa atualizações de dados dos servidores em lotes.
     */
    public function processar(&$result, $usuarioComum)
    {
        $this->result = $result;
        $this->usuarioComum = $usuarioComum;

        $this->processarDadosPessoais();
        $this->processarLotacoes();

        $result = $this->result;
    }

    private function processarDadosPessoais(): array
    {
        $atualizacoesDados = $this->buscarAtualizacoesDados();
        $chunks = array_chunk($atualizacoesDados, $this->chunkSize);

        foreach ($chunks as $chunk) {
            DB::transaction(function () use ($chunk) {
                foreach ($chunk as $linha) {
                    $this->usuarioService->atualizarServidor($linha);
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
        return $this->integracaoServidorRepository->buscarAtualizacoesDados();
    }

    private function processarLotacoes(): void
    {
        $atualizacoesLotacoes = $this->integracaoServidorRepository->getAtualizacoesLotacoes();


        $sqlServidoresInseridosNaoLotados = $this->integracaoServidorRepository->getServidoresInseridosNaoLotados();
        
        $atualizacoesLotacoesResult = [];
        
        DB::transaction(function () use (&$atualizacoesLotacoes, &$sqlServidoresInseridosNaoLotados, &$atualizacoesLotacoesResult) {
            $this->usuarioService->atualizarMatriculasUsuariosSemMatricula();

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

    /**
     * @param \stdClass $inserirLotacao
     * @return mixed
     */
    private function salvarLotacaoUsuario($inserirLotacao)
    {   
        if (empty($inserirLotacao->unidade_id)) {
            SiapeLog::info(sprintf("O servidor cpf #%s não tem unidade de exercicio ativa ou existente relacionada, não será alocado", $inserirLotacao->cpf ?? 'N/A'),[$inserirLotacao]);
            return false;
        }

        $vinculo = array([
            'usuario_id' => $inserirLotacao->usuario_id,
            'unidade_id' => $inserirLotacao->unidade_id,
            'atribuicoes' => [Atribuicao::LOTADO->value],
        ]);

        $dbResult = null;
        try {
            $dbResult = $this->unidadeIntegrante->salvarIntegrantes($vinculo, false);
        } catch (Throwable $th) {
            report($th);
            SiapeLog::error("IntegracaoService: Durante integração não foi possível alterar lotação!", [$vinculo]);
        }
        if (!isset($dbResult)) {
            SiapeLog::error("IntegracaoService: Houve uma falha na tentantiva de alterar a lotação", [$vinculo]);
        } else
            return $dbResult;
            
        return false;
    }

    private function cadastrarUsuariosAusentes()
    {
        $vinculos_isr = $this->integracaoServidorRepository->getUsuariosAusentes();

        $perfilParticipante = NivelAcessoService::getPerfilParticipante();
        $perfilParticipanteId = null;
        if (!empty($perfilParticipante)) $perfilParticipanteId = $perfilParticipante->id;

        if (empty($perfilParticipanteId)) throw new ServerException("ValidateUsuario", "Perfil usuário comum (" . $this->usuarioComum . ") não encontrado no banco de dados. Verificar configuração no painel SaaS.\n[ver XXX_XXX]");
        
        if (empty($vinculos_isr) || !is_array($vinculos_isr)) {
            SiapeLog::info("Não foram encontrados servidores para serem inseridos na tabela usuários.");
        }

        $tipoModalidadeNaoIdentificada = $this->integracaoService->validarModalidadePgd('');
        
        foreach ($vinculos_isr as $v_isr) {
            $v_isr = UtilService::object2array($v_isr);
            $cpfCheck = UtilService::valueOrDefault($v_isr['cpf']);
            $matriculaNova = UtilService::valueOrDefault($v_isr['matricula']);
            $codigoExercicio = UtilService::valueOrDefault($v_isr['exercicio']);
            $unidadeExercicio = $this->unidadeRepository->findByCodigo($codigoExercicio);
            $unidadeExercicioIdCheck = isset($unidadeExercicio->id) ? $unidadeExercicio->id : null;

            if(!$this->usuarioService->verificaSeUsuarioSoMudouMatricula($cpfCheck, $unidadeExercicioIdCheck, $matriculaNova, $codigoExercicio)) {
                continue;
            }
        
            try {
                $registro = $this->usuarioService->gerarUsuario($v_isr, $tipoModalidadeNaoIdentificada, $perfilParticipanteId);
            } catch (NotFoundException $th) {
                //já foi registrado no log
                continue;
            }
            if (empty($matriculaNova)) {
                SiapeLog::info("O servidor não tem matrícula relacionada, não será cadastrado", $registro->toArray());
                continue;
            }

            $this->integracaoService->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($registro->email, $registro->matricula);

            SiapeLog::info("Inserindo servidor na tabela Usuários", $registro->toArray());
            // $registro is a new Usuario instance from gerarUsuario (not saved)
            // We use repository to create it.
            // We need to pass attributes.
            $attributes = $registro->getAttributes();
            // Ensure ID is passed if generated
            if ($registro->id) {
                $attributes['id'] = $registro->id;
            }
            $this->usuarioRepository->create($attributes);

            $usuarioId = $registro->id;

            $unidadeExercicioId = null;
            $unidadeExercicioObj = $this->unidadeRepository->findByCodigo($v_isr["exercicio"]);
            $unidadeExercicioId = $unidadeExercicioObj ? $unidadeExercicioObj->id : null;

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
