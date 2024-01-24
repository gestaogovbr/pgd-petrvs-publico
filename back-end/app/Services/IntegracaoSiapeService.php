<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;
use App\Models\Cidade;
use App\Exceptions\LogError;
use DateTime;
use SoapClient;
use Throwable;

class IntegracaoSiapeService extends ServiceBase {

    public $siape = '';
    private $siapeUpag = '';
    private $siapeUrl = '';
    private $siapeSiglaSistema = '';
    private $siapeNomeSistema = '';
    private $siapeSenha= '';
    private $siapeCpf= '';
    private $siapeCodOrgao = '';
    private $siapeCodUorg = '';
    private $siapeParmExistPag = '';
    private $siapeParmTipoVinculo = '';

    function __construct($config = null) {
        $config = $config ?: config("integracao")["siape"];
        $this->siapeUpag = strval(intval($config['upag']));
        $this->siapeUrl = $config['url'];
        $this->siapeSiglaSistema = $config['siglaSistema'];
        $this->siapeNomeSistema = $config['nomeSistema'];
        $this->siapeSenha = $config['senha'];
        $this->siapeCpf = $config['cpf'];
        $this->siapeCodOrgao = strval(intval($config['codOrgao']));
        $this->siapeCodUorg = strval(intval($config['codUorg']));
        $this->siapeParmExistPag = $config['parmExistPag'];
        $this->siapeParmTipoVinculo = $config['parmTipoVinculo'];
        $this->siape = new SoapClient($this->siapeUrl);
    }

    function retornarPessoa(array $pessoa): array | null {
        if(!empty($pessoa['cpf'])){
            $dadosPessoais = [];
            $dadosFuncionais = [];
            try {
                $dadosPessoais = $this->siape->consultaDadosPessoais(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $pessoa['cpf'],
                    $this->siapeCodOrgao,
                    $this->siapeParmExistPag,
                    $this->siapeParmTipoVinculo
                );
                $dadosPessoais = $this->UtilService->object2array($dadosPessoais);

                $dadosFuncionais = $this->siape->consultaDadosFuncionais(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $pessoa['cpf'],
                    $this->siapeCodOrgao,
                    $this->siapeParmExistPag,
                    $this->siapeParmTipoVinculo
                );
                $dadosFuncionais = $this->UtilService->object2array($dadosFuncionais)['dadosFuncionais']['DadosFuncionais'];

                $funcao = null;
                if(!empty($dadosFuncionais['codAtivFun']) && $dadosFuncionais['codAtivFun']){
                    $funcao = array('funcao' => ['tipo_funcao' => '1', 'uorg_funcao' => $dadosFuncionais['codUorgExercicio']]);
                    // Caso tenha mais de uma função, inserir mais arrays com a mesma estrutura.
                    // Dessa forma, bate com informações também tratadas pela PRF.
                    // Aguardando evolução de ticket aberto no MGI para reparo no SIAPE WEB SERVICE na data de 09/08/2023 20:22.
                }

                if(!empty($dadosPessoais['dataNascimento'])){
                    $dadosPessoais['dataNascimento'] = DateTime::createFromFormat('dmY', $dadosPessoais['dataNascimento'])->format('Y-m-d 00:00:00');
                }

                if(!empty($dadosFuncionais['dataOcorrIngressoOrgao'])){
                    $dadosFuncionais['dataOcorrIngressoOrgao'] = DateTime::createFromFormat('dmY', $dadosFuncionais['dataOcorrIngressoOrgao'])->format('Y-m-d 00:00:00');
                }

                if(!empty($dadosFuncionais['codUorgExercicio'])){
                    $dadosFuncionais['codUorgExercicio'] = strval(intval($dadosFuncionais['codUorgExercicio']));
                }

                $Pessoa = [
                    'cpf_ativo' => true,
                    'data_modificacao' => $pessoa['dataUltimaTransacao'],
                    'cpf' => $pessoa['cpf'],
                    'nome' => $this->UtilService->valueOrDefault($dadosPessoais['nome']),
                    'emailfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['emailInstitucional']),
                    'sexo' => $this->UtilService->valueOrDefault($dadosPessoais['nomeSexo']),
                    'municipio' => $this->UtilService->valueOrDefault($dadosPessoais['nomeMunicipNasc']),
                    'uf' => $this->UtilService->valueOrDefault($dadosPessoais['ufNascimento'], null),
                    'datanascimento' => $this->UtilService->valueOrDefault($dadosPessoais['dataNascimento']),
                    'telefone' =>  '', // Web Service Siape não fornece (23/09/2022) informação.
                    'cpf_chefia_imediata' => $this->UtilService->valueOrDefault($dadosFuncionais['cpfChefiaImediata'], null),
                    'email_chefia_imediata' => $this->UtilService->valueOrDefault($dadosFuncionais['emailChefiaImediata'], null),
                    'matriculas' => [ 'dados' => [
                        'vinculo_ativo' => true,
                        'matriculasiape' => $this->UtilService->valueOrDefault($dadosFuncionais['matriculaSiape']),
                        'tipo' => $this->UtilService->valueOrDefault($dadosFuncionais['codCargo']),
                        'coduorgexercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                        'coduorglotacao' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgLotacao']),
                        'codigo_servo_exercicio' => $this->UtilService->valueOrDefault($dadosFuncionais['codUorgExercicio']),
                        'nomeguerra' => '', // Web Service Siape não fornece (23/09/2022) informação. Tratada no IntegracaoService.
                        'codsitfuncional' => $this->UtilService->valueOrDefault($dadosFuncionais['codSitFuncional']),
                        'codupag' => $this->UtilService->valueOrDefault($dadosFuncionais['codUpag']),
                        'dataexercicionoorgao' => $this->UtilService->valueOrDefault($dadosFuncionais['dataOcorrIngressoOrgao']),
                        'funcoes' => $funcao
                        ]
                    ]
                ];
                return $Pessoa;
          } catch (Throwable $e) {
              LogError::newWarn("ISiape: Erro de conexão ou problemas com CPF ".$pessoa['cpf']." durante consulta aos dados pessoais.", $e->getMessage());
          }
        } else {
              LogError::newWarn("ISiape: erro de conexão ou inconsistência no cpf.");
        }
        return null;
    }

    public function retornarUorgs($uorgInicial = 1){
        $uorgInicial = $this->siapeCodUorg ? $this->siapeCodUorg : $uorgInicial;

        $uorgsWsdl = "";
        $uorgsPetrvs = [ "uorg" => []];

        try {
            if(!empty($this->siape)){
                $uorgsWsdl = $this->siape->listaUorgs(
                    $this->siapeSiglaSistema,
                    $this->siapeNomeSistema,
                    $this->siapeSenha,
                    $this->siapeCpf,
                    $this->siapeCodOrgao,
                    $uorgInicial);

                $uorgsWsdl = $this->UtilService->object2array($uorgsWsdl);
                $uorgsWsdl = $uorgsWsdl['Uorg'];

            }
        } catch (Throwable $e) {
            LogError::newError("ISiape: erro de conexão.", $e->getMessage());
        }

        try {
            if(!empty($uorgsWsdl)){
                foreach($uorgsWsdl as $value){
                    if(!empty($value['codigo'])){
                        $data_modificacao_siape = DateTime::createFromFormat('dmY', $value['dataUltimaTransacao'])->format('Y-m-d 00:00:00');
                        $data_modificacao_siape  = $this->UtilService->asTimestamp($data_modificacao_siape);

                        $uorg_iu = DB::table('integracao_unidades')->where('id_servo', $value['codigo'])->first();

                        if(empty($data_modificacao_siape) || empty($uorg_iu) ||
                            empty($uorg_iu->data_modificacao) ||
                            $data_modificacao_siape > $this->UtilService->asTimestamp($uorg_iu->data_modificacao)){

                            $uorgWsdl = $this->siape->dadosUorg(
                                $this->siapeSiglaSistema,
                                $this->siapeNomeSistema,
                                $this->siapeSenha,
                                $this->siapeCpf,
                                $this->siapeCodOrgao,
                                $value['codigo']);

                            $uorgWsdl = $this->UtilService->object2array($uorgWsdl);

                            // Identifica informações sobre município e demais variáveis.
                            if(!empty($this->UtilService->valueOrNull($uorgWsdl, "nomeMunicipio"))){
                                $consulta_sql = "SELECT * FROM cidades WHERE nome LIKE '".$uorgWsdl['nomeMunicipio']."'";
                                $consulta_sql = DB::select($consulta_sql);
                                if(!empty($consulta_sql)) {
                                    $consulta_sql = $this->UtilService->object2array($consulta_sql)[0];
                                    $uorgWsdl['codMunicipio'] = $consulta_sql['codigo_ibge'];
                                    $uorgWsdl['fuso_horario'] = $consulta_sql['timezone'];
                                    }
                                }

                            $value['dataUltimaTransacao'] = DateTime::createFromFormat('dmY', $value['dataUltimaTransacao'])->format('Y-m-d 00:00:00');

                            $inserir_uorg = [
                                'id_servo' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorg"))) ?: "",
                                'pai_servo' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
                                'codigo_siape' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorg"))) ?: "",
                                'pai_siape' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPai"))) ?: "",
                                'codupag' => strval(intval($this->UtilService->valueOrNull($uorgWsdl, "codUorgPagadora"))) ?: "",
                                'nomeuorg' => $this->UtilService->valueOrNull($uorgWsdl, "nomeExtendido") ?: "",
                                'siglauorg' => $this->UtilService->valueOrNull($uorgWsdl, "siglaUorg") ?: "",
                                'telefone' => $this->UtilService->valueOrNull($uorgWsdl, "telefone") ?: "",
                                'email' => $this->UtilService->valueOrNull($uorgWsdl, "email") ?: "",
                                'natureza' => '', // #$this->valueOrDefault2("nomeAreaAtuaUorg", $uorgWsdl), (Entender campo natureza).
                                'fronteira' => $this->UtilService->valueOrNull($uorgWsdl, "fronteira") ?: "", // Fronteira não consta no Web Service SIAPE.
                                'fuso_horario' => $this->UtilService->valueOrNull($uorgWsdl, "fuso_horario") ?: "",
                                'cod_uop' => $this->UtilService->valueOrNull($uorgWsdl, "cod_uop") ?: "",
                                'cod_unidade' => $this->UtilService->valueOrNull($uorgWsdl, "cod_unidade") ?: "",
                                'tipo' => $this->UtilService->valueOrNull($uorgWsdl, "tipo") ?: "",
                                'tipo_desc' => $this->UtilService->valueOrNull($uorgWsdl, "tipo_desc") ?: "",
                                'na_rodovia' => $this->UtilService->valueOrNull($uorgWsdl, "na_rodovia") ?: "",
                                'logradouro' => $this->UtilService->valueOrNull($uorgWsdl, "logradouro") ?: "",
                                'bairro' => $this->UtilService->valueOrNull($uorgWsdl, "bairro") ?: "",
                                'cep' => $this->UtilService->valueOrNull($uorgWsdl, "cep") ?: "",
                                'ptn_ge_coordenada' => $this->UtilService->valueOrNull($uorgWsdl, "ptn_ge_coordenada") ?: "",
                                'municipio_siafi_siape' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
                                'municipio_siscom' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
                                'municipio_ibge' => $this->UtilService->valueOrNull($uorgWsdl, "codMunicipio") ?: "",
                                'municipio_nome' => $this->UtilService->valueOrNull($uorgWsdl, "nomeMunicipio") ?: "",
                                'municipio_uf' => $this->UtilService->valueOrNull($uorgWsdl, "siglaUfMunicipio") ?: "",
                                'ativa' => "true", // Todas as uorgs listadas são ativas no webservice siape.
                                'regimental' => $this->UtilService->valueOrNull($uorgWsdl, "indicadorUorgRegimenta") ?: "",
                                'data_modificacao' => $this->UtilService->valueOrNull($value, "dataUltimaTransacao") ?: "",
                                'und_nu_adicional' => $this->UtilService->valueOrNull($uorgWsdl, "und_nu_adicional") ?: "",
                                'cnpjupag' => $this->UtilService->valueOrNull($uorgWsdl, "cnpjUpag") ?: ""
                            ];
                                array_push($uorgsPetrvs['uorg'], $inserir_uorg);
                            } else {
                                $uorg_iu = $this->UtilService->object2array($uorg_iu);
                                array_push($uorgsPetrvs['uorg'], $uorg_iu);
                            }
                      } else {
                            LogError::newWarn("ISiape: Ausência de código uorg.");
                      }
                }
            }
            return $uorgsPetrvs;
        }
        catch (Throwable $e) {
            LogError::newWarn("ISiape: não foi possível recuperar dados da UORG.", $e->getMessage());
        }
    }

    public function retornarPessoas(){
        $cpfsPorUorgsWsdl = [];
        $PessoasPetrvs = [ 'Pessoas' => []];
        $uorgs = DB::select("SELECT codigo_siape from integracao_unidades WHERE deleted_at is NULL");
        #$uorgs = DB::select("SELECT codigo_siape from integracao_unidades WHERE codupag=2690 and deleted_at is NULL");
        $uorgs = $this->UtilService->object2array($uorgs);

        if(!empty($this->siape) and !empty($uorgs)){
            foreach($uorgs as $codUorg){
                try{
                    $cpfsPorUorgWsdl = $this->siape->listaServidores(
                        $this->siapeSiglaSistema,
                        $this->siapeNomeSistema,
                        $this->siapeSenha,
                        $this->siapeCpf,
                        $this->siapeCodOrgao,
                        $codUorg['codigo_siape']);

                    $cpfsPorUorgWsdl = $this->UtilService->object2array($cpfsPorUorgWsdl);
                    if(array_key_exists('Servidor', $cpfsPorUorgWsdl)){
                        if(array_key_exists('cpf', $cpfsPorUorgWsdl['Servidor'])){
                            $cpf = ['cpf' => $cpfsPorUorgWsdl['Servidor']['cpf'],
                                    'dataUltimaTransacao' => DateTime::createFromFormat('dmY',
                                        $cpfsPorUorgWsdl['Servidor']['dataUltimaTransacao'])->format('Y-m-d 00:00:00')];
                            array_push($cpfsPorUorgsWsdl, $cpf);
                        } else{
                            foreach ($cpfsPorUorgWsdl['Servidor'] as $cpf){
                                $cpf = ['cpf' => $cpf['cpf'],
                                'dataUltimaTransacao' => DateTime::createFromFormat('dmY',
                                    $cpf['dataUltimaTransacao'])->format('Y-m-d 00:00:00')];
                                array_push($cpfsPorUorgsWsdl, $cpf);
                            }
                        }
                    }
                } catch (Throwable $e){
                      LogError::newWarn('ISiape: não existe servidor ativo na UORG '.$codUorg['codigo_siape'].'.', $e->getMessage());
                      continue;
                }
            }
        }

        if(!empty($this->siape) and !empty($cpfsPorUorgsWsdl)){
            foreach($cpfsPorUorgsWsdl as $pessoa){
                $data_modificacao_servidor_siape  = $this->UtilService->asTimestamp($pessoa['dataUltimaTransacao']);
                $pessoa_is = DB::table('integracao_servidores')->where('cpf', $pessoa['cpf'])->first();
                $data_modificacao_servidor_is = $pessoa_is ? $this->UtilService->asTimestamp($pessoa_is->data_modificacao) : null;

                if(empty($data_modificacao_servidor_siape) ||
                    empty($pessoa_is) ||
                    empty($pessoa_is->data_modificacao) ||
                    $data_modificacao_servidor_siape > $data_modificacao_servidor_is){

                    $qtd_tentativas= 2;
                    $tentativa = 0;
                    do {
                        try
                        {
                            $query = $this->retornarPessoa($pessoa);
                            if(!empty($query)) {
                                 array_push($PessoasPetrvs['Pessoas'], $query);
                                 break;
                            }
                            $tentativa++;
                        } catch (Throwable $e) {
                            $msg = $e->getMessage();
                            $this->siape = new SoapClient($this->siapeUrl);
                            $tentativa++;
                            usleep(10000);
                        }
                    } while($tentativa < $qtd_tentativas);

                } else {
                    $pessoa_is = $this->UtilService->object2array($pessoa_is);

                    $Pessoa = [
                        'cpf_ativo' => true,
                        'data_modificacao' => $pessoa_is['data_modificacao'],
                        'cpf' => $pessoa_is['cpf'],
                        'nome' => $pessoa_is['nome'],
                        'emailfuncional' => $pessoa_is['emailfuncional'],
                        'sexo' => $pessoa_is['sexo'],
                        'municipio' => $pessoa_is['municipio'],
                        'uf' => $pessoa_is['uf'],
                        'datanascimento' => $pessoa_is['data_nascimento'],
                        'telefone' =>  null, // Informação não fornecida (23/09/2022).
                        'cpf_chefia_imediata' => $pessoa_is['cpf_chefia_imediata'],
                        'email_chefia_imediata' => $pessoa_is['email_chefia_imediata'],
                        'matriculas' => [ 'dados' => [
                            'vinculo_ativo' => true,
                            'matriculasiape' => $pessoa_is['matriculasiape'],
                            'tipo' => $pessoa_is['codigo_cargo'],
                            'coduorgexercicio' => $pessoa_is['coduorgexercicio'],
                            'coduorglotacao' => $pessoa_is['coduorglotacao'],
                            'codigo_servo_exercicio' => $pessoa_is['codigo_servo_exercicio'],
                            'nomeguerra' => $pessoa_is['nomeguerra'], // Informação não fornecida (23/09/2022): tratada no IntegracaoService.
                            'codsitfuncional' => $this->UtilService->valueOrDefault($pessoa_is['codigo_situacao_funcional'], null),
                            'codupag' => $pessoa_is['codupag'],
                            'dataexercicionoorgao' => $pessoa_is['dataexercicionoorgao'],
                            'funcoes' => $pessoa_is['funcoes']]
                            ]
                    ];
                    array_push($PessoasPetrvs['Pessoas'], $Pessoa);
                }
            }
        }
        return $PessoasPetrvs;
    }
}
