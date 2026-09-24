<?php

declare(strict_types=1);

namespace App\Services\Sipec\Unidade;

use App\DTOs\Sipec\UnidadeSipecDTO;
use App\Facades\SipecLog;
use App\Models\SipecUnidade;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\Sipec\SipecUnidadeRepository;

/**
 * Lê sipec_unidades não processados, parseia via UnidadeSipecDTO
 * e popula/atualiza integracao_unidades.
 */
class SipecUnidadeIntegracaoService
{
    private const CHUNK_SIZE = 100;

    public function __construct(
        private readonly SipecUnidadeRepository $sipecUnidadeRepository,
        private readonly IntegracaoUnidadeRepository $integracaoUnidadeRepository,
    ) {
    }

    /**
     * @return array{inseridas: int, atualizadas: int, descartadas: int, erros: int}
     */
    public function processar(): array
    {
        $contadores = ['inseridas' => 0, 'atualizadas' => 0, 'descartadas' => 0, 'erros' => 0];

        $this->sipecUnidadeRepository->chunkNaoProcessados(self::CHUNK_SIZE, function ($registros) use (&$contadores) {
            foreach ($registros as $registro) {
                try {
                    $resultado = $this->processarRegistro($registro);
                    $contadores[$resultado]++;
                    $this->sipecUnidadeRepository->marcarComoProcessado($registro);
                } catch (\Throwable $e) {
                    $contadores['erros']++;
                    report($e);
                    SipecLog::error('SIPEC: falha ao processar unidade', [
                        'sipec_unidade_id' => $registro->id,
                        'codigo' => $registro->codigo,
                        'erro' => $e->getMessage(),
                    ]);
                }
            }
        });

        SipecLog::info('SIPEC Unidade Integração: processamento concluído', $contadores);

        return $contadores;
    }

    /**
     * @return 'inseridas'|'atualizadas'|'descartadas'
     */
    private function processarRegistro(SipecUnidade $registro): string
    {
        $dados = json_decode($registro->response, true);

        if (empty($dados) || empty($dados['codUorg'])) {
            SipecLog::info('SIPEC: registro sipec_unidades sem codUorg', ['id' => $registro->id]);
            return 'descartadas';
        }

        $dto = UnidadeSipecDTO::fromArray($dados);
        $dadosIntegracao = $dto->toIntegracaoUnidade();
        $dadosIntegracao['deleted_at'] = null;

        $codigo = $dadosIntegracao['id_servo'];
        $existente = $this->integracaoUnidadeRepository->findByCodigo($codigo);

        if ($existente) {
            $this->integracaoUnidadeRepository->updateByIdServo($codigo, $dadosIntegracao);
            return 'atualizadas';
        }

        $this->integracaoUnidadeRepository->create($dadosIntegracao);
        return 'inseridas';
    }
}
