<?php

declare(strict_types=1);

namespace App\V2\Usuario\Validators;

use App\Enums\Atribuicao;
use App\Enums\PerfilEnum;
use App\Exceptions\ValidateException;
use App\Models\Usuario;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;

class UsuarioUpdateValidator
{
    private const ATRIBUICOES_GESTOR = [
        Atribuicao::GESTOR,
        Atribuicao::GESTOR_SUBSTITUTO,
        Atribuicao::DELEGADO,
    ];

    public function __construct(
        private readonly PerfilRepository $perfilRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validarPerfil(string $perfilId, Usuario $alvo): void
    {
        $perfil = $this->perfilRepository->find($perfilId);

        if ($perfil === null) {
            throw new ValidateException('Perfil não encontrado.');
        }

        $isExterno = (bool) $alvo->usuario_externo;

        if ($isExterno && $perfil->nivel < PerfilEnum::COLABORADOR->value) {
            throw new ValidateException('Usuário externo não pode ter este nível de acesso.');
        }

        if (!$isExterno && $perfil->nivel === PerfilEnum::COLABORADOR->value) {
            throw new ValidateException('Usuário interno não pode ter o nível Colaborador.');
        }
    }

    /**
     * @param array<int, array{unidade_id: string, atribuicoes?: string[]}> $atribuicoes
     */
    public function validarAtribuicoes(array $atribuicoes, bool $isExterno = true): void
    {
        foreach ($atribuicoes as $integrante) {
            $this->validarUnidadeAtiva($integrante['unidade_id']);
            $this->validarAtribuicoesGestor($integrante);
        }

        if (!$isExterno) {
            $this->validarPossuiLotacao($atribuicoes);
        }
    }

    private function validarPossuiLotacao(array $integrantes): void
    {
        foreach ($integrantes as $integrante) {
            $atribuicoes = $integrante['atribuicoes'] ?? [];
            if (in_array(Atribuicao::LOTADO->value, $atribuicoes, true)) {
                return;
            }
        }

        throw new ValidateException('Usuário interno deve possuir ao menos uma lotação.');
    }

    private function validarUnidadeAtiva(string $unidadeId): void
    {
        $unidade = $this->unidadeRepository->findById($unidadeId);

        if ($unidade === null || $unidade->data_inativacao !== null) {
            throw new ValidateException('Unidade não encontrada ou está inativada.');
        }
    }

    /**
     * @param array{unidade_id: string, atribuicoes?: string[]} $integrante
     */
    private function validarAtribuicoesGestor(array $integrante): void
    {
        $atribuicoes = $integrante['atribuicoes'] ?? [];

        $valoresGestor = array_map(fn (Atribuicao $a) => $a->value, self::ATRIBUICOES_GESTOR);
        $atribuicoesGestor = array_intersect($valoresGestor, $atribuicoes);

        if (count($atribuicoesGestor) > 1) {
            throw new ValidateException('Apenas uma atribuição de gestor por unidade.');
        }
    }
}
