<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;
use App\Repository\CargaIndividualSiapeRelatorioRepository;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;

class CargaIndividualSiapeRelatorioService
{
    private const STATUS_CAMPO_COM_PROBLEMA = ['divergente', 'nao_encontrado'];

    public function __construct(
        private readonly CargaIndividualSiapeRelatorioRepository $repository,
        private readonly CargaIndividualSiapeRelatorioServidorBuilder $servidorBuilder,
        private readonly CargaIndividualSiapeRelatorioUnidadeBuilder $unidadeBuilder,
    ) {
    }

    public function registrar(CargaIndividualSiapeProcessamentoDTO $contexto): CargaIndividualSiapeRelatorio
    {
        $processadoEm = $contexto->processadoEm();
        $secoes = $contexto->status === CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO
            ? []
            : $this->construirSecoes($contexto);

        return $this->repository->create([
            'processamento_id' => $contexto->processamentoId,
            'tipo' => $contexto->tipo,
            'chave' => $contexto->chave,
            'status' => $contexto->status === CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO
                ? CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO
                : $this->statusFinal($secoes, $contexto->status),
            'entrada_valida' => $contexto->entradaValida,
            'mensagem_usuario' => $this->mensagemUsuario($contexto),
            'orientacoes' => $this->orientacoes($contexto->status),
            'secoes' => $secoes,
            'solicitante_id' => $contexto->solicitanteId,
            'processado_em' => $processadoEm,
            'expira_em' => $processadoEm->addDays($this->retencaoDias()),
        ]);
    }

    public function buscarPorId(string $id): ?CargaIndividualSiapeRelatorio
    {
        return $this->repository->findById($id);
    }

    /**
     * @return Collection<int, CargaIndividualSiapeRelatorio>
     */
    public function listarRecentes(?string $tipo = null, ?string $chave = null, int $limit = 20): Collection
    {
        return $this->repository->findRecent($tipo, $chave, $limit);
    }

    public function limparExpirados(CarbonInterface $agora): int
    {
        return $this->repository->deleteExpired($agora);
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(CargaIndividualSiapeRelatorio $relatorio): array
    {
        return [
            'id' => $relatorio->id,
            'processamento_id' => $relatorio->processamento_id,
            'tipo' => $relatorio->tipo,
            'chave' => $relatorio->chave,
            'status' => $relatorio->status,
            'entrada_valida' => $relatorio->entrada_valida,
            'mensagem_usuario' => $relatorio->mensagem_usuario,
            'orientacoes' => $relatorio->orientacoes ?? [],
            'secoes' => $relatorio->secoes ?? [],
            'processado_em' => $relatorio->processado_em?->toIso8601String(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function construirSecoes(CargaIndividualSiapeProcessamentoDTO $contexto): array
    {
        if ($contexto->tipo === CargaIndividualSiapeProcessamentoDTO::TIPO_UNIDADE) {
            return $this->unidadeBuilder->construir($contexto->dadosSiape, $contexto->chave);
        }

        return $this->servidorBuilder->construir($contexto->dadosSiape, $contexto->chave);
    }

    /**
     * @param array<int, array<string, mixed>> $secoes
     */
    private function statusFinal(array $secoes, string $statusContexto): string
    {
        if ($statusContexto === CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL) {
            return CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL;
        }

        foreach ($secoes as $secao) {
            foreach (($secao['campos'] ?? []) as $campo) {
                if (in_array($campo['status'] ?? null, self::STATUS_CAMPO_COM_PROBLEMA, true)) {
                    return CargaIndividualSiapeProcessamentoDTO::STATUS_PARCIAL;
                }
            }
        }

        return CargaIndividualSiapeProcessamentoDTO::STATUS_SUCESSO;
    }

    private function mensagemUsuario(CargaIndividualSiapeProcessamentoDTO $contexto): string
    {
        if ($contexto->status !== CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO) {
            return 'Carga individual concluida. Confira os dados recebidos do SIAPE e registrados no Petrvs.';
        }

        if ($this->erroSemDados($contexto->mensagemErro)) {
            return 'O SIAPE informou que não há dados disponíveis para esta consulta. Tente executar novamente. Se o problema continuar, abra chamado no portal de atendimento.';
        }

        return 'Não foi possível concluir a carga individual. Tente executar novamente. Se o problema continuar, abra chamado no portal de atendimento.';
    }

    /**
     * @return array<int, string>
     */
    private function orientacoes(string $status): array
    {
        if ($status === CargaIndividualSiapeProcessamentoDTO::STATUS_ERRO) {
            return [
                'Tente executar a carga novamente.',
                'Se o problema continuar, abra chamado no portal de atendimento.',
            ];
        }

        return [
            'Se o valor recebido do SIAPE estiver incorreto, procure o RH do seu órgão.',
            'Se o SIAPE estiver correto e o Petrvs estiver divergente, verifique se o sistema está atualizado. Persistindo, abra chamado no portal de atendimento.',
        ];
    }

    private function retencaoDias(): int
    {
        $dias = (int) config('integracao.siape_relatorio_carga_individual.retencao_dias', 30);

        return $dias > 0 ? $dias : 30;
    }

    private function erroSemDados(?string $erro): bool
    {
        if ($erro === null || $erro === '') {
            return false;
        }

        $texto = mb_strtolower(strip_tags($erro));

        return str_contains($texto, 'não existem dados para consulta')
            || str_contains($texto, 'nao existem dados para consulta');
    }
}
