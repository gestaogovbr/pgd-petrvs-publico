<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho;

use App\Exceptions\ValidateException;
use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Models\Usuario;
use App\V2\Usuario\DispensaPlanoTrabalho\DTOs\DispensaPlanoTrabalhoResumoDTO;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

final class DispensaPlanoTrabalhoService
{
    public function __construct(
        private readonly DispensaPlanoTrabalhoAuthorization $authorization,
        private readonly DispensaPlanoTrabalhoAssembler $assembler,
    ) {}

    public function show(string $usuarioId, Usuario $ator): DispensaPlanoTrabalhoResumoDTO
    {
        $agente = $this->authorization->findAgenteOrFail($usuarioId);
        $this->authorization->assertPerfilPodeFormalizar($ator);
        $this->authorization->assertEscopoUnidade($ator, $agente);

        return $this->montar($agente, $ator);
    }

    /**
     * @param  array{data_inicio: string, data_fim: string|null, ciencia: bool}  $dados
     */
    public function formalizarOuAlterar(string $usuarioId, Usuario $ator, array $dados): DispensaPlanoTrabalhoResumoDTO
    {
        $agente = $this->authorization->findAgenteOrFail($usuarioId);
        $this->authorization->assertPerfilPodeFormalizar($ator);
        $this->authorization->assertEscopoUnidade($ator, $agente);

        $existente = DispensaPlanoTrabalho::query()
            ->where('usuario_id', $agente->id)
            ->first();

        if (!$existente instanceof DispensaPlanoTrabalho) {
            $this->authorization->assertElegivel($usuarioId);
        }

        $agora = Carbon::now();

        DB::transaction(function () use ($agente, $ator, $dados, $agora, $existente) {
            $operacao = $existente
                ? DispensaPlanoTrabalhoOperacao::ALTERAR
                : DispensaPlanoTrabalhoOperacao::FORMALIZAR;

            if ($existente) {
                $existente->fill([
                    'data_inicio' => $dados['data_inicio'],
                    'data_fim' => $dados['data_fim'],
                    'ciencia_em' => $agora,
                    'responsavel_id' => $ator->id,
                ]);
                $existente->save();
                $dispensa = $existente;
            } else {
                $dispensa = DispensaPlanoTrabalho::query()->create([
                    'usuario_id' => $agente->id,
                    'data_inicio' => $dados['data_inicio'],
                    'data_fim' => $dados['data_fim'],
                    'ciencia_em' => $agora,
                    'responsavel_id' => $ator->id,
                ]);
            }

            $this->registrarHistorico($dispensa, $operacao, $ator, $agora);
        });

        $agente->refresh();

        return $this->montar($agente, $ator);
    }

    public function encerrar(string $usuarioId, Usuario $ator): DispensaPlanoTrabalhoResumoDTO
    {
        $agente = $this->authorization->findAgenteOrFail($usuarioId);
        $this->authorization->assertPerfilPodeFormalizar($ator);
        $this->authorization->assertEscopoUnidade($ator, $agente);

        /** @var DispensaPlanoTrabalho|null $dispensa */
        $dispensa = DispensaPlanoTrabalho::query()
            ->where('usuario_id', $agente->id)
            ->first();

        if (!$dispensa instanceof DispensaPlanoTrabalho || !$dispensa->isVigente()) {
            throw new ValidateException('Não há dispensa vigente para encerrar.');
        }

        if ($dispensa->data_fim !== null) {
            throw new ValidateException('A dispensa já possui data de fim informada.');
        }

        $agora = Carbon::now();
        $hoje = Carbon::today()->toDateString();

        DB::transaction(function () use ($dispensa, $ator, $agora, $hoje) {
            $dispensa->data_fim = $hoje;
            $dispensa->ciencia_em = $agora;
            $dispensa->responsavel_id = $ator->id;
            $dispensa->save();

            $this->registrarHistorico($dispensa, DispensaPlanoTrabalhoOperacao::ENCERRAR, $ator, $agora);
        });

        $agente->refresh();

        return $this->montar($agente, $ator);
    }

    private function montar(Usuario $agente, Usuario $ator): DispensaPlanoTrabalhoResumoDTO
    {
        $dispensa = DispensaPlanoTrabalho::query()
            ->with(['responsavel'])
            ->where('usuario_id', $agente->id)
            ->first();

        $historicos = [];
        if ($dispensa) {
            $historicos = DispensaPlanoTrabalhoHistorico::query()
                ->with('responsavel')
                ->where('dispensa_id', $dispensa->id)
                ->orderByDesc('created_at')
                ->get()
                ->all();
        }

        $elegivel = $this->authorization->isElegivel((string) $agente->id);
        $podeFormalizar = $this->authorization->podeFormalizar($ator)
            && ($elegivel || $dispensa !== null);

        return $this->assembler->montarResumo(
            $agente,
            $dispensa,
            $historicos,
            $elegivel,
            $podeFormalizar,
        );
    }

    private function registrarHistorico(
        DispensaPlanoTrabalho $dispensa,
        string $operacao,
        Usuario $ator,
        Carbon $cienciaEm,
    ): void {
        DispensaPlanoTrabalhoHistorico::query()->create([
            'dispensa_id' => $dispensa->id,
            'usuario_id' => $dispensa->usuario_id,
            'data_inicio' => $dispensa->data_inicio,
            'data_fim' => $dispensa->data_fim,
            'operacao' => $operacao,
            'ciencia_em' => $cienciaEm,
            'responsavel_id' => $ator->id,
        ]);
    }
}
