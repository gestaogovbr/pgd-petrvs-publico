<?php

namespace App\Services;

use App\Models\Entidade;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaServidores;
use App\Models\SiapeListaUORGS;
use App\Models\Unidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidores;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;
use DateTime;
use Carbon\Carbon;

class SiapeIndividualService extends ServiceBase
{
    private BuscarDadosSiapeServidor $buscarDadosSiapeServidor;
    private BuscarDadosSiapeUnidade $buscarDadosSiapeUnidade;
    private ProcessaDadosSiapeBD $processaDadosSiape;
    private BuscarDadosSiapeServidores $buscarDadosSiapeServidores;
    private BuscarDadosSiapeUnidades $buscarDadosSiapeUnidades;

    private mixed $config;

    public function __construct($collection = null)
    {
        parent::__construct($collection);
        $this->inicializaClassesNecessarias();
    }

    public function processaServidor(string $cpf)
    {
        $this->limpaLogSiape($cpf);
        return $this->fluxoSiape($cpf);
    }

    private function inicializaClassesNecessarias()
    {
        $this->config = config("integracao")["siape"];
        $this->buscarDadosSiapeServidor = new BuscarDadosSiapeServidor($this->config);
        $this->buscarDadosSiapeUnidade = new BuscarDadosSiapeUnidade($this->config);
        $this->buscarDadosSiapeServidores = new BuscarDadosSiapeServidores($this->config);
        $this->buscarDadosSiapeUnidades = new BuscarDadosSiapeUnidades($this->config);
        $this->processaDadosSiape = new ProcessaDadosSiapeBD();
    }

    private function limpaLogSiape(string $cpf)
    {
        $logPath = storage_path('logs/siape.log');

        if (File::exists($logPath)) {
            File::put($logPath, '');
        }
        imprimeNoTerminal('Iniciando o processo de sincronização cpf #:' . $cpf);
        Log::channel('siape')->info('Iniciando o processo de sincronização cpf #:' . $cpf);
    }


    private function getOrgao() {
        return strval(intval($this->config['codOrgao']));
    }

    private function montaXmlUnidade($codigoDaUnidade) { 
        return $this->buscarDadosSiapeUnidade->getUorgAsXml(
            $this->config['siglaSistema'],
            $this->config['nomeSistema'],
            $this->config['senha'],
            $this->buscarDadosSiapeUnidade->getCpf(),
            $this->getOrgao(),
            $codigoDaUnidade
        );
    }

    private function montaXmlListaServidores($codigoDaUnidade) {
        return $this->buscarDadosSiapeServidores->listaServidores(
            $this->config['siglaSistema'],
            $this->config['nomeSistema'],
            $this->config['senha'],
            $this->buscarDadosSiapeUnidade->getCpf(),
            $this->getOrgao(),
            $codigoDaUnidade
        );
    }

    private function fluxoSiape(string $cpf)
    {
        imprimeNoTerminal('Limpando tabelas de controle do SIAPE para o cpf');
        SiapeConsultaDadosPessoais::withTrashed()->where('cpf', $cpf)->forceDelete();
        SiapeConsultaDadosFuncionais::withTrashed()->where('cpf', $cpf)->forceDelete();

        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $codOrgao = strval(intval($this->config['codOrgao']));

        imprimeNoTerminal('Montando XML dos dados funcionais e pessoais');
        $xmlDadosFuncionais = $this->montaXMLDadosFuncionais($cpf);
        $xmlDadosPessoais   = $this->montaXmlDadosPessoais($cpf);

        imprimeNoTerminal('Executando requisicoes no SIAPE');
        $dadosFuncionaisResponseXml = $this->buscarDadosSiapeServidor
            ->executaRequisicao($xmlDadosFuncionais);

        $dadosPessoaisResponseXml = $this->buscarDadosSiapeServidor
            ->executaRequisicao($xmlDadosPessoais);

        imprimeNoTerminal('Processando retorno do SIAPE');
        $dadosFuncionais = $this->processaDadosSiape
            ->processaDadosFuncionais($cpf, $dadosFuncionaisResponseXml);

        $dadosPessoais = $this->processaDadosSiape
            ->processaDadosPessoais($cpf, $dadosFuncionaisResponseXml);


        if (!$dadosFuncionais || !$dadosPessoais) {
            throw new Exception("Não há dados para este CPF");
        }

        imprimeNoTerminal('Iniciando o processo da unidade do servidor');
        $codigoDaUnidade = strval(intval($dadosFuncionais['codUorgExercicio']));

        $unidadeJaProcessada = Unidade::where('codigo', $codigoDaUnidade)->first();

        if (!$unidadeJaProcessada) {
            throw new Exception("O CPF pertence à unidade de código $codigoDaUnidade,". 
                " que ainda não foi processada.".
                " É preciso fazer uma carga total na unidade primeiro."
            );
        }

        // obtem lista de servidores do SIAPE
        $responseListaServidores = $this->montaXmlListaServidores($codigoDaUnidade);

        $servidoresXml = $this->buscarDadosSiapeServidor->executaRequisicao($responseListaServidores);

        $siapeListaServidores = new SiapeListaServidores([
            'id' => Str::uuid(),
            'response' => $servidoresXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $servidores = $this->buscarDadosSiapeServidor->getServidores($siapeListaServidores);

        // obtem se o servidor consta na lista
        $servidor = collect($servidores)->firstWhere('cpf', $cpf);

        // obtem dados da unidade
        $xmlDadosDaUnidade = $this->montaXmlUnidade($codigoDaUnidade); //param
        $dadosUnidadeResponseXml = $this->buscarDadosSiapeUnidade->executaRequisicao($xmlDadosDaUnidade); //xml

        // // processa dados
        // $xmldadosUnidade = $this->processaDadosSiape->processaDadosUorg($dadosUnidadeResponseXml); // simpleXml
        // $dadosDaUnidade = $this->simpleXmlElementToArray($xmldadosUnidade);

        $this->buscarDadosSiapeUnidades->listaUorgs(
            $this->config['siglaSistema'],
            $this->config['nomeSistema'],
            $this->config['senha'],
            $this->buscarDadosSiapeUnidade->getCpf(),
            $codOrgao,
            $this->config['parmExistPag'],
            $this->config['parmTipoVinculo']
        );

        $uorgs = SiapeListaUORGS::where('processado', 0)
                ->orderBy('updated_at', 'desc')
                ->first();

        $listaUorgs = $this->buscarDadosSiapeUnidade->getUnidades($uorgs);

        $unidade = collect($listaUorgs)->firstWhere('codigo', $codigoDaUnidade);

        SiapeDadosUORG::insert([
            'id' => Str::uuid(),
            'data_modificacao' => DateTime::createFromFormat('dmY', $unidade['dataUltimaTransacao'])
                ->format('Y-m-d 00:00:00'),
            'response' => $dadosUnidadeResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        SiapeConsultaDadosFuncionais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => DateTime::createFromFormat('dmY', $servidor['dataUltimaTransacao'])->format('Y-m-d 00:00:00'),
            'response' => $dadosFuncionaisResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        SiapeConsultaDadosPessoais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => DateTime::createFromFormat('dmY', $servidor['dataUltimaTransacao'])->format('Y-m-d 00:00:00'),
            'response' => $dadosPessoaisResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $integracaoService = new IntegracaoService([]);
        $entidades = Entidade::all();
        $inputs = [
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
        ];
        $retorno = [];
        foreach ($entidades as $entidade) {
            $inputs['entidade'] = $entidade->id;
            $retorno = $integracaoService->sincronizar($inputs);
        }
        
        return $retorno;
    }

    private function montaXMLDadosFuncionais(string $cpf)
    {
        return $this->buscarDadosSiapeServidor->consultaDadosFuncionais(
            $this->config['siglaSistema'],
            $this->config['nomeSistema'],
            $this->config['senha'],
            $cpf,
            $this->getOrgao(),
            $this->config['parmExistPag'],
            $this->config['parmTipoVinculo']
        );
    }

    private function montaXmlDadosPessoais(string $cpf)
    {
        return $this->buscarDadosSiapeServidor->consultaDadosPessoais(
            $this->config['siglaSistema'],
            $this->config['nomeSistema'],
            $this->config['senha'],
            $cpf,
            $this->getOrgao(),
            $this->config['parmExistPag'],
            $this->config['parmTipoVinculo']
        );
    }
}
