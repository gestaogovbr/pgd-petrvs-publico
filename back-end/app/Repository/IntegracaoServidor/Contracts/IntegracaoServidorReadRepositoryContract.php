<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Contracts;

use App\Models\IntegracaoServidor;

interface IntegracaoServidorReadRepositoryContract
{
    public function getServidor(string $cpf, string $matricula, string $codigoOrgao): ?IntegracaoServidor;

    public function getMatriculaByCpf(string $cpf, string $codigoOrgao): ?string;

    public function findByCpfAndCodigoExercicio(string $cpf, string $codigoExercicio, string $codigoOrgao): ?IntegracaoServidor;

    public function buscarAtualizacoesDados(string $codigoOrgao, ?array $escopoServidor = null): array;

    public function getAtualizacoesLotacoes(string $codigoOrgao, ?array $escopoServidor = null): array;

    public function getServidoresInseridosNaoLotados(string $codigoOrgao, ?array $escopoServidor = null): array;

    public function getUsuariosAusentes(string $codigoOrgao, ?array $escopoServidor = null): array;
}
