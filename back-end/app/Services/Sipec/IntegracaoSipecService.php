<?php

namespace App\Services\Sipec;

use App\DTOs\Sipec\ServidorSipecDTO;
use App\Facades\SiapeLog;
use App\Models\SipecServidor;
use App\Models\SipecUnidade;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;

class IntegracaoSipecService
{
    /**
     * Lê sipec_unidades não processadas e retorna no formato esperado por IntegracaoService::sincronizacao().
     * Formato: ['uorg' => [ [...], [...] ]]
     */
    public function retornarUorgs(): array
    {
        $uorgsPetrvs = ['uorg' => []];

        $registros = SipecUnidade::where('processado', false)
            ->whereNull('deleted_at')
            ->get();

        if ($registros->isEmpty()) {
            return $uorgsPetrvs;
        }

        foreach ($registros as $registro) {
            $dados = json_decode($registro->response, true);

            if (empty($dados) || empty($dados['codUorg'])) {
                SiapeLog::info('SIPEC: registro sipec_unidades sem codUorg', ['id' => $registro->id]);
                $registro->update(['processado' => true]);
                continue;
            }

            $endereco = $dados['endereco'] ?? [];
            $codMunicipio = $endereco['codMunicipio'] ?? null;
            $municipioNome = $endereco['noMunicipioTemp'] ?? null;
            $uf = $endereco['ufUorg'] ?? null;

            if (!empty($codMunicipio) && empty($municipioNome)) {
                $cidade = DB::selectOne("SELECT nome FROM cidades WHERE codigo_ibge = ?", [$codMunicipio]);
                if ($cidade) {
                    $municipioNome = $cidade->nome;
                }
            }

            $dataModificacao = $dados['dataUltimaTransacao'] ?? $registro->data_modificacao;

            $uorgsPetrvs['uorg'][] = [
                'id_servo' => strval(intval($dados['codUorg'])),
                'pai_servo' => !empty($dados['codUorgPai']) ? strval(intval($dados['codUorgPai'])) : '',
                'codigo_siape' => strval(intval($dados['codUorg'])),
                'pai_siape' => !empty($dados['codUorgPai']) ? strval(intval($dados['codUorgPai'])) : '',
                'codupag' => !empty($dados['codUorgPagadora']) ? strval(intval($dados['codUorgPagadora'])) : '',
                'nomeuorg' => $dados['nomeExtendido'] ?? $dados['nomeUorg'] ?? '',
                'siglauorg' => $dados['siglaUorg'] ?? '',
                'telefone' => $dados['numTelefoneUorg'] ?? '',
                'email' => $dados['emailUorg'] ?? '',
                'natureza' => '',
                'fronteira' => '',
                'fuso_horario' => '',
                'cod_uop' => '',
                'cod_unidade' => '',
                'tipo' => '',
                'tipo_desc' => '',
                'na_rodovia' => '',
                'logradouro' => $endereco['logradouroUorg'] ?? $endereco['endUorg'] ?? '',
                'bairro' => $endereco['bairroUorg'] ?? '',
                'cep' => $endereco['cepUorg'] ?? '',
                'ptn_ge_coordenada' => '',
                'municipio_siafi_siape' => $codMunicipio ?? '',
                'municipio_siscom' => $codMunicipio ?? '',
                'municipio_ibge' => $codMunicipio ?? '',
                'municipio_nome' => $municipioNome ?? '',
                'municipio_uf' => $uf ?? '',
                'ativa' => 'true',
                'regimental' => $dados['dadoComplementar']['indicadorUorgRegimenta'] ?? '',
                'data_modificacao' => $dataModificacao,
                'und_nu_adicional' => '',
                'cnpjupag' => $dados['cnpjUpag'] ?? '',
                'cpf_titular_autoridade_uorg' => '',
                'cpf_substituto_autoridade_uorg' => '',
            ];

            $registro->update(['processado' => true]);
        }

        return $uorgsPetrvs;
    }

    /**
     * Lê sipec_servidores não processados e retorna no formato esperado por IntegracaoService::sincronizacao().
     * Formato: ['Pessoas' => [ ['pessoal' => [...], 'funcionais' => [...]], ... ]]
     */
    public function retornarServidores(): array
    {
        $pessoasPetrvs = ['Pessoas' => []];

        $registros = SipecServidor::where('processado', false)
            ->whereNull('deleted_at')
            ->get();

        if ($registros->isEmpty()) {
            return $pessoasPetrvs;
        }

        foreach ($registros as $registro) {
            $dados = json_decode($registro->response, true);

            if (empty($dados) || empty($dados['cpf'])) {
                SiapeLog::info('SIPEC: registro sipec_servidores sem CPF', ['id' => $registro->id]);
                $registro->update(['processado' => true]);
                continue;
            }

            $parsed = ServidorSipecDTO::fromServidor($dados);
            $dadosPessoais = $parsed['dadosPessoais'];

            foreach ($parsed['vinculos'] as $dto) {
                if (!empty($dto->dataOcorrExclusao)) {
                    continue;
                }

                $pessoal = [
                    'cpf_ativo' => true,
                    'data_modificacao' => $dto->dataUltimaTransacao ?? $registro->data_modificacao,
                    'cpf' => $dadosPessoais['cpf'],
                    'nome' => $dadosPessoais['nome'],
                    'sexo' => null,
                    'municipio' => null,
                    'uf' => null,
                    'data_nascimento' => null,
                    'telefone' => '',
                ];

                $funcional = [
                    'emailfuncional' => $dto->emailInstitucional,
                    'cpf_chefia_imediata' => null,
                    'email_chefia_imediata' => null,
                    'matriculas' => [
                        'dados' => [
                            'vinculo_ativo' => true,
                            'matriculasiape' => $dto->matriculaSiape,
                            'tipo' => $dto->codCargo,
                            'coduorgexercicio' => $dto->codUorgExercicio,
                            'coduorglotacao' => $dto->codUorgLotacao,
                            'codigo_servo_exercicio' => $dto->codUorgExercicio,
                            'nomeguerra' => '',
                            'codsitfuncional' => $dto->codSitFuncional,
                            'nome_sit_funcional' => $dto->nomeSitFuncional,
                            'codupag' => $dto->codUpag,
                            'dataexercicionoorgao' => $dto->dataOcorrIngressoOrgao,
                            'funcoes' => !empty($dto->codAtivFun) ? [
                                'funcao' => [
                                    'tipo_funcao' => '1',
                                    'uorg_funcao' => $dto->codUorgExercicio,
                                ],
                            ] : null,
                            'ident_unica' => $dto->identUnica,
                            'modalidade_pgd' => $dto->modalidadePGD,
                            'participa_pgd' => $dto->participaPGD,
                            'cod_jornada' => $dto->codJornada,
                            'nome_jornada' => $dto->nomeJornada,
                        ],
                    ],
                ];

                $pessoasPetrvs['Pessoas'][] = [
                    'pessoal' => $pessoal,
                    'funcionais' => [$funcional],
                ];
            }

            $registro->update(['processado' => true]);
        }

        return $pessoasPetrvs;
    }
}
