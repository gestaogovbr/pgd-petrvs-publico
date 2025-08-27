<?php

namespace App\Services;

use App\Models\TipoModalidadeSiape;

class TipoModalidadeSiapeService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct(TipoModalidadeSiape::class);
    }

    public function buscarPorNome($nome)
    {
        if ($this->hasBuffer("tipos_modalidades_siape", $nome)) {
            return $this->getBuffer("tipos_modalidades_siape", $nome);
        }

        $registro = TipoModalidadeSiape::where('nome', $nome)
            ->whereNull('deleted_at')
            ->first();

        if (!$registro) {
            $registro = new TipoModalidadeSiape();
            $registro->tipo_modalidade_id = null;
            $registro->nome = $nome;
            $registro->save();
        }

        return $this->setBuffer('tipos_modalidades_siape', $nome, $registro);
    }
}