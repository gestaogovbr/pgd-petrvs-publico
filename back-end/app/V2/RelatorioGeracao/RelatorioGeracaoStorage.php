<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RelatorioGeracaoStorage
{
    public const DISCO = 'local';

    public const DIRETORIO = 'relatorios';

    public function caminho(string $geracaoId): string
    {
        return self::DIRETORIO . '/' . $geracaoId . '.xlsx';
    }

    public function caminhoAbsoluto(string $path): string
    {
        return $this->disco()->path($path);
    }

    public function garantirDiretorio(): void
    {
        $this->disco()->makeDirectory(self::DIRETORIO);
    }

    public function existe(string $path): bool
    {
        return $this->disco()->exists($path);
    }

    public function apagar(?string $path): void
    {
        if ($path === null || $path === '' || ! $this->existe($path)) {
            return;
        }

        $this->disco()->delete($path);
    }

    public function apagarGeracao(string $geracaoId, mixed $arquivoPath): void
    {
        $paths = array_unique(array_filter([
            is_string($arquivoPath) && $arquivoPath !== '' ? $arquivoPath : null,
            $this->caminho($geracaoId),
        ]));

        foreach ($paths as $path) {
            $this->apagar($path);
        }
    }

    public function download(string $path, string $nome): StreamedResponse
    {
        return $this->disco()->download($path, $nome);
    }

    private function disco(): Filesystem
    {
        return Storage::disk(self::DISCO);
    }
}
