<?php

namespace App\Services\Siape\Servidor;

use App\Services\ServiceBase;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;
use App\Facades\SiapeLog;
use Throwable;

class ProcessadorAtualizacaoDadosService extends ServiceBase
{
    private int $chunkSize = 50;
    private int $transactionRetries = 3;

    private string $sqlUpdateDados = "UPDATE usuarios SET " .
        "nome = :nome, apelido = :nomeguerra, " .
        "email = :email, " .
        "ident_unica = :ident_unica, " .
        "cod_jornada = :cod_jornada, " .
        "nome_jornada = :nome_jornada, " .
        "data_nascimento = :data_nascimento, " .
        "tipo_modalidade_id = :tipo_modalidade_id, " .
        "participa_pgd = :participa_pgd, " .
        "data_modificacao = :data_modificacao WHERE id = :id";

    /**
     * Busca e processa atualizações de dados dos servidores em lotes.
     */
    public function processar(): array
    {
        $atualizacoesDados = $this->buscarAtualizacoesDados();
        $chunks = array_chunk($atualizacoesDados, $this->chunkSize);

        foreach ($chunks as $chunk) {
            DB::transaction(function () use ($chunk) {
                foreach ($chunk as $linha) {
                    $this->atualizarServidor($linha);
                }
            }, $this->transactionRetries);
        }

        return $atualizacoesDados;
    }

    private function buscarAtualizacoesDados(): array
    {
        return DB::select(
            "SELECT
                u.id,
                isr.matriculasiape,
                isr.cpf AS cpf_servidor,
                u.nome AS nome_anterior,
                isr.nome AS nome_servidor,
                u.apelido AS apelido_anterior,
                isr.nomeguerra AS nome_guerra,
                u.email AS email_anterior,
                isr.emailfuncional,
                u.telefone AS telefone_anterior,
                isr.telefone,
                isr.data_modificacao AS data_modificacao,
                u.data_modificacao AS data_modificacao_anterior,
                isr.data_nascimento,
                isr.ident_unica AS ident_unica,
                u.ident_unica AS ident_unica_anterior,
                u.nome_jornada AS nome_jornada_antigo,
                isr.nome_jornada AS nome_jornada,
                u.cod_jornada AS cod_jornada_antigo,
                isr.cod_jornada AS cod_jornada,
                u.tipo_modalidade_id AS tipo_modalidade_id_anterior,
                isr.modalidade_pgd,
                u.participa_pgd AS participa_pgd_anterior,
                isr.participa_pgd
            FROM integracao_servidores isr
            LEFT JOIN usuarios u ON (isr.matriculasiape = u.matricula)
            WHERE
                isr.nome != u.nome OR
                isr.emailfuncional != u.email OR
                isr.nomeguerra != u.apelido OR
                isr.telefone != u.telefone OR
                (isr.nome_jornada != u.nome_jornada OR isr.nome_jornada IS NOT NULL AND u.nome_jornada IS NULL) OR
                (isr.cod_jornada != u.cod_jornada OR isr.cod_jornada IS NOT NULL AND u.cod_jornada IS NULL) OR
                (isr.modalidade_pgd IS NOT NULL AND u.tipo_modalidade_id IS NULL) OR
                (isr.participa_pgd != u.participa_pgd OR isr.participa_pgd IS NOT NULL AND u.participa_pgd IS NULL) OR
                (isr.data_modificacao > u.data_modificacao OR isr.data_modificacao IS NOT NULL AND u.data_nascimento IS NULL)"
        );
    }

    private function atualizarServidor(object $linha): void
    {
        SiapeLog::info("Atualizando dados do servidor Matricula: " . $linha->matriculasiape);

        $this->integracaoService->verificarEmail($linha->emailfuncional, $linha->matriculasiape, $linha->id);
        $modalidadePgdValida = $this->integracaoService->validarModalidadePgd($linha->modalidade_pgd);

        DB::update($this->sqlUpdateDados, [
            'nome'               => $linha->nome_servidor,
            'nomeguerra'         => $linha->nome_guerra,
            'email'              => $linha->emailfuncional,
            'cod_jornada'        => $linha->cod_jornada,
            'nome_jornada'       => $linha->nome_jornada,
            'tipo_modalidade_id' => $modalidadePgdValida,
            'participa_pgd'      => $linha->participa_pgd,
            'id'                 => $linha->id,
            'ident_unica'        => $linha->ident_unica,
            'data_modificacao'   => UtilService::asDateTime($linha->data_modificacao),
            'data_nascimento'    => $linha->data_nascimento,
        ]);
    }
}
