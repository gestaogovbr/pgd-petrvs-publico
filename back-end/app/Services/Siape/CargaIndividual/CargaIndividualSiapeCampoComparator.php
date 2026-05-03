<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use Carbon\Carbon;

class CargaIndividualSiapeCampoComparator
{
    /**
     * @return array<string, mixed>
     */
    public function comparar(string $campo, string $rotulo, mixed $valorSiape, mixed $valorPetrvs, bool $naoAplicavel = false): array
    {
        if ($naoAplicavel) {
            return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'nao_aplicavel');
        }

        $siape = $this->normalizar($valorSiape);
        $petrvs = $this->normalizar($valorPetrvs);

        if ($siape === null && $petrvs === null) {
            return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'nao_aplicavel');
        }

        if ($petrvs === null) {
            return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'nao_encontrado');
        }

        if ($siape === $petrvs) {
            return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'confirmado');
        }

        if ($this->normalizarAjustado($valorSiape) === $this->normalizarAjustado($valorPetrvs)) {
            return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'ajustado');
        }

        return $this->linha($campo, $rotulo, $valorSiape, $valorPetrvs, 'divergente');
    }

    /**
     * @return array<string, mixed>
     */
    private function linha(string $campo, string $rotulo, mixed $valorSiape, mixed $valorPetrvs, string $status): array
    {
        return [
            'campo' => $campo,
            'rotulo' => $rotulo,
            'recebido_siape' => $this->exibir($valorSiape),
            'registrado_petrvs' => $this->exibir($valorPetrvs),
            'status' => $status,
        ];
    }

    private function exibir(mixed $valor): ?string
    {
        if ($valor === null) {
            return null;
        }

        if (is_bool($valor)) {
            return $valor ? 'Sim' : 'Nao';
        }

        $texto = trim((string) $valor);

        return $texto !== '' ? $texto : null;
    }

    private function normalizar(mixed $valor): ?string
    {
        $texto = $this->exibir($valor);

        if ($texto === null) {
            return null;
        }

        return mb_strtolower($texto);
    }

    private function normalizarAjustado(mixed $valor): ?string
    {
        $texto = $this->normalizar($valor);

        if ($texto === null) {
            return null;
        }

        $data = $this->normalizarData($texto);
        if ($data !== null) {
            return $data;
        }

        $digitos = preg_replace('/\D/', '', $texto);
        if (is_string($digitos) && $digitos !== '') {
            return ltrim($digitos, '0') ?: '0';
        }

        return preg_replace('/\s+/', ' ', $texto) ?: $texto;
    }

    private function normalizarData(string $texto): ?string
    {
        foreach (['dmY', 'Y-m-d H:i:s', 'Y-m-d'] as $formato) {
            try {
                $data = Carbon::createFromFormat($formato, $texto);
                return $data->format('Y-m-d');
            } catch (\Throwable) {
                continue;
            }
        }

        return null;
    }
}
