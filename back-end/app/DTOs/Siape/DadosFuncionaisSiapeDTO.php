<?php

declare(strict_types=1);

namespace App\DTOs\Siape;

use App\Support\ModalidadePgd;

final readonly class DadosFuncionaisSiapeDTO
{
    /**
     * @param array<string, mixed> $dados
     */
    private function __construct(private array $dados)
    {
    }

    /**
     * @param array<string, mixed> $dados
     */
    public static function fromArray(array $dados): self
    {
        return new self($dados);
    }

    /**
     * @param array<int, array<string, mixed>> $dadosFuncionais
     * @return array<int, self>
     */
    public static function listFromArray(array $dadosFuncionais): array
    {
        return array_map(
            fn (array $dados): self => self::fromArray($dados),
            $dadosFuncionais
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return $this->dados;
    }

    /**
     * @return array<int, string>
     */
    public function keys(): array
    {
        return array_keys($this->dados);
    }

    public function matriculaSiape(): ?string
    {
        return self::scalarStringOrNull($this->dados['matriculaSiape'] ?? null);
    }

    /**
     * @return array<int, mixed>
     */
    public function codigosUnidadeCandidatos(): array
    {
        return [
            $this->dados['codUorgExercicio'] ?? null,
            $this->dados['codUorgLotacao'] ?? null,
        ];
    }

    public function modalidadePgdNormalizada(): ?string
    {
        return ModalidadePgd::normalize($this->dados['modalidadePGD'] ?? null);
    }

    public function participaPgdNormalizado(): ?string
    {
        $value = $this->dados['participaPGD'] ?? null;

        if (!is_scalar($value)) {
            return null;
        }

        $value = trim(mb_strtolower((string) $value, 'UTF-8'));
        if ($value === '') {
            return null;
        }

        $semAcento = $value;
        if (function_exists('iconv')) {
            $converted = @iconv('UTF-8', 'ASCII//TRANSLIT', $value);
            if ($converted !== false) {
                $semAcento = $converted;
            }
        }
        $semAcento = preg_replace('/[^a-z0-9]/', '', (string) $semAcento);

        if (in_array($value, ['1', 's', 'sim', 'yes', 'true'], true) || in_array($semAcento, ['1', 's', 'sim', 'yes', 'true'], true)) {
            return 'sim';
        }

        if (in_array($value, ['0', 'n', 'não', 'nao', 'no', 'false'], true) || in_array($semAcento, ['0', 'n', 'nao', 'no', 'false'], true)) {
            return 'não';
        }

        return null;
    }

    public function emailFuncional(): ?string
    {
        return self::normalizarEmailFuncional($this->dados['emailInstitucional'] ?? null)
            ?? self::normalizarEmailFuncional($this->dados['emailServidor'] ?? null);
    }

    /**
     * @return array<string, mixed>
     */
    public function atributosUsuarioParciais(): array
    {
        $attributes = [];

        $modalidadePgd = $this->modalidadePgdNormalizada();
        if ($modalidadePgd !== null) {
            $attributes['modalidade_pgd'] = $modalidadePgd;
        }

        $participaPgd = $this->participaPgdNormalizado();
        if ($participaPgd !== null) {
            $attributes['participa_pgd'] = $participaPgd;
        }

        $email = $this->emailFuncional();
        if ($email !== null) {
            $attributes['email'] = $email;
        }

        return $attributes;
    }

    private static function scalarStringOrNull(mixed $value): ?string
    {
        if (!is_scalar($value)) {
            return null;
        }

        $value = trim((string) $value);

        return $value !== '' ? $value : null;
    }

    private static function normalizarEmailFuncional(mixed $email): ?string
    {
        if (!is_string($email)) {
            return null;
        }

        $email = trim(mb_strtolower($email, 'UTF-8'));
        if ($email === '') {
            return null;
        }

        return filter_var($email, FILTER_VALIDATE_EMAIL) === false ? null : $email;
    }
}
