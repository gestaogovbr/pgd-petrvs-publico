<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaUpdateDTO;
use App\V2\PlanoTrabalho\Ocorrencia\Validators\OcorrenciaStoreValidator;
use Illuminate\Support\Facades\Auth;

class OcorrenciaService
{
    public function __construct(
        private readonly OcorrenciaStoreValidator $validator,
    ) {}

    public function store(OcorrenciaStoreDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $this->validator->validarStore($plano, $dto);

        // TODO (#1984): mover para AfastamentoRepository::create
        $afastamento = Afastamento::create($dto->toPersistArray($plano->usuario_id));

        $this->vincularConsolidacoes($plano->id, $afastamento);

        return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
    }

    public function update(OcorrenciaUpdateDTO $dto): Afastamento
    {
        $plano = $this->validator->validarAutorizacao($dto->planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($dto->ocorrenciaId, $plano);

        $afastamento->update($dto->toPersistArray());

        return $afastamento->load('tipoMotivoAfastamento:id,nome,horas');
    }

    public function destroy(string $planoTrabalhoId, string $ocorrenciaId): void
    {
        $plano = $this->validator->validarAutorizacao($planoTrabalhoId, Auth::id());
        $afastamento = $this->validator->validarExistencia($ocorrenciaId, $plano);

        // TODO (#1984): mover para AfastamentoRepository (ou PlanoTrabalhoConsolidacaoAfastamentoRepository)
        PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamento->id)->delete();
        $afastamento->delete();
    }

    private function vincularConsolidacoes(string $planoTrabalhoId, Afastamento $afastamento): void
    {
        // TODO (#1984): mover para PlanoTrabalhoConsolidacaoRepository::findByPeriodo
        $consolidacoes = PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $planoTrabalhoId)
            ->where('data_inicio', '<=', $afastamento->data_fim)
            ->where('data_fim', '>=', $afastamento->data_inicio)
            ->get();

        foreach ($consolidacoes as $consolidacao) {
            // TODO (#1984): mover para PlanoTrabalhoConsolidacaoAfastamentoRepository::create
            PlanoTrabalhoConsolidacaoAfastamento::create([
                'plano_trabalho_consolidacao_id' => $consolidacao->id,
                'afastamento_id' => $afastamento->id,
                'snapshot' => json_encode([
                    'data_inicio' => $afastamento->data_inicio,
                    'data_fim' => $afastamento->data_fim,
                ]),
                'data_conclusao' => now(),
            ]);
        }
    }
}
