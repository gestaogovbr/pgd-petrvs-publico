<?php

namespace App\Services;

use App\Facades\SiapeLog;
use App\Enums\UsuarioSituacaoSiape;
use App\Models\Entidade;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaUORGS;
use App\Models\SiapeBlackListServidor;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\Siape\Unidade\Atribuicao;
use Illuminate\Support\Str;
use Exception;
use DateTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Brazanation\Documents\Cpf;

class SiapeIndividualServidorService extends ServiceBase
{
    use Atribuicao;

    private const STATUS_SUCESSO = 'sucesso';
    private const STATUS_ERRO = 'erro';
    private const STATUS_PARCIAL = 'parcial';
    private const MSG_CONCLUIDO = 'Processamento concluído';
    private const TAMANHO_CPF = 11;
    private const MAX_PREVIEW_LOG = 200;
    private const FORMATO_DATA_SIAPE = 'dmY';
    private const FORMATO_DATA_DB = 'Y-m-d 00:00:00';

    private SiapeIndividualService $service;
    private ?array $resumo = null;

    public function getResumo(): ?array
    {
        return $this->resumo;
    }

    /**
     * Executa o fluxo completo de sincronização do SIAPE para um servidor
     * @throws Exception
     */
    public function fluxoSiape(string $cpf, SiapeIndividualService $service): ?array
    {
        SiapeLog::info("Iniciando o processo de sincronização cpf #:{$cpf}");

        $this->service = $service;
        $this->resumo = null;
        
        $cpfLimpo = $this->limparEValidarCpf($cpf);
        $usuariosAntes = $this->capturarEstadoUsuarios($cpfLimpo);

        try {
            $this->logInicioProcessamento($cpf, $cpfLimpo);
            $this->limparDadosAnteriores($cpfLimpo);

            list($xmlFuncionais, $xmlPessoais) = $this->prepararXmlsConsulta($cpfLimpo);
            list($respFuncionais, $respPessoais) = $this->executarConsultasSiape($cpfLimpo, $xmlFuncionais, $xmlPessoais);
            
            $dadosFuncionais = $this->processarRespostaFuncionais($cpfLimpo, $respFuncionais);
            
            $this->processarUnidadesDosServidores($cpfLimpo, $dadosFuncionais);
            $this->salvarDadosConsulta($cpfLimpo, $respFuncionais, $respPessoais);
            
            $this->atualizarVinculosUsuarios($cpfLimpo, $dadosFuncionais);
            $this->executarSincronizacaoFinal($cpfLimpo);
            
            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_SUCESSO);
            return $this->resumo;

        } catch (Exception $e) {
            $this->resumo = $this->gerarResumo($usuariosAntes, $cpfLimpo, self::STATUS_ERRO, $e->getMessage());
            throw $e;
        }
    }

    protected function instanciarIntegracaoService(): IntegracaoService
    {
        return new IntegracaoService([]);
    }

    protected function buscarUsuariosPorCpf(string $cpf): array
    {
        return Usuario::with(['lotacao.unidade'])
            ->where('cpf', $cpf)
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'matricula' => $u->matricula,
                'nome' => $u->nome,
                'email' => $u->email,
                'situacao_siape' => $u->situacao_siape,
                'lotacao_id' => $u->lotacao?->unidade_id
            ])->toArray();
    }

    private function capturarEstadoUsuarios(string $cpf): array
    {
        return $this->buscarUsuariosPorCpf($cpf);
    }

    private function logInicioProcessamento(string $cpfOriginal, string $cpfLimpo): void
    {
        SiapeLog::info('CPF processado', [
            'cpf_original' => $cpfOriginal,
            'cpf_limpo' => $cpfLimpo,
            'cpf_valido' => $this->validarCpf($cpfLimpo)
        ]);
    }

    protected function limparDadosSiape(string $cpf): void
    {
        SiapeConsultaDadosPessoais::withTrashed()->where('cpf', $cpf)->forceDelete();
        SiapeConsultaDadosFuncionais::withTrashed()->where('cpf', $cpf)->forceDelete();
    }

    private function limparDadosAnteriores(string $cpf): void
    {
        SiapeLog::info("Limpando tabelas de controle do SIAPE para o cpf: {$cpf}");
        $this->limparDadosSiape($cpf);
    }

    private function prepararXmlsConsulta(string $cpf): array
    {
        $codOrgao = strval(intval($this->service->config['codOrgao']));
        SiapeLog::info('Montando XML dos dados funcionais e pessoais', [
            'cpf' => $cpf,
            'cod_orgao' => $codOrgao
        ]);

        try {
            $xmlFuncionais = $this->montaXMLDadosFuncionais($cpf);
            $xmlPessoais = $this->montaXmlDadosPessoais($cpf);
            
            SiapeLog::info('XMLs montados com sucesso', [
                'xml_funcionais_tamanho' => strlen($xmlFuncionais),
                'xml_pessoais_tamanho' => strlen($xmlPessoais)
            ]);

            return [$xmlFuncionais, $xmlPessoais];
        } catch (Exception $e) {
            SiapeLog::error('Erro ao montar XMLs', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
            throw new Exception("Erro ao montar XMLs para consulta SIAPE: " . $e->getMessage());
        }
    }

    private function executarConsultasSiape(string $cpf, string $xmlFuncionais, string $xmlPessoais): array
    {
        SiapeLog::info('Executando requisicoes no SIAPE', ['cpf' => $cpf, 'timestamp' => now()->toDateTimeString()]);

        try {
            $respFuncionais = $this->service->getBuscarDadosSiapeServidor()->executaRequisicao($xmlFuncionais);
            $respPessoais = $this->service->getBuscarDadosSiapeServidor()->executaRequisicao($xmlPessoais);
            
            SiapeLog::info('Requisições executadas com sucesso', [
                'cpf' => $cpf,
                'response_funcionais_tamanho' => strlen($respFuncionais),
                'response_pessoais_tamanho' => strlen($respPessoais)
            ]);
            
            $this->logPreviewResposta($cpf, $respFuncionais, $respPessoais);

            return [$respFuncionais, $respPessoais];
        } catch (Exception $e) {
            report($e);
            throw new Exception("Erro ao consultar dados no SIAPE: " . $e->getMessage());
        }
    }

    private function logPreviewResposta(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        SiapeLog::info('Processando retorno do SIAPE', [
            'cpf' => $cpf,
            'response_funcionais_preview' => substr($respFuncionais, 0, self::MAX_PREVIEW_LOG) . '...',
            'response_pessoais_preview' => substr($respPessoais, 0, self::MAX_PREVIEW_LOG) . '...'
        ]);
    }

    private function processarRespostaFuncionais(string $cpf, string $responseXml): array
    {
        try {
            $dadosArray = $this->service->getProcessaDadosSiape()->processaDadosFuncionais($cpf, $responseXml);
            
            SiapeLog::info('Dados funcionais processados', [
                'cpf' => $cpf,
                'dados_processados' => is_array($dadosArray) ? count($dadosArray) : 'não é array',
                'tipo_dados' => gettype($dadosArray)
            ]);

            if (!$dadosArray) {
                SiapeLog::warning('Nenhum dado funcional encontrado para o CPF', [
                    'cpf' => $cpf,
                    'response_funcionais' => $responseXml
                ]);
                throw new Exception("Não há dados funcionais para este CPF: {$cpf}");
            }

            return $this->normalizarDadosFuncionais($cpf, $dadosArray);
        } catch (Exception $e) {
            report($e);
            throw new Exception("Erro ao processar dados funcionais do SIAPE: " . $e->getMessage());
        }
    }

    private function normalizarDadosFuncionais(string $cpf, mixed $dados): array
    {
        if (!is_array($dados) || !isset($dados[0])) {
            SiapeLog::info('Convertendo dados funcionais para array', [
                'cpf' => $cpf,
                'tipo_original' => gettype($dados)
            ]);
            return [$dados];
        }
        return $dados;
    }

    private function processarUnidadesDosServidores(string $cpf, array $dadosFuncionais): void
    {
        foreach ($dadosFuncionais as $index => $dados) {
            $this->processarUnidadeIndividual($cpf, $index, $dados);
        }
    }

    private function processarUnidadeIndividual(string $cpf, int $index, array $dados): void
    {
        SiapeLog::info('Iniciando o processo da unidade do servidor', [
            'cpf' => $cpf,
            'indice_dados' => $index,
            'dados_funcionais_keys' => array_keys($dados)
        ]);
        
        $codigoUnidade = strval(intval($dados['codUorgExercicio']));
        $this->validarUnidadeProcessada($cpf, $codigoUnidade, $dados);
        
        $this->sincronizarDadosUnidade($cpf, $codigoUnidade);
    }

    protected function verificarExistenciaUnidade(string $codigoUnidade): bool
    {
        return Unidade::where('codigo', $codigoUnidade)->exists();
    }

    private function validarUnidadeProcessada(string $cpf, string $codigoUnidade, array $dados): void
    {
        $unidadeProcessada = $this->verificarExistenciaUnidade($codigoUnidade);

        if (!$unidadeProcessada) {
            SiapeLog::error('Unidade não processada encontrada', [
                'cpf' => $cpf,
                'codigo_unidade' => $codigoUnidade,
                'dados_funcionais' => $dados
            ]);
            throw new Exception(
                "O CPF {$cpf} pertence à unidade de código {$codigoUnidade}, que ainda não foi processada. " .
                "É preciso fazer uma carga total na unidade primeiro."
            );
        }
    }

    private function sincronizarDadosUnidade(string $cpf, string $codigoUnidade): void
    {
        SiapeLog::info('Montando XML e executando requisição da unidade');
        $xmlUnidade = $this->montaXmlUnidade($codigoUnidade);
        $respUnidade = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlUnidade);

        $this->atualizarListaUorgs($codigoUnidade);
        $unidadeSiape = $this->buscarUnidadeNaLista($codigoUnidade);
        
        $this->salvarHistoricoUnidade($respUnidade, $unidadeSiape);
    }

    private function atualizarListaUorgs(string $codOrgao): void
    {
        $this->service->getBuscarDadosSiapeUnidades()->listaUorgs(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $codOrgao,
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );
    }

    protected function buscarUorgNaoProcessada()
    {
        return SiapeListaUORGS::where('processado', 0)
            ->orderBy('updated_at', 'desc')
            ->first();
    }

    private function buscarUnidadeNaLista(string $codigoUnidade): ?array
    {
        $uorgs = $this->buscarUorgNaoProcessada();

        $listaUorgs = $this->service->getBuscarDadosSiapeUnidade()->getUnidades($uorgs);
        return collect($listaUorgs)->firstWhere('codigo', $codigoUnidade);
    }

    protected function salvarHistoricoUnidadeDb(string $responseXml, ?array $unidadeSiape): void
    {
        SiapeDadosUORG::insert([
            'id' => Str::uuid(),
            'data_modificacao' => DateTime::createFromFormat(self::FORMATO_DATA_SIAPE, $unidadeSiape['dataUltimaTransacao'])
                ->format(self::FORMATO_DATA_DB),
            'response' => $responseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    private function salvarHistoricoUnidade(string $responseXml, ?array $unidadeSiape): void
    {
        if (!$unidadeSiape) return;

        SiapeLog::info('Salvando os dados da unidade');
        $this->salvarHistoricoUnidadeDb($responseXml, $unidadeSiape);
    }

    protected function salvarDadosConsultaDb(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        SiapeConsultaDadosFuncionais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $respFuncionais,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        SiapeConsultaDadosPessoais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $respPessoais,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    private function salvarDadosConsulta(string $cpf, string $respFuncionais, string $respPessoais): void
    {
        SiapeLog::info('Salvando os dados funcionais e pessoais do servidor');

        $this->salvarDadosConsultaDb($cpf, $respFuncionais, $respPessoais);
    }

    private function atualizarVinculosUsuarios(string $cpf, array $dadosFuncionais): void
    {
        SiapeLog::info('Iniciando remoção de vínculos para forçar nova lotação', ['cpf' => $cpf]);
        
        try {
            $this->removeVinculoParaforcarSerLotadoNovamente($cpf, $dadosFuncionais);
            SiapeLog::info('Remoção de vínculos concluída com sucesso', ['cpf' => $cpf]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao remover vínculos', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
        }
    }

    protected function buscarTodasEntidades()
    {
        return Entidade::all();
    }

    private function executarSincronizacaoFinal(string $cpf): void
    {
        SiapeLog::info('Iniciando sincronização final', ['cpf' => $cpf]);

        try {
            $integracaoService = $this->instanciarIntegracaoService();
            $entidades = $this->buscarTodasEntidades();
            
            SiapeLog::info('Processando entidades para sincronização', [
                'cpf' => $cpf,
                'total_entidades' => $entidades->count()
            ]);
            
            foreach ($entidades as $entidade) {
                $this->sincronizarEntidadeUnica($integracaoService, $entidade, $cpf);
            }
            
            SiapeLog::info('Processo de sincronização concluído com sucesso', ['cpf' => $cpf]);
        } catch (Exception $e) {
            report($e);
            throw new Exception("Erro na sincronização final: " . $e->getMessage());
        }
    }

    private function sincronizarEntidadeUnica(IntegracaoService $service, Entidade $entidade, string $cpf): void
    {
        SiapeLog::info('Sincronizando entidade', [
            'cpf' => $cpf,
            'entidade_id' => $entidade->id,
            'entidade_nome' => $entidade->nome ?? 'sem nome'
        ]);

        $service->sincronizar([
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
            'entidade' => $entidade->id
        ]);
    }

    protected function gerarUsuariosResumo(string $cpf) {
        return Usuario::with(['lotacao.unidade'])->where('cpf', $cpf)->get();
    }

    private function gerarResumo(array $usuariosAntes, string $cpf, string $status, string $mensagem = self::MSG_CONCLUIDO): array
    {
        $resumo = [];
        $usuariosDepois = $this->gerarUsuariosResumo($cpf);
        $mapAntes = collect($usuariosAntes)->keyBy(fn($u) => $u['matricula'] ?? $u['id']);

        foreach ($usuariosDepois as $uDepois) {
            $key = $uDepois->matricula ?? $uDepois->id;
            $uAntes = $mapAntes->get($key);

            $item = $this->criarItemResumo($uDepois, $uAntes, $status, $mensagem);
            $resumo[] = $item;
        }

        return $resumo;
    }

    private function criarItemResumo(Usuario $uDepois, ?array $uAntes, string $status, string $mensagem): array
    {
        $item = [
            'status' => $status,
            'nome' => $uDepois->nome,
            'usuario_existia' => !!$uAntes,
            'usuario_inserido' => !$uAntes,
            'lotacao_associada' => !empty($uDepois->lotacao),
            'alteracoes' => [],
            'mensagem' => $mensagem
        ];

        if ($uAntes) {
            $item['alteracoes'] = $this->detectarAlteracoes($uAntes, $uDepois);
        }

        if (!$item['lotacao_associada']) {
            $item['status'] = self::STATUS_PARCIAL;
            $item['mensagem'] .= ' (Lotação não associada)';
        }

        return $item;
    }

    private function detectarAlteracoes(array $uAntes, Usuario $uDepois): array
    {
        $alteracoes = [];
        $campos = ['nome', 'email', 'matricula', 'situacao_siape'];
        
        foreach ($campos as $campo) {
            if (($uAntes[$campo] ?? null) != $uDepois->$campo) {
                $alteracoes[] = $campo;
            }
        }

        if (($uAntes['lotacao_id'] ?? null) != $uDepois->lotacao?->unidade_id) {
            $alteracoes[] = 'lotacao_id';
        }

        return $alteracoes;
    }

    protected function buscarUsuariosSimples(string $cpf)
    {
        return Usuario::where('cpf', $cpf)->get();
    }

    private function removeVinculoParaforcarSerLotadoNovamente(string $cpf, array $dadosFuncionaisArray): void
    {
        $usuarios = $this->buscarUsuariosSimples($cpf);
        
        if ($usuarios->isEmpty()) {
            $this->removendoDaBlackList($cpf);
            return;
        }

        $matriculasSiape = array_map(fn($dado) => $dado['matriculaSiape'] ?? null, $dadosFuncionaisArray);

        foreach ($usuarios as $usuario) {
            $this->processarRemocaoVinculoUsuario($usuario, $cpf, $matriculasSiape);
        }
    }

    private function processarRemocaoVinculoUsuario(Usuario $usuario, string $cpf, array $matriculasSiape): void
    {
        if (!$usuario->lotacao?->unidade) return;
        
        $this->atualizarStatusUsuario($usuario);
        $this->verificarBlacklist($cpf, $usuario);
        $this->removeTodasAsGestoesDoUsuario($usuario);
        
        if (!in_array($usuario->matricula, $matriculasSiape)) {
            SiapeLog::warning('Lotação não removida: Matrícula não corresponde ao SIAPE', [
                'cpf' => $cpf,
                'matricula' => $usuario->matricula,
                'matriculas_siape' => $matriculasSiape
            ]);
            return;
        }

        $this->removeLotacao($usuario);
    }

    private function atualizarStatusUsuario(Usuario $usuario): void
    {
        $usuario->usuario_externo = 0;
        $usuario->save();
    }

    protected function buscarBlacklist(string $cpf)
    {
        return SiapeBlackListServidor::where('cpf', $cpf)->first();
    }

    private function verificarBlacklist(string $cpf, Usuario $usuario): void
    {
        try {
            $blacklistRegistro = $this->buscarBlacklist($cpf);

            if ($blacklistRegistro) {
                $this->processarRegistroBlacklist($blacklistRegistro, $usuario, $cpf);
            }
        } catch (Exception $e) {
            SiapeLog::error('Erro ao processar remoção na siape_blacklist_servidores', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            report($e);
        }
    }

    private function processarRegistroBlacklist(SiapeBlackListServidor $registro, Usuario $usuario, string $cpf): void
    {
        if ((int)($registro->inativado ?? 0) === 1) {
            $usuario->situacao_siape = UsuarioSituacaoSiape::ATIVO->value;
            $usuario->save();
            SiapeLog::info('Usuário reativado pela remoção da blacklist', [
                'cpf' => $cpf,
                'usuario_id' => $usuario->id
            ]);
        }

        $registro->forceDelete();
        SiapeLog::info('Registro removido da blacklist', ['cpf' => $cpf]);
    }

    protected function removendoDaBlackList(string $cpf): void
    {
        $blacklistRegistro = $this->buscarBlacklist($cpf);
        if ($blacklistRegistro) {
            $blacklistRegistro->forceDelete();
            SiapeLog::info('Registro removido da blacklist', ['cpf' => $cpf]);
        }
    }

    private function montaXmlUnidade($codigoDaUnidade)
    {
        return $this->service->getBuscarDadosSiapeUnidade()->getUorgAsXml(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $this->service->getOrgao(),
            $codigoDaUnidade
        );
    }

    private function montaXmlListaServidores($codigoDaUnidade)
    {
        return $this->service->getBuscarDadosSiapeServidores()->listaServidores(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
            $this->service->getOrgao(),
            $codigoDaUnidade
        );
    }

    private function montaXMLDadosFuncionais(string $cpf)
    {
        return $this->service->getBuscarDadosSiapeServidor()->consultaDadosFuncionais(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $cpf,
            $this->service->getOrgao(),
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );
    }

    private function montaXmlDadosPessoais(string $cpf)
    {
        return $this->service->getBuscarDadosSiapeServidor()->consultaDadosPessoais(
            $this->service->config['siglaSistema'],
            $this->service->config['nomeSistema'],
            $this->service->config['senha'],
            $cpf,
            $this->service->getOrgao(),
            $this->service->config['parmExistPag'],
            $this->service->config['parmTipoVinculo']
        );
    }


   
    private function limparEValidarCpf(string $cpf): string
    {
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf);

        $validator = Validator::make(['cpf' => $cpfLimpo], [
            'cpf' => ['required', 'string', 'size:' . self::TAMANHO_CPF],
        ]);

        if ($validator->fails()) {
            SiapeLog::error('CPF com formato inválido', [
                'cpf_original' => $cpf,
                'cpf_limpo' => $cpfLimpo,
                'erros' => $validator->errors()->all()
            ]);
            throw new Exception("CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos.");
        }

        try {
            new Cpf($cpfLimpo);
        } catch (\Exception $e) {
            SiapeLog::error('Erro ao validar CPF', [
                'cpf_original' => $cpf,
                'erro' => $e->getMessage()
            ]);
            throw new Exception("CPF inválido: Dígito verificador incorreto ou inválido.");
        }

        return $cpfLimpo;
    }
}
