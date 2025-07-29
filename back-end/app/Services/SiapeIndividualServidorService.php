<?php

namespace App\Services;

use App\Enums\Atribuicao as EnumsAtribuicao;
use App\Facades\SiapeLog;
use App\Models\Entidade;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use App\Models\SiapeListaUORGS;
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

        SiapeLog::info('Limpando tabelas de controle do SIAPE para o cpf');

        SiapeConsultaDadosPessoais::withTrashed()->where('cpf', $cpf)->forceDelete();
        SiapeConsultaDadosFuncionais::withTrashed()->where('cpf', $cpf)->forceDelete();

        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        $codOrgao = strval(intval($this->service->config['codOrgao']));

        SiapeLog::info('Montando XML dos dados funcionais e pessoais');

        $xmlDadosFuncionais = $this->montaXMLDadosFuncionais($cpf);
        $xmlDadosPessoais   = $this->montaXmlDadosPessoais($cpf);

        SiapeLog::info('Executando requisicoes no SIAPE');

        $dadosFuncionaisResponseXml = $this->service->getBuscarDadosSiapeServidor()
            ->executaRequisicao($xmlDadosFuncionais);

        $dadosPessoaisResponseXml = $this->service->getBuscarDadosSiapeServidor()
            ->executaRequisicao($xmlDadosPessoais);

        SiapeLog::info('retorno dos dados recebido do SIAPE', [
            'dados_funcionais' => $dadosFuncionaisResponseXml,
            'dados_pessoais' => $dadosPessoaisResponseXml,
        ]);


        SiapeLog::info('Processando retorno do SIAPE');

        $dadosFuncionais = $this->service->getProcessaDadosSiape()
            ->processaDadosFuncionais($cpf, $dadosFuncionaisResponseXml);

        if (!$dadosFuncionais) {
            throw new Exception("Não há dados para este CPF");
        }

        SiapeLog::info('Iniciando o processo da unidade do servidor');
        $codigoDaUnidade = strval(intval($dadosFuncionais['codUorgExercicio']));

        $unidadeJaProcessada = Unidade::where('codigo', $codigoDaUnidade)->first();

        SiapeLog::info('Verifica se a unidade foi processada');

        if (!$unidadeJaProcessada) {
            throw new Exception(
                "O CPF pertence à unidade de código $codigoDaUnidade," .
                    " que ainda não foi processada." .
                    " É preciso fazer uma carga total na unidade primeiro."
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

        SiapeLog::info('Salvando os dados pessoais do servidor');

        SiapeConsultaDadosPessoais::insert([
            'id' => Str::uuid(),
            'cpf' => $cpf,
            'data_modificacao' => today(),
            'response' => $dadosPessoaisResponseXml,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);


        $this->removeVinculoParaforcarSerLotadoNovamente($cpf);

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


    private function removeVinculoParaforcarSerLotadoNovamente(string $cpf)
    {
        $usuario = Usuario::where('cpf', $cpf)->first();
        if (!$usuario) {
            return;
        }

        $unidade = $usuario->lotacao->unidade;
        
        $this->removeTodasAsGestoesDoUsuario($usuario);

        if($this->usuarioTemPlanodeTrabalhoAtivo($usuario, $unidade)) {
            SiapeLog::warning('O usuário ' . $usuario->nome . ' possui plano de trabalho ativo, não será removido.');
            return;
        }

        $this->removeLotacao($usuario);
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
}
