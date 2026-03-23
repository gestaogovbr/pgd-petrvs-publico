<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Contracts;

use App\Models\IntegracaoServidor;

interface IntegracaoServidorReadRepositoryContract
{
    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor;

    public function getMatriculaByCpf(string $cpf): ?string;

    public function findByCpfAndCodigoExercicio(string $cpf, string $codigoExercicio): ?IntegracaoServidor;

    public function buscarAtualizacoesDados(): array;

    public function getAtualizacoesLotacoes(): array;

    public function getServidoresInseridosNaoLotados(): array;

    public function getUsuariosAusentes(): array;
}
