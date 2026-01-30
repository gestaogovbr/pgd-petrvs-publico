<?php

namespace App\Services\Siape;

use App\Enums\UsuarioSituacaoSiape;
use App\Exceptions\ErrorDataSiapeException;
use App\Exceptions\ErrorDataSiapeFaultCodeException;
use App\Exceptions\RequestConectaGovException;
use App\Facades\SiapeLog;
use App\Models\SiapeBlackListServidor;
use App\Models\SiapeBlacklistUnidade;
use App\Models\SiapeConsultaDadosFuncionais;
use App\Models\SiapeConsultaDadosPessoais;
use App\Models\SiapeDadosUORG;
use App\Models\Usuario;
use Exception;
use Illuminate\Support\Facades\Log;
use SimpleXMLElement;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProcessaDadosSiapeBD
{

    public function dadosServidor(): array
    {
        $results = DB::table('siape_consultaDadosPessoais AS p')
            ->join('siape_consultaDadosFuncionais AS f', 'p.cpf', '=', 'f.cpf')
            ->select('p.cpf', 'p.response AS responseDadosPessoais', 'f.response AS responseDadosFuncionais', 'p.data_modificacao')
            ->where('p.processado', 0)
            ->get();

        if ($results->isEmpty()) {
            return [];
        }


        $dadosServidorArray = [];
        $cpfsProcessados = [];

        foreach ($results as $servidor) {
            try {
                if ($this->cpfNaBlackList($servidor->cpf)) {
                    SiapeLog::info('Servidor na blacklist: ' . $servidor->cpf);
                    continue;
                }

                $dadosServidorArray[] = [
                    'cpf' => $servidor->cpf,
                    'data_modificacao' => $this->previneDataNula($servidor),
                    'dadosPessoais' => $this->processaDadosPessoais($servidor->cpf, $servidor->responseDadosPessoais),
                    'dadosFuncionais' => $this->processaDadosFuncionais($servidor->cpf, $servidor->responseDadosFuncionais),
                ];
                $cpfsProcessados[] = $servidor->cpf;
            } catch (ErrorDataSiapeException $e) {
                report($e);
                continue;
            } catch (Exception $e) {
                report($e);
                SiapeLog::error('Erro ao processar servidor #' . $servidor->cpf, [$e]);
                continue;
            }
        }

        if (!empty($cpfsProcessados)) {
            SiapeConsultaDadosPessoais::query()->whereIn('cpf', $cpfsProcessados)->update(['processado' => 1]);
            SiapeConsultaDadosFuncionais::query()->whereIn('cpf', $cpfsProcessados)->update(['processado' => 1]);
        }
        return $dadosServidorArray;
    }

    private function previneDataNula($servidor): string
    {
        return $servidor->data_modificacao ?? '1970-01-01 00:00:00';
    }

    public function processaDadosPessoais(
        string $cpf,
        string $dadosPessoais
    ): array {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosPessoais);

            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $out = $xmlResponse->xpath('//ns1:consultaDadosPessoaisResponse/out');
            if (empty($out) || !isset($out[0])) {
                throw new ErrorDataSiapeException('Retorno vazio para consulta de dados pessoais');
            }
            $dadosPessoais = $out[0];
            $dadosPessoaisArray = $this->simpleXmlElementToArray($dadosPessoais);

            return $dadosPessoaisArray;
        } catch (Exception $e) {
            report($e);
            SiapeLog::error(sprintf("CPF:#%s Falha nos dados pessoais:", $cpf), [$dadosPessoais]);
            $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
            throw new ErrorDataSiapeException("Falha ao tratar dados pessoais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape_{$tenantId}.log");
        }
    }

    public function processaDadosFuncionais(
        string $cpf,
        string $dadosFuncionais
    ): array {
        try {
            $dadosFuncionaisOrigem = $dadosFuncionais;
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosFuncionais);
            $xmlResponse->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xmlResponse->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
            $xmlResponse->registerXPathNamespace('tipo', 'http://tipo.servico.wssiapenet');

            $dadosFuncionais = $xmlResponse->xpath('//tipo:DadosFuncionais');
            $dadosFuncionaisArray = $this->decideDadosFuncionais($dadosFuncionais);
            $this->processaMultiplasMatriculasInativas($cpf, $dadosFuncionaisArray, $dadosFuncionaisOrigem);

            return $dadosFuncionaisArray;
        } catch (Exception $e) {
            report($e);
            SiapeLog::error(sprintf("CPF:#%s Falha nos dados funcionais:", $cpf), [$dadosFuncionais]);
            $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
            throw new ErrorDataSiapeException("Falha ao tratar dados funcionais do Siape, para informações detalhadas verificar storage/logs/laravel.log ou storage/logs/siape_{$tenantId}.log");
        }
    }

    private function decideDadosFuncionais(array $dadosfuncionaisArray): array
    {
        if (count($dadosfuncionaisArray) == 1) {
            return [$this->simpleXmlElementToArray($dadosfuncionaisArray[0])];
        }

        $retorno = [];
        foreach ($dadosfuncionaisArray as $dadosFuncionais) {
            $dados = $this->simpleXmlElementToArray($dadosFuncionais);
            if (!empty($dados['dataOcorrExclusao'])) continue;

            array_push($retorno, $dados);
        }
        return $retorno;
    }

    private function processaMultiplasMatriculasInativas(string $cpf, array $dadosFuncionaisArray, string $dadosFuncionais): void
    {
        $usuarios = Usuario::whereNull('deleted_at')
            ->whereIn('cpf', function ($query) use ($cpf) {
                $query->select('cpf')
                    ->from('usuarios')
                    ->whereNull('deleted_at')
                    ->whereNotNull('matricula')
                    ->where('cpf', $cpf)
                    ->groupBy('cpf')
                    ->havingRaw('COUNT(DISTINCT matricula) > 1');
            })
            ->get();

        if ($usuarios->count() <= 1) {
            return;
        }

        SiapeLog::info(sprintf("CPF:#%s possui %d matrículas ativas e inativas:", $cpf, $usuarios->count()));

        $activeMatriculas = $this->obterMatriculasAtivas($dadosFuncionaisArray);

        SiapeLog::info(sprintf("CPF:#%s Matrículas ativas: %s", $cpf, json_encode($activeMatriculas)));

        DB::transaction(function () use ($usuarios, $activeMatriculas, $cpf, $dadosFuncionais) {
            foreach ($usuarios as $usuario) {
                $matricula = $usuario->matricula;
                if (empty($matricula)) {
                    continue;
                }
                if (in_array($matricula, $activeMatriculas, true)) {
                    $this->ativarMatricula($usuario);
                    continue;
                }
                $this->adicionarBlacklistSeElegivel($cpf, $usuario, $dadosFuncionais);
            }
        });
    }

    private function obterMatriculasAtivas(array $dadosFuncionaisArray): array
    {
        return collect($dadosFuncionaisArray)
            ->map(function ($dados) {
                if (is_array($dados)) {
                    return $dados['matriculaSiape'] ?? null;
                }
                return null;
            })
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function ativarMatricula(Usuario $usuario): void
    {
        SiapeBlackListServidor::where('matricula', $usuario->matricula)->delete();
        $usuario->update([
            'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
            'data_ativacao_temporaria' => null,
            'justicativa_ativacao_temporaria' => null,
        ]);
    }

    private function adicionarBlacklistSeElegivel(string $cpf, Usuario $usuario, $dadosFuncionais): void
    {
        if (in_array($usuario->situacao_siape, [UsuarioSituacaoSiape::INATIVO->value, UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value], true)) {
            return;
        }
        SiapeBlackListServidor::firstOrCreate([
            'matricula' => $usuario->matricula,
            'response' => $dadosFuncionais,
            'cpf' => $cpf,
        ]);
        SiapeLog::info(sprintf("CPF:#%s Matrícula:#%s adicionada na lista de matrículas inativas:", $cpf, $usuario->matricula));
    }

    function simpleXmlElementToArray(SimpleXMLElement $element): array
    {
        $array = [];
        foreach ($element as $key => $value) {
            $array[$key] = (string) $value;
        }
        return $array;
    }

    public function dadosUorg(): array
    {
        $response = SiapeDadosUORG::where('processado', 0)
            ->whereNotNull('codigo')
            ->orderBy('updated_at', 'desc')->get();

        if ($response->isEmpty()) {
            return [];
        }
        $dadosUorgArray = [];
        foreach ($response as $dadosUnidades) {
            try {
                $dadosUorg = $this->processaDadosUorg($dadosUnidades->codigo, $dadosUnidades->response);
            } catch (Exception $e) {
                report($e);
                SiapeLog::error('Erro ao processar XML da Unidade: ' . $e->getMessage(), [$dadosUnidades->response]);
                continue;
            }

            if (is_null($dadosUorg)) {
                SiapeLog::error('Retorno nulo do array: ', [$dadosUnidades->response]);
                continue;
            }

            $dadosUorgArray[] = [
                'data_modificacao' => $dadosUnidades->data_modificacao,
                'dados' => $this->simpleXmlElementToArray($dadosUorg)
            ];

            $dadosUnidades->processado = 1;
            $dadosUnidades->save();
        }

        return $dadosUorgArray;
    }

    public function processaDadosUorg(string $codigo, $dados): SimpleXMLElement|null
    {
        try {
            $responseXml = $this->prepareResponseUorgXml($codigo, $dados);
        } catch (Exception $e) {
            report($e);
            throw new ErrorDataSiapeException("Erro ao processar XML da Unidade");
        }

        $responseXml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $responseXml->registerXPathNamespace('ns1', 'http://servico.wssiapenet');
        $responseXml->registerXPathNamespace('ent', 'http://entidade.wssiapenet');

        $out = $responseXml->xpath('//ns1:dadosUorgResponse/out');

        if (!$out) {
            return null;
        }

        return $out[0];
    }

    private function sanitizeXml(string &$response): void
    {
        $response = trim($response);
        $response = preg_replace('/&(?!amp;|lt;|gt;|quot;|apos;)/', '&amp;', $response);
        $response = preg_replace('/[^\P{C}\t\n\r]/u', '', $response);
        $response = preg_replace('/xmlns=""/', '', $response);
    }


    private function prepareResponseServidorXml(string $cpf, string $response): SimpleXMLElement
    {
        $responseXml = $this->prepareResponseXml($response);

        $fault = $responseXml->xpath('//soap:Fault');
        if (
            $fault && isset($fault[0]->faultcode) && (string) $fault[0]->faultcode === Erros::faultcode
            && isset($fault[0]->faultstring)
            && (function () use ($fault) {
                $faultString = trim((string) $fault[0]->faultstring);
                $faultStrings = Erros::getFaultStringNaoExistemDados();
                return in_array($faultString, $faultStrings, true)
                    || in_array(html_entity_decode($faultString, ENT_QUOTES | ENT_HTML5, 'UTF-8'), $faultStrings, true);
            })()
        ) {
            SiapeBlackListServidor::firstOrCreate(
                ['cpf' => $cpf],
                ['id' => (string) Str::uuid(), 'response' => $response]
            );

            throw new ErrorDataSiapeFaultCodeException(sprintf('faultcode #%s: ', (string) $fault[0]->faultcode) . (string) $fault[0]->faultstring);
        }
        return $responseXml;
    }

    public function prepareResponseUorgXml(string $codigo, string $response): SimpleXMLElement
    {
        $responseXml = $this->prepareResponseXml($response);

        $fault = $responseXml->xpath('//soap:Fault');

        if (
            $fault && isset($fault[0]->faultcode) && (string) $fault[0]->faultcode === Erros::faultcode
            && isset($fault[0]->faultstring)
            && (function () use ($fault) {
                $faultString = trim((string) $fault[0]->faultstring);
                $faultStrings = Erros::getFaultStringNaoExistemDados();
                $decoded = html_entity_decode($faultString, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                return in_array($faultString, $faultStrings, true) || in_array($decoded, $faultStrings, true);
            })()
        ) {
            $test = SiapeBlacklistUnidade::firstOrCreate(
                ['codigo' => $codigo],
                ['id' => (string) Str::uuid(), 'response' => $response]
            );
            Log::info("Unidade $codigo adicionada à blacklist", [$test]);

            throw new ErrorDataSiapeFaultCodeException(sprintf('faultcode #%s: ', (string) $fault[0]->faultcode) . (string) $fault[0]->faultstring);
        }
        return $responseXml;
    }

    private function prepareResponseXml(string $response): SimpleXMLElement
    {
        $this->sanitizeXml($response);
        libxml_use_internal_errors(true);
        $response = <<<XML
        $response
        XML;
        $responseXml = simplexml_load_string($response, "SimpleXMLElement", LIBXML_NOCDATA);

        if ($responseXml === false) {
            $errors = libxml_get_errors();
            foreach ($errors as $error) {
                Log::error('XML Error: ' . $error->message);
            }
            libxml_clear_errors();
            throw new RequestConectaGovException('Invalid XML response');
        }

        return $responseXml;
    }

    private function cpfNaBlackList(string $cpf): bool
    {
        return SiapeBlackListServidor::where('cpf', $cpf)
            ->whereNull('matricula')
            ->exists();
    }
}
