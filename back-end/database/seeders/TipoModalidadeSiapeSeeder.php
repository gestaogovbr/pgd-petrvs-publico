<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TipoModalidadeSiapeSeeder extends Seeder
{
    public function run()
    {
        $mapeamento = [
            'presencial' => 'Presencial',
            'integral' => 'Teletrabalho (Integral)',
            'no exterior substituicao' => 'Teletrabalho com residência no exterior (hipóteses de substituição da Lei 8.112/90, inciso VIII do art. 12 do Decreto n. 11.072/2022)',
            'no exterior' => 'Teletrabalho com residência no exterior (autorização discricionária, §7º do art. 12 do Decreto n. 11.072/2022)',
            'parcial' => 'Teletrabalho (Parcial)'
        ];

        foreach ($mapeamento as $nomeSiape => $nomeTipoModalidade) {
            $this->processarModalidade($nomeSiape, $nomeTipoModalidade);
        }
    }

    private function processarModalidade(string $nomeSiape, string $nomeTipoModalidade): void
    {
        $tipoModalidade = DB::table('tipos_modalidades')
            ->where('nome', $nomeTipoModalidade)
            ->whereNull('deleted_at')
            ->first();

        if (!$tipoModalidade) {
            return;
        }

        $existingRecord = DB::table('tipos_modalidades_siape')
            ->where('nome', $nomeSiape)
            ->first();

        if ($existingRecord) {
            $this->atualizarRegistro($existingRecord->id, $tipoModalidade->id);
            return;
        }

        $this->criarRegistro($nomeSiape, $tipoModalidade->id);
    }

    private function atualizarRegistro(string $id, string $tipoModalidadeId): void
    {
        DB::table('tipos_modalidades_siape')
            ->where('id', $id)
            ->update([
                'tipo_modalidade_id' => $tipoModalidadeId,
                'updated_at' => now(),
                'deleted_at' => null
            ]);
    }

    private function criarRegistro(string $nomeSiape, string $tipoModalidadeId): void
    {
        DB::table('tipos_modalidades_siape')->insert([
            'id' => Str::uuid(),
            'nome' => $nomeSiape,
            'tipo_modalidade_id' => $tipoModalidadeId,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null
        ]);
    }
}
