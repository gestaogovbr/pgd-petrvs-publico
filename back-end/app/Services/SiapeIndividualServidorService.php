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

class SiapeIndividualServidorService extends ServiceBase
{
    use LogTrait, Atribuicao;

    private SiapeIndividualService $service;

    public function fluxoSiape(string $cpf, SiapeIndividualService $service)
    {
        SiapeLog::info('Iniciando o processo de sincronização cpf #:' . $cpf);

        $this->service = $service;

        $cpfOriginal = $cpf;
        $cpf = $this->limparEValidarCpf($cpf);
        
        SiapeLog::info('CPF processado', [
            'cpf_original' => $cpfOriginal,
            'cpf_limpo' => $cpf,
            'cpf_valido' => $this->validarCpf($cpf)
        ]);

        SiapeLog::info('Limpando tabelas de controle do SIAPE para o cpf: ' . $cpf);

        SiapeConsultaDadosPessoais::withTrashed()->where('cpf', $cpf)->forceDelete();
        SiapeConsultaDadosFuncionais::withTrashed()->where('cpf', $cpf)->forceDelete();

        $codOrgao = strval(intval($this->service->config['codOrgao']));

        SiapeLog::info('Montando XML dos dados funcionais e pessoais', [
            'cpf' => $cpf,
            'cod_orgao' => $codOrgao
        ]);

        try {
            $xmlDadosFuncionais = $this->montaXMLDadosFuncionais($cpf);
            $xmlDadosPessoais   = $this->montaXmlDadosPessoais($cpf);
            
            SiapeLog::info('XMLs montados com sucesso', [
                'xml_funcionais_tamanho' => strlen($xmlDadosFuncionais),
                'xml_pessoais_tamanho' => strlen($xmlDadosPessoais)
            ]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao montar XMLs', [
                'cpf' => $cpf,
                'erro' => $e->getMessage()
            ]);
            throw new Exception("Erro ao montar XMLs para consulta SIAPE: " . $e->getMessage());
        }

        SiapeLog::info('Executando requisicoes no SIAPE', [
            'cpf' => $cpf,
            'timestamp' => now()->toDateTimeString()
        ]);

        try {
            $dadosFuncionaisResponseXml = $this->service->getBuscarDadosSiapeServidor()
                ->executaRequisicao($xmlDadosFuncionais);

            $dadosPessoaisResponseXml = $this->service->getBuscarDadosSiapeServidor()
                ->executaRequisicao($xmlDadosPessoais);
                
            SiapeLog::info('Requisições executadas com sucesso', [
                'cpf' => $cpf,
                'response_funcionais_tamanho' => strlen($dadosFuncionaisResponseXml),
                'response_pessoais_tamanho' => strlen($dadosPessoaisResponseXml)
            ]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao executar requisições no SIAPE', [
                'cpf' => $cpf,
                'erro' => $e->getMessage()
            ]);
            throw new Exception("Erro ao consultar dados no SIAPE: " . $e->getMessage());
        }

        SiapeLog::info('retorno dos dados recebido do SIAPE', [
            'dados_funcionais' => $dadosFuncionaisResponseXml,
            'dados_pessoais' => $dadosPessoaisResponseXml,
        ]);


        SiapeLog::info('Processando retorno do SIAPE', [
            'cpf' => $cpf,
            'response_funcionais_preview' => substr($dadosFuncionaisResponseXml, 0, 200) . '...',
            'response_pessoais_preview' => substr($dadosPessoaisResponseXml, 0, 200) . '...'
        ]);

        try {
            $dadosFuncionaisArray = $this->service->getProcessaDadosSiape()
                ->processaDadosFuncionais($cpf, $dadosFuncionaisResponseXml);
                
            SiapeLog::info('Dados funcionais processados', [
                'cpf' => $cpf,
                'dados_processados' => is_array($dadosFuncionaisArray) ? count($dadosFuncionaisArray) : 'não é array',
                'tipo_dados' => gettype($dadosFuncionaisArray)
            ]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao processar dados funcionais', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
            ]);
            throw new Exception("Erro ao processar dados funcionais do SIAPE: " . $e->getMessage());
        }

        if (!$dadosFuncionaisArray) {
            SiapeLog::warning('Nenhum dado funcional encontrado para o CPF', [
                'cpf' => $cpf,
                'response_funcionais' => $dadosFuncionaisResponseXml
            ]);
            throw new Exception("Não há dados funcionais para este CPF: {$cpf}");
        }

        if (!is_array($dadosFuncionaisArray) || !isset($dadosFuncionaisArray[0])) {
            SiapeLog::info('Convertendo dados funcionais para array', [
                'cpf' => $cpf,
                'tipo_original' => gettype($dadosFuncionaisArray)
            ]);
            $dadosFuncionaisArray = [$dadosFuncionaisArray];
        }

        foreach ($dadosFuncionaisArray as $index => $dadosFuncionais) {
            SiapeLog::info('Iniciando o processo da unidade do servidor', [
                'cpf' => $cpf,
                'indice_dados' => $index,
                'dados_funcionais_keys' => array_keys($dadosFuncionais)
            ]);
            
            $codigoDaUnidade = strval(intval($dadosFuncionais['codUorgExercicio']));
            
            SiapeLog::info('Código da unidade extraído', [
                'cpf' => $cpf,
                'codigo_unidade' => $codigoDaUnidade,
                'codUorgExercicio_original' => $dadosFuncionais['codUorgExercicio'] ?? 'não definido'
            ]);

            $unidadeJaProcessada = Unidade::where('codigo', $codigoDaUnidade)->first();

            SiapeLog::info('Verifica se a unidade foi processada', [
                'cpf' => $cpf,
                'codigo_unidade' => $codigoDaUnidade,
                'unidade_encontrada' => $unidadeJaProcessada ? true : false,
                'unidade_id' => $unidadeJaProcessada ? $unidadeJaProcessada->id : null
            ]);

            if (!$unidadeJaProcessada) {
                SiapeLog::error('Unidade não processada encontrada', [
                    'cpf' => $cpf,
                    'codigo_unidade' => $codigoDaUnidade,
                    'dados_funcionais' => $dadosFuncionais
                ]);
                throw new Exception(
                    "O CPF {$cpf} pertence à unidade de código {$codigoDaUnidade}, " .
                    "que ainda não foi processada. " .
                    "É preciso fazer uma carga total na unidade primeiro."
                );
            }

            SiapeLog::info('Montando XML dos dados da unidade');

            $xmlDadosDaUnidade = $this->montaXmlUnidade($codigoDaUnidade);

            SiapeLog::info('Executando requisicao no SIAPE');

            $dadosUnidadeResponseXml = $this->service->getBuscarDadosSiapeUnidade()->executaRequisicao($xmlDadosDaUnidade); //xml


            $this->service->getBuscarDadosSiapeUnidades()->listaUorgs(
                $this->service->config['siglaSistema'],
                $this->service->config['nomeSistema'],
                $this->service->config['senha'],
                $this->service->getBuscarDadosSiapeUnidade()->getCpf(),
                $codOrgao,
                $this->service->config['parmExistPag'],
                $this->service->config['parmTipoVinculo']
            );

            $uorgs = SiapeListaUORGS::where('processado', 0)
                ->orderBy('updated_at', 'desc')
                ->first();

            $listaUorgs = $this->service->getBuscarDadosSiapeUnidade()->getUnidades($uorgs);

            $unidade = collect($listaUorgs)->firstWhere('codigo', $codigoDaUnidade);

            SiapeLog::info('Salvando os dados da unidade');

            SiapeDadosUORG::insert([
                'id' => Str::uuid(),
                'data_modificacao' => DateTime::createFromFormat('dmY', $unidade['dataUltimaTransacao'])
                    ->format('Y-m-d 00:00:00'),
                'response' => $dadosUnidadeResponseXml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            SiapeLog::info('Salvando os dados funcionais do servidor');

            SiapeConsultaDadosFuncionais::insert([
                'id' => Str::uuid(),
                'cpf' => $cpf,
                'data_modificacao' => today(),
                'response' => $dadosFuncionaisResponseXml,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        SiapeLog::info('Salvando os dados pessoais do servidor');

        SiapeConsultaDadosPessoais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $dadosPessoaisResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);


        SiapeLog::info('Iniciando remoção de vínculos para forçar nova lotação', [
            'cpf' => $cpf
        ]);
        
        try {
            $this->removeVinculoParaforcarSerLotadoNovamente($cpf);
            SiapeLog::info('Remoção de vínculos concluída com sucesso', [
                'cpf' => $cpf
            ]);
        } catch (Exception $e) {
            SiapeLog::error('Erro ao remover vínculos', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
            ]);
            // Não interrompe o fluxo, apenas loga o erro
        }

        SiapeLog::info('Iniciando sincronização final', [
            'cpf' => $cpf
        ]);

        try {
            $integracaoService = new IntegracaoService([]);

            $entidades = Entidade::all();
            $inputs = [
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,
            ];
            $retorno = [];
            
            SiapeLog::info('Processando entidades para sincronização', [
                'cpf' => $cpf,
                'total_entidades' => $entidades->count()
            ]);
            
            foreach ($entidades as $entidade) {
                $inputs['entidade'] = $entidade->id;
                SiapeLog::info('Sincronizando entidade', [
                    'cpf' => $cpf,
                    'entidade_id' => $entidade->id,
                    'entidade_nome' => $entidade->nome ?? 'sem nome'
                ]);
                $retorno = $integracaoService->sincronizar($inputs);
            }
            
            SiapeLog::info('Processo de sincronização concluído com sucesso', [
                'cpf' => $cpf,
                'retorno_keys' => is_array($retorno) ? array_keys($retorno) : 'não é array'
            ]);

            return $retorno;
        } catch (Exception $e) {
            SiapeLog::error('Erro na sincronização final', [
                'cpf' => $cpf,
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw new Exception("Erro na sincronização final: " . $e->getMessage());
        }
    }


    private function removeVinculoParaforcarSerLotadoNovamente(string $cpf)
    {
        // Pode existir mais de um usuário com o mesmo CPF: executa o fluxo para cada um
        $usuarios = Usuario::where('cpf', $cpf)->get();
        if ($usuarios->isEmpty()) {
            $this->removendoDaBlackList($cpf);
            return;
        }

        foreach ($usuarios as $usuario) {
            $unidade = $usuario->lotacao?->unidade;

            if(!$unidade) {
                continue;
            }
            
            $usuario->usuario_externo = 0;
            $usuario->save();

            try {
                $blacklistRegistro = SiapeBlackListServidor::where('cpf', $cpf)
                    ->first();

                if ($blacklistRegistro) {
                    if ((int)($blacklistRegistro->inativado ?? 0) === 1) {
                        $usuario->situacao_siape = UsuarioSituacaoSiape::ATIVO->value;
                        $usuario->save();
                        SiapeLog::info('Usuário reativado pela remoção da blacklist (inativado=1)', [
                            'cpf' => $cpf,
                            'usuario_id' => $usuario->id ?? null,
                        ]);
                    }

                    $blacklistRegistro->forceDelete();
                    SiapeLog::info('Registro removido da tabela siape_blacklist_servidores', [
                        'cpf' => $cpf
                    ]);
                }
            } catch (Exception $e) {
                SiapeLog::error('Erro ao processar remoção na siape_blacklist_servidores', [
                    'cpf' => $cpf,
                    'erro' => $e->getMessage()
                ]);
            }
            
            $this->removeTodasAsGestoesDoUsuario($usuario);

            $this->removeLotacao($usuario);
        }
    }

    private function removendoDaBlackList(string $cpf) :void
    {
        $blacklistRegistro = SiapeBlackListServidor::where('cpf', $cpf)
                    ->first();

        if ($blacklistRegistro) {
            $blacklistRegistro->forceDelete();
            SiapeLog::info('Registro removido da tabela siape_blacklist_servidores', [
                'cpf' => $cpf
            ]);
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
        return $this->buscarDadosSiapeServidores->listaServidores(
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

    /**
     * Limpa e valida o CPF removendo caracteres especiais e verificando formato
     */
    private function limparEValidarCpf(string $cpf): string
    {
        // Remove todos os caracteres não numéricos
        $cpfLimpo = preg_replace('/[^0-9]/', '', $cpf);
        
        // Verifica se o CPF tem 11 dígitos
        if (strlen($cpfLimpo) !== 11) {
            SiapeLog::error('CPF inválido: deve ter 11 dígitos', [
                'cpf_original' => $cpf,
                'cpf_limpo' => $cpfLimpo,
                'tamanho' => strlen($cpfLimpo)
            ]);
            throw new Exception("CPF inválido: deve conter exatamente 11 dígitos. CPF recebido: {$cpf}");
        }
        
        // Verifica se não são todos os dígitos iguais
        if (preg_match('/(\d)\1{10}/', $cpfLimpo)) {
            SiapeLog::error('CPF inválido: todos os dígitos são iguais', [
                'cpf_original' => $cpf,
                'cpf_limpo' => $cpfLimpo
            ]);
            throw new Exception("CPF inválido: não pode ter todos os dígitos iguais. CPF recebido: {$cpf}");
        }
        
        return $cpfLimpo;
    }

    /**
     * Valida se o CPF é válido usando o algoritmo de validação
     */
    private function validarCpf(string $cpf): bool
    {
        if (strlen($cpf) !== 11) {
            return false;
        }

        // Verifica se não são todos os dígitos iguais
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += intval($cpf[$i]) * (10 - $i);
        }
        $resto = $soma % 11;
        $digito1 = ($resto < 2) ? 0 : 11 - $resto;

        // Calcula o segundo dígito verificador
        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += intval($cpf[$i]) * (11 - $i);
        }
        $resto = $soma % 11;
        $digito2 = ($resto < 2) ? 0 : 11 - $resto;

        // Verifica se os dígitos calculados conferem com os informados
        return (intval($cpf[9]) === $digito1 && intval($cpf[10]) === $digito2);
    }
}
