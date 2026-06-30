<?php

declare(strict_types=1);

namespace App\Services\Sipec\Servidor;

use App\DTOs\Sipec\ServidorSipecDTO;
use App\Enums\SituacaoFuncionalEnum;
use App\Facades\SiapeLog;
use App\Models\IntegracaoServidor;
use App\Models\SipecServidor;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\SipecServidorRepository;
use App\Support\ModalidadePgd;

/**
 * Lê sipec_servidores não processados, parseia via ServidorSipecDTO
 * e popula/atualiza integracao_servidores.
 */
class SipecServidorIntegracaoService
{
    private const CHUNK_SIZE = 100;

    public function __construct(
        private readonly IntegracaoServidorRepository $integracaoServidorRepository,
        private readonly SipecServidorRepository $sipecServidorRepository,
    ) {
    }

    /**
     * @return array{inseridos: int, atualizados: int, descartados: int, erros: int}
     */
    public function processar(): array
    {
        $contadores = ['inseridos' => 0, 'atualizados' => 0, 'descartados' => 0, 'erros' => 0];

        $this->sipecServidorRepository->chunkNaoProcessados(self::CHUNK_SIZE, function ($registros) use (&$contadores) {
            foreach ($registros as $registro) {
                try {
                    $resultado = $this->processarRegistro($registro);
                    $contadores[$resultado]++;
                    $this->sipecServidorRepository->marcarComoProcessado($registro);
                } catch (\Throwable $e) {
                    $contadores['erros']++;
                    report($e);
                    SiapeLog::error('SIPEC: falha ao processar servidor', [
                        'sipec_servidor_id' => $registro->id,
                        'cpf' => $registro->cpf,
                        'erro' => $e->getMessage(),
                    ]);
                }
            }
        });

        SiapeLog::info('SIPEC Servidor Integração: processamento concluído', $contadores);

        return $contadores;
    }

    /**
     * @return 'inseridos'|'atualizados'|'descartados'
     */
    private function processarRegistro(SipecServidor $registro): string
    {
        $dados = json_decode($registro->response, true);

        if (empty($dados) || empty($dados['cpf'])) {
            SiapeLog::info('SIPEC: registro sipec_servidores sem CPF', ['id' => $registro->id]);
            return 'descartados';
        }

        $parsed = ServidorSipecDTO::fromServidor($dados);
        $dadosPessoais = $parsed['dadosPessoais'];
        $resultado = 'descartados';

        foreach ($parsed['vinculos'] as $dto) {
            if (!empty($dto->dataOcorrExclusao)) {
                continue;
            }

            if (empty($dto->matriculaSiape)) {
                SiapeLog::info('SIPEC: vínculo sem matrícula', ['cpf' => $dadosPessoais['cpf']]);
                continue;
            }

            $vinculoResultado = $this->upsertIntegracaoServidor($dadosPessoais, $dto, $registro->data_modificacao);

            if ($resultado === 'descartados') {
                $resultado = $vinculoResultado;
            }
        }

        return $resultado;
    }

    /**
     * @param array{cpf: ?string, nome: ?string} $dadosPessoais
     * @return 'inseridos'|'atualizados'
     */
    private function upsertIntegracaoServidor(array $dadosPessoais, ServidorSipecDTO $dto, ?\DateTimeInterface $dataModificacaoFallback): string
    {
        $cpf = $dadosPessoais['cpf'];
        $matricula = $dto->matriculaSiape;
        $dataModificacao = $dto->dataUltimaTransacao ?? $dataModificacaoFallback?->format('Y-m-d H:i:s');

        $dadosIntegracao = [
            'cpf_ativo' => 'true',
            'data_modificacao' => $dataModificacao,
            'cpf' => $cpf,
            'nome' => $dadosPessoais['nome'],
            'emailfuncional' => $this->normalizarEmail($dto->emailInstitucional),
            'sexo' => null,
            'municipio' => null,
            'uf' => null,
            'data_nascimento' => null,
            'telefone' => null,
            'vinculo_ativo' => 'true',
            'matriculasiape' => $matricula,
            'codigo_cargo' => $dto->codCargo,
            'coduorgexercicio' => $dto->codUorgExercicio,
            'coduorglotacao' => $dto->codUorgLotacao,
            'codigo_servo_exercicio' => $dto->codUorgExercicio,
            'nomeguerra' => '',
            'codigo_situacao_funcional' => $dto->codSitFuncional,
            'situacao_funcional' => $this->resolverSituacaoFuncional($dto),
            'codupag' => $dto->codUpag,
            'dataexercicionoorgao' => $dto->dataOcorrIngressoOrgao,
            'funcoes' => $this->normalizarFuncoes($dto),
            'cpf_chefia_imediata' => null,
            'email_chefia_imediata' => null,
            'ident_unica' => $dto->identUnica,
            'modalidade_pgd' => ModalidadePgd::normalize($dto->modalidadePGD),
            'participa_pgd' => $this->normalizarParticipaPGD($dto->participaPGD),
            'cod_jornada' => $dto->codJornada,
            'nome_jornada' => $dto->nomeJornada,
        ];

        $existente = $this->integracaoServidorRepository->getServidor($cpf, $matricula);

        if ($existente) {
            $this->integracaoServidorRepository->update($cpf, $matricula, $dadosIntegracao);
            return 'atualizados';
        }

        $model = new IntegracaoServidor($dadosIntegracao);
        $this->integracaoServidorRepository->save($model);
        return 'inseridos';
    }

    private function resolverSituacaoFuncional(ServidorSipecDTO $dto): string
    {
        $codigo = intval($dto->codSitFuncional ?? 0);
        $resultado = SituacaoFuncionalEnum::fromCodigo($codigo);

        if ($resultado === 'DESCONHECIDO' && !empty($dto->nomeSitFuncional)) {
            return $dto->nomeSitFuncional;
        }

        return $resultado;
    }

    private function normalizarFuncoes(ServidorSipecDTO $dto): ?string
    {
        if (empty($dto->codAtivFun)) {
            return null;
        }

        $funcoes = [
            'funcao' => [
                'tipo_funcao' => '1',
                'uorg_funcao' => $dto->codUorgExercicio,
            ],
        ];

        return json_encode($funcoes, JSON_UNESCAPED_UNICODE);
    }

    private function normalizarEmail(?string $email): ?string
    {
        if (empty($email)) {
            return null;
        }

        $email = trim(mb_strtolower($email, 'UTF-8'));

        if (!str_contains($email, '@')) {
            return null;
        }

        return $email;
    }

    private function normalizarParticipaPGD(?string $valor): ?string
    {
        if ($valor === null || $valor === '') {
            return null;
        }

        $normalizado = trim(mb_strtolower($valor, 'UTF-8'));

        if (in_array($normalizado, ['sim', 's', '1', 'yes', 'true'], true)) {
            return 'sim';
        }

        return 'não';
    }
}
