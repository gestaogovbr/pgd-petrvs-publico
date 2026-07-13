<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\Auth;

class AvaliacaoAuthorizationValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $this->validarNaoProprietario($plano);

        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($plano->unidade_id, $usuarioLogadoId)) {
            throw new ForbiddenException('Apenas a chefia da unidade pode avaliar períodos avaliativos.');
        }

        return $plano;
    }

    private function validarNaoProprietario(PlanoTrabalho $plano): void
    {
        $participante = $this->usuarioRepository->findById($plano->usuario_id);

        if ($participante === null) {
            return;
        }

        if ($participante->cpf === Auth::user()->cpf) {
            throw new ForbiddenException('Não é permitido avaliar o próprio Plano de Trabalho.');
        }
    }
}
